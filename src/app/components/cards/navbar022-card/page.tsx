"use client";
import { NavbarShowcase } from "@/components/navbar-showcase/NavbarShowcase";
import { getNavbarVariant } from "@/components/navbar-showcase/navbar-variants";
import { Navbar022Card } from "@/components/cards/more/Navbar022Card";
export default function Page() {
  return <NavbarShowcase variant={{...getNavbarVariant("navbar001-card")!, id:"navbar022", slug:"navbar022-card", name:"Navbar 022", component: Navbar022Card, accent: "#e11d48"}} />;
}
