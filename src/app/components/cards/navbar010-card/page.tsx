"use client";
import { NavbarShowcase } from "@/components/navbar-showcase/NavbarShowcase";
import { getNavbarVariant } from "@/components/navbar-showcase/navbar-variants";
import { Navbar010Card } from "@/components/cards/more/Navbar010Card";
export default function Page() {
  return <NavbarShowcase variant={{...getNavbarVariant("navbar001-card")!, id:"navbar010", slug:"navbar010-card", name:"Navbar 010", component: Navbar010Card, accent: "#3b82f6"}} />;
}
