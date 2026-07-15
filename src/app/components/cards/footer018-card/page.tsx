"use client";
import { FooterShowcase } from "@/components/navbar-showcase/FooterShowcase";
import { getFooterVariant } from "@/components/navbar-showcase/footer-variants";
import { Footer018Card } from "@/components/cards/more/Footer018Card";
export default function Page() {
  return <FooterShowcase variant={{...getFooterVariant("footer001-card")!, id:"footer018", slug:"footer018-card", name:"Footer 018", component: Footer018Card}} />;
}
