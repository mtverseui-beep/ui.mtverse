"use client";
import { NavbarShowcase } from "@/components/navbar-showcase/NavbarShowcase";
import { getNavbarVariant } from "@/components/navbar-showcase/navbar-variants";
import { Navbar024Card } from "@/components/cards/more/Navbar024Card";
export default function Page() {
  return <NavbarShowcase variant={{...getNavbarVariant("navbar001-card")!, id:"navbar024", slug:"navbar024-card", name:"Navbar 024", component: Navbar024Card, accent: "#6366f1"}} />;
}
