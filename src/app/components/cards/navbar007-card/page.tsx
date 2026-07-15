"use client";
import { NavbarShowcase } from "@/components/navbar-showcase/NavbarShowcase";
import { getNavbarVariant } from "@/components/navbar-showcase/navbar-variants";
import { Navbar007Card } from "@/components/cards/more/Navbar007Card";
export default function Page() {
  return <NavbarShowcase variant={{...getNavbarVariant("navbar001-card")!, id:"navbar007", slug:"navbar007-card", name:"Navbar 007", component: Navbar007Card, accent: "#3b82f6"}} />;
}
