"use client";
import { HeroShowcase } from "@/components/navbar-showcase/HeroShowcase";
import { getHeroVariant } from "@/components/navbar-showcase/hero-variants";
import { Hero010Card } from "@/components/cards/more/Hero010Card";

export default function Page() {
  return (
    <HeroShowcase
      variant={{
        ...getHeroVariant("hero001-card")!,
        id: "hero010",
        slug: "hero010-card",
        name: "Hero 010",
        component: Hero010Card,
      }}
    />
  );
}
