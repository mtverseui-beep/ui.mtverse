"use client";
import { NavbarShowcase } from "@/components/navbar-showcase/NavbarShowcase";
import { getNavbarVariant } from "@/components/navbar-showcase/navbar-variants";
import { Navbar026Card } from "@/components/cards/more/Navbar026Card";
export default function Page() {
  return <NavbarShowcase variant={{...getNavbarVariant("navbar001-card")!, id:"navbar026", slug:"navbar026-card", name:"Navbar 026", component: Navbar026Card, accent: "#7c3aed"}} />;
}
