"use client";
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  LayoutDashboard, FolderOpen, CheckSquare, Users, BarChart3, Settings,
  Search, Bell, Plus, Star, Clock, Archive, HelpCircle, Hexagon,
  Sun, Moon,
} from "lucide-react";
import { sidebarRootClassName, sidebarThemeButtonProps, useSidebarContainerWidth, useSidebarTheme } from "./shared";

const EASE = [0.16, 1, 0.3, 1] as const;

const ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, color: "#6366f1" },
  { id: "projects", label: "Projects", icon: FolderOpen, color: "#8b5cf6" },
  { id: "tasks", label: "Tasks", icon: CheckSquare, color: "#ec4899" },
  { id: "team", label: "Team", icon: Users, color: "#f59e0b" },
  { id: "analytics", label: "Analytics", icon: BarChart3, color: "#10b981" },
  { id: "reports", label: "Reports", icon: Star, color: "#06b6d4" },
  { id: "activity", label: "Activity", icon: Clock, color: "#3b82f6" },
  { id: "archive", label: "Archive", icon: Archive, color: "#a855f7" },
  { id: "settings", label: "Settings", icon: Settings, color: "#64748b" },
  { id: "help", label: "Help", icon: HelpCircle, color: "#94a3b8" },
];

export function CompactPillSidebar() {
  const { isDark, toggle } = useSidebarTheme(false);
  const [active, setActive] = useState("dashboard");
  const [hovered, setHovered] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  const { containerRef, isNarrow } = useSidebarContainerWidth<HTMLDivElement>(500);
  const reducedMotion = Boolean(useReducedMotion());

  const bg = isDark ? "#0a0a0f" : "#f8fafc";
  const railBg = isDark ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.7)";
  const textPrimary = isDark ? "#ffffff" : "#0f172a";
  const textMuted = isDark ? "rgba(255,255,255,0.5)" : "#64748b";
  const textDim = isDark ? "rgba(255,255,255,0.3)" : "#94a3b8";
  const border = isDark ? "rgba(255,255,255,0.06)" : "#e2e8f0";
  const hoverBg = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.04)";
  const idleBg = isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)";
  const contentBg = isDark ? "transparent" : "#ffffff";

  return (
    <div ref={containerRef} data-theme={isDark ? "dark" : "light"} className={sidebarRootClassName(isDark, "flex h-full min-h-full w-full overflow-hidden")} style={{ background: bg }}>
      {/* Pill rail */}
      <aside aria-label="Compact workspace sidebar" className="relative z-20 flex h-full shrink-0 flex-col items-center gap-2 overflow-visible py-4" style={{ width: isNarrow ? "100%" : 72, maxWidth: isNarrow ? 220 : undefined, background: railBg, backdropFilter: "blur(8px)", borderRight: `1px solid ${border}` }}>
        {/* Brand */}
        <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 shadow-lg shadow-indigo-500/30">
          <Hexagon className="h-5 w-5 text-white" strokeWidth={2} />
        </div>

        {/* Theme toggle */}
        <button {...sidebarThemeButtonProps(isDark)} onClick={toggle} className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${isDark ? "hover:bg-white/10" : "hover:bg-black/5"}`} style={{ color: textMuted }}>
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>

        {/* Divider */}
        <div className="mb-1 h-px w-8" style={{ background: border }} />

        {/* Pill items */}
        <nav aria-label="Primary navigation" className="flex flex-1 flex-col items-start gap-1.5 overflow-y-auto overflow-x-hidden" style={{ width: 156, marginRight: -84, paddingLeft: 14, scrollbarWidth: "none" }}>
          {ITEMS.map(item => {
            const isActive = active === item.id;
            const isDisclosed = hovered === item.id || pinned === item.id;
            const Icon = item.icon;
            return (
              <motion.button
                key={item.id}
                aria-label={item.label}
                aria-current={isActive ? "page" : undefined}
                aria-pressed={pinned === item.id}
                title={item.label}
                onClick={() => {
                  setActive(item.id);
                  setPinned(current => current === item.id ? null : item.id);
                }}
                onMouseEnter={() => setHovered(item.id)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(item.id)}
                onBlur={() => setHovered(null)}
                animate={{ width: isDisclosed ? 140 : 44, borderRadius: isDisclosed ? 22 : 14 }}
                transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 28 }}
                className="relative z-30 flex h-11 shrink-0 items-center gap-2.5 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                style={{
                  background: isActive ? item.color : isDisclosed ? hoverBg : idleBg,
                  justifyContent: "flex-start",
                  paddingLeft: 11,
                }}
              >
                <Icon className="h-5 w-5 shrink-0" strokeWidth={2.2} style={{ color: isActive ? "#fff" : isDark ? "rgba(255,255,255,0.6)" : item.color }} />
                <AnimatePresence>
                  {isDisclosed && (
                    <motion.span
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -5 }}
                      transition={reducedMotion ? { duration: 0 } : { duration: 0.15 }}
                      className="whitespace-nowrap text-[12px] font-semibold"
                      style={{ color: isActive ? "#fff" : isDark ? "rgba(255,255,255,0.9)" : "#1e293b" }}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {isActive && !isDisclosed && <motion.div layoutId="pill-active-dot" className="absolute -right-1 h-2 w-2 rounded-full bg-white" transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 30 }} />}
              </motion.button>
            );
          })}
        </nav>

        {/* User */}
        <button aria-label="Open Alex Morgan profile" className="relative h-10 w-10 overflow-hidden rounded-full ring-2 transition focus-visible:outline-none focus-visible:ring-4 hover:ring-indigo-400" style={{ "--tw-ring-color": border } as React.CSSProperties}>
          <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80" alt="Alex" className="h-full w-full object-cover" />
        </button>
      </aside>

      {/* Content */}
      <div aria-hidden={isNarrow} className="flex min-w-0 flex-1 flex-col" style={{ display: isNarrow ? "none" : undefined }}>
        <header className="flex h-14 shrink-0 items-center gap-4 px-6" style={{ borderBottom: `1px solid ${border}`, background: contentBg }}>
          <h1 className="text-[14px] font-bold capitalize" style={{ color: textPrimary }}>{ITEMS.find(i => i.id === active)?.label}</h1>
          <div className="flex-1" />
          <button aria-label="Search" className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${isDark ? "hover:bg-white/10" : "hover:bg-black/5"}`} style={{ color: textMuted }}><Search className="h-4 w-4" /></button>
          <button aria-label="Add item" className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${isDark ? "hover:bg-white/10" : "hover:bg-black/5"}`} style={{ color: textMuted }}><Plus className="h-4 w-4" /></button>
          <button aria-label="Notifications" className={`relative flex h-8 w-8 items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${isDark ? "hover:bg-white/10" : "hover:bg-black/5"}`} style={{ color: textMuted }}><Bell className="h-4 w-4" /><span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full" style={{ background: ITEMS.find(i => i.id === active)?.color }} /></button>
        </header>
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center"><div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: idleBg }}><LayoutDashboard className="h-7 w-7" strokeWidth={1.5} style={{ color: textDim }} /></div><p className="text-[13px] font-medium" style={{ color: textDim }}>Focus, hover, or tap icons to expand pills</p></div>
        </div>
      </div>
    </div>
  );
}
