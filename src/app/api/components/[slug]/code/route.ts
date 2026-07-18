import { NextResponse } from "next/server";
import { codeRegistry, sharedCssNotes } from "@/components/library/code-registry";
import type { CodeEntryResponse, PublicCodeEntry } from "@/components/library/code-types";
import { verifyUiLibraryAccessToken } from "@/lib/ui-access-token";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const PRIVATE_HEADERS = {
  "Cache-Control": "private, no-store, max-age=0",
  "X-Content-Type-Options": "nosniff",
  Vary: "Authorization",
};

export async function GET(
  request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  const authorization = request.headers.get("authorization");
  const token = authorization?.startsWith("Bearer ") ? authorization.slice(7).trim() : "";
  const access = token ? verifyUiLibraryAccessToken(token) : null;

  if (!access) {
    return NextResponse.json(
      { error: "UI Library lifetime access is required to view source code." },
      { status: 401, headers: PRIVATE_HEADERS },
    );
  }

  const { slug } = await context.params;
  if (!SLUG_PATTERN.test(slug)) {
    return NextResponse.json({ error: "Invalid component slug." }, { status: 400, headers: PRIVATE_HEADERS });
  }

  const source = codeRegistry[slug];
  if (!source) {
    return NextResponse.json({ error: "Component code was not found." }, { status: 404, headers: PRIVATE_HEADERS });
  }

  const entry: PublicCodeEntry = {
    componentName: source.componentName,
    mainFile: {
      path: source.mainFile.path,
      label: source.mainFile.label,
      content: source.mainFile.content,
    },
    dependencies: source.dependencies.map(({ path, label, content }) => ({ path, label, content })),
    npmPackages: source.npmPackages,
    installCommand: source.installCommand,
  };

  const payload: CodeEntryResponse = { entry, sharedCssNotes };
  return NextResponse.json(payload, { headers: PRIVATE_HEADERS });
}
