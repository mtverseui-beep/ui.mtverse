"use client";
import { HeroShowcase } from "@/components/navbar-showcase/HeroShowcase";
import { getHeroVariant } from "@/components/navbar-showcase/hero-variants";
import { Hero015Card } from "@/components/cards/more/Hero015Card";
export default function Page() {
  return <HeroShowcase variant={{...getHeroVariant("hero001-card")!, id:"hero015-card", slug:"hero015-card", name:"Hero 015", component: Hero015Card}} />;
}
