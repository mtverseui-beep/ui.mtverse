"use client";
import { PageShowcase } from "@/components/navbar-showcase/PageShowcase";
import { Auth001Card } from "@/components/cards/more/Auth001Card";

export default function Page() {
  return (
    <PageShowcase slug="auth001-card">
      <Auth001Card />
    </PageShowcase>
  );
}
