"use client";
import { FooterShowcase } from "@/components/navbar-showcase/FooterShowcase";
import { getFooterVariant } from "@/components/navbar-showcase/footer-variants";
import { Footer019Card } from "@/components/cards/more/Footer019Card";
export default function Page() {
  return <FooterShowcase variant={{...getFooterVariant("footer001-card")!, id:"footer019", slug:"footer019-card", name:"Footer 019", component: Footer019Card}} />;
}
