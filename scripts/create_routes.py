#!/usr/bin/env python3
"""Create 8 route pages for the new categories + update the skip list."""
import os
from pathlib import Path

ROOT = Path("/home/z/my-project")

# 8 new route pages: slug → component import name
ROUTES = [
    ("pricing-card", "PricingCard"),
    ("sign-in-card", "SignInCard"),
    ("sign-up-card", "SignUpCard"),
    ("forgot-password-card", "ForgotPasswordCard"),
    ("reset-password-card", "ResetPasswordCard"),
    ("error-404-card", "Error404Card"),
    ("error-500-card", "Error500Card"),
    ("offline-card", "OfflineCard"),
]

TEMPLATE = '''"use client";

import {{ PageShowcase }} from "@/components/navbar-showcase/PageShowcase";
import {{ {component} }} from "@/components/cards/more/{component}";

export default function Page() {{
  return (
    <PageShowcase slug="{slug}">
      <{component} />
    </PageShowcase>
  );
}}
'''

for slug, component in ROUTES:
    page_dir = ROOT / "src" / "app" / "components" / "cards" / slug
    page_dir.mkdir(parents=True, exist_ok=True)
    page_file = page_dir / "page.tsx"
    page_file.write_text(TEMPLATE.format(slug=slug, component=component))
    print(f"  ✓ {slug}/page.tsx → {component}")

# Update the skip list in generate-card-pages.ts
gen_script = ROOT / "scripts" / "generate-card-pages.ts"
content = gen_script.read_text()
old_skip = '''const CUSTOM_SHOWCASE_SLUGS = new Set([
  "navbar001-card",
  "footer001-card",
  "hero001-card",
]);'''
new_skip = '''const CUSTOM_SHOWCASE_SLUGS = new Set([
  "navbar001-card",
  "footer001-card",
  "hero001-card",
  "pricing-card",
  "sign-in-card",
  "sign-up-card",
  "forgot-password-card",
  "reset-password-card",
  "error-404-card",
  "error-500-card",
  "offline-card",
]);'''
if old_skip in content:
    content = content.replace(old_skip, new_skip)
    gen_script.write_text(content)
    print("\n✓ Updated skip list in generate-card-pages.ts")
else:
    print("\n⚠ Skip list pattern not found — may already be updated")

print("\nDone.")
