"use client";
import { FooterShowcase } from "@/components/navbar-showcase/FooterShowcase";
import { getFooterVariant } from "@/components/navbar-showcase/footer-variants";
import { Footer011Card } from "@/components/cards/more/Footer011Card";
export default function Page() {
  return <FooterShowcase variant={{...getFooterVariant("footer001-card")!, id:"footer011", slug:"footer011-card", name:"Footer 011", component: Footer011Card}} />;
}
