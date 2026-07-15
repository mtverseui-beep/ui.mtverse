"use client";
import { useState, useCallback } from "react";
import { Sun, Moon } from "lucide-react";

/**
 * Per-sidebar theme state. Each sidebar manages its own light/dark mode
 * independently so users can see both variants in the showcase.
 * Default is light unless the sidebar's name includes "dark".
 */
export function useSidebarTheme(defaultDark = false) {
  const [isDark, setIsDark] = useState(defaultDark);
  const toggle = useCallback(() => setIsDark(d => !d), []);
  return { isDark, toggle };
}

/** Small sun/moon toggle button. */
export function SidebarThemeToggle({
  isDark,
  onToggle,
  lightColor = "#64748b",
  darkColor = "rgba(255,255,255,0.5)",
}: {
  isDark: boolean;
  onToggle: () => void;
  lightColor?: string;
  darkColor?: string;
}) {
  return (
    <button
      onClick={onToggle}
      aria-label="Toggle theme"
      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition hover:bg-black/5 dark:hover:bg-white/10"
      style={{ color: isDark ? darkColor : lightColor }}
    >
      {isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
    </button>
  );
}
