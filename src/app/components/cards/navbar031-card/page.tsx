"use client";
import { NavbarShowcase } from "@/components/navbar-showcase/NavbarShowcase";
import { getNavbarVariant } from "@/components/navbar-showcase/navbar-variants";
import { Navbar031Card } from "@/components/cards/more/Navbar031Card";
export default function Page() {
  return <NavbarShowcase variant={{...getNavbarVariant("navbar001-card")!, id:"navbar031", slug:"navbar031-card", name:"Navbar 031", component: Navbar031Card, accent: "#f97316"}} />;
}
