/**
 * Code Registry Generator
 *
 * Reads every card component source file and its local dependencies, then
 * emits a TypeScript file (src/components/library/code-registry.ts) that maps
 * each card slug to its complete source code + dependency files + npm packages.
 *
 * The generated registry powers the "Code" tab in the UI Library.
 *
 * Run:  bun run scripts/generate-code-registry.ts
 */

import { readFileSync, writeFileSync, readdirSync, existsSync, statSync } from "fs";
import { join, basename, dirname, relative } from "path";

const ROOT = join(import.meta.dir, "..");
const CARDS_DIR = join(ROOT, "src", "components", "cards");
const CARDS_DATA = join(ROOT, "src", "components", "cards-data", "cards.ts");
const OUT_FILE = join(ROOT, "src", "components", "library", "code-registry.ts");
const THEME_CSS_FILE = join(ROOT, "src", "components", "library", "component-theme.css");

// ── Card slug → file mapping (derived from cards.ts) ──
interface CardEntry {
  slug: string;
  componentName: string;
  source: "original" | "more";
  filePath: string;
}

const FILE_OVERRIDES: Record<string, string> = {
  "cta-integration-cta-card": "CtaIntegrationCard",
  "cta-testimonial-cta-card": "CtaTestimonialCard",
};
const FILE_PATH_OVERRIDES: Record<string, string> = {
  "command-palette-card": join("overlays", "CommandPaletteCard.tsx"),
};
// Read cards.ts to extract the slug → component name mapping.
function findPrimaryExport(source: string, fallbackName: string): string {
  const exportNames = [...source.matchAll(
    /export\s+(?:default\s+)?(?:async\s+)?(?:function|const|class)\s+([A-Za-z_$][A-Za-z0-9_$]*)/g,
  )].map((match) => match[1]);

  if (/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(fallbackName) && exportNames.includes(fallbackName)) {
    return fallbackName;
  }

  return exportNames.find((name) => name.endsWith("Card")) ?? exportNames[0] ?? fallbackName;
}
function parseCardsTs(): CardEntry[] {
  const cardsTs = readFileSync(CARDS_DATA, "utf-8");
  const entries: CardEntry[] = [];

  // Recursively scan every component folder. This keeps registry coverage in
  // sync as new categories and nested component groups are added.
  const scanTsxFiles = (directory: string): Array<{ name: string; path: string }> =>
    readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
      const entryPath = join(directory, entry.name);
      if (entry.isDirectory()) return scanTsxFiles(entryPath);
      if (!entry.isFile() || !entry.name.endsWith(".tsx") || entry.name === "Popover.tsx") return [];
      return [{ name: entry.name.replace(/\.tsx$/, ""), path: entryPath }];
    });

  const allFiles = scanTsxFiles(CARDS_DIR).sort((a, b) => a.path.localeCompare(b.path));

  // Match lines like: { slug: "cinematic-folder-card", href: "...", title: "Cinematic Folder", ..., source: "original" },
  const re = /\{\s*slug:\s*"([^"]+)".*?source:\s*"(original|more)"/gs;
  let m: RegExpExecArray | null;
  while ((m = re.exec(cardsTs)) !== null) {
    const slug = m[1];
    const source = m[2] as "original" | "more";

    // Try to match the slug to a file. The slug is like "cinematic-folder-card"
    // and the file is "CinematicFolderCard.tsx". We normalize both to a
    // comparable form: strip "card" suffix from slug, lowercase, remove hyphens.
    const slugNorm = slug.replace(/-card$/, "").replace(/-/g, "");
    const overrideName = FILE_OVERRIDES[slug];
    const overridePath = FILE_PATH_OVERRIDES[slug];
    const exactMatch = allFiles.find(
      (file) => file.name.replace(/Card$/, "").toLowerCase() === slugNorm,
    );
    const fuzzyMatch = allFiles.find(
      (file) => file.name.toLowerCase().replace(/-/g, "").includes(slugNorm),
    );
    const match = overridePath
      ? allFiles.find((file) => file.path.endsWith(overridePath))
      : overrideName
        ? allFiles.find((file) => file.name === overrideName)
        : exactMatch ?? fuzzyMatch;

    if (match) {
      const sourceCode = readFileSync(match.path, "utf-8");
      const componentName = findPrimaryExport(sourceCode, match.name);
      entries.push({ slug, componentName, source, filePath: match.path });
    } else {
      console.warn(`⚠ File not found for slug "${slug}"`);
    }
  }
  return entries;
}

// ── Detect local imports (./something or ../something) in a source file ──
interface LocalDep {
  importPath: string;
  resolvedPath: string;
  label: string;
}

function detectImportPaths(source: string): string[] {
  const paths = new Set<string>();
  const re = /(?:\bfrom\s*|\bimport\s*\(\s*|^\s*import\s*)["']([^"']+)["']/gm;
  let match: RegExpExecArray | null;
  while ((match = re.exec(source)) !== null) paths.add(match[1]);
  return [...paths];
}

function resolveLocalImport(importPath: string, fileDir: string): string | undefined {
  if (!importPath.startsWith(".") && !importPath.startsWith("@/")) return undefined;
  const base = importPath.startsWith("@/")
    ? join(ROOT, "src", importPath.slice(2))
    : join(fileDir, importPath);
  const candidates = [
    base,
    ...[".ts", ".tsx", ".js", ".jsx", ".css", ".json"].map((extension) => `${base}${extension}`),
    ...["index.ts", "index.tsx", "index.js", "index.jsx"].map((file) => join(base, file)),
  ];
  return candidates.find((candidate) => existsSync(candidate) && statSync(candidate).isFile());
}

function detectLocalDeps(source: string, fileDir: string): LocalDep[] {
  const deps = new Map<string, LocalDep>();
  for (const importPath of detectImportPaths(source)) {
    const resolvedPath = resolveLocalImport(importPath, fileDir);
    if (!resolvedPath) continue;
    deps.set(resolvedPath, {
      importPath,
      resolvedPath,
      label: basename(resolvedPath).replace(/\.[^.]+$/, ""),
    });
  }
  return [...deps.values()];
}

// ── Detect npm package imports ──
function detectNpmPackages(source: string): string[] {
  const packages = new Set<string>();
  const builtIns = new Set(["fs", "path", "crypto", "url", "util", "events", "stream", "buffer"]);
  for (const importPath of detectImportPaths(source)) {
    if (importPath.startsWith(".") || importPath.startsWith("/") || importPath.startsWith("@/") || importPath.startsWith("node:")) continue;
    const parts = importPath.split("/");
    const root = importPath.startsWith("@") ? parts.slice(0, 2).join("/") : parts[0];
    if (["react", "react-dom", "next"].includes(root) || builtIns.has(root)) continue;
    packages.add(root);
  }
  return [...packages].sort();
}

function workspacePath(filePath: string): string {
  return relative(ROOT, filePath).replace(/\\/g, "/");
}

// ── Generate install command ──
function generateInstallCommand(packages: string[]): string {
  if (packages.length === 0) return "# No additional dependencies required";
  const pkgs = packages.map((p) => `${p}@latest`);
  return `npm install ${pkgs.join(" ")}\n# or:  bun add ${pkgs.join(" ")}\n# or:  pnpm add ${pkgs.join(" ")}`;
}

// ── Main ──
const entries = parseCardsTs();
console.log(`Found ${entries.length} cards.`);

interface CardCodeEntry {
  componentName: string;
  mainFile: { path: string; label: string; content: string };
  dependencies: { path: string; label: string; content: string }[];
  npmPackages: string[];
  installCommand: string;
}

const registry: Record<string, CardCodeEntry> = {};

for (const entry of entries) {
  const content = readFileSync(entry.filePath, "utf-8");
  const allNpm = new Set(detectNpmPackages(content));
  const depContents: { path: string; label: string; content: string }[] = [];
  const seen = new Set<string>([entry.filePath]);
  const queue = detectLocalDeps(content, dirname(entry.filePath));

  while (queue.length > 0) {
    const dep = queue.shift()!;
    if (seen.has(dep.resolvedPath)) continue;
    seen.add(dep.resolvedPath);

    const depContent = readFileSync(dep.resolvedPath, "utf-8");
    depContents.push({
      path: workspacePath(dep.resolvedPath),
      label: dep.label,
      content: depContent,
    });
    for (const packageName of detectNpmPackages(depContent)) allNpm.add(packageName);
    queue.push(...detectLocalDeps(depContent, dirname(dep.resolvedPath)));
  }

  // Always include react + react-dom + next for completeness
  allNpm.add("react");
  allNpm.add("react-dom");
  allNpm.add("next");

  const sortedNpm = [...allNpm].sort();
  const installCommand = generateInstallCommand(
    sortedNpm.filter((p) => !["react", "react-dom", "next"].includes(p)),
  );

  registry[entry.slug] = {
    componentName: entry.componentName,
    mainFile: {
      path: workspacePath(entry.filePath),
      label: entry.componentName,
      content,
    },
    dependencies: depContents,
    npmPackages: sortedNpm,
    installCommand,
  };

  console.log(
    `  ✓ ${entry.slug} → ${entry.componentName} (${depContents.length} deps, ${sortedNpm.length} npm pkgs)`,
  );
}

// ── Generate the TypeScript output ──
const themeCss = readFileSync(THEME_CSS_FILE, "utf-8");
const output = `// ════════════════════════════════════════════════════════════════════════════
// AUTO-GENERATED by scripts/generate-code-registry.ts — DO NOT EDIT MANUALLY.
// Regenerate after changing card source files:  bun run scripts/generate-code-registry.ts
// ════════════════════════════════════════════════════════════════════════════

import "server-only";
import type { CardCodeEntry } from "./code-types";

export const codeRegistry: Record<string, CardCodeEntry> = ${JSON.stringify(registry, null, 2)};

// Theme contract shared by every copied component.
export const sharedCssNotes = ${JSON.stringify(themeCss)};
`;

writeFileSync(OUT_FILE, output, "utf-8");
console.log(`\n✓ Wrote code registry to ${workspacePath(OUT_FILE)}`);
console.log(`  Total cards: ${Object.keys(registry).length}`);
