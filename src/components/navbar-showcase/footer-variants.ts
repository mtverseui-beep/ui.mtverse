"use client";

import { Footer001Card } from "@/components/cards/more/Footer001Card";

// ──────────────────────────────────────────────────────────────────────────
// Footer variant registry
// ──────────────────────────────────────────────────────────────────────────
// Each footer variant provides metadata so the showcase knows how to render
// and describe it. New variants are added here.

export interface FooterVariant {
  id: string;
  slug: string;
  name: string;
  description: string;
  component: React.ComponentType<{ scrollContainerRef?: React.RefObject<HTMLElement | null> }>;
  sourceCode: string;
  dependencies: string[];
  supportsResponsive: boolean;
  supportsDarkMode: boolean;
  preferredPreviewHeight: number;
}

export const footerVariants: FooterVariant[] = [
  {
    id: "footer001",
    slug: "footer001-card",
    name: "Footer 001",
    description:
      "Marketing footer with 6-column grid (brand + 4 nav columns), social links with hover arrow reveal, animated system-status pill, and dot-grid background. Brand: Northwind (compass glyph) — distinct from the PagePulse navbar brand.",
    component: Footer001Card,
    sourceCode: "See code tab",
    dependencies: ["lucide-react"],
    supportsResponsive: true,
    supportsDarkMode: true,
    preferredPreviewHeight: 560,
  },
];

export function getFooterVariant(slug: string): FooterVariant | undefined {
  return footerVariants.find((v) => v.slug === slug);
}
