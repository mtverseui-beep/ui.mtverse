"use client";
import { NavbarShowcase } from "@/components/navbar-showcase/NavbarShowcase";
import { getNavbarVariant } from "@/components/navbar-showcase/navbar-variants";
import { Navbar009Card } from "@/components/cards/more/Navbar009Card";
export default function Page() {
  return <NavbarShowcase variant={{...getNavbarVariant("navbar001-card")!, id:"navbar009", slug:"navbar009-card", name:"Navbar 009", component: Navbar009Card, accent: "#6366f1"}} />;
}
