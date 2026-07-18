import { existsSync, readFileSync, readdirSync } from "fs";
import { join, resolve } from "path";

const ROOT = resolve(import.meta.dir, "..");
const CARDS_DATA = join(ROOT, "src", "components", "cards-data", "cards.ts");
const REGISTRY = join(ROOT, "src", "components", "library", "code-registry.ts");
const PAGES_DIR = join(ROOT, "src", "app", "components", "cards");
const GLOBALS = join(ROOT, "src", "app", "globals.css");

const THEME_CATEGORIES = new Set([
  "Navbar", "Footer", "Pricing", "Hero", "Auth", "Testimonials", "Features", "CTA",
]);

interface RouteEntry {
  slug: string;
  category: string;
}

function readRoutes(): RouteEntry[] {
  const source = readFileSync(CARDS_DATA, "utf-8");
  const routes: RouteEntry[] = [];
  const pattern = /\{\s*slug:\s*"([^"]+)".*?category:\s*"([^"]+)".*?source:\s*"(?:original|more)"\s*\}/gs;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(source)) !== null) routes.push({ slug: match[1], category: match[2] });
  return routes;
}

function readRegistry(): Map<string, string> {
  const source = readFileSync(REGISTRY, "utf-8");
  const entries = new Map<string, string>();
  const pattern = /"([^"]+-card)":\s*\{\s*"componentName":\s*"[^"]+",\s*"mainFile":\s*\{\s*"path":\s*"([^"]+)"/g;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(source)) !== null) entries.set(match[1], match[2]);
  return entries;
}

const routes = readRoutes();
const registry = readRegistry();
const failures: string[] = [];
const routeSlugs = new Set(routes.map(({ slug }) => slug));

for (const { slug } of routes) {
  if (!registry.has(slug)) failures.push(`Registry entry missing: ${slug}`);
  const page = join(PAGES_DIR, slug, "page.tsx");
  if (!existsSync(page)) failures.push(`Preview page missing: ${slug}`);
  const layout = join(PAGES_DIR, slug, "layout.tsx");
  if (!existsSync(layout)) {
    failures.push(`SEO layout missing: ${slug}`);
  } else {
    const metadata = readFileSync(layout, "utf-8");
    if (!metadata.includes("export const metadata") || !metadata.includes("keywords:") || !metadata.includes("application/ld+json")) {
      failures.push(`SEO metadata incomplete: ${slug}`);
    }
  }
  const sourcePath = registry.get(slug);
  if (sourcePath && !existsSync(join(ROOT, sourcePath))) failures.push(`Registry source missing: ${slug} -> ${sourcePath}`);
}

for (const slug of registry.keys()) {
  if (!routeSlugs.has(slug)) failures.push(`Registry entry has no route metadata: ${slug}`);
}

const duplicates = routes
  .map(({ slug }) => slug)
  .filter((slug, index, slugs) => slugs.indexOf(slug) !== index);
for (const slug of new Set(duplicates)) failures.push(`Duplicate route slug: ${slug}`);

const dashboardShell = readFileSync(join(ROOT, "src", "components", "shell", "DashboardShell.tsx"), "utf-8");
const advancedSearch = readFileSync(join(ROOT, "src", "components", "shell", "AdvancedComponentSearch.tsx"), "utf-8");
const cardPage = readFileSync(join(ROOT, "src", "components", "library", "CardPage.tsx"), "utf-8");
const rootLayout = readFileSync(join(ROOT, "src", "app", "layout.tsx"), "utf-8");
const siteConfig = readFileSync(join(ROOT, "src", "lib", "site-config.ts"), "utf-8");
if (dashboardShell.includes("toggleFavorite") || dashboardShell.includes("mtverse:favorites")) failures.push("Second-sidebar favorite control is still present");
if (!dashboardShell.includes("AdvancedComponentSearch")) failures.push("Advanced header search is not mounted");
if (!advancedSearch.includes("cardRoutes") || !advancedSearch.includes("useDeferredValue") || !advancedSearch.includes("MAX_VISIBLE_RESULTS")) {
  failures.push("Advanced global search is not indexed or performance-capped");
}
if (cardPage.includes("codeRegistry")) failures.push("CardPage eagerly imports the full code registry");
if (!(rootLayout + siteConfig).includes("360+")) failures.push("Root component-count metadata is stale");
if (!rootLayout.includes('forcedTheme="light"')) failures.push("The public UI library is not forced to light mode");
if (dashboardShell.includes("useTheme") || dashboardShell.includes('aria-label="Toggle theme"')) failures.push("Global dark-mode controls are still mounted");

const globals = readFileSync(GLOBALS, "utf-8");
if (!globals.includes('component-theme.css')) failures.push("Shared component theme CSS is not imported by globals.css");
const themeContract = readFileSync(join(ROOT, "src", "components", "library", "component-theme.css"), "utf-8");
const cardShowcase = readFileSync(join(ROOT, "src", "components", "library", "CardShowcase.tsx"), "utf-8");
if (!cardShowcase.includes("data-component-category={category}")) failures.push("Preview category theme marker is missing");
if (!themeContract.includes('data-component-category="Buttons"')) failures.push("Button light-mode contrast contract is missing");

const previewShells = [
  join(ROOT, "src", "components", "library", "CardShowcase.tsx"),
  join(ROOT, "src", "components", "navbar-showcase", "NavbarPreviewCanvas.tsx"),
  join(ROOT, "src", "components", "navbar-showcase", "HeroShowcase.tsx"),
  join(ROOT, "src", "components", "navbar-showcase", "FooterShowcase.tsx"),
  join(ROOT, "src", "components", "navbar-showcase", "PageShowcase.tsx"),
];
for (const shell of previewShells) {
  if (!readFileSync(shell, "utf-8").includes("component-theme-scope")) {
    failures.push(`Preview theme scope missing: ${shell.replace(`${ROOT}\\`, "")}`);
  }
}

for (const showcase of ["NavbarShowcase.tsx", "HeroShowcase.tsx", "FooterShowcase.tsx", "PageShowcase.tsx"]) {
  const source = readFileSync(join(ROOT, "src", "components", "navbar-showcase", showcase), "utf-8");
  if (!source.includes('key="docs"') || !source.includes("DocsPanelLoader") || source.includes("<ComponentDocs")) {
    failures.push(`Protected documentation tab is not wired: ${showcase}`);
  }
}

const toolbar = readFileSync(join(ROOT, "src", "components", "navbar-showcase", "ResponsivePreviewToolbar.tsx"), "utf-8");
if (!toolbar.includes("LockKeyhole") || (toolbar.match(/protectedTab/g)?.length ?? 0) < 3) {
  failures.push("Raw code and Docs tabs do not expose their protected state.");
}

const codeLoader = readFileSync(join(ROOT, "src", "components", "library", "CodePanelLoader.tsx"), "utf-8");
const docsLoader = readFileSync(join(ROOT, "src", "components", "library", "DocsPanelLoader.tsx"), "utf-8");
const protectedRoute = readFileSync(join(ROOT, "src", "app", "api", "components", "[slug]", "code", "route.ts"), "utf-8");
for (const [name, source] of [["Raw code", codeLoader], ["Docs", docsLoader]] as const) {
  if (!source.includes("/api/ui-library/access-token") || !source.includes("LockKeyhole")) {
    failures.push(`${name} entitlement loader is incomplete.`);
  }
}
if (!protectedRoute.includes("verifyUiLibraryAccessToken") || !protectedRoute.includes("authorization")) {
  failures.push("Component code API is not protected by the UI Library entitlement token.");
}

const categoryCounts = [...THEME_CATEGORIES].map((category) => ({
  category,
  count: routes.filter((route) => route.category === category).length,
}));

console.log(`Routes: ${routes.length}`);
console.log(`Registry entries: ${registry.size}`);
console.log(`Preview pages: ${readdirSync(PAGES_DIR, { withFileTypes: true }).filter((entry) => entry.isDirectory() && existsSync(join(PAGES_DIR, entry.name, "page.tsx"))).length}`);
console.log(`SEO layouts: ${routes.filter(({ slug }) => existsSync(join(PAGES_DIR, slug, "layout.tsx"))).length}`);
for (const { category, count } of categoryCounts) console.log(`  ${category}: ${count}`);

if (failures.length > 0) {
  console.error(`\nLibrary audit failed (${failures.length}):`);
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}

console.log("\nLibrary audit passed: routes, previews, registry, docs, theme scopes, search, performance, and SEO metadata are synchronized.");