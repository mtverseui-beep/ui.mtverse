/**
 * Card Page Generator
 *
 * Reads the code registry and generates all 25 card route page files
 * at src/app/components/cards/[slug]/page.tsx. Each page uses the shared
 * CardPage wrapper with proper SEO metadata and JSON-LD structured data.
 *
 * Run:  bun run scripts/generate-card-pages.ts
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

const ROOT = join(import.meta.dir, "..");
const CARDS_DATA = join(ROOT, "src", "components", "cards-data", "cards.ts");
const REGISTRY = join(ROOT, "src", "components", "library", "code-registry.ts");
const PAGES_DIR = join(ROOT, "src", "app", "components", "cards");
const CARDS_DIR = join(ROOT, "src", "components", "cards");

interface CardEntry {
  slug: string;
  componentName: string;
  source: "original" | "more";
}

function parseCards(): CardEntry[] {
  const cardsTs = readFileSync(CARDS_DATA, "utf-8");
  const entries: CardEntry[] = [];
  const re = /\{\s*slug:\s*"([^"]+)".*?source:\s*"(original|more)"/gs;
  let m: RegExpExecArray | null;
  while ((m = re.exec(cardsTs)) !== null) {
    entries.push({ slug: m[1], componentName: "", source: m[2] as "original" | "more" });
  }
  return entries;
}

// Read the registry to get component names
function getComponentNames(): Record<string, string> {
  const registry = readFileSync(REGISTRY, "utf-8");
  const names: Record<string, string> = {};
  // Match: "slug": { "componentName": "ComponentName",
  const re = /"([^"]+)":\s*\{\s*"componentName":\s*"([^"]+)"/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(registry)) !== null) {
    names[m[1]] = m[2];
  }
  return names;
}

const cards = parseCards();
const componentNames = getComponentNames();

// Slugs that have CUSTOM showcase pages (not the default CardPage wrapper).
// These are skipped by this generator so their hand-written pages survive.
const CUSTOM_SHOWCASE_SLUGS = new Set([
  "kanban-board-card",
  "auth001-card",
  "animated-beam-card",
  // Full-page components that use dedicated full-width showcases
  // (Hero/Footer/Navbar) instead of the centered generic CardPage box.
  "hero007-card",
  "hero008-card",
  "hero009-card",
  "hero010-card",
  "hero011-card",
  "footer002-card",
  "footer003-card",
  "footer004-card",
  "footer005-card",
  "navbar004-card",
  "navbar005-card",
  "navbar001-card",
  "navbar002-card",
  "navbar003-card",
  "navbar031-card",
  "navbar030-card",
  "navbar029-card",
  "navbar028-card",
  "navbar027-card",
  "navbar026-card",
  "navbar025-card",
  "navbar024-card",
  "navbar023-card",
  "navbar022-card",
  "navbar021-card",
  "navbar020-card",
  "navbar019-card",
  "navbar018-card",
  "navbar017-card",
  "navbar016-card",
  "navbar015-card",
  "navbar014-card",
  "navbar013-card",
  "navbar012-card",
  "navbar011-card",
  "navbar010-card",
  "navbar009-card",
  "navbar008-card",
  "navbar007-card",
  "navbar006-card",
  "chatgpt-theme-card",
  "supabase-theme-card",
  "year-wrapped-dashboard-card",
  "spinner-patterns-card",
  "linear-feature-cards-card",
  "art-gallery-slider-card",
  "animated-card-stack-card",
  "cat-slider-card",
  "sticky-agent-cards-card",
  "fragrance-product-grid-card",
  "under-construction-card",
  "update-required-card",
  "service-outage-card",
  "out-of-memory-card",
  "corrupted-data-card",
  "captcha-failed-card",
  "region-blocked-card",
  "account-suspended-card",
  "subscription-expired-card",
  "browser-not-supported-card",
  "ssl-error-card",
  "dns-error-card",
  "maintenance-scheduled-card",
  "network-error-005-card",
  "error429-005-card",
  "error403-005-card",
  "error401-005-card",
  "error503-005-card",
  "error500-005-card",
  "error404-005-card",
  "error504-004-card",
  "error429-004-card",
  "error403-004-card",
  "error401-004-card",
  "error503-004-card",
  "error500-004-card",
  "error404-004-card",
  "offline-003-card",
  "error429-003-card",
  "error403-003-card",
  "error401-003-card",
  "error503-003-card",
  "error500-003-card",
  "error404-003-card",
  "network-error-002-card",
  "error429-002-card",
  "error403-002-card",
  "error401-002-card",
  "error503-002-card",
  "error500-002-card",
  "error404-002-card",
  "two-factor-card",
  "phone-verify-card",
  "onboarding-card",
  "access-denied-card",
  "auth-error-card",
  "sso-login-card",
  "invitation-card",
  "session-expired-card",
  "account-locked-card",
  "account-recovery-card",
  "social-login-card",
  "passkey-card",
  "magic-link-card",
  "auth-success-006-card",
  "otp-006-card",
  "verify-email-006-card",
  "reset-006-card",
  "forgot-006-card",
  "signup-006-card",
  "signin-006-card",
  "auth-success-005-card",
  "otp-005-card",
  "verify-email-005-card",
  "reset-005-card",
  "forgot-005-card",
  "signup-005-card",
  "signin-005-card",
  "auth-success-004-card",
  "otp-004-card",
  "verify-email-004-card",
  "reset-004-card",
  "forgot-004-card",
  "signup-004-card",
  "signin-004-card",
  "auth-success-003-card",
  "otp-003-card",
  "verify-email-003-card",
  "reset-003-card",
  "forgot-003-card",
  "signup-003-card",
  "signin-003-card",
  "auth-success-002-card",
  "otp-002-card",
  "verify-email-002-card",
  "reset-002-card",
  "forgot-002-card",
  "signup-002-card",
  "signin-002-card",
  "footer001-card",
  "footer023-card",
  "footer022-card",
  "footer021-card",
  "footer020-card",
  "footer019-card",
  "footer018-card",
  "footer017-card",
  "footer016-card",
  "footer015-card",
  "footer014-card",
  "footer013-card",
  "footer012-card",
  "footer011-card",
  "footer010-card",
  "footer009-card",
  "footer008-card",
  "footer007-card",
  "footer006-card",
  "hero001-card",
  "hero002-card",
  "hero003-card",
  "hero021-card",
  "hero020-card",
  "hero019-card",
  "hero018-card",
  "hero017-card",
  "hero016-card",
  "hero015-card",
  "hero014-card",
  "hero013-card",
  "hero012-card",
  "pricing001-card",
  "pricing002-card",
  "pricing003-card",
  "sign-in-card",
  "sign-up-card",
  "forgot-password-card",
  "reset-password-card",
  "error-404-card",
  "error-500-card",
  "offline-card",
  "testimonials-card",
  "hero004-card",
  "hero005-card",
  "hero006-card",
]);

console.log(`Generating ${cards.length} card pages…\n`);

for (const card of cards) {
  if (CUSTOM_SHOWCASE_SLUGS.has(card.slug)) {
    console.log(`  ⊘ ${card.slug} → skipped (custom showcase)`);
    continue;
  }
  card.componentName = componentNames[card.slug] ?? "";
  if (!card.componentName) {
    console.warn(`⚠ Could not find component name for ${card.slug}`);
    continue;
  }

  // Determine import path — check all subdirectories first, fall back to more/
  const subdirs = ["ai", "backgrounds", "sidebar", "tables", "data", "overlays", "premium-3d", "charts/insight", "premium-kanban", "premium-tinte-chatgpt", "premium-tinte-supabase"];
  let importPath = `@/components/cards/more/${card.componentName}`;
  for (const subdir of subdirs) {
    const candidate = join(CARDS_DIR, subdir, `${card.componentName}.tsx`);
    if (existsSync(candidate)) {
      importPath = `@/components/cards/${subdir}/${card.componentName}`;
      break;
    }
  }
  // If not found in subdirs and source is "original", use root cards dir
  if (card.source === "original" && importPath.includes("/more/")) {
    importPath = `@/components/cards/${card.componentName}`;
  }

  // Handle hyphenated component file names (e.g. magicui-animated-beam)
  // The file name has hyphens but the export name doesn't — we need to read the actual export
  const isHyphenated = card.componentName.includes("-");
  let importName = card.componentName;
  if (isHyphenated) {
    // Read the file to find the actual export name
    const filePath = join(ROOT, "src", importPath.replace("@/", "").replace(/\/[^/]+$/, ""), `${card.componentName}.tsx`);
    try {
      const fileContent = readFileSync(filePath, "utf-8");
      const exportMatch = fileContent.match(/export\s+(?:const|function|class)\s+([A-Za-z_$][A-Za-z0-9_$]*)/);
      if (exportMatch) {
        importName = exportMatch[1];
      }
    } catch (e) {
      console.warn(`⚠ Could not read ${filePath} for hyphenated component name`);
    }
  }

  const pageDir = join(PAGES_DIR, card.slug);
  if (!existsSync(pageDir)) mkdirSync(pageDir, { recursive: true });

  const fileContent = `import { CardPage } from "@/components/library/CardPage";
import { ${importName} } from "${importPath}";

export default function Page() {
  return (
    <CardPage slug="${card.slug}">
      <${importName} />
    </CardPage>
  );
}
`;

  writeFileSync(join(pageDir, "page.tsx"), fileContent, "utf-8");
  console.log(`  ✓ ${card.slug} → ${card.componentName}`);
}

console.log(`\n✓ Generated ${cards.length} card pages.`);
