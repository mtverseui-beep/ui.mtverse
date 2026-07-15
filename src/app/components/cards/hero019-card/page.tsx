"use client";
import { HeroShowcase } from "@/components/navbar-showcase/HeroShowcase";
import { getHeroVariant } from "@/components/navbar-showcase/hero-variants";
import { Hero019Card } from "@/components/cards/more/Hero019Card";
export default function Page() {
  return <HeroShowcase variant={{...getHeroVariant("hero001-card")!, id:"hero019-card", slug:"hero019-card", name:"Hero 019", component: Hero019Card}} />;
}
