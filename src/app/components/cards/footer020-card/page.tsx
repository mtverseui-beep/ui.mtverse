"use client";
import { FooterShowcase } from "@/components/navbar-showcase/FooterShowcase";
import { getFooterVariant } from "@/components/navbar-showcase/footer-variants";
import { Footer020Card } from "@/components/cards/more/Footer020Card";
export default function Page() {
  return <FooterShowcase variant={{...getFooterVariant("footer001-card")!, id:"footer020", slug:"footer020-card", name:"Footer 020", component: Footer020Card}} />;
}
