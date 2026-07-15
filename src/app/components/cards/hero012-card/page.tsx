"use client";
import { HeroShowcase } from "@/components/navbar-showcase/HeroShowcase";
import { getHeroVariant } from "@/components/navbar-showcase/hero-variants";
import { Hero012Card } from "@/components/cards/more/Hero012Card";
export default function Page() {
  return <HeroShowcase variant={{...getHeroVariant("hero001-card")!, id:"hero012-card", slug:"hero012-card", name:"Hero 012", component: Hero012Card}} />;
}
