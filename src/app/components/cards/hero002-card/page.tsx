"use client";
import { HeroShowcase } from "@/components/navbar-showcase/HeroShowcase";
import { getHeroVariant } from "@/components/navbar-showcase/hero-variants";
import { Hero002Card } from "@/components/cards/more/Hero002Card";

export default function Page() {
  return (
    <HeroShowcase variant={{...getHeroVariant("hero001-card")!, id:"hero002", slug:"hero002-card", name:"Centered Gradient Hero", component: Hero002Card}} />
  );
}
