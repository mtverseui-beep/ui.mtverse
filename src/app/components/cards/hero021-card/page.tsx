"use client";
import { HeroShowcase } from "@/components/navbar-showcase/HeroShowcase";
import { getHeroVariant } from "@/components/navbar-showcase/hero-variants";
import { Hero021Card } from "@/components/cards/more/Hero021Card";
export default function Page() {
  return <HeroShowcase variant={{...getHeroVariant("hero001-card")!, id:"hero021-card", slug:"hero021-card", name:"Hero 021", component: Hero021Card}} />;
}
