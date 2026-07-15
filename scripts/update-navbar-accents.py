#!/usr/bin/env python3
"""Update all navbar page.tsx files to include the correct accent color."""

import re
from pathlib import Path

# Map of navbar number → accent color (from cards.ts)
ACCENTS = {
    "001": "#3b82f6",
    "002": "#06b6d4",
    "003": "#8b5cf6",
    "004": "#ff4d8c",
    "005": "#92400e",
    "006": "#6366f1",
    "007": "#3b82f6",
    "008": "#1d1d1f",
    "009": "#37352f",
    "010": "#000000",
    "011": "#4f46e5",
    "012": "#0f172a",
    "013": "#6366f1",
    "014": "#0f172a",
    "015": "#238636",
    "016": "#1a1a1a",
    "017": "#059669",
    "018": "#1a1a1a",
    "019": "#0f172a",
    "020": "#0f172a",
    "021": "#4f46e5",
    "022": "#e11d48",
    "023": "#0f172a",
    "024": "#0f172a",
    "025": "#0f172a",
    "026": "#7c3aed",
    "027": "#6366f1",
    "028": "#059669",
    "029": "#0f172a",
    "030": "#06b6d4",
    "031": "#f97316",
}

# For dark accents like #000000, #1a1a1a, #0f172a, #1d1d1f, #37352f — use a brighter
# accent for the demo content so it's visible on white backgrounds
DEMO_ACCENT_OVERRIDE = {
    "000000": "#3b82f6",  # pure black → blue
    "1a1a1a": "#8b5cf6",  # near black → violet
    "0f172a": "#6366f1",  # slate-900 → indigo
    "1d1d1f": "#6366f1",  # apple dark → indigo
    "37352f": "#6366f1",  # notion dark → indigo
    "92400e": "#f59e0b",  # amber-800 → amber-500
}

BASE = Path("/home/z/my-project/src/app/components/cards")

for num, accent in ACCENTS.items():
    page_dir = BASE / f"navbar{num}-card"
    page_file = page_dir / "page.tsx"
    if not page_file.exists():
        print(f"SKIP {num}: file not found")
        continue

    content = page_file.read_text()

    # Skip if already has accent
    if "accent:" in content:
        print(f"SKIP {num}: already has accent")
        continue

    # Determine the demo accent color
    hex_part = accent.lstrip("#").lower()
    demo_accent = DEMO_ACCENT_OVERRIDE.get(hex_part, accent)

    # Pattern: add accent after component: NavbarXXXCard}
    # Match the closing of the spread object — look for `component: NavbarXXXCard}}` or `component: NavbarXXXCard }`
    # and add accent before the final }

    # More robust: find `component: NavbarXXXCard` followed by optional whitespace and `}`
    pattern = rf"(component:\s*Navbar{num}Card\s*)\}}"
    replacement = rf"\1, accent: \"{demo_accent}\"}}"

    new_content = re.sub(pattern, replacement, content)

    if new_content == content:
        print(f"WARN {num}: pattern not matched, trying alternate")
        # Try without the number suffix
        pattern2 = r"(component:\s*Navbar\d+Card\s*)\}"
        # Find what number is actually in the file
        m = re.search(r"component:\s*(Navbar\d+Card)", content)
        if m:
            actual_component = m.group(1)
            pattern2 = rf"(component:\s*{re.escape(actual_component)}\s*)\}}"
            replacement2 = rf"\1, accent: \"{demo_accent}\"}}"
            new_content = re.sub(pattern2, replacement2, content)

    if new_content != content:
        page_file.write_text(new_content)
        print(f"OK   {num}: accent={demo_accent}")
    else:
        print(f"FAIL {num}: could not insert accent")
