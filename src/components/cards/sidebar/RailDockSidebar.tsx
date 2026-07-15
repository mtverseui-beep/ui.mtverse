"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, FolderOpen, CheckSquare, Users, BarChart3, Settings,
  Search, Bell, Plus, Star, Clock, Archive, HelpCircle, LogOut, Command,
  Sun, Moon,
} from "lucide-react";
import { useSidebarTheme } from "./shared";

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
  const [hovered, setHovered] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [search, setSearch] = useState("");
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

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

  function handleHoverEnter(idx: number) {
    setHovered(idx);
    const el = itemRefs.current[idx];
    if (el) {
      const rect = el.getBoundingClientRect();
      const parentRect = el.closest("[data-rail]")?.getBoundingClientRect();
      if (parentRect) {
        setTooltipPos({ x: parentRect.right + 12, y: rect.top + rect.height / 2 });
      }
    }
  }

  return (
    <div className="flex h-full min-h-full w-full overflow-hidden" style={{ background: bg }}>
      {/* Dock rail — wider to give icons breathing room */}
      <div
        data-rail
        className="relative flex h-full shrink-0 flex-col items-center py-4"
        style={{
          width: 96,
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
            onClick={toggle}
            aria-label="Toggle theme"
            className="flex h-10 w-10 items-center justify-center rounded-xl transition"
            style={{ background: idleIconBg, border: `1px solid ${railBorder}`, color: textMuted }}
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-xl transition"
            style={{ background: idleIconBg, border: `1px solid ${railBorder}`, color: textMuted }}
          >
            <Search className="h-4 w-4" />
          </button>
        </div>

        {/* Divider */}
        <div className="mb-3 h-px w-10" style={{ background: railBorder }} />

        {/* Dock items — each in a fixed 48x48 slot, icon scales inside */}
        <div
          className="flex flex-1 flex-col items-center gap-2 overflow-y-auto"
          style={{ scrollbarWidth: "none", padding: "4px 0" }}
        >
          {filtered.map((item, i) => {
            const isActive = active === item.id;
            const isHovered = hovered === i;
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="relative flex items-center justify-center"
                style={{ width: 48, height: 48, zIndex: isHovered ? 20 : 1 }}
                onMouseEnter={() => handleHoverEnter(i)}
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
                  ref={(el) => { itemRefs.current[i] = el; }}
                  onClick={() => setActive(item.id)}
                  animate={{
                    scale: isHovered ? 1.15 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                  className="relative flex items-center justify-center rounded-2xl"
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
              </div>
            );
          })}
        </div>

        {/* Divider */}
        <div className="my-3 h-px w-10" style={{ background: railBorder }} />

        {/* Bottom actions: logout + user */}
        <div className="flex flex-col items-center gap-2">
          <button
            className="flex h-10 w-10 items-center justify-center rounded-xl transition"
            style={{ background: idleIconBg, border: `1px solid ${railBorder}`, color: textMuted }}
          >
            <LogOut className="h-4 w-4" />
          </button>
          <button className="relative flex h-10 w-10 items-center justify-center rounded-full overflow-hidden ring-2 transition hover:ring-indigo-400" style={{ "--tw-ring-color": railBorder } as React.CSSProperties}>
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80"
              alt="Alex"
              className="h-full w-full object-cover"
            />
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500" style={{ border: `2px solid ${isDark ? "#0f0f19" : "#ffffff"}` }} />
          </button>
        </div>
      </div>

      {/* Floating tooltip — rendered at root level */}
      <AnimatePresence>
        {hovered !== null && (
          <motion.div
            initial={{ opacity: 0, x: -8, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -8, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className="fixed z-50 flex items-center gap-1.5 whitespace-nowrap rounded-lg px-2.5 py-1.5 text-[11px] font-semibold text-white shadow-lg pointer-events-none"
            style={{
              background: isDark ? "rgba(0,0,0,0.92)" : "rgba(15,23,42,0.92)",
              left: tooltipPos.x,
              top: tooltipPos.y,
              transform: "translateY(-50%)",
            }}
          >
            {filtered[hovered]?.label}
            {filtered[hovered]?.badge && (
              <span className="rounded-full bg-white/20 px-1.5 py-0.5 text-[8px] font-bold">
                {filtered[hovered]?.badge}
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header
          className="flex h-14 shrink-0 items-center gap-4 px-6 backdrop-blur"
          style={{ borderBottom: `1px solid ${railBorder}`, background: headerBg }}
        >
          <h1 className="text-[14px] font-bold capitalize" style={{ color: textPrimary }}>
            {DOCK_ITEMS.find(i => i.id === active)?.label}
          </h1>
          <div className="flex-1" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Filter dock..."
            className="rounded-lg border px-3 py-1.5 text-[11px] outline-none focus:ring-2"
            style={{ background: isDark ? "rgba(255,255,255,0.05)" : "#f8fafc", borderColor: railBorder, color: textPrimary }}
          />
          <button className="flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted }}>
            <Plus className="h-4 w-4" />
          </button>
          <button className="relative flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted }}>
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
