"use client";

import { PageShowcase } from "@/components/navbar-showcase/PageShowcase";
import { TestimonialsCard } from "@/components/cards/more/TestimonialsCard";

export default function Page() {
  return (
    <PageShowcase slug="testimonials-card">
      <TestimonialsCard />
    </PageShowcase>
  );
}
