"use client";

import { NavbarShowcase } from "@/components/navbar-showcase/NavbarShowcase";
import { getNavbarVariant } from "@/components/navbar-showcase/navbar-variants";

export default function Page() {
  const variant = getNavbarVariant("navbar001-card");
  if (!variant) {
    return (
      <div className="flex h-full items-center justify-center cs-muted">
        Navbar variant not found.
      </div>
    );
  }
  return <NavbarShowcase variant={variant} />;
}
