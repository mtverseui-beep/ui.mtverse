"use client";
import { FooterShowcase } from "@/components/navbar-showcase/FooterShowcase";
import { getFooterVariant } from "@/components/navbar-showcase/footer-variants";
import { Footer004Card } from "@/components/cards/more/Footer004Card";

export default function Page() {
  return (
    <FooterShowcase
      variant={{
        ...getFooterVariant("footer001-card")!,
        id: "footer004",
        slug: "footer004-card",
        name: "Footer 004",
        component: Footer004Card,
      }}
    />
  );
}
