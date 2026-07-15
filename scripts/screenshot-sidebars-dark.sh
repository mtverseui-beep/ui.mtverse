#!/bin/bash
# Screenshot all 11 sidebars in both light (default) and dark (toggled) modes
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

mkdir -p /home/z/my-project/download/sidebar-screenshots/dark

for slug in "${SLUGS[@]}"; do
  echo "→ $slug (dark mode)..."
  agent-browser open "http://localhost:3000/components/sidebars/$slug" > /dev/null 2>&1
  sleep 2

  # Get snapshot to find the toggle button ref
  SNAP=$(agent-browser snapshot 2>&1)

  # Find the first unnamed button ref that appears AFTER the "Aurora"/brand text
  # These are typically e53, e54 pattern (sidebar internal buttons)
  # The theme toggle is the first unnamed button in the sidebar header
  TOGGLE_REF=$(echo "$SNAP" | grep -E '^\s*- button \[ref=e[0-9]+\]$' | head -1 | grep -oE 'e[0-9]+')

  if [ -z "$TOGGLE_REF" ]; then
    echo "  ⚠ No toggle button found, trying aria-label..."
    TOGGLE_REF=$(echo "$SNAP" | grep "Toggle theme" | head -1 | grep -oE 'e[0-9]+')
  fi

  if [ -n "$TOGGLE_REF" ]; then
    echo "  Clicking @$TOGGLE_REF"
    agent-browser click "@$TOGGLE_REF" > /dev/null 2>&1
    sleep 1
    agent-browser screenshot "/home/z/my-project/download/sidebar-screenshots/dark/${slug}.png" > /dev/null 2>&1
    echo "  ✓ dark screenshot saved"
  else
    echo "  ⚠ No toggle found for $slug"
  fi
done

echo ""
echo "All dark mode screenshots saved."
ls -la /home/z/my-project/download/sidebar-screenshots/dark/
