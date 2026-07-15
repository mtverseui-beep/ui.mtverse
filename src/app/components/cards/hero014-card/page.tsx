"use client";
import { HeroShowcase } from "@/components/navbar-showcase/HeroShowcase";
import { getHeroVariant } from "@/components/navbar-showcase/hero-variants";
import { Hero014Card } from "@/components/cards/more/Hero014Card";
export default function Page() {
  return <HeroShowcase variant={{...getHeroVariant("hero001-card")!, id:"hero014-card", slug:"hero014-card", name:"Hero 014", component: Hero014Card}} />;
}
