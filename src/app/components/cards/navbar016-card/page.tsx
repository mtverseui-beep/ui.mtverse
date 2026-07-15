"use client";
import { NavbarShowcase } from "@/components/navbar-showcase/NavbarShowcase";
import { getNavbarVariant } from "@/components/navbar-showcase/navbar-variants";
import { Navbar016Card } from "@/components/cards/more/Navbar016Card";
export default function Page() {
  return <NavbarShowcase variant={{...getNavbarVariant("navbar001-card")!, id:"navbar016", slug:"navbar016-card", name:"Navbar 016", component: Navbar016Card, accent: "#8b5cf6"}} />;
}
