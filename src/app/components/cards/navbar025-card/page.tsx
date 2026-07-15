"use client";
import { NavbarShowcase } from "@/components/navbar-showcase/NavbarShowcase";
import { getNavbarVariant } from "@/components/navbar-showcase/navbar-variants";
import { Navbar025Card } from "@/components/cards/more/Navbar025Card";
export default function Page() {
  return <NavbarShowcase variant={{...getNavbarVariant("navbar001-card")!, id:"navbar025", slug:"navbar025-card", name:"Navbar 025", component: Navbar025Card, accent: "#6366f1"}} />;
}
