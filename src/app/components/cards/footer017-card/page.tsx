"use client";
import { FooterShowcase } from "@/components/navbar-showcase/FooterShowcase";
import { getFooterVariant } from "@/components/navbar-showcase/footer-variants";
import { Footer017Card } from "@/components/cards/more/Footer017Card";
export default function Page() {
  return <FooterShowcase variant={{...getFooterVariant("footer001-card")!, id:"footer017", slug:"footer017-card", name:"Footer 017", component: Footer017Card}} />;
}
