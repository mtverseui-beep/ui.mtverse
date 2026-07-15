"use client";
import { FooterShowcase } from "@/components/navbar-showcase/FooterShowcase";
import { getFooterVariant } from "@/components/navbar-showcase/footer-variants";
import { Footer012Card } from "@/components/cards/more/Footer012Card";
export default function Page() {
  return <FooterShowcase variant={{...getFooterVariant("footer001-card")!, id:"footer012", slug:"footer012-card", name:"Footer 012", component: Footer012Card}} />;
}
