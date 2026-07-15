"use client";
import { NavbarShowcase } from "@/components/navbar-showcase/NavbarShowcase";
import { getNavbarVariant } from "@/components/navbar-showcase/navbar-variants";
import { Navbar005Card } from "@/components/cards/more/Navbar005Card";
export default function Page() {
  return <NavbarShowcase variant={{...getNavbarVariant("navbar001-card")!, id:"navbar005", slug:"navbar005-card", name:"Navbar 005", component: Navbar005Card, accent: "#f59e0b"}} />;
}
