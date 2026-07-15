"use client";
import { PageShowcase } from "@/components/navbar-showcase/PageShowcase";
import { FragranceProductGrid } from "@/components/cards/more/FragranceProductGrid";

export default function Page() {
  return (
    <PageShowcase slug="fragrance-product-grid-card">
      <FragranceProductGrid />
    </PageShowcase>
  );
}
