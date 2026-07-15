"use client";
import { HeroShowcase } from "@/components/navbar-showcase/HeroShowcase";
import { getHeroVariant } from "@/components/navbar-showcase/hero-variants";
import { Hero004Card } from "@/components/cards/more/Hero004Card";

export default function Page() {
  return (
    <HeroShowcase variant={{...getHeroVariant("hero001-card")!, id:"hero004", slug:"hero004-card", name:"AI Portfolio Hero", component: Hero004Card}} />
  );
}
