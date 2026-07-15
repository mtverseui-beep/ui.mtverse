"use client";
import { HeroShowcase } from "@/components/navbar-showcase/HeroShowcase";
import { getHeroVariant } from "@/components/navbar-showcase/hero-variants";
import { Hero013Card } from "@/components/cards/more/Hero013Card";
export default function Page() {
  return <HeroShowcase variant={{...getHeroVariant("hero001-card")!, id:"hero013-card", slug:"hero013-card", name:"Hero 013", component: Hero013Card}} />;
}
