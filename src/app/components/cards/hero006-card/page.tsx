"use client";
import { HeroShowcase } from "@/components/navbar-showcase/HeroShowcase";
import { getHeroVariant } from "@/components/navbar-showcase/hero-variants";
import { Hero006Card } from "@/components/cards/more/Hero006Card";

export default function Page() {
  return (
    <HeroShowcase variant={{...getHeroVariant("hero001-card")!, id:"hero006", slug:"hero006-card", name:"Hero 006", component: Hero006Card}} />
  );
}
