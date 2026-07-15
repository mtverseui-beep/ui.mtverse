"use client";
import { FooterShowcase } from "@/components/navbar-showcase/FooterShowcase";
import { getFooterVariant } from "@/components/navbar-showcase/footer-variants";
import { Footer005Card } from "@/components/cards/more/Footer005Card";

export default function Page() {
  return (
    <FooterShowcase
      variant={{
        ...getFooterVariant("footer001-card")!,
        id: "footer005",
        slug: "footer005-card",
        name: "Footer 005",
        component: Footer005Card,
      }}
    />
  );
}
