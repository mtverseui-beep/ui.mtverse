"use client";
import { FooterShowcase } from "@/components/navbar-showcase/FooterShowcase";
import { getFooterVariant } from "@/components/navbar-showcase/footer-variants";
import { Footer008Card } from "@/components/cards/more/Footer008Card";
export default function Page() {
  return <FooterShowcase variant={{...getFooterVariant("footer001-card")!, id:"footer008", slug:"footer008-card", name:"Footer 008", component: Footer008Card}} />;
}
