"use client";
import { FooterShowcase } from "@/components/navbar-showcase/FooterShowcase";
import { getFooterVariant } from "@/components/navbar-showcase/footer-variants";
import { Footer009Card } from "@/components/cards/more/Footer009Card";
export default function Page() {
  return <FooterShowcase variant={{...getFooterVariant("footer001-card")!, id:"footer009", slug:"footer009-card", name:"Footer 009", component: Footer009Card}} />;
}
