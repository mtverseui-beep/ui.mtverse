"use client";
import { NavbarShowcase } from "@/components/navbar-showcase/NavbarShowcase";
import { getNavbarVariant } from "@/components/navbar-showcase/navbar-variants";
import { Navbar014Card } from "@/components/cards/more/Navbar014Card";
export default function Page() {
  return <NavbarShowcase variant={{...getNavbarVariant("navbar001-card")!, id:"navbar014", slug:"navbar014-card", name:"Navbar 014", component: Navbar014Card, accent: "#6366f1"}} />;
}
