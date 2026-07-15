"use client";
import { NavbarShowcase } from "@/components/navbar-showcase/NavbarShowcase";
import { getNavbarVariant } from "@/components/navbar-showcase/navbar-variants";
import { Navbar021Card } from "@/components/cards/more/Navbar021Card";
export default function Page() {
  return <NavbarShowcase variant={{...getNavbarVariant("navbar001-card")!, id:"navbar021", slug:"navbar021-card", name:"Navbar 021", component: Navbar021Card, accent: "#4f46e5"}} />;
}
