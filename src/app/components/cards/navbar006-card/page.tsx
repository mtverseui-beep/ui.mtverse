"use client";
import { NavbarShowcase } from "@/components/navbar-showcase/NavbarShowcase";
import { getNavbarVariant } from "@/components/navbar-showcase/navbar-variants";
import { Navbar006Card } from "@/components/cards/more/Navbar006Card";
export default function Page() {
  return <NavbarShowcase variant={{...getNavbarVariant("navbar001-card")!, id:"navbar006", slug:"navbar006-card", name:"Navbar 006", component: Navbar006Card, accent: "#6366f1"}} />;
}
