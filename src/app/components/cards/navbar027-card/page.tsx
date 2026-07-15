"use client";
import { NavbarShowcase } from "@/components/navbar-showcase/NavbarShowcase";
import { getNavbarVariant } from "@/components/navbar-showcase/navbar-variants";
import { Navbar027Card } from "@/components/cards/more/Navbar027Card";
export default function Page() {
  return <NavbarShowcase variant={{...getNavbarVariant("navbar001-card")!, id:"navbar027", slug:"navbar027-card", name:"Navbar 027", component: Navbar027Card, accent: "#6366f1"}} />;
}
