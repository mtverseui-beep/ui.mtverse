"use client";

import { Navbar001Card } from "@/components/cards/more/Navbar001Card";

// ──────────────────────────────────────────────────────────────────────────
// Navbar variant registry
// ──────────────────────────────────────────────────────────────────────────
// Each navbar variant provides metadata so the showcase knows how to render,
// scroll, and describe it. New variants are added here.

export interface NavbarVariant {
  id: string;
  slug: string;
  name: string;
  description: string;
  component: React.ComponentType<{ scrollContainerRef?: React.RefObject<HTMLElement | null> }>;
  sourceCode: string;
  dependencies: string[];
  supportsSticky: boolean;
  supportsScrollAnimation: boolean;
  supportsMegaMenu: boolean;
  supportsMobileMenu: boolean;
  preferredPreviewHeight: number; // px — minimum canvas height for scroll testing
  scrollSpaceHeight: number; // px — blank scroll space below the navbar
  accent?: string; // hex color for demo content highlights
}

export const navbarVariants: NavbarVariant[] = [
  {
    id: "navbar001",
    slug: "navbar001-card",
    name: "Navbar 001",
    description:
      "Scroll-aware floating glass pill. Transparent full-bleed bar morphs into a backdrop-blurred, bordered, rounded floating pill on scroll. Includes animated underline links, theme toggle, and a full-screen mobile drawer with staggered reveal, Escape key, outside-click close, and focus management.",
    component: Navbar001Card,
    sourceCode: "See code tab",
    dependencies: ["framer-motion", "lucide-react", "next-themes"],
    supportsSticky: true,
    supportsScrollAnimation: true,
    supportsMegaMenu: false,
    supportsMobileMenu: true,
    preferredPreviewHeight: 560,
    scrollSpaceHeight: 600,
    accent: "#6366f1",
  },
];

export function getNavbarVariant(slug: string): NavbarVariant | undefined {
  return navbarVariants.find((v) => v.slug === slug);
}
