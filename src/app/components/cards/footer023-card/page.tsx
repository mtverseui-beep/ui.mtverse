"use client";
import { FooterShowcase } from "@/components/navbar-showcase/FooterShowcase";
import { getFooterVariant } from "@/components/navbar-showcase/footer-variants";
import { Footer023Card } from "@/components/cards/more/Footer023Card";
export default function Page() {
  return <FooterShowcase variant={{...getFooterVariant("footer001-card")!, id:"footer023", slug:"footer023-card", name:"Footer 023", component: Footer023Card}} />;
}
