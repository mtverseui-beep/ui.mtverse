import { CardShowcase } from "./CardShowcase";
import { codeRegistry } from "./code-registry";
import type { CodeEntryMetadata } from "./code-types";

interface CardPageProps {
  slug: string;
  children: React.ReactNode;
}

export function CardPage({ slug, children }: CardPageProps) {
  const codeEntry = codeRegistry[slug];
  const codeMetadata: CodeEntryMetadata | undefined = codeEntry
    ? {
        componentName: codeEntry.componentName,
        npmPackages: codeEntry.npmPackages,
        dependencies: codeEntry.dependencies.map(({ label }) => ({ path: label, label })),
      }
    : undefined;

  return <CardShowcase codeMetadata={codeMetadata} slug={slug}>{children}</CardShowcase>;
}