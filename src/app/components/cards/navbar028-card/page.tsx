"use client";
import { NavbarShowcase } from "@/components/navbar-showcase/NavbarShowcase";
import { getNavbarVariant } from "@/components/navbar-showcase/navbar-variants";
import { Navbar028Card } from "@/components/cards/more/Navbar028Card";
export default function Page() {
  return <NavbarShowcase variant={{...getNavbarVariant("navbar001-card")!, id:"navbar028", slug:"navbar028-card", name:"Navbar 028", component: Navbar028Card, accent: "#059669"}} />;
}
