"use client";
import { NavbarShowcase } from "@/components/navbar-showcase/NavbarShowcase";
import { getNavbarVariant } from "@/components/navbar-showcase/navbar-variants";
import { Navbar013Card } from "@/components/cards/more/Navbar013Card";
export default function Page() {
  return <NavbarShowcase variant={{...getNavbarVariant("navbar001-card")!, id:"navbar013", slug:"navbar013-card", name:"Navbar 013", component: Navbar013Card, accent: "#6366f1"}} />;
}
