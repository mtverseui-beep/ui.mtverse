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

import { readFileSync, writeFileSync, readdirSync, existsSync } from "fs";
import { join, basename } from "path";

const ROOT = join(import.meta.dir, "..");
const CARDS_DIR = join(ROOT, "src", "components", "cards");
const MORE_DIR = join(CARDS_DIR, "more");
const CARDS_DATA = join(ROOT, "src", "components", "cards-data", "cards.ts");
const OUT_FILE = join(ROOT, "src", "components", "library", "code-registry.ts");

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
// Read cards.ts to extract the slug → component name mapping.
function parseCardsTs(): CardEntry[] {
  const cardsTs = readFileSync(CARDS_DATA, "utf-8");
  const entries: CardEntry[] = [];

  // Build a list of all .tsx files in both card directories to match against.
  const originalFiles = readdirSync(CARDS_DIR)
    .filter((f) => f.endsWith(".tsx") && f !== "Popover.tsx")
    .map((f) => ({ name: f.replace(".tsx", ""), path: join(CARDS_DIR, f) }));
  const moreFiles = readdirSync(MORE_DIR)
    .filter((f) => f.endsWith(".tsx"))
    .map((f) => ({ name: f.replace(".tsx", ""), path: join(MORE_DIR, f) }));
  // Also scan charts subdirectory + nested insight subdirectory.
  const CHARTS_DIR = join(CARDS_DIR, "charts");
  const chartsFiles = existsSync(CHARTS_DIR)
    ? readdirSync(CHARTS_DIR)
        .filter((f) => f.endsWith(".tsx"))
        .map((f) => ({ name: f.replace(".tsx", ""), path: join(CHARTS_DIR, f) }))
    : [];
  const INSIGHT_DIR = join(CHARTS_DIR, "insight");
  const insightFiles = existsSync(INSIGHT_DIR)
    ? readdirSync(INSIGHT_DIR)
        .filter((f) => f.endsWith(".tsx"))
        .map((f) => ({ name: f.replace(".tsx", ""), path: join(INSIGHT_DIR, f) }))
    : [];
  // Also scan nested charts subdirectories (command-center, financial-terminal, etc.)
  const nestedDirs = existsSync(CHARTS_DIR)
    ? readdirSync(CHARTS_DIR, { withFileTypes: true })
        .filter((d) => d.isDirectory() && d.name !== "insight")
        .flatMap((d) => {
          const dir = join(CHARTS_DIR, d.name);
          return readdirSync(dir)
            .filter((f) => f.endsWith(".tsx"))
            .map((f) => ({ name: f.replace(".tsx", ""), path: join(dir, f) }));
        })
    : [];
  // Also scan premium-3d subdirectory (3D gallery + AI chatbot)
  const PREMIUM_3D_DIR = join(CARDS_DIR, "premium-3d");
  const premium3dFiles = existsSync(PREMIUM_3D_DIR)
    ? readdirSync(PREMIUM_3D_DIR)
        .filter((f) => f.endsWith(".tsx"))
        .map((f) => ({ name: f.replace(".tsx", ""), path: join(PREMIUM_3D_DIR, f) }))
    : [];
  // Also scan premium-3d/ai-chatbot subdirectory
  const PREMIUM_3D_CHATBOT_DIR = join(PREMIUM_3D_DIR, "ai-chatbot");
  const premium3dChatbotFiles = existsSync(PREMIUM_3D_CHATBOT_DIR)
    ? readdirSync(PREMIUM_3D_CHATBOT_DIR)
        .filter((f) => f.endsWith(".tsx"))
        .map((f) => ({ name: f.replace(".tsx", ""), path: join(PREMIUM_3D_CHATBOT_DIR, f) }))
    : [];
  // Also scan overlays subdirectory
  const OVERLAYS_DIR = join(CARDS_DIR, "overlays");
  const overlaysFiles = existsSync(OVERLAYS_DIR)
    ? readdirSync(OVERLAYS_DIR)
        .filter((f) => f.endsWith(".tsx"))
        .map((f) => ({ name: f.replace(".tsx", ""), path: join(OVERLAYS_DIR, f) }))
    : [];
  // Also scan sidebar subdirectory
  const SIDEBAR_DIR = join(CARDS_DIR, "sidebar");
  const sidebarFiles = existsSync(SIDEBAR_DIR)
    ? readdirSync(SIDEBAR_DIR)
        .filter((f) => f.endsWith(".tsx"))
        .map((f) => ({ name: f.replace(".tsx", ""), path: join(SIDEBAR_DIR, f) }))
    : [];
  // Also scan ai subdirectory
  const AI_DIR = join(CARDS_DIR, "ai");
  const aiFiles = existsSync(AI_DIR)
    ? readdirSync(AI_DIR)
        .filter((f) => f.endsWith(".tsx"))
        .map((f) => ({ name: f.replace(".tsx", ""), path: join(AI_DIR, f) }))
    : [];
  // Also scan backgrounds subdirectory
  const BG_DIR = join(CARDS_DIR, "backgrounds");
  const bgFiles = existsSync(BG_DIR)
    ? readdirSync(BG_DIR)
        .filter((f) => f.endsWith(".tsx"))
        .map((f) => ({ name: f.replace(".tsx", ""), path: join(BG_DIR, f) }))
    : [];
  // Also scan data subdirectory (DataTable, Toast, Skeletons, Empty States)
  const DATA_DIR = join(CARDS_DIR, "data");
  const dataFiles = existsSync(DATA_DIR)
    ? readdirSync(DATA_DIR)
        .filter((f) => f.endsWith(".tsx"))
        .map((f) => ({ name: f.replace(".tsx", ""), path: join(DATA_DIR, f) }))
    : [];
  // Also scan tables subdirectory
  const TABLES_DIR = join(CARDS_DIR, "tables");
  const tableFiles = existsSync(TABLES_DIR)
    ? readdirSync(TABLES_DIR)
        .filter((f) => f.endsWith(".tsx"))
        .map((f) => ({ name: f.replace(".tsx", ""), path: join(TABLES_DIR, f) }))
    : [];
  const allFiles = [...originalFiles, ...moreFiles, ...chartsFiles, ...insightFiles, ...nestedDirs, ...premium3dFiles, ...premium3dChatbotFiles, ...overlaysFiles, ...sidebarFiles, ...aiFiles, ...bgFiles, ...dataFiles, ...tableFiles];

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
    const match = overrideName
      ? allFiles.find((f) => f.name === overrideName)
      : allFiles.find((f) => {
          // "CinematicFolderCard" -> "cinematicfolder" (strip "Card", lowercase)
          const fileNorm = f.name.replace(/Card$/, "").toLowerCase();
          return fileNorm === slugNorm || f.name.toLowerCase().replace(/-/g, "").includes(slugNorm);
        });

    if (match) {
      entries.push({ slug, componentName: match.name, source, filePath: match.path });
    } else {
      console.warn(`⚠ File not found for slug "${slug}"`);
    }
  }
  return entries;
}

// ── Detect local imports (./something or ../something) in a source file ──
interface LocalDep {
  importPath: string; // e.g. "./data/card-data"
  resolvedPath: string; // absolute path
  label: string; // display name for the file tab
}

function detectLocalDeps(source: string, fileDir: string): LocalDep[] {
  const deps: LocalDep[] = [];
  // Match: from "./..." or from "../..."
  const re = /from\s+["'](\.\.?\/[^"']+)["']/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(source)) !== null) {
    const importPath = m[1];
    // Try resolving with extensions
    const candidates = [
      join(fileDir, importPath),
      join(fileDir, `${importPath}.ts`),
      join(fileDir, `${importPath}.tsx`),
      join(fileDir, `${importPath}.js`),
      join(fileDir, `${importPath}.jsx`),
      join(fileDir, importPath, "index.ts"),
    ];
    const resolved = candidates.find((p) => existsSync(p));
    if (resolved) {
      const label = basename(resolved).replace(/\.(ts|tsx)$/, "");
      deps.push({ importPath, resolvedPath: resolved, label });
    }
  }
  return deps;
}

// ── Detect npm package imports ──
function detectNpmPackages(source: string): string[] {
  const packages = new Set<string>();
  // Match: from "package-name" or from "package-name/sub-path" (skip relative imports)
  const re = /from\s+["']([^"'.][^"']*?)["']/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(source)) !== null) {
    const pkg = m[1];
    if (pkg.startsWith(".") || pkg.startsWith("/")) continue;
    // Get the root package name (before any /)
    const root = pkg.split("/")[0];
    // Skip Node built-ins
    if (["react", "react-dom", "next", "fs", "path", "crypto"].includes(root))
      continue;
    // next/image → next, next/link → next
    if (root === "next") continue;
    packages.add(root);
  }
  return [...packages].sort();
}

// ── Generate install command ──
function generateInstallCommand(packages: string[]): string {
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
  const fileDir = entry.filePath.replace(basename(entry.filePath), "");
  const localDeps = detectLocalDeps(content, fileDir);
  const npmPackages = detectNpmPackages(content);

  // Also scan dependency files for transitive npm packages
  const allNpm = new Set(npmPackages);
  const depContents: { path: string; label: string; content: string }[] = [];
  const seen = new Set<string>();

  for (const dep of localDeps) {
    if (seen.has(dep.resolvedPath)) continue;
    seen.add(dep.resolvedPath);
    const depContent = readFileSync(dep.resolvedPath, "utf-8");
    depContents.push({
      path: dep.resolvedPath.replace(ROOT + "/", ""),
      label: dep.label,
      content: depContent,
    });
    // Detect npm packages in dependency files too
    for (const p of detectNpmPackages(depContent)) allNpm.add(p);
    // Detect transitive local deps (e.g., card-data.ts imports from ../types)
    const depDir = dep.resolvedPath.replace(basename(dep.resolvedPath), "");
    const transitiveDeps = detectLocalDeps(depContent, depDir);
    for (const td of transitiveDeps) {
      if (seen.has(td.resolvedPath)) continue;
      seen.add(td.resolvedPath);
      const tdContent = readFileSync(td.resolvedPath, "utf-8");
      depContents.push({
        path: td.resolvedPath.replace(ROOT + "/", ""),
        label: td.label,
        content: tdContent,
      });
      for (const p of detectNpmPackages(tdContent)) allNpm.add(p);
    }
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
      path: entry.filePath.replace(ROOT + "/", ""),
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
const output = `// ════════════════════════════════════════════════════════════════════════════
// AUTO-GENERATED by scripts/generate-code-registry.ts — DO NOT EDIT MANUALLY.
// Regenerate after changing card source files:  bun run scripts/generate-code-registry.ts
// ════════════════════════════════════════════════════════════════════════════

import "server-only";
import type { CardCodeEntry } from "./code-types";

export const codeRegistry: Record<string, CardCodeEntry> = ${JSON.stringify(registry, null, 2)};

// CSS notes shared across all cards — the cs-* utility classes from globals.css.
export const sharedCssNotes = \`/* Add these utility classes to your globals.css.
   They provide theme-aware card surfaces, text, and borders. */

:root {
  --card-surface: #ffffff;
  --card-surface-2: #f8fafc;
  --card-surface-3: #f1f5f9;
  --card-text: #0f172a;
  --card-text-muted: #475569;
  --card-text-subtle: #94a3b8;
  --card-border: #e2e8f0;
  --card-border-subtle: #f1f5f9;
  --card-hover: #f8fafc;
  --card-input-bg: #f1f5f9;
}

.dark {
  --card-surface: #131218;
  --card-surface-2: #0f1015;
  --card-surface-3: #1a1c24;
  --card-text: #ffffff;
  --card-text-muted: rgba(255, 255, 255, 0.55);
  --card-text-subtle: rgba(255, 255, 255, 0.40);
  --card-border: rgba(255, 255, 255, 0.10);
  --card-border-subtle: rgba(255, 255, 255, 0.06);
  --card-hover: rgba(255, 255, 255, 0.06);
  --card-input-bg: rgba(255, 255, 255, 0.04);
}

.cs-surface { background-color: var(--card-surface); color: var(--card-text); }
.cs-surface-2 { background-color: var(--card-surface-2); }
.cs-surface-3 { background-color: var(--card-surface-3); }
.cs-text { color: var(--card-text); }
.cs-muted { color: var(--card-text-muted); }
.cs-subtle { color: var(--card-text-subtle); }
.cs-border { border: 1px solid var(--card-border); }
.cs-border-subtle { border: 1px solid var(--card-border-subtle); }
.cs-border-b { border-bottom: 1px solid var(--card-border); }
.cs-border-t { border-top: 1px solid var(--card-border); }
.cs-border-b-subtle { border-bottom: 1px solid var(--card-border-subtle); }
.cs-border-t-subtle { border-top: 1px solid var(--card-border-subtle); }
.cs-hover { transition: background-color 0.15s ease; }
.cs-hover:hover { background-color: var(--card-hover); }
.cs-input { background-color: var(--card-input-bg); }
\`;
`;

writeFileSync(OUT_FILE, output, "utf-8");
console.log(`\n✓ Wrote code registry to ${OUT_FILE.replace(ROOT + "/", "")}`);
console.log(`  Total cards: ${Object.keys(registry).length}`);
