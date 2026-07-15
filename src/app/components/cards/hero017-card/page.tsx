"use client";
import { HeroShowcase } from "@/components/navbar-showcase/HeroShowcase";
import { getHeroVariant } from "@/components/navbar-showcase/hero-variants";
import { Hero017Card } from "@/components/cards/more/Hero017Card";
export default function Page() {
  return <HeroShowcase variant={{...getHeroVariant("hero001-card")!, id:"hero017-card", slug:"hero017-card", name:"Hero 017", component: Hero017Card}} />;
}
