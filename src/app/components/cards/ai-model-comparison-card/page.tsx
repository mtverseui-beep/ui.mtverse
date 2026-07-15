"use client";
import { PageShowcase } from "@/components/navbar-showcase/PageShowcase";
import { ModelComparisonTable } from "@/components/cards/ai/ModelComparisonTable";

export default function Page() {
  return (
    <PageShowcase slug="ai-model-comparison-card">
      <ModelComparisonTable />
    </PageShowcase>
  );
}
