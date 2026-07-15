"use client";
import { NavbarShowcase } from "@/components/navbar-showcase/NavbarShowcase";
import { getNavbarVariant } from "@/components/navbar-showcase/navbar-variants";
import { Navbar002Card } from "@/components/cards/more/Navbar002Card";
export default function Page() {
  return <NavbarShowcase variant={{...getNavbarVariant("navbar001-card")!, id:"navbar002", slug:"navbar002-card", name:"Navbar 002", component: Navbar002Card, accent: "#06b6d4"}} />;
}
