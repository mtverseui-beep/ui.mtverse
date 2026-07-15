"use client";
import { FooterShowcase } from "@/components/navbar-showcase/FooterShowcase";
import { getFooterVariant } from "@/components/navbar-showcase/footer-variants";
import { Footer007Card } from "@/components/cards/more/Footer007Card";
export default function Page() {
  return <FooterShowcase variant={{...getFooterVariant("footer001-card")!, id:"footer007", slug:"footer007-card", name:"Footer 007", component: Footer007Card}} />;
}
