"use client";
import { FooterShowcase } from "@/components/navbar-showcase/FooterShowcase";
import { getFooterVariant } from "@/components/navbar-showcase/footer-variants";
import { Footer002Card } from "@/components/cards/more/Footer002Card";

export default function Page() {
  return (
    <FooterShowcase
      variant={{
        ...getFooterVariant("footer001-card")!,
        id: "footer002",
        slug: "footer002-card",
        name: "Footer 002",
        component: Footer002Card,
      }}
    />
  );
}
