"use client";
import { HeroShowcase } from "@/components/navbar-showcase/HeroShowcase";
import { getHeroVariant } from "@/components/navbar-showcase/hero-variants";
import { Hero008Card } from "@/components/cards/more/Hero008Card";

export default function Page() {
  return (
    <HeroShowcase
      variant={{
        ...getHeroVariant("hero001-card")!,
        id: "hero008",
        slug: "hero008-card",
        name: "Hero 008",
        component: Hero008Card,
      }}
    />
  );
}
