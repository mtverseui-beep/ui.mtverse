"use client";
import { NavbarShowcase } from "@/components/navbar-showcase/NavbarShowcase";
import { getNavbarVariant } from "@/components/navbar-showcase/navbar-variants";
import { Navbar018Card } from "@/components/cards/more/Navbar018Card";
export default function Page() {
  return <NavbarShowcase variant={{...getNavbarVariant("navbar001-card")!, id:"navbar018", slug:"navbar018-card", name:"Navbar 018", component: Navbar018Card, accent: "#8b5cf6"}} />;
}
