"use client";
import { NavbarShowcase } from "@/components/navbar-showcase/NavbarShowcase";
import { getNavbarVariant } from "@/components/navbar-showcase/navbar-variants";
import { Navbar012Card } from "@/components/cards/more/Navbar012Card";
export default function Page() {
  return <NavbarShowcase variant={{...getNavbarVariant("navbar001-card")!, id:"navbar012", slug:"navbar012-card", name:"Navbar 012", component: Navbar012Card, accent: "#6366f1"}} />;
}
