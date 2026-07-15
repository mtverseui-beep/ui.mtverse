"use client";
import { NavbarShowcase } from "@/components/navbar-showcase/NavbarShowcase";
import { getNavbarVariant } from "@/components/navbar-showcase/navbar-variants";
import { Navbar004Card } from "@/components/cards/more/Navbar004Card";
export default function Page() {
  return <NavbarShowcase variant={{...getNavbarVariant("navbar001-card")!, id:"navbar004", slug:"navbar004-card", name:"Navbar 004", component: Navbar004Card, accent: "#ff4d8c"}} />;
}
