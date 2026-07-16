"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, FolderOpen, CheckSquare, Users, BarChart3, Settings,
  ChevronLeft, Search, Bell, Plus, Star, Clock, Archive,
  HelpCircle, LogOut, Cloud, Sun, Moon,
} from "lucide-react";
import { sidebarRootClassName, sidebarThemeButtonProps, useResponsiveSidebarCollapse, useSidebarTheme } from "./shared";

const EASE = [0.16, 1, 0.3, 1] as const;

const SECTIONS = [
  { name: "Main", color: "#8b5cf6", items: [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "projects", label: "Projects", icon: FolderOpen, badge: "12" },
    { id: "tasks", label: "Tasks", icon: CheckSquare, badge: "5" },
    { id: "team", label: "Team", icon: Users },
  ]},
  { name: "Insights", color: "#ec4899", items: [
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "reports", label: "Reports", icon: Star },
    { id: "activity", label: "Activity", icon: Clock },
  ]},
  { name: "Workspace", color: "#f59e0b", items: [
    { id: "archive", label: "Archive", icon: Archive },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "help", label: "Help", icon: HelpCircle },
  ]},
];

export function PastelSoftSidebar() {
  const { isDark, toggle } = useSidebarTheme(false);
  const { collapsed, setCollapsed, containerRef, searchInputRef, expandAndFocusSearch, reducedMotion } = useResponsiveSidebarCollapse();
  const [active, setActive] = useState("dashboard");
  const [search, setSearch] = useState("");

  // Theme-aware palette
  const appBg = isDark ? "#1a1625" : "#faf8ff";
  const sidebarBg = isDark ? "#221d33" : "#f5f3ff";
  const sidebarBorder = isDark ? "#2d2640" : "#ede9fe";
  const textPrimary = isDark ? "#ffffff" : "#5b21b6";
  const textSecondary = isDark ? "rgba(255,255,255,0.6)" : "#7c6f9e";
  const textMuted = isDark ? "rgba(255,255,255,0.4)" : "#a78bfa";
  const inputBg = isDark ? "rgba(139,92,246,0.08)" : "rgba(139,92,246,0.04)";
  const inputBorder = isDark ? "rgba(139,92,246,0.15)" : "#ede9fe";
  const hoverBg = isDark ? "rgba(139,92,246,0.08)" : "rgba(139,92,246,0.04)";
  const headerBorder = isDark ? "#2d2640" : "#ede9fe";

  return (
    <div ref={containerRef} data-theme={isDark ? "dark" : "light"} className={sidebarRootClassName(isDark, "flex h-full min-h-full w-full overflow-hidden")} style={{ background: appBg }}>
      <motion.aside
        animate={{ width: collapsed ? 72 : 260 }}
        transition={{ duration: reducedMotion ? 0 : 0.35, ease: EASE }}
        className="relative flex h-full shrink-0 flex-col m-3 rounded-3xl overflow-hidden"
        style={{ background: sidebarBg, border: `1px solid ${sidebarBorder}` }}
      >
        {/* Brand */}
        <div className="flex h-14 shrink-0 items-center gap-2.5 px-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-400 to-pink-400 shadow-md shadow-violet-300/40">
            <Cloud className="h-5 w-5 text-white" strokeWidth={2} />
          </div>
          <AnimatePresence>{!collapsed && <motion.div initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -6 }} transition={{ duration: 0.18 }}><span className="text-[14px] font-bold" style={{ color: textPrimary }}>Pastel</span><p className="text-[9px]" style={{ color: textMuted }}>Soft UI</p></motion.div>}</AnimatePresence>
          <AnimatePresence>{!collapsed && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="ml-auto flex items-center gap-1">
            <button {...sidebarThemeButtonProps(isDark)} onClick={toggle} className="flex h-7 w-7 items-center justify-center rounded-xl transition hover:bg-violet-100 dark:hover:bg-violet-900/30" style={{ color: textMuted }}>
              {isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
            </button>
            <motion.button aria-label="Collapse sidebar" aria-expanded={!collapsed} onClick={() => setCollapsed(true)} className="flex h-7 w-7 items-center justify-center rounded-xl transition hover:bg-violet-100 dark:hover:bg-violet-900/30" style={{ color: textMuted }}><ChevronLeft className="h-4 w-4" /></motion.button>
          </motion.div>}</AnimatePresence>
        </div>

        {/* Search */}
        <div className="shrink-0 px-4 pb-2">
          {!collapsed ? (
            <div className="relative">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2" style={{ color: textMuted }} />
              <input ref={searchInputRef} aria-label="Search navigation" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..."
                className="w-full rounded-full border py-2 pl-10 pr-4 text-[12px] outline-none focus:ring-2 focus:ring-violet-200"
                style={{ background: inputBg, borderColor: inputBorder, color: textPrimary }} />
            </div>
          ) : (
            <button onClick={expandAndFocusSearch} aria-label="Expand sidebar and search" className="flex h-9 w-full items-center justify-center rounded-full transition" style={{ background: inputBg, color: textMuted }}><Search className="h-4 w-4" /></button>
          )}
        </div>

        {/* Nav */}
        <nav aria-label="Primary navigation" className="flex-1 overflow-y-auto overflow-x-hidden px-3" style={{ scrollbarWidth: "none" }}>
          {SECTIONS.map(sec => {
            const items = sec.items.filter(i => i.label.toLowerCase().includes(search.toLowerCase()));
            if (items.length === 0) return null;
            return (
              <div key={sec.name} className="mb-3">
                <AnimatePresence>{!collapsed && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mb-1.5 px-3 text-[9px] font-bold uppercase tracking-wider" style={{ color: sec.color }}>{sec.name}</motion.p>}</AnimatePresence>
                <div className="space-y-1">
                  {items.map(item => {
                    const isActive = active === item.id;
                    const Icon = item.icon;
                    return (
                      <button key={item.id} aria-label={item.label} aria-current={isActive ? "page" : undefined} onClick={() => setActive(item.id)} className="group relative flex w-full items-center gap-2.5 rounded-2xl px-3 py-2.5 text-[12.5px] font-semibold outline-none transition"
                        style={{
                          color: isActive ? "#fff" : textSecondary,
                          background: isActive ? `linear-gradient(135deg, ${sec.color}, ${sec.color}dd)` : "transparent",
                          boxShadow: isActive ? `0 4px 12px ${sec.color}30` : "none",
                          justifyContent: collapsed ? "center" : "flex-start",
                        }}>
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl transition" style={{ background: isActive ? "rgba(255,255,255,0.2)" : `${sec.color}15` }}>
                          <Icon className="h-3.5 w-3.5" strokeWidth={2.2} style={{ color: isActive ? "#fff" : sec.color }} />
                        </div>
                        <AnimatePresence>{!collapsed && <motion.span initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -4 }} transition={{ duration: 0.15 }} className="flex-1 text-left">{item.label}</motion.span>}</AnimatePresence>
                        {!collapsed && item.badge && <span className="rounded-full px-2 py-0.5 text-[9px] font-bold" style={{ background: isActive ? "rgba(255,255,255,0.25)" : `${sec.color}15`, color: isActive ? "#fff" : sec.color }}>{item.badge}</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>

        {collapsed && <div className="shrink-0 flex flex-col items-center gap-2 px-2 pb-3"><button {...sidebarThemeButtonProps(isDark)} onClick={toggle} className="flex h-7 w-7 items-center justify-center rounded-xl transition hover:bg-violet-100 dark:hover:bg-violet-900/30" style={{ color: textMuted }}>{isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}</button><button aria-label="Expand sidebar" aria-expanded={!collapsed} onClick={() => setCollapsed(false)} className="flex h-9 w-full items-center justify-center rounded-full transition" style={{ background: inputBg, color: textMuted }}><ChevronLeft className="h-4 w-4 rotate-180" /></button></div>}

        {/* User */}
        <div className="shrink-0 p-2" style={{ borderTop: `1px solid ${headerBorder}` }}>
          <div className="flex items-center gap-2.5 rounded-2xl transition" style={{ background: hoverBg, justifyContent: collapsed ? "center" : "flex-start", padding: collapsed ? "0" : "0.5rem" }}>
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-pink-400 to-violet-500 text-[11px] font-bold text-white ring-2 ring-white/20">AM</div>
            <AnimatePresence>{!collapsed && <motion.div initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -4 }} transition={{ duration: 0.15 }} className="flex min-w-0 flex-1 items-center justify-between"><div><p className="truncate text-[12px] font-bold" style={{ color: textPrimary }}>Alex Morgan</p><p className="truncate text-[9px]" style={{ color: textMuted }}>alex@pastel.io</p></div><button aria-label="Log out" className="transition hover:text-rose-400" style={{ color: textMuted }}><LogOut className="h-3.5 w-3.5" /></button></motion.div>}</AnimatePresence>
          </div>
        </div>
      </motion.aside>

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col p-3">
        <header className="flex h-12 shrink-0 items-center gap-3 rounded-full px-5" style={{ background: sidebarBg, border: `1px solid ${sidebarBorder}` }}>
          <h1 className="text-[14px] font-bold capitalize" style={{ color: textPrimary }}>{SECTIONS.flatMap(s => s.items).find(i => i.id === active)?.label}</h1>
          <div className="flex-1" />
          <button aria-label="Add item" className="flex h-8 w-8 items-center justify-center rounded-full transition" style={{ background: hoverBg, color: textMuted }}><Plus className="h-4 w-4" /></button>
          <button aria-label="Notifications" className="relative flex h-8 w-8 items-center justify-center rounded-full transition" style={{ background: hoverBg, color: textMuted }}><Bell className="h-4 w-4" /><span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-pink-400" /></button>
        </header>
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center"><div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-3xl" style={{ background: hoverBg }}><LayoutDashboard className="h-7 w-7" strokeWidth={1.5} style={{ color: textMuted }} /></div><p className="text-[13px] font-semibold" style={{ color: textMuted }}>Select a menu item</p></div>
        </div>
      </div>
    </div>
  );
}
