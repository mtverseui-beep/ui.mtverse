"use client";
import { HeroShowcase } from "@/components/navbar-showcase/HeroShowcase";
import { getHeroVariant } from "@/components/navbar-showcase/hero-variants";
import { Hero009Card } from "@/components/cards/more/Hero009Card";

export default function Page() {
  return (
    <HeroShowcase
      variant={{
        ...getHeroVariant("hero001-card")!,
        id: "hero009",
        slug: "hero009-card",
        name: "Hero 009",
        component: Hero009Card,
      }}
    />
  );
}
