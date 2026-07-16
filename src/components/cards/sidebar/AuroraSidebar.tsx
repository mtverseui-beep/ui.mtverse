"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, FolderOpen, CheckSquare, Users, BarChart3, Settings,
  ChevronLeft, Search, Bell, Sun, Plus, Star, Clock, Archive,
  HelpCircle, LogOut, Zap, ChevronRight, Moon,
} from "lucide-react";
import { sidebarRootClassName, sidebarThemeButtonProps, useResponsiveSidebarCollapse, useSidebarTheme } from "./shared";

const EASE = [0.16, 1, 0.3, 1] as const;

interface NavItem {
  id: string;
  label: string;
  icon: typeof LayoutDashboard;
  badge?: string;
  section: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, section: "Main" },
  { id: "projects", label: "Projects", icon: FolderOpen, badge: "12", section: "Main" },
  { id: "tasks", label: "Tasks", icon: CheckSquare, badge: "5", section: "Main" },
  { id: "team", label: "Team", icon: Users, section: "Main" },
  { id: "analytics", label: "Analytics", icon: BarChart3, section: "Insights" },
  { id: "reports", label: "Reports", icon: Star, section: "Insights" },
  { id: "activity", label: "Activity", icon: Clock, section: "Insights" },
  { id: "archive", label: "Archive", icon: Archive, section: "Workspace" },
  { id: "settings", label: "Settings", icon: Settings, section: "Workspace" },
  { id: "help", label: "Help & Support", icon: HelpCircle, section: "Workspace" },
];

export function AuroraSidebar() {
  const { isDark, toggle } = useSidebarTheme(false);
  const { collapsed, setCollapsed, containerRef, searchInputRef, expandAndFocusSearch, reducedMotion } = useResponsiveSidebarCollapse();
  const [active, setActive] = useState("dashboard");
  const [search, setSearch] = useState("");
  const [hovered, setHovered] = useState<string | null>(null);

  const filtered = NAV_ITEMS.filter(item =>
    item.label.toLowerCase().includes(search.toLowerCase())
  );

  const sections = filtered.reduce((acc, item) => {
    if (!acc[item.section]) acc[item.section] = [];
    acc[item.section].push(item);
    return acc;
  }, {} as Record<string, NavItem[]>);

  // Theme-aware palette
  const appBg = isDark ? "#0a0a0f" : "#f8fafc";
  const sidebarBg = isDark ? "#0f0f17" : "#ffffff";
  const headerBorder = isDark ? "#1a1a24" : "#f1f5f9";
  const mainBorder = isDark ? "#1a1a24" : "#e2e8f0";
  const textPrimary = isDark ? "#ffffff" : "#0f172a";
  const textSecondary = isDark ? "rgba(255,255,255,0.5)" : "#64748b";
  const textMuted = isDark ? "rgba(255,255,255,0.3)" : "#94a3b8";
  const sectionLabel = isDark ? "rgba(255,255,255,0.25)" : "#cbd5e1";
  const inputBg = isDark ? "#14141c" : "#f8fafc";
  const inputBorder = isDark ? "#1f1f2a" : "#e2e8f0";
  const hoverBg = isDark ? "rgba(255,255,255,0.04)" : "#f1f5f9";
  const activeBg = isDark ? "rgba(124,58,237,0.12)" : "rgba(124,58,237,0.08)";
  const accentColor = "#7c3aed";
  const contentBg = isDark ? "#0a0a0f" : "#f8fafc";

  return (
    <div ref={containerRef} data-theme={isDark ? "dark" : "light"} className={sidebarRootClassName(isDark, "flex h-full min-h-full w-full overflow-hidden")} style={{ background: appBg }}>
      {/* ── SIDEBAR ── */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 264 }}
        transition={{ duration: reducedMotion ? 0 : 0.35, ease: EASE }}
        className="relative flex h-full shrink-0 flex-col"
        style={{ background: sidebarBg, borderRight: `1px solid ${mainBorder}`, boxShadow: isDark ? "none" : "4px 0 24px -8px rgba(0,0,0,0.06)" }}
      >
        {/* Brand */}
        <div className="flex h-16 shrink-0 items-center gap-3 px-4" style={{ borderBottom: `1px solid ${headerBorder}` }}>
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-lg shadow-violet-500/25">
            <Zap className="h-5 w-5 text-white" strokeWidth={2.4} />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.18 }}
                className="flex flex-col leading-none"
              >
                <span className="text-[14px] font-bold" style={{ color: textPrimary }}>Aurora</span>
                <span className="mt-0.5 text-[10px]" style={{ color: textMuted }}>Workspace</span>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="ml-auto flex items-center gap-1"
              >
                <button {...sidebarThemeButtonProps(isDark)} onClick={toggle} className="flex h-7 w-7 items-center justify-center rounded-lg transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted }}>
                  {isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
                </button>
                <button
                  aria-label="Collapse sidebar" aria-expanded={!collapsed} onClick={() => setCollapsed(true)}
                  className="flex h-7 w-7 items-center justify-center rounded-lg transition hover:bg-black/5 dark:hover:bg-white/5"
                  style={{ color: textMuted }}
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Search */}
        <div className="shrink-0 p-3">
          {!collapsed ? (
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2" strokeWidth={2} style={{ color: textMuted }} />
              <input
                ref={searchInputRef}
                aria-label="Search navigation"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="w-full rounded-xl border py-2 pl-9 pr-3 text-[12px] outline-none transition focus:border-violet-300 focus:ring-2 focus:ring-violet-100"
                style={{ background: inputBg, borderColor: inputBorder, color: textPrimary }}
              />
            </div>
          ) : (
            <button onClick={expandAndFocusSearch} aria-label="Expand sidebar and search" className="flex h-9 w-full items-center justify-center rounded-xl border transition hover:bg-black/5" style={{ background: inputBg, borderColor: inputBorder, color: textMuted }}>
              <Search className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Nav */}
        <nav aria-label="Primary navigation" className="flex-1 overflow-y-auto overflow-x-hidden px-3 pb-2" style={{ scrollbarWidth: "none" }}>
          {Object.entries(sections).map(([sectionName, items]) => (
            <div key={sectionName} className="mb-3">
              <AnimatePresence>
                {!collapsed && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="mb-1 px-3 text-[9px] font-bold uppercase tracking-[0.14em]"
                    style={{ color: sectionLabel }}
                  >
                    {sectionName}
                  </motion.p>
                )}
              </AnimatePresence>
              <div className="space-y-0.5">
                {items.map((item) => {
                  const isActive = active === item.id;
                  const isHovered = hovered === item.id;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      aria-label={item.label}
                      aria-current={isActive ? "page" : undefined}
                      onClick={() => setActive(item.id)}
                      onMouseEnter={() => setHovered(item.id)}
                      onMouseLeave={() => setHovered(null)}
                      className="group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[12.5px] font-medium outline-none transition"
                      style={{ color: isActive ? accentColor : textSecondary, background: isActive ? activeBg : "transparent", justifyContent: collapsed ? "center" : "flex-start" }}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="sidebar-active-bar"
                          className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full"
                          style={{ background: accentColor }}
                          transition={{ type: "spring", stiffness: 400, damping: 32 }}
                        />
                      )}
                      {isHovered && !isActive && (
                        <motion.div
                          layoutId="sidebar-hover"
                          className="absolute inset-0 rounded-xl"
                          style={{ background: hoverBg }}
                          transition={{ type: "spring", stiffness: 400, damping: 32 }}
                        />
                      )}
                      <Icon
                        className="relative z-10 h-4 w-4 shrink-0 transition-colors"
                        strokeWidth={2}
                        style={{ color: isActive ? accentColor : textMuted }}
                      />
                      <AnimatePresence>
                        {!collapsed && (
                          <motion.span
                            initial={{ opacity: 0, x: -4 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -4 }}
                            transition={{ duration: 0.15 }}
                            className="relative z-10 flex-1 text-left"
                          >
                            {item.label}
                          </motion.span>
                        )}
                      </AnimatePresence>
                      {!collapsed && item.badge && (
                        <span
                          className="relative z-10 rounded-full px-1.5 py-0.5 text-[9px] font-bold tabular-nums"
                          style={{ background: isActive ? "rgba(124,58,237,0.12)" : hoverBg, color: isActive ? accentColor : textMuted }}
                        >
                          {item.badge}
                        </span>
                      )}
                      {!collapsed && isActive && (
                        <ChevronRight className="relative z-10 h-3 w-3 text-violet-400" strokeWidth={2.5} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Expand button + theme toggle when collapsed */}
        {collapsed && (
          <div className="shrink-0 flex flex-col items-center gap-2 px-2 pb-3">
            <button {...sidebarThemeButtonProps(isDark)} onClick={toggle} className="flex h-7 w-7 items-center justify-center rounded-lg transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted }}>
              {isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
            </button>
            <button
              aria-label="Expand sidebar" aria-expanded={!collapsed} onClick={() => setCollapsed(false)}
              className="flex h-9 w-full items-center justify-center rounded-xl border transition hover:bg-black/5 dark:hover:bg-white/5"
              style={{ background: inputBg, borderColor: inputBorder, color: textMuted }}
            >
              <ChevronLeft className="h-4 w-4 rotate-180" />
            </button>
          </div>
        )}

        {/* User profile */}
        <div className="shrink-0 p-2" style={{ borderTop: `1px solid ${headerBorder}` }}>
          <div className="flex items-center gap-3 rounded-xl transition hover:bg-black/5 dark:hover:bg-white/5" style={{ padding: collapsed ? "0" : "0.5rem", justifyContent: collapsed ? "center" : "flex-start" }}>
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-violet-500 text-[11px] font-bold text-white">
              AM
            </div>
            <AnimatePresence>
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -4 }}
                  transition={{ duration: 0.15 }}
                  className="flex min-w-0 flex-1 items-center justify-between"
                >
                  <div className="min-w-0">
                    <p className="truncate text-[12px] font-semibold" style={{ color: textPrimary }}>Alex Morgan</p>
                    <p className="truncate text-[10px]" style={{ color: textMuted }}>alex@aurora.io</p>
                  </div>
                  <button aria-label="Log out" className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition hover:bg-black/5 dark:hover:bg-white/5 hover:text-rose-500" style={{ color: textMuted }}>
                    <LogOut className="h-3.5 w-3.5" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.aside>

      {/* ── SIMPLE CONTENT AREA ── */}
      <div className="flex min-w-0 flex-1 flex-col" style={{ background: contentBg }}>
        <header className="flex h-16 shrink-0 items-center gap-4 px-6" style={{ borderBottom: `1px solid ${mainBorder}`, background: sidebarBg }}>
          <div>
            <h1 className="text-[15px] font-bold capitalize" style={{ color: textPrimary }}>
              {NAV_ITEMS.find(i => i.id === active)?.label}
            </h1>
          </div>
          <div className="flex-1" />
          <button aria-label="Add item" className="flex h-9 w-9 items-center justify-center rounded-xl transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted }}>
            <Plus className="h-4 w-4" />
          </button>
          <button aria-label="Notifications" className="relative flex h-9 w-9 items-center justify-center rounded-xl transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted }}>
            <Bell className="h-4 w-4" />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-rose-500" />
          </button>
        </header>

        <div className="flex flex-1 items-center justify-center p-8">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl" style={{ background: hoverBg }}>
              <LayoutDashboard className="h-8 w-8" strokeWidth={1.5} style={{ color: textMuted }} />
            </div>
            <p className="text-[14px] font-semibold" style={{ color: textMuted }}>Select a menu item</p>
            <p className="mt-1 text-[12px]" style={{ color: textMuted }}>Content will appear here</p>
          </div>
        </div>
      </div>
    </div>
  );
}
