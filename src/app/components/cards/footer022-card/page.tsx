"use client";
import { FooterShowcase } from "@/components/navbar-showcase/FooterShowcase";
import { getFooterVariant } from "@/components/navbar-showcase/footer-variants";
import { Footer022Card } from "@/components/cards/more/Footer022Card";
export default function Page() {
  return <FooterShowcase variant={{...getFooterVariant("footer001-card")!, id:"footer022", slug:"footer022-card", name:"Footer 022", component: Footer022Card}} />;
}
