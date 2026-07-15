import { NextResponse } from "next/server";
import { codeRegistry, sharedCssNotes } from "@/components/library/code-registry";
import type { CodeEntryResponse, PublicCodeEntry } from "@/components/library/code-types";

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params;

  if (!SLUG_PATTERN.test(slug)) {
    return NextResponse.json({ error: "Invalid component slug." }, { status: 400 });
  }

  const source = codeRegistry[slug];
  if (!source) {
    return NextResponse.json({ error: "Component code was not found." }, { status: 404 });
  }

  const entry: PublicCodeEntry = {
    componentName: source.componentName,
    mainFile: {
      label: source.mainFile.label,
      content: source.mainFile.content,
    },
    dependencies: source.dependencies.map(({ label, content }) => ({ label, content })),
    npmPackages: source.npmPackages,
    installCommand: source.installCommand,
  };

  const payload: CodeEntryResponse = { entry, sharedCssNotes };

  return NextResponse.json(payload, {
    headers: {
      "Cache-Control": "private, no-store, max-age=0",
      "X-Content-Type-Options": "nosniff",
    },
  });
}