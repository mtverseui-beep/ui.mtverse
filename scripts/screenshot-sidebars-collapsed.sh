#!/bin/bash
# Screenshot all sidebars collapsed using eval to find collapse button
SLUGS=(
  "gradient-border-sidebar"
  "rail-dock-sidebar"
  "magnetic-sidebar"
  "aurora-sidebar"
  "glass-float-sidebar"
  "ink-dark-sidebar"
  "pastel-soft-sidebar"
  "neumorphic-sidebar"
  "dual-panel-sidebar"
)

mkdir -p /home/z/my-project/download/sidebar-screenshots/collapsed-v2

for slug in "${SLUGS[@]}"; do
  echo "→ $slug (collapsed)..."
  agent-browser open "http://localhost:3000/components/sidebars/$slug" > /dev/null 2>&1
  sleep 2

  # Use eval to find and click the collapse button
  RESULT=$(agent-browser eval "
(() => {
  const buttons = document.querySelectorAll('button');
  for (const btn of buttons) {
    const svg = btn.querySelector('svg.lucide-chevron-left');
    if (svg && !svg.classList.contains('rotate-180') && !btn.getAttribute('aria-label')) {
      btn.click();
      return 'clicked';
    }
  }
  return 'not found';
})()
" 2>&1 | tail -1)
  
  sleep 1
  agent-browser screenshot "/home/z/my-project/download/sidebar-screenshots/collapsed-v2/${slug}.png" > /dev/null 2>&1
  echo "  ✓ saved ($RESULT)"
done

echo "Done."
