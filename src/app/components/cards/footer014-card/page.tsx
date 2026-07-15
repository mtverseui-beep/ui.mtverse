"use client";
import { FooterShowcase } from "@/components/navbar-showcase/FooterShowcase";
import { getFooterVariant } from "@/components/navbar-showcase/footer-variants";
import { Footer014Card } from "@/components/cards/more/Footer014Card";
export default function Page() {
  return <FooterShowcase variant={{...getFooterVariant("footer001-card")!, id:"footer014", slug:"footer014-card", name:"Footer 014", component: Footer014Card}} />;
}
