"use client";
import { NavbarShowcase } from "@/components/navbar-showcase/NavbarShowcase";
import { getNavbarVariant } from "@/components/navbar-showcase/navbar-variants";
import { Navbar011Card } from "@/components/cards/more/Navbar011Card";
export default function Page() {
  return <NavbarShowcase variant={{...getNavbarVariant("navbar001-card")!, id:"navbar011", slug:"navbar011-card", name:"Navbar 011", component: Navbar011Card, accent: "#4f46e5"}} />;
}
