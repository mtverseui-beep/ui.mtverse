"use client";
import { HeroShowcase } from "@/components/navbar-showcase/HeroShowcase";
import { getHeroVariant } from "@/components/navbar-showcase/hero-variants";
import { Hero020Card } from "@/components/cards/more/Hero020Card";
export default function Page() {
  return <HeroShowcase variant={{...getHeroVariant("hero001-card")!, id:"hero020-card", slug:"hero020-card", name:"Hero 020", component: Hero020Card}} />;
}
