"use client";
import { HeroShowcase } from "@/components/navbar-showcase/HeroShowcase";
import { getHeroVariant } from "@/components/navbar-showcase/hero-variants";
import { Hero007Card } from "@/components/cards/more/Hero007Card";

export default function Page() {
  return (
    <HeroShowcase
      variant={{
        ...getHeroVariant("hero001-card")!,
        id: "hero007",
        slug: "hero007-card",
        name: "Hero 007",
        component: Hero007Card,
      }}
    />
  );
}
