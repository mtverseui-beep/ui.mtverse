"use client";
import { FooterShowcase } from "@/components/navbar-showcase/FooterShowcase";
import { getFooterVariant } from "@/components/navbar-showcase/footer-variants";
import { Footer003Card } from "@/components/cards/more/Footer003Card";

export default function Page() {
  return (
    <FooterShowcase
      variant={{
        ...getFooterVariant("footer001-card")!,
        id: "footer003",
        slug: "footer003-card",
        name: "Footer 003",
        component: Footer003Card,
      }}
    />
  );
}
