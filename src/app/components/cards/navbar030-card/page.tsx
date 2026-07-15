"use client";
import { NavbarShowcase } from "@/components/navbar-showcase/NavbarShowcase";
import { getNavbarVariant } from "@/components/navbar-showcase/navbar-variants";
import { Navbar030Card } from "@/components/cards/more/Navbar030Card";
export default function Page() {
  return <NavbarShowcase variant={{...getNavbarVariant("navbar001-card")!, id:"navbar030", slug:"navbar030-card", name:"Navbar 030", component: Navbar030Card, accent: "#06b6d4"}} />;
}
