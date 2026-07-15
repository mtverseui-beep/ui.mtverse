"use client";

import { HeroShowcase } from "@/components/navbar-showcase/HeroShowcase";
import { getHeroVariant } from "@/components/navbar-showcase/hero-variants";

export default function Page() {
  const variant = getHeroVariant("hero001-card");
  if (!variant) {
    return (
      <div className="flex h-full items-center justify-center cs-muted">
        Hero variant not found.
      </div>
    );
  }
  return <HeroShowcase variant={variant} />;
}
