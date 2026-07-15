"use client";
import { FooterShowcase } from "@/components/navbar-showcase/FooterShowcase";
import { getFooterVariant } from "@/components/navbar-showcase/footer-variants";
import { Footer006Card } from "@/components/cards/more/Footer006Card";
export default function Page() {
  return <FooterShowcase variant={{...getFooterVariant("footer001-card")!, id:"footer006", slug:"footer006-card", name:"Footer 006", component: Footer006Card}} />;
}
