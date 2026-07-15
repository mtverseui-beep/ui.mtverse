"use client";
import { NavbarShowcase } from "@/components/navbar-showcase/NavbarShowcase";
import { getNavbarVariant } from "@/components/navbar-showcase/navbar-variants";
import { Navbar023Card } from "@/components/cards/more/Navbar023Card";
export default function Page() {
  return <NavbarShowcase variant={{...getNavbarVariant("navbar001-card")!, id:"navbar023", slug:"navbar023-card", name:"Navbar 023", component: Navbar023Card, accent: "#6366f1"}} />;
}
