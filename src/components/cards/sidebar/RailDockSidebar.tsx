"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  LayoutDashboard, FolderOpen, CheckSquare, Users, BarChart3, Settings,
  Search, Bell, Plus, Star, Clock, Archive, HelpCircle, LogOut, Command,
  Sun, Moon,
} from "lucide-react";
import { sidebarRootClassName, sidebarThemeButtonProps, useSidebarContainerWidth, useSidebarTheme } from "./shared";

const DOCK_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, color: "#6366f1" },
  { id: "projects", label: "Projects", icon: FolderOpen, color: "#8b5cf6", badge: "12" },
  { id: "tasks", label: "Tasks", icon: CheckSquare, color: "#ec4899", badge: "5" },
  { id: "team", label: "Team", icon: Users, color: "#f59e0b" },
  { id: "analytics", label: "Analytics", icon: BarChart3, color: "#10b981" },
  { id: "reports", label: "Reports", icon: Star, color: "#06b6d4" },
  { id: "activity", label: "Activity", icon: Clock, color: "#3b82f6" },
  { id: "archive", label: "Archive", icon: Archive, color: "#a855f7" },
  { id: "settings", label: "Settings", icon: Settings, color: "#64748b" },
  { id: "help", label: "Help", icon: HelpCircle, color: "#94a3b8" },
];

export function RailDockSidebar() {
  const { isDark, toggle } = useSidebarTheme(false);
  const [active, setActive] = useState("dashboard");
  const [hovered, setHovered] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const { containerRef, isNarrow } = useSidebarContainerWidth<HTMLDivElement>(560);
  const reducedMotion = Boolean(useReducedMotion());

  const filtered = DOCK_ITEMS.filter(i => i.label.toLowerCase().includes(search.toLowerCase()));

  // Theme-aware palette
  const bg = isDark
    ? "linear-gradient(180deg, #0c0c1d 0%, #131329 100%)"
    : "linear-gradient(180deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)";
  const railBg = isDark ? "rgba(15,15,25,0.7)" : "rgba(255,255,255,0.7)";
  const railBorder = isDark ? "rgba(255,255,255,0.06)" : "#e2e8f0";
  const textPrimary = isDark ? "#ffffff" : "#0f172a";
  const textMuted = isDark ? "rgba(255,255,255,0.4)" : "#94a3b8";
  const textDim = isDark ? "rgba(255,255,255,0.15)" : "#cbd5e1";
  const idleIconBg = isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.6)";
  const hoverIconBg = isDark ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.95)";
  const headerBg = isDark ? "rgba(15,15,25,0.8)" : "rgba(255,255,255,0.8)";

  return (
    <div ref={containerRef} data-theme={isDark ? "dark" : "light"} className={sidebarRootClassName(isDark, "flex h-full min-h-full w-full overflow-hidden")} style={{ background: bg }}>
      {/* Dock rail — wider to give icons breathing room */}
      <aside
        aria-label="Dock workspace sidebar"
        data-rail
        className="relative flex h-full shrink-0 flex-col items-center py-4"
        style={{
          width: isNarrow ? 72 : 96,
          background: railBg,
          backdropFilter: "blur(12px)",
          borderRight: `1px solid ${railBorder}`,
        }}
      >
        {/* Brand */}
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-400 shadow-lg shadow-indigo-500/30">
          <Command className="h-6 w-6 text-white" strokeWidth={2.2} />
        </div>

        {/* Top actions: theme + search */}
        <div className="mb-3 flex flex-col items-center gap-2">
          <button
            {...sidebarThemeButtonProps(isDark)}
            onClick={toggle}
            className="flex h-10 w-10 items-center justify-center rounded-xl transition"
            style={{ background: idleIconBg, border: `1px solid ${railBorder}`, color: textMuted }}
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            onClick={() => searchRef.current?.focus()}
            aria-label="Focus dock filter"
            className="flex h-10 w-10 items-center justify-center rounded-xl transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            style={{ background: idleIconBg, border: `1px solid ${railBorder}`, color: textMuted }}
          >
            <Search className="h-4 w-4" />
          </button>
        </div>

        {isNarrow && (
          <input
            ref={searchRef}
            aria-label="Filter dock items"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Filter"
            className="mb-3 w-14 rounded-lg border px-1.5 py-1 text-[9px] outline-none focus:ring-2 focus:ring-cyan-400"
            style={{ background: isDark ? "rgba(255,255,255,0.05)" : "#f8fafc", borderColor: railBorder, color: textPrimary }}
          />
        )}

        {/* Divider */}
        <div className="mb-3 h-px w-10" style={{ background: railBorder }} />

        {/* Dock items — each in a fixed 48x48 slot, icon scales inside */}
        <nav
          aria-label="Primary navigation"
          className="flex flex-1 flex-col items-start gap-2 overflow-y-auto overflow-x-hidden"
          style={{
            width: 200,
            marginRight: isNarrow ? -128 : -104,
            padding: `4px 0 4px ${isNarrow ? 12 : 24}px`,
            scrollbarWidth: "none",
          }}
        >
          {filtered.map((item) => {
            const isActive = active === item.id;
            const isHovered = hovered === item.id;
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="relative flex items-center justify-center"
                style={{ width: 48, height: 48, zIndex: isHovered ? 20 : 1 }}
                onMouseEnter={() => setHovered(item.id)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Active indicator — left bar, positioned at rail edge */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      layoutId="dock-active-bar"
                      className="absolute rounded-full"
                      style={{
                        left: -24,
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: 3,
                        height: 24,
                        background: item.color,
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </AnimatePresence>

                {/* Icon button — scales within the 48x48 slot */}
                <motion.button
                  aria-label={item.label}
                  aria-current={isActive ? "page" : undefined}
                  aria-describedby={isHovered ? `dock-tooltip-${item.id}` : undefined}
                  onClick={() => setActive(item.id)}
                  onFocus={() => setHovered(item.id)}
                  onBlur={() => setHovered(null)}
                  animate={{
                    scale: reducedMotion ? 1 : isHovered ? 1.15 : 1,
                  }}
                  transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 500, damping: 25 }}
                  className="relative flex items-center justify-center rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  style={{
                    width: 40,
                    height: 40,
                    background: isActive
                      ? item.color
                      : isHovered
                        ? hoverIconBg
                        : idleIconBg,
                    border: isActive ? "none" : `1px solid ${railBorder}`,
                    boxShadow: isActive
                      ? `0 6px 16px ${item.color}50`
                      : isHovered
                        ? isDark ? "0 6px 16px rgba(0,0,0,0.4)" : "0 4px 12px rgba(0,0,0,0.10)"
                        : "none",
                  }}
                >
                  <Icon
                    className="h-5 w-5"
                    strokeWidth={2.2}
                    style={{
                      color: isActive ? "#ffffff" : isHovered ? item.color : isDark ? "rgba(255,255,255,0.7)" : item.color,
                    }}
                  />
                  {item.badge && (
                    <span
                      className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[8px] font-bold text-white ring-2"
                      style={{
                        background: item.color,
                        "--tw-ring-color": isDark ? "#0f0f19" : "#ffffff",
                      } as React.CSSProperties}
                    >
                      {item.badge}
                    </span>
                  )}
                </motion.button>
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      id={`dock-tooltip-${item.id}`}
                      role="tooltip"
                      initial={reducedMotion ? false : { opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={reducedMotion ? undefined : { opacity: 0, x: -6 }}
                      className="pointer-events-none absolute left-full top-1/2 z-50 ml-3 -translate-y-1/2 whitespace-nowrap rounded-lg px-2.5 py-1.5 text-[11px] font-semibold text-white shadow-lg"
                      style={{ background: isDark ? "rgba(0,0,0,0.92)" : "rgba(15,23,42,0.92)" }}
                    >
                      {item.label}{item.badge ? ` · ${item.badge}` : ""}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        {/* Divider */}
        <div className="my-3 h-px w-10" style={{ background: railBorder }} />

        {/* Bottom actions: logout + user */}
        <div className="flex flex-col items-center gap-2">
          <button
            aria-label="Log out"
            className="flex h-10 w-10 items-center justify-center rounded-xl transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            style={{ background: idleIconBg, border: `1px solid ${railBorder}`, color: textMuted }}
          >
            <LogOut className="h-4 w-4" />
          </button>
          <button aria-label="Open Alex Morgan profile, online" className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full ring-2 transition focus-visible:outline-none focus-visible:ring-4 hover:ring-indigo-400" style={{ "--tw-ring-color": railBorder } as React.CSSProperties}>
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80"
              alt="Alex"
              className="h-full w-full object-cover"
            />
            <span aria-hidden="true" className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500" style={{ border: `2px solid ${isDark ? "#0f0f19" : "#ffffff"}` }} />
          </button>
        </div>
      </aside>

      {/* Content */}
      <div aria-hidden={isNarrow} className="flex min-w-0 flex-1 flex-col" style={{ display: isNarrow ? "none" : undefined }}>
        <header
          className="flex h-14 shrink-0 items-center gap-4 px-6 backdrop-blur"
          style={{ borderBottom: `1px solid ${railBorder}`, background: headerBg }}
        >
          <h1 className="text-[14px] font-bold capitalize" style={{ color: textPrimary }}>
            {DOCK_ITEMS.find(i => i.id === active)?.label}
          </h1>
          <div className="flex-1" />
          <input
            ref={isNarrow ? undefined : searchRef}
            aria-label="Filter dock items"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Filter dock..."
            className="rounded-lg border px-3 py-1.5 text-[11px] outline-none focus:ring-2"
            style={{ background: isDark ? "rgba(255,255,255,0.05)" : "#f8fafc", borderColor: railBorder, color: textPrimary }}
          />
          <button aria-label="Add item" className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${isDark ? "hover:bg-white/5" : "hover:bg-black/5"}`} style={{ color: textMuted }}>
            <Plus className="h-4 w-4" />
          </button>
          <button aria-label="Notifications" className={`relative flex h-8 w-8 items-center justify-center rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${isDark ? "hover:bg-white/5" : "hover:bg-black/5"}`} style={{ color: textMuted }}>
            <Bell className="h-4 w-4" />
            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-rose-500" />
          </button>
        </header>
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)", border: `1px solid ${railBorder}` }}>
              <LayoutDashboard className="h-7 w-7" strokeWidth={1.5} style={{ color: textDim }} />
            </div>
            <p className="text-[13px] font-medium" style={{ color: textMuted }}>Hover dock icons to magnify</p>
          </div>
        </div>
      </div>
    </div>
  );
}
