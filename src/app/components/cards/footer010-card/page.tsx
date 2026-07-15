"use client";
import { FooterShowcase } from "@/components/navbar-showcase/FooterShowcase";
import { getFooterVariant } from "@/components/navbar-showcase/footer-variants";
import { Footer010Card } from "@/components/cards/more/Footer010Card";
export default function Page() {
  return <FooterShowcase variant={{...getFooterVariant("footer001-card")!, id:"footer010", slug:"footer010-card", name:"Footer 010", component: Footer010Card}} />;
}
