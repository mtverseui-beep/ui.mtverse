"use client";
import { NavbarShowcase } from "@/components/navbar-showcase/NavbarShowcase";
import { getNavbarVariant } from "@/components/navbar-showcase/navbar-variants";
import { Navbar015Card } from "@/components/cards/more/Navbar015Card";
export default function Page() {
  return <NavbarShowcase variant={{...getNavbarVariant("navbar001-card")!, id:"navbar015", slug:"navbar015-card", name:"Navbar 015", component: Navbar015Card, accent: "#238636"}} />;
}
