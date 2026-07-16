"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, FolderOpen, CheckSquare, Users, BarChart3, Settings,
  ChevronLeft, Search, Bell, Plus, Star, Clock, Archive,
  HelpCircle, LogOut, Terminal, Sun, Moon,
} from "lucide-react";
import { sidebarRootClassName, sidebarThemeButtonProps, useResponsiveSidebarCollapse, useSidebarTheme } from "./shared";

const EASE = [0.16, 1, 0.3, 1] as const;

const NAV = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, section: "main" },
  { id: "projects", label: "Projects", icon: FolderOpen, section: "main" },
  { id: "tasks", label: "Tasks", icon: CheckSquare, section: "main" },
  { id: "team", label: "Team", icon: Users, section: "main" },
  { id: "analytics", label: "Analytics", icon: BarChart3, section: "insights" },
  { id: "reports", label: "Reports", icon: Star, section: "insights" },
  { id: "activity", label: "Activity", icon: Clock, section: "insights" },
  { id: "archive", label: "Archive", icon: Archive, section: "system" },
  { id: "settings", label: "Settings", icon: Settings, section: "system" },
  { id: "help", label: "Help", icon: HelpCircle, section: "system" },
];

export function InkDarkSidebar() {
  const { isDark, toggle } = useSidebarTheme(true); // default dark
  const { collapsed, setCollapsed, containerRef, searchInputRef, expandAndFocusSearch, reducedMotion } = useResponsiveSidebarCollapse();
  const [active, setActive] = useState("dashboard");
  const [search, setSearch] = useState("");

  const filtered = NAV.filter(i => i.label.toLowerCase().includes(search.toLowerCase()));
  const sections = filtered.reduce((acc, i) => { (acc[i.section] = acc[i.section] || []).push(i); return acc; }, {} as Record<string, typeof NAV>);

  // Theme-aware palette
  const bg = isDark ? "#0a0a0a" : "#ffffff";
  const sidebarBg = isDark ? "#0a0a0a" : "#fafafa";
  const border = isDark ? "#1a1a1a" : "#e5e5e5";
  const hoverBorder = isDark ? "#262626" : "#d4d4d4";
  const textPrimary = isDark ? "#ffffff" : "#0a0a0a";
  const textSecondary = isDark ? "#b3b3b3" : "#525252";
  const textMuted = isDark ? "#8a8a8a" : "#737373";
  const sectionLabel = isDark ? "#737373" : "#737373";
  const inputBg = isDark ? "#0a0a0a" : "#ffffff";
  const inputBorder = isDark ? "#1a1a1a" : "#e5e5e5";
  const activeBg = isDark ? "#141414" : "#f5f5f5";
  const accentColor = "#10b981";

  return (
    <div ref={containerRef} data-theme={isDark ? "dark" : "light"} className={sidebarRootClassName(isDark, "flex h-full min-h-full w-full overflow-hidden")} style={{ background: bg }}>
      <motion.aside
        animate={{ width: collapsed ? 56 : 240 }}
        transition={{ duration: reducedMotion ? 0 : 0.3, ease: EASE }}
        className="relative flex h-full shrink-0 flex-col"
        style={{ background: sidebarBg, boxShadow: `1px 0 0 ${border}` }}
      >
        {/* Brand */}
        <div className="flex h-14 shrink-0 items-center gap-2.5 px-4" style={{ justifyContent: collapsed ? "center" : "flex-start" }}>
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ background: `${accentColor}15` }}>
            <Terminal className="h-4 w-4" strokeWidth={2.2} style={{ color: accentColor }} />
          </div>
          <AnimatePresence>{!collapsed && <motion.span initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -6 }} transition={{ duration: 0.15 }} className="text-[13px] font-bold font-mono" style={{ color: textPrimary }}>ink</motion.span>}</AnimatePresence>
          <AnimatePresence>{!collapsed && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="ml-auto flex items-center gap-1">
            <button {...sidebarThemeButtonProps(isDark)} onClick={toggle} className="flex h-7 w-7 items-center justify-center rounded-lg transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted }}>
              {isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
            </button>
            <button aria-label="Collapse sidebar" aria-expanded={!collapsed} onClick={() => setCollapsed(true)} className="flex h-7 w-7 items-center justify-center rounded-lg transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted }}>
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
          </motion.div>}</AnimatePresence>
        </div>

        {/* Search */}
        <div className="shrink-0 px-3 pb-2">
          {!collapsed ? (
            <input ref={searchInputRef} aria-label="Search navigation" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..."
              className="w-full rounded-lg border py-1.5 px-3 text-[11px] outline-none focus:border-neutral-700"
              style={{ background: inputBg, borderColor: inputBorder, color: textSecondary }} />
          ) : (
            <button onClick={expandAndFocusSearch} aria-label="Expand sidebar and search" className="flex h-8 w-full items-center justify-center rounded-lg border transition" style={{ background: inputBg, borderColor: inputBorder, color: textMuted }}><Search className="h-3.5 w-3.5" /></button>
          )}
        </div>

        {/* Nav */}
        <nav aria-label="Primary navigation" className="flex-1 overflow-y-auto overflow-x-hidden px-2" style={{ scrollbarWidth: "none" }}>
          {Object.entries(sections).map(([section, items]) => (
            <div key={section} className="mb-3">
              <AnimatePresence>{!collapsed && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mb-1 px-2 text-[8px] font-bold uppercase tracking-[0.2em]" style={{ color: sectionLabel }}>{section}</motion.p>}</AnimatePresence>
              <div className="space-y-0.5">
                {items.map(item => {
                  const isActive = active === item.id;
                  const Icon = item.icon;
                  return (
                    <button key={item.id} aria-label={item.label} aria-current={isActive ? "page" : undefined} onClick={() => setActive(item.id)} className="group relative flex w-full items-center gap-3 rounded-lg px-2 py-2 text-[12px] font-medium outline-none transition"
                      style={{ color: isActive ? textPrimary : textSecondary, background: isActive ? activeBg : "transparent", justifyContent: collapsed ? "center" : "flex-start" }}>
                      {isActive && <motion.div layoutId="ink-active-bar" className="absolute left-0 top-1/2 h-4 w-[2px] -translate-y-1/2 rounded-full" style={{ background: accentColor }} transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
                      <Icon className="relative z-10 h-4 w-4 shrink-0" strokeWidth={1.8} style={{ color: isActive ? accentColor : textSecondary }} />
                      <AnimatePresence>{!collapsed && <motion.span initial={{ opacity: 0, x: -3 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -3 }} transition={{ duration: 0.12 }} className="relative z-10 flex-1 text-left">{item.label}</motion.span>}</AnimatePresence>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {collapsed && <div className="shrink-0 flex flex-col items-center gap-2 px-2 pb-3"><button {...sidebarThemeButtonProps(isDark)} onClick={toggle} className="flex h-7 w-7 items-center justify-center rounded-lg transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted }}>{isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}</button><button aria-label="Expand sidebar" aria-expanded={!collapsed} onClick={() => setCollapsed(false)} className="flex h-8 w-full items-center justify-center rounded-lg border transition" style={{ background: inputBg, borderColor: inputBorder, color: textMuted }}><ChevronLeft className="h-3.5 w-3.5 rotate-180" /></button></div>}

        {/* User */}
        <div className="shrink-0 p-2" style={{ borderTop: `1px solid ${border}` }}>
          <div className="flex items-center gap-2.5 rounded-lg transition" style={{ justifyContent: collapsed ? "center" : "flex-start", padding: collapsed ? "0" : "0.25rem" }}>
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80" alt="Alex Morgan" className="h-7 w-7 shrink-0 rounded-full object-cover" />
            <AnimatePresence>{!collapsed && <motion.div initial={{ opacity: 0, x: -3 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -3 }} transition={{ duration: 0.12 }} className="flex min-w-0 flex-1 items-center justify-between"><p className="truncate text-[11px] font-medium" style={{ color: textSecondary }}>Alex Morgan</p><button aria-label="Log out" className="transition hover:text-rose-500" style={{ color: textMuted }}><LogOut className="h-3.5 w-3.5" /></button></motion.div>}</AnimatePresence>
          </div>
        </div>
      </motion.aside>

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col" style={{ background: bg }}>
        <header className="flex h-14 shrink-0 items-center gap-4 px-6" style={{ borderBottom: `1px solid ${border}` }}>
          <h1 className="text-[14px] font-medium capitalize font-mono" style={{ color: textPrimary }}>{NAV.find(i => i.id === active)?.label}</h1>
          <div className="flex-1" />
          <button aria-label="Add item" className="flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted }}><Plus className="h-4 w-4" /></button>
          <button aria-label="Notifications" className="relative flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted }}><Bell className="h-4 w-4" /><span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full" style={{ background: accentColor }} /></button>
        </header>
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center"><div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-xl" style={{ background: activeBg }}><LayoutDashboard className="h-7 w-7" strokeWidth={1.5} style={{ color: textMuted }} /></div><p className="text-[13px] font-medium" style={{ color: textMuted }}>Select a menu item</p></div>
        </div>
      </div>
    </div>
  );
}
