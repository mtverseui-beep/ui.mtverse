"use client";
import { FooterShowcase } from "@/components/navbar-showcase/FooterShowcase";
import { getFooterVariant } from "@/components/navbar-showcase/footer-variants";
import { Footer015Card } from "@/components/cards/more/Footer015Card";
export default function Page() {
  return <FooterShowcase variant={{...getFooterVariant("footer001-card")!, id:"footer015", slug:"footer015-card", name:"Footer 015", component: Footer015Card}} />;
}
