"use client";
import { HeroShowcase } from "@/components/navbar-showcase/HeroShowcase";
import { getHeroVariant } from "@/components/navbar-showcase/hero-variants";
import { Hero005Card } from "@/components/cards/more/Hero005Card";

export default function Page() {
  return (
    <HeroShowcase variant={{...getHeroVariant("hero001-card")!, id:"hero005", slug:"hero005-card", name:"Hero 005", component: Hero005Card}} />
  );
}
