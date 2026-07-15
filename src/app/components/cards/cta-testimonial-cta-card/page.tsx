"use client";
import { PageShowcase } from "@/components/navbar-showcase/PageShowcase";
import { CtaTestimonialCard } from "@/components/cards/more/CtaTestimonialCard";

export default function Page() {
  return (
    <PageShowcase slug="cta-testimonial-cta-card">
      <CtaTestimonialCard />
    </PageShowcase>
  );
}