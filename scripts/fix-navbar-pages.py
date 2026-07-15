#!/usr/bin/env python3
"""Fix all navbar page.tsx files — rewrite with correct accent colors."""

from pathlib import Path

ACCENTS = {
    "001": "#3b82f6",
    "002": "#06b6d4",
    "003": "#8b5cf6",
    "004": "#ff4d8c",
    "005": "#f59e0b",
    "006": "#6366f1",
    "007": "#3b82f6",
    "008": "#6366f1",
    "009": "#6366f1",
    "010": "#3b82f6",
    "011": "#4f46e5",
    "012": "#6366f1",
    "013": "#6366f1",
    "014": "#6366f1",
    "015": "#238636",
    "016": "#8b5cf6",
    "017": "#059669",
    "018": "#8b5cf6",
    "019": "#6366f1",
    "020": "#6366f1",
    "021": "#4f46e5",
    "022": "#e11d48",
    "023": "#6366f1",
    "024": "#6366f1",
    "025": "#6366f1",
    "026": "#7c3aed",
    "027": "#6366f1",
    "028": "#059669",
    "029": "#6366f1",
    "030": "#06b6d4",
    "031": "#f97316",
}

BASE = Path("/home/z/my-project/src/app/components/cards")

TEMPLATE = '''"use client";
import {{ NavbarShowcase }} from "@/components/navbar-showcase/NavbarShowcase";
import {{ getNavbarVariant }} from "@/components/navbar-showcase/navbar-variants";
import {{ Navbar{num}Card }} from "@/components/cards/more/Navbar{num}Card";
export default function Page() {{
  return <NavbarShowcase variant={{{{...getNavbarVariant("navbar001-card")!, id:"navbar{num}", slug:"navbar{num}-card", name:"Navbar {num}", component: Navbar{num}Card, accent: "{accent}"}}}} />;
}}
'''

# navbar001 uses navbar-variants.ts directly, not the inline pattern
for num, accent in ACCENTS.items():
    if num == "001":
        continue
    page_file = BASE / f"navbar{num}-card" / "page.tsx"
    if not page_file.exists():
        print(f"SKIP {num}: file not found")
        continue
    content = TEMPLATE.format(num=num, accent=accent)
    page_file.write_text(content)
    print(f"OK   {num}: accent={accent}")
