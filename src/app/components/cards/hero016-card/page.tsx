"use client";
import { HeroShowcase } from "@/components/navbar-showcase/HeroShowcase";
import { getHeroVariant } from "@/components/navbar-showcase/hero-variants";
import { Hero016Card } from "@/components/cards/more/Hero016Card";
export default function Page() {
  return <HeroShowcase variant={{...getHeroVariant("hero001-card")!, id:"hero016-card", slug:"hero016-card", name:"Hero 016", component: Hero016Card}} />;
}
