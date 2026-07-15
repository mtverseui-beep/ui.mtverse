"use client";
import { NavbarShowcase } from "@/components/navbar-showcase/NavbarShowcase";
import { getNavbarVariant } from "@/components/navbar-showcase/navbar-variants";
import { Navbar003Card } from "@/components/cards/more/Navbar003Card";
export default function Page() {
  return <NavbarShowcase variant={{...getNavbarVariant("navbar001-card")!, id:"navbar003", slug:"navbar003-card", name:"Navbar 003", component: Navbar003Card, accent: "#8b5cf6"}} />;
}
