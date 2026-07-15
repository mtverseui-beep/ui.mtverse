"use client";
import { FooterShowcase } from "@/components/navbar-showcase/FooterShowcase";
import { getFooterVariant } from "@/components/navbar-showcase/footer-variants";
import { Footer013Card } from "@/components/cards/more/Footer013Card";
export default function Page() {
  return <FooterShowcase variant={{...getFooterVariant("footer001-card")!, id:"footer013", slug:"footer013-card", name:"Footer 013", component: Footer013Card}} />;
}
