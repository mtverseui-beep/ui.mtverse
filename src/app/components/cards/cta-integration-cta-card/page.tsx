"use client";
import { PageShowcase } from "@/components/navbar-showcase/PageShowcase";
import { CtaIntegrationCard } from "@/components/cards/more/CtaIntegrationCard";

export default function Page() {
  return (
    <PageShowcase slug="cta-integration-cta-card">
      <CtaIntegrationCard />
    </PageShowcase>
  );
}