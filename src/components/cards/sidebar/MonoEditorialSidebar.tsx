"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, FolderOpen, CheckSquare, Users, BarChart3, Settings,
  ChevronLeft, Search, Bell, Plus, Star, Clock, Archive,
  HelpCircle, LogOut, Newspaper, Sun, Moon,
} from "lucide-react";
import { sidebarRootClassName, sidebarThemeButtonProps, useResponsiveSidebarCollapse, useSidebarTheme } from "./shared";

const EASE = [0.16, 1, 0.3, 1] as const;

const NAV = [
  { id: "dashboard", label: "Front Page", icon: LayoutDashboard, section: "Section A" },
  { id: "projects", label: "Features", icon: FolderOpen, badge: "12", section: "Section A" },
  { id: "tasks", label: "Editorial", icon: CheckSquare, badge: "5", section: "Section A" },
  { id: "team", label: "Staff", icon: Users, section: "Section A" },
  { id: "analytics", label: "Readership", icon: BarChart3, section: "Section B" },
  { id: "reports", label: "Archives", icon: Star, section: "Section B" },
  { id: "activity", label: "Press Run", icon: Clock, section: "Section B" },
  { id: "archive", label: "Morgue", icon: Archive, section: "Section C" },
  { id: "settings", label: "Settings", icon: Settings, section: "Section C" },
  { id: "help", label: "Style Guide", icon: HelpCircle, section: "Section C" },
];

export function MonoEditorialSidebar() {
  const { isDark, toggle } = useSidebarTheme(false);
  const { collapsed, setCollapsed, containerRef, searchInputRef, expandAndFocusSearch, reducedMotion } = useResponsiveSidebarCollapse();
  const [active, setActive] = useState("dashboard");
  const [search, setSearch] = useState("");

  const filtered = NAV.filter(i => i.label.toLowerCase().includes(search.toLowerCase()));
  const sections = filtered.reduce((acc, i) => { (acc[i.section] = acc[i.section] || []).push(i); return acc; }, {} as Record<string, typeof NAV>);

  // Pure mono — black and white only
  const bg = isDark ? "#0a0a0a" : "#ffffff";
  const sidebarBg = isDark ? "#0f0f0f" : "#ffffff";
  const border = isDark ? "#1f1f1f" : "#000000";
  const textPrimary = isDark ? "#ffffff" : "#000000";
  const textSecondary = isDark ? "#a3a3a3" : "#525252";
  const textMuted = isDark ? "#525252" : "#a3a3a3";
  const sectionLabel = isDark ? "#737373" : "#737373";
  const inputBg = isDark ? "#141414" : "#fafafa";
  const inputBorder = isDark ? "#262626" : "#e5e5e5";
  const hoverBg = isDark ? "#1a1a1a" : "#f5f5f5";

  return (
    <div ref={containerRef} data-theme={isDark ? "dark" : "light"} className={sidebarRootClassName(isDark, "flex h-full min-h-full w-full overflow-hidden")} style={{ background: bg, fontFamily: "Georgia, 'Times New Roman', serif" }}>
      <motion.aside
        animate={{ width: collapsed ? 60 : 248 }}
        transition={{ duration: reducedMotion ? 0 : 0.3, ease: EASE }}
        className="relative flex h-full shrink-0 flex-col"
        style={{ background: sidebarBg, borderRight: `2px solid ${border}` }}
      >
        {/* Masthead */}
        <div className="flex h-16 shrink-0 items-center gap-2.5 px-4" style={{ borderBottom: `2px solid ${border}`, justifyContent: collapsed ? "center" : "flex-start" }}>
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-none" style={{ background: textPrimary, border: `2px solid ${textPrimary}` }}>
            <Newspaper className="h-5 w-5" strokeWidth={2} style={{ color: bg }} />
          </div>
          <AnimatePresence>{!collapsed && <motion.div initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -6 }} transition={{ duration: 0.15 }}>
            <span className="text-[18px] font-black tracking-tight" style={{ color: textPrimary, fontFamily: "Georgia, serif" }}>The Daily</span>
            <p className="text-[8px] font-bold uppercase tracking-[0.3em]" style={{ color: textSecondary }}>Vol. MMXXVI</p>
          </motion.div>}</AnimatePresence>
          <AnimatePresence>{!collapsed && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="ml-auto flex items-center gap-1">
            <button {...sidebarThemeButtonProps(isDark)} onClick={toggle} className="flex h-7 w-7 items-center justify-center rounded-none transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted, border: `1px solid ${inputBorder}` }}>
              {isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
            </button>
            <button aria-label="Collapse sidebar" aria-expanded={!collapsed} onClick={() => setCollapsed(true)} className="flex h-7 w-7 items-center justify-center rounded-none transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted, border: `1px solid ${inputBorder}` }}><ChevronLeft className="h-3.5 w-3.5" /></button>
          </motion.div>}</AnimatePresence>
        </div>

        {/* Search */}
        <div className="shrink-0 px-4 py-3">
          {!collapsed ? (
            <div className="relative">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2" style={{ color: textMuted }} />
              <input ref={searchInputRef} aria-label="Search navigation" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search the archives..."
                className="w-full rounded-none border py-2 pl-8 pr-3 text-[12px] outline-none focus:border-black dark:focus:border-white"
                style={{ background: inputBg, borderColor: inputBorder, color: textPrimary, fontFamily: "Georgia, serif" }} />
            </div>
          ) : (
            <button onClick={expandAndFocusSearch} aria-label="Expand sidebar and search" className="flex h-8 w-full items-center justify-center rounded-none border transition" style={{ background: inputBg, borderColor: inputBorder, color: textMuted }}><Search className="h-3.5 w-3.5" /></button>
          )}
        </div>

        {/* Nav */}
        <nav aria-label="Primary navigation" className="flex-1 overflow-y-auto overflow-x-hidden px-3" style={{ scrollbarWidth: "none" }}>
          {Object.entries(sections).map(([section, items]) => (
            <div key={section} className="mb-4">
              <AnimatePresence>{!collapsed && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mb-2 flex items-center gap-2 px-2">
                <span className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: sectionLabel, fontFamily: "Georgia, serif" }}>{section}</span>
                <div className="flex-1 border-t" style={{ borderColor: inputBorder }} />
              </motion.div>}</AnimatePresence>
              <div className="space-y-0.5">
                {items.map(item => {
                  const isActive = active === item.id;
                  const Icon = item.icon;
                  return (
                    <button key={item.id} aria-label={item.label} aria-current={isActive ? "page" : undefined} onClick={() => setActive(item.id)} className="group relative flex w-full items-center gap-2.5 rounded-none px-3 py-2.5 text-[13px] font-bold outline-none transition"
                      style={{ color: isActive ? bg : textSecondary, background: isActive ? textPrimary : "transparent", justifyContent: collapsed ? "center" : "flex-start" }}>
                      <Icon className="relative z-10 h-4 w-4 shrink-0" strokeWidth={2} style={{ color: isActive ? bg : textMuted }} />
                      <AnimatePresence>{!collapsed && <motion.span initial={{ opacity: 0, x: -3 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -3 }} transition={{ duration: 0.12 }} className="relative z-10 flex-1 text-left" style={{ fontFamily: "Georgia, serif" }}>{item.label}</motion.span>}</AnimatePresence>
                      {!collapsed && item.badge && <span className="relative z-10 rounded-none px-1.5 py-0.5 text-[9px] font-black" style={{ background: isActive ? bg : textPrimary, color: isActive ? textPrimary : bg, border: `1px solid ${isActive ? bg : textPrimary}` }}>{item.badge}</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {collapsed && <div className="shrink-0 flex flex-col items-center gap-2 px-2 pb-3"><button {...sidebarThemeButtonProps(isDark)} onClick={toggle} className="flex h-7 w-7 items-center justify-center rounded-none transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted, border: `1px solid ${inputBorder}` }}>{isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}</button><button aria-label="Expand sidebar" aria-expanded={!collapsed} onClick={() => setCollapsed(false)} className="flex h-8 w-full items-center justify-center rounded-none border transition" style={{ background: inputBg, borderColor: inputBorder, color: textMuted }}><ChevronLeft className="h-3.5 w-3.5 rotate-180" /></button></div>}

        {/* User */}
        <div className="shrink-0 p-3" style={{ borderTop: `2px solid ${border}` }}>
          <div className="flex items-center gap-2.5 rounded-none transition" style={{ justifyContent: collapsed ? "center" : "flex-start", padding: collapsed ? "0" : "0.5rem" }}>
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80" alt="Alex" className="h-9 w-9 shrink-0 rounded-full object-cover" style={{ border: `2px solid ${textPrimary}`, filter: "grayscale(100%)" }} />
            <AnimatePresence>{!collapsed && <motion.div initial={{ opacity: 0, x: -3 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -3 }} transition={{ duration: 0.12 }} className="flex min-w-0 flex-1 items-center justify-between">
              <div><p className="truncate text-[12px] font-black" style={{ color: textPrimary, fontFamily: "Georgia, serif" }}>Alex Morgan</p><p className="truncate text-[9px] font-bold uppercase tracking-wider" style={{ color: textMuted }}>Editor-in-Chief</p></div>
              <button aria-label="Log out" className="transition hover:text-rose-600" style={{ color: textMuted }}><LogOut className="h-3.5 w-3.5" /></button>
            </motion.div>}</AnimatePresence>
          </div>
        </div>
      </motion.aside>

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col" style={{ background: bg }}>
        <header className="flex h-16 shrink-0 items-center gap-4 px-6" style={{ borderBottom: `2px solid ${border}` }}>
          <h1 className="text-[20px] font-black capitalize tracking-tight" style={{ color: textPrimary, fontFamily: "Georgia, serif" }}>{NAV.find(i => i.id === active)?.label}</h1>
          <div className="flex-1" />
          <button aria-label="Add item" className="flex h-8 w-8 items-center justify-center rounded-none transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted, border: `1px solid ${inputBorder}` }}><Plus className="h-4 w-4" /></button>
          <button aria-label="Notifications" className="relative flex h-8 w-8 items-center justify-center rounded-none transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted, border: `1px solid ${inputBorder}` }}><Bell className="h-4 w-4" /><span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full" style={{ background: textPrimary }} /></button>
        </header>
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center"><div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-none" style={{ background: hoverBg, border: `1px solid ${inputBorder}` }}><Newspaper className="h-7 w-7" strokeWidth={1.5} style={{ color: textMuted }} /></div><p className="text-[14px] font-bold italic" style={{ color: textMuted, fontFamily: "Georgia, serif" }}>All the news that's fit to click</p></div>
        </div>
      </div>
    </div>
  );
}
