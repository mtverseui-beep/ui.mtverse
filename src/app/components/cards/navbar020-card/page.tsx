"use client";
import { NavbarShowcase } from "@/components/navbar-showcase/NavbarShowcase";
import { getNavbarVariant } from "@/components/navbar-showcase/navbar-variants";
import { Navbar020Card } from "@/components/cards/more/Navbar020Card";
export default function Page() {
  return <NavbarShowcase variant={{...getNavbarVariant("navbar001-card")!, id:"navbar020", slug:"navbar020-card", name:"Navbar 020", component: Navbar020Card, accent: "#6366f1"}} />;
}
