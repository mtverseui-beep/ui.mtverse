"use client";
import { FooterShowcase } from "@/components/navbar-showcase/FooterShowcase";
import { getFooterVariant } from "@/components/navbar-showcase/footer-variants";
import { Footer021Card } from "@/components/cards/more/Footer021Card";
export default function Page() {
  return <FooterShowcase variant={{...getFooterVariant("footer001-card")!, id:"footer021", slug:"footer021-card", name:"Footer 021", component: Footer021Card}} />;
}
