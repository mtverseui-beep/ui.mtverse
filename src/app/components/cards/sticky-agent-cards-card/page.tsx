"use client";
import { PageShowcase } from "@/components/navbar-showcase/PageShowcase";
import { StickyAgentCards } from "@/components/cards/more/StickyAgentCards";

export default function Page() {
  return (
    <PageShowcase slug="sticky-agent-cards-card">
      <StickyAgentCards />
    </PageShowcase>
  );
}
