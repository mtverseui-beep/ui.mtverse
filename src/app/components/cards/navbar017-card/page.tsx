"use client";
import { NavbarShowcase } from "@/components/navbar-showcase/NavbarShowcase";
import { getNavbarVariant } from "@/components/navbar-showcase/navbar-variants";
import { Navbar017Card } from "@/components/cards/more/Navbar017Card";
export default function Page() {
  return <NavbarShowcase variant={{...getNavbarVariant("navbar001-card")!, id:"navbar017", slug:"navbar017-card", name:"Navbar 017", component: Navbar017Card, accent: "#059669"}} />;
}
