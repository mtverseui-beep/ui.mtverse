"use client";
import { NavbarShowcase } from "@/components/navbar-showcase/NavbarShowcase";
import { getNavbarVariant } from "@/components/navbar-showcase/navbar-variants";
import { Navbar019Card } from "@/components/cards/more/Navbar019Card";
export default function Page() {
  return <NavbarShowcase variant={{...getNavbarVariant("navbar001-card")!, id:"navbar019", slug:"navbar019-card", name:"Navbar 019", component: Navbar019Card, accent: "#6366f1"}} />;
}
