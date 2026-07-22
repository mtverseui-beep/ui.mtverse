/**
 * Card Page Generator
 *
 * Reads the code registry and generates every card route page and SEO layout
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
const GENERATED_ROUTES = join(ROOT, "src", "lib", "generated-component-routes.ts");

interface CardEntry {
  slug: string;
  href: string;
  title: string;
  category: string;
  animation: string;
  componentName: string;
  source: "original" | "more";
}

const CATEGORY_URL_SEGMENT: Record<string, string> = {
  Premium: "premium", Agents: "premium", Buttons: "buttons", Forms: "forms",
  Navbar: "navbars", Footer: "footers", Hero: "heroes", Pricing: "pricing",
  SignIn: "sign-in", SignUp: "sign-up", ForgotPassword: "forgot-password",
  ResetPassword: "reset-password", Error404: "error-404", Error500: "error-500",
  Offline: "offline", Testimonials: "testimonials", Auth: "auth", ErrorPages: "errors",
  Features: "features", CTA: "cta", Charts: "charts", Modals: "modals",
  Sidebar: "sidebars", AI: "ai", Backgrounds: "backgrounds", Tables: "tables",
};

function publicHref(card: CardEntry): string {
  const group = CATEGORY_URL_SEGMENT[card.category] ?? "cards";
  return `/components/${group}/${card.slug.replace(/-card$/, "")}`;
}
function parseCards(): CardEntry[] {
  const cardsTs = readFileSync(CARDS_DATA, "utf-8");
  const entries: CardEntry[] = [];
  const re = /\{\s*slug:\s*"([^"]+)",\s*href:\s*"([^"]+)",\s*title:\s*"([^"]+)",\s*category:\s*"([^"]+)".*?animation:\s*"((?:\\.|[^"\\])*)",\s*source:\s*"(original|more)"\s*\}/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(cardsTs)) !== null) {
    entries.push({
      slug: match[1],
      href: match[2],
      title: match[3],
      category: match[4],
      animation: JSON.parse(`"${match[5]}"`) as string,
      componentName: "",
      source: match[6] as "original" | "more",
    });
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

function getMainFilePaths(): Record<string, string> {
  const registry = readFileSync(REGISTRY, "utf-8");
  const paths: Record<string, string> = {};
  const re = /"([^"]+)":\s*\{\s*"componentName":\s*"[^"]+",\s*"mainFile":\s*\{\s*"path":\s*"([^"]+)"/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(registry)) !== null) paths[match[1]] = match[2];
  return paths;
}

function clipDescription(value: string, maxLength = 158): string {
  if (value.length <= maxLength) return value;
  const clipped = value.slice(0, maxLength - 1);
  const lastSpace = clipped.lastIndexOf(" ");
  return `${clipped.slice(0, lastSpace > 110 ? lastSpace : clipped.length).trimEnd()}...`;
}

function writeSeoLayout(card: CardEntry, pageDir: string) {
  const canonicalPath = publicHref(card);
  const title = `${card.title} - ${card.category} React Component`;
  const description = clipDescription(
    `${card.title} is a production-ready ${card.category.toLowerCase()} React component featuring ${card.animation}. Copy, customize, and use it in Next.js projects.`,
  );
  const keywords = [
    card.title,
    `${card.category} component`,
    `${card.category} React component`,
    `${card.category} Tailwind component`,
    "React UI component",
    "Next.js component",
    "TypeScript component",
    "Tailwind CSS component",
    "Framer Motion component",
    "responsive UI component",
    "copy paste React component",
  ];
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: card.title,
    description,
    url: `https://ui.mtverse.dev${canonicalPath}`,
    programmingLanguage: ["TypeScript", "React", "CSS"],
    runtimePlatform: "Next.js",
    author: { "@type": "Organization", name: "mtverse", url: "https://www.mtverse.dev" },
  };

  const layout = `import type { Metadata } from "next";

export const metadata: Metadata = {
  title: ${JSON.stringify(title)},
  description: ${JSON.stringify(description)},
  keywords: ${JSON.stringify(keywords)},
  alternates: { canonical: ${JSON.stringify(canonicalPath)} },
  openGraph: {
    type: "website",
    url: ${JSON.stringify(canonicalPath)},
    title: ${JSON.stringify(title)},
    description: ${JSON.stringify(description)},
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: ${JSON.stringify(title)},
    description: ${JSON.stringify(description)},
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = ${JSON.stringify(structuredData, null, 2)};

export default function ComponentLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      {children}
    </>
  );
}
`;

  writeFileSync(join(pageDir, "layout.tsx"), layout, "utf-8");
}

const cards = parseCards();
const componentNames = getComponentNames();
const mainFilePaths = getMainFilePaths();

const generatedRoutes = cards.map((card) => ({ slug: card.slug, href: publicHref(card), category: card.category }));
writeFileSync(
  GENERATED_ROUTES,
  "export const generatedComponentRoutes = " + JSON.stringify(generatedRoutes, null, 2) + " as const;\n",
  "utf-8",
);

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

console.log(`Generating ${cards.length} component pages...\n`);

for (const card of cards) {
  const pageDir = join(PAGES_DIR, card.slug);
  if (!existsSync(pageDir)) mkdirSync(pageDir, { recursive: true });
  writeSeoLayout(card, pageDir);

  if (CUSTOM_SHOWCASE_SLUGS.has(card.slug)) {
    console.log(`  SKIP ${card.slug} (custom showcase)`);
    continue;
  }
  card.componentName = componentNames[card.slug] ?? "";
  if (!card.componentName) {
    console.warn(`WARN Missing component name for ${card.slug}`);
    continue;
  }

  const mainFilePath = mainFilePaths[card.slug];
  if (!mainFilePath) {
    console.warn(`WARN Missing source path for ${card.slug}`);
    continue;
  }

  const importPath = `@/${mainFilePath.replace(/^src\//, "").replace(/\.(?:tsx?|jsx?)$/, "")}`;
  const importName = card.componentName;


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
  console.log(`  OK ${card.slug} -> ${card.componentName}`);
}

console.log(`\nGenerated ${cards.length} component pages.`);
