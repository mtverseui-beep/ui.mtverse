"use client";
import { HeroShowcase } from "@/components/navbar-showcase/HeroShowcase";
import { getHeroVariant } from "@/components/navbar-showcase/hero-variants";
import { Hero011Card } from "@/components/cards/more/Hero011Card";

export default function Page() {
  return (
    <HeroShowcase
      variant={{
        ...getHeroVariant("hero001-card")!,
        id: "hero011",
        slug: "hero011-card",
        name: "Hero 011",
        component: Hero011Card,
      }}
    />
  );
}
