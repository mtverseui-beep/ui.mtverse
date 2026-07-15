#!/bin/bash
# Screenshot all 11 sidebars in their default state
SLUGS=(
  "aurora-sidebar"
  "glass-float-sidebar"
  "ink-dark-sidebar"
  "pastel-soft-sidebar"
  "gradient-border-sidebar"
  "aurora-bento-sidebar"
  "rail-dock-sidebar"
  "neumorphic-sidebar"
  "compact-pill-sidebar"
  "dual-panel-sidebar"
  "magnetic-sidebar"
)

mkdir -p /home/z/my-project/download/sidebar-screenshots

for slug in "${SLUGS[@]}"; do
  echo "→ Capturing $slug..."
  agent-browser open "http://localhost:3000/components/sidebars/$slug" > /dev/null 2>&1
  sleep 2
  agent-browser screenshot "/home/z/my-project/download/sidebar-screenshots/${slug}.png" > /dev/null 2>&1
  echo "  ✓ saved"
done

echo ""
echo "All screenshots saved to /home/z/my-project/download/sidebar-screenshots/"
ls -la /home/z/my-project/download/sidebar-screenshots/
