"use client";
import { HeroShowcase } from "@/components/navbar-showcase/HeroShowcase";
import { getHeroVariant } from "@/components/navbar-showcase/hero-variants";
import { Hero018Card } from "@/components/cards/more/Hero018Card";
export default function Page() {
  return <HeroShowcase variant={{...getHeroVariant("hero001-card")!, id:"hero018-card", slug:"hero018-card", name:"Hero 018", component: Hero018Card}} />;
}
