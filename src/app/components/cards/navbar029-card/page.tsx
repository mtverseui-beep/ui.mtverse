"use client";
import { NavbarShowcase } from "@/components/navbar-showcase/NavbarShowcase";
import { getNavbarVariant } from "@/components/navbar-showcase/navbar-variants";
import { Navbar029Card } from "@/components/cards/more/Navbar029Card";
export default function Page() {
  return <NavbarShowcase variant={{...getNavbarVariant("navbar001-card")!, id:"navbar029", slug:"navbar029-card", name:"Navbar 029", component: Navbar029Card, accent: "#6366f1"}} />;
}
