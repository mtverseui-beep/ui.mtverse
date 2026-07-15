"use client";
import { NavbarShowcase } from "@/components/navbar-showcase/NavbarShowcase";
import { getNavbarVariant } from "@/components/navbar-showcase/navbar-variants";
import { Navbar008Card } from "@/components/cards/more/Navbar008Card";
export default function Page() {
  return <NavbarShowcase variant={{...getNavbarVariant("navbar001-card")!, id:"navbar008", slug:"navbar008-card", name:"Navbar 008", component: Navbar008Card, accent: "#6366f1"}} />;
}
