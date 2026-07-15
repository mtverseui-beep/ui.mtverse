"use client";

import { FooterShowcase } from "@/components/navbar-showcase/FooterShowcase";
import { getFooterVariant } from "@/components/navbar-showcase/footer-variants";

export default function Page() {
  const variant = getFooterVariant("footer001-card");
  if (!variant) {
    return (
      <div className="flex h-full items-center justify-center cs-muted">
        Footer variant not found.
      </div>
    );
  }
  return <FooterShowcase variant={variant} />;
}
