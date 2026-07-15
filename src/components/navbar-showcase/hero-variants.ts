"use client";

import { Hero001Card } from "@/components/cards/more/Hero001Card";

// ──────────────────────────────────────────────────────────────────────────
// Hero variant registry
// ──────────────────────────────────────────────────────────────────────────
export interface HeroVariant {
  id: string;
  slug: string;
  name: string;
  description: string;
  component: React.ComponentType;
  sourceCode: string;
  dependencies: string[];
  supportsResponsive: boolean;
  supportsAnimation: boolean;
  preferredPreviewHeight: number;
}

export const heroVariants: HeroVariant[] = [
  {
    id: "hero001",
    slug: "hero001-card",
    name: "Animated Typography Split Hero",
    description:
      "Split hero with staggered text reveal: eyebrow fades up, headline fades up with char-by-char blur reveal on the cycling word (measure/optimize/ship/scale), paragraph + trust labels + CTAs follow with delay. Right side is a static isometric bar-grid SVG (no 3D/canvas). Subtle background grid lines. Self-contained (includes font import + keyframes).",
    component: Hero001Card,
    sourceCode: "See code tab",
    dependencies: ["lucide-react"],
    supportsResponsive: true,
    supportsAnimation: true,
    preferredPreviewHeight: 600,
  },
];

export function getHeroVariant(slug: string): HeroVariant | undefined {
  return heroVariants.find((v) => v.slug === slug);
}
