"use client";
import { HeroShowcase } from "@/components/navbar-showcase/HeroShowcase";
import { getHeroVariant } from "@/components/navbar-showcase/hero-variants";
import { Hero003Card } from "@/components/cards/more/Hero003Card";

export default function Page() {
  return (
    <HeroShowcase variant={{...getHeroVariant("hero001-card")!, id:"hero003", slug:"hero003-card", name:"Ventures Hero", component: Hero003Card}} />
  );
}
