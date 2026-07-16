"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, FolderOpen, CheckSquare, Users, BarChart3, Settings,
  ChevronLeft, Search, Bell, Plus, Star, Clock, Archive,
  HelpCircle, LogOut, Zap, Sun, Moon,
} from "lucide-react";
import { sidebarRootClassName, sidebarThemeButtonProps, useResponsiveSidebarCollapse, useSidebarTheme } from "./shared";

const EASE = [0.16, 1, 0.3, 1] as const;

const NAV = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, section: "MAIN" },
  { id: "projects", label: "Projects", icon: FolderOpen, badge: "12", section: "MAIN" },
  { id: "tasks", label: "Tasks", icon: CheckSquare, badge: "5", section: "MAIN" },
  { id: "team", label: "Team", icon: Users, section: "MAIN" },
  { id: "analytics", label: "Analytics", icon: BarChart3, section: "INSIGHTS" },
  { id: "reports", label: "Reports", icon: Star, section: "INSIGHTS" },
  { id: "activity", label: "Activity", icon: Clock, section: "INSIGHTS" },
  { id: "archive", label: "Archive", icon: Archive, section: "SYSTEM" },
  { id: "settings", label: "Settings", icon: Settings, section: "SYSTEM" },
  { id: "help", label: "Help", icon: HelpCircle, section: "SYSTEM" },
];

export function CrimsonProSidebar() {
  const { isDark, toggle } = useSidebarTheme(false);
  const { collapsed, setCollapsed, containerRef, searchInputRef, expandAndFocusSearch, reducedMotion } = useResponsiveSidebarCollapse();
  const [active, setActive] = useState("dashboard");
  const [search, setSearch] = useState("");

  const filtered = NAV.filter(i => i.label.toLowerCase().includes(search.toLowerCase()));
  const sections = filtered.reduce((acc, i) => { (acc[i.section] = acc[i.section] || []).push(i); return acc; }, {} as Record<string, typeof NAV>);

  const bg = isDark ? "#0a0a0a" : "#ffffff";
  const sidebarBg = isDark ? "#111111" : "#ffffff";
  const border = isDark ? "#1f1f1f" : "#e5e5e5";
  const textPrimary = isDark ? "#ffffff" : "#0a0a0a";
  const textSecondary = isDark ? "#a3a3a3" : "#525252";
  const textMuted = isDark ? "#525252" : "#a3a3a3";
  const sectionLabel = isDark ? "#737373" : "#737373";
  const inputBg = isDark ? "#161616" : "#fafafa";
  const inputBorder = isDark ? "#262626" : "#e5e5e5";
  const hoverBg = isDark ? "#161616" : "#fafafa";
  const accent = "#dc2626";

  return (
    <div ref={containerRef} data-theme={isDark ? "dark" : "light"} className={sidebarRootClassName(isDark, "flex h-full min-h-full w-full overflow-hidden")} style={{ background: bg }}>
      <motion.aside
        animate={{ width: collapsed ? 64 : 252 }}
        transition={{ duration: reducedMotion ? 0 : 0.3, ease: EASE }}
        className="relative flex h-full shrink-0 flex-col"
        style={{ background: sidebarBg, borderRight: `2px solid ${border}` }}
      >
        {/* Brand */}
        <div className="flex h-16 shrink-0 items-center gap-3 px-5" style={{ borderBottom: `1px solid ${border}`, justifyContent: collapsed ? "center" : "flex-start" }}>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" style={{ background: accent }}>
            <Zap className="h-5 w-5 text-white" strokeWidth={2.5} />
          </div>
          <AnimatePresence>{!collapsed && <motion.div initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -6 }} transition={{ duration: 0.15 }}>
            <span className="text-[16px] font-black uppercase tracking-tight" style={{ color: textPrimary }}>Crimson</span>
            <p className="text-[9px] font-bold uppercase tracking-[0.15em]" style={{ color: accent }}>Pro Edition</p>
          </motion.div>}</AnimatePresence>
          <AnimatePresence>{!collapsed && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="ml-auto flex items-center gap-1">
            <button {...sidebarThemeButtonProps(isDark)} onClick={toggle} className="flex h-7 w-7 items-center justify-center rounded-md transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted }}>
              {isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
            </button>
            <button aria-label="Collapse sidebar" aria-expanded={!collapsed} onClick={() => setCollapsed(true)} className="flex h-7 w-7 items-center justify-center rounded-md transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted }}><ChevronLeft className="h-3.5 w-3.5" /></button>
          </motion.div>}</AnimatePresence>
        </div>

        {/* Search */}
        <div className="shrink-0 px-4 py-3">
          {!collapsed ? (
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: textMuted }} />
              <input ref={searchInputRef} aria-label="Search navigation" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..."
                className="w-full rounded-md border py-2 pl-10 pr-3 text-[12px] font-medium outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500/20"
                style={{ background: inputBg, borderColor: inputBorder, color: textPrimary }} />
            </div>
          ) : (
            <button onClick={expandAndFocusSearch} aria-label="Expand sidebar and search" className="flex h-9 w-full items-center justify-center rounded-md border transition" style={{ background: inputBg, borderColor: inputBorder, color: textMuted }}><Search className="h-4 w-4" /></button>
          )}
        </div>

        {/* Nav */}
        <nav aria-label="Primary navigation" className="flex-1 overflow-y-auto overflow-x-hidden px-3" style={{ scrollbarWidth: "none" }}>
          {Object.entries(sections).map(([section, items]) => (
            <div key={section} className="mb-4">
              <AnimatePresence>{!collapsed && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mb-2 px-2 text-[10px] font-black uppercase tracking-[0.18em]" style={{ color: sectionLabel }}>{section}</motion.p>}</AnimatePresence>
              <div className="space-y-1">
                {items.map(item => {
                  const isActive = active === item.id;
                  const Icon = item.icon;
                  return (
                    <button key={item.id} aria-label={item.label} aria-current={isActive ? "page" : undefined} onClick={() => setActive(item.id)} className="group relative flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-[13px] font-bold outline-none transition"
                      style={{ color: isActive ? accent : textSecondary, background: isActive ? `${accent}0d` : "transparent", justifyContent: collapsed ? "center" : "flex-start" }}>
                      {isActive && <motion.div layoutId="crimson-active-bar" className="absolute left-0 top-0 h-full w-1 rounded-r-full" style={{ background: accent }} transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
                      <Icon className="relative z-10 h-4 w-4 shrink-0" strokeWidth={2.2} style={{ color: isActive ? accent : textMuted }} />
                      <AnimatePresence>{!collapsed && <motion.span initial={{ opacity: 0, x: -3 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -3 }} transition={{ duration: 0.12 }} className="relative z-10 flex-1 text-left uppercase tracking-wide">{item.label}</motion.span>}</AnimatePresence>
                      {!collapsed && item.badge && <span className="relative z-10 rounded px-1.5 py-0.5 text-[9px] font-black" style={{ background: accent, color: "#fff" }}>{item.badge}</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {collapsed && <div className="shrink-0 flex flex-col items-center gap-2 px-2 pb-3"><button {...sidebarThemeButtonProps(isDark)} onClick={toggle} className="flex h-7 w-7 items-center justify-center rounded-md transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted }}>{isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}</button><button aria-label="Expand sidebar" aria-expanded={!collapsed} onClick={() => setCollapsed(false)} className="flex h-9 w-full items-center justify-center rounded-md border transition" style={{ background: inputBg, borderColor: inputBorder, color: textMuted }}><ChevronLeft className="h-4 w-4 rotate-180" /></button></div>}

        {/* User */}
        <div className="shrink-0 p-3" style={{ borderTop: `1px solid ${border}` }}>
          <div className="flex items-center gap-3 rounded-md transition" style={{ justifyContent: collapsed ? "center" : "flex-start", padding: collapsed ? "0" : "0.5rem" }}>
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80" alt="Alex" className="h-9 w-9 shrink-0 rounded-full object-cover" style={{ border: `2px solid ${accent}` }} />
            <AnimatePresence>{!collapsed && <motion.div initial={{ opacity: 0, x: -3 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -3 }} transition={{ duration: 0.12 }} className="flex min-w-0 flex-1 items-center justify-between">
              <div><p className="truncate text-[12px] font-black uppercase" style={{ color: textPrimary }}>Alex Morgan</p><p className="truncate text-[9px] font-bold uppercase tracking-wider" style={{ color: accent }}>Administrator</p></div>
              <button aria-label="Log out" className="transition hover:text-red-600" style={{ color: textMuted }}><LogOut className="h-4 w-4" /></button>
            </motion.div>}</AnimatePresence>
          </div>
        </div>
      </motion.aside>

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col" style={{ background: bg }}>
        <header className="flex h-16 shrink-0 items-center gap-4 px-6" style={{ borderBottom: `1px solid ${border}` }}>
          <h1 className="text-[16px] font-black uppercase tracking-tight" style={{ color: textPrimary }}>{NAV.find(i => i.id === active)?.label}</h1>
          <div className="flex-1" />
          <button aria-label="Add item" className="flex h-9 w-9 items-center justify-center rounded-md transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted }}><Plus className="h-4 w-4" /></button>
          <button aria-label="Notifications" className="relative flex h-9 w-9 items-center justify-center rounded-md transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted }}><Bell className="h-4 w-4" /><span className="absolute right-2 top-2 h-2 w-2 rounded-full" style={{ background: accent }} /></button>
        </header>
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center"><div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-lg" style={{ background: hoverBg, border: `1px solid ${border}` }}><LayoutDashboard className="h-7 w-7" strokeWidth={1.5} style={{ color: textMuted }} /></div><p className="text-[14px] font-bold uppercase tracking-wide" style={{ color: textMuted }}>Select a menu item</p></div>
        </div>
      </div>
    </div>
  );
}
