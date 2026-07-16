"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export const SIDEBAR_FOCUS_CLASS = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2";
export const SIDEBAR_ROOT_FOCUS_CLASS = "[&_button]:focus-visible:outline-none [&_button]:focus-visible:ring-2 [&_button]:focus-visible:ring-blue-500 [&_button]:focus-visible:ring-offset-2 [&_input]:focus-visible:outline-none [&_input]:focus-visible:ring-2 [&_input]:focus-visible:ring-blue-500";

export function sidebarRootClassName(isDark: boolean, className: string) {
  return `${isDark ? "dark" : ""} ${SIDEBAR_ROOT_FOCUS_CLASS} ${className}`;
}

export function sidebarThemeButtonProps(isDark: boolean) {
  return {
    "aria-label": isDark ? "Switch to light theme" : "Switch to dark theme",
    "aria-pressed": isDark,
  } as const;
}

/** Observe the actual preview container rather than the browser viewport. */
export function useSidebarContainerWidth<T extends HTMLElement>(breakpoint = 560) {
  const containerRef = useRef<T>(null);
  const [isNarrow, setIsNarrow] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element || typeof ResizeObserver === "undefined") return;
    const update = (width: number) => setIsNarrow(width < breakpoint);
    update(element.getBoundingClientRect().width);
    const observer = new ResizeObserver(([entry]) => update(entry.contentRect.width));
    observer.observe(element);
    return () => observer.disconnect();
  }, [breakpoint]);

  return { containerRef, isNarrow };
}

/**
 * Responsive collapse state for card previews. The server and first client render
 * stay expanded; ResizeObserver may compact the sidebar after hydration. Once a
 * user uses either collapse control their choice wins, preventing resize loops.
 */
export function useResponsiveSidebarCollapse(breakpoint = 560) {
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const focusSearchAfterExpand = useRef(false);
  const [manualCollapsed, setManualCollapsed] = useState<boolean | null>(null);
  const [responsiveCollapsed, setResponsiveCollapsed] = useState(false);
  const reducedMotion = Boolean(useReducedMotion());
  const collapsed = manualCollapsed ?? responsiveCollapsed;

  const setCollapsed = useCallback((next: boolean) => {
    setManualCollapsed(next);
  }, []);

  const expandAndFocusSearch = useCallback(() => {
    focusSearchAfterExpand.current = true;
    setCollapsed(false);
  }, [setCollapsed]);

  useEffect(() => {
    if (!focusSearchAfterExpand.current || collapsed) return;
    focusSearchAfterExpand.current = false;
    searchInputRef.current?.focus();
  }, [collapsed]);

  useEffect(() => {
    const element = containerRef.current;
    if (!element || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(([entry]) => {
      if (manualCollapsed === null) setResponsiveCollapsed(entry.contentRect.width < breakpoint);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [breakpoint, manualCollapsed]);

  return { collapsed, setCollapsed, containerRef, searchInputRef, expandAndFocusSearch, reducedMotion };
}

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
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={isDark}
      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors ${SIDEBAR_FOCUS_CLASS} ${isDark ? "hover:bg-white/10" : "hover:bg-black/5"}`}
      style={{ color: isDark ? darkColor : lightColor }}
    >
      {isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
    </button>
  );
}
