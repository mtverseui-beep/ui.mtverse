"use client";
import { FooterShowcase } from "@/components/navbar-showcase/FooterShowcase";
import { getFooterVariant } from "@/components/navbar-showcase/footer-variants";
import { Footer016Card } from "@/components/cards/more/Footer016Card";
export default function Page() {
  return <FooterShowcase variant={{...getFooterVariant("footer001-card")!, id:"footer016", slug:"footer016-card", name:"Footer 016", component: Footer016Card}} />;
}
