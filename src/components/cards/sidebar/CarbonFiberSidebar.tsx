"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, FolderOpen, CheckSquare, Users, BarChart3, Settings,
  ChevronLeft, Search, Bell, Plus, Star, Clock, Archive,
  HelpCircle, LogOut, Wrench, Sun, Moon, Gauge,
} from "lucide-react";
import { sidebarRootClassName, sidebarThemeButtonProps, useResponsiveSidebarCollapse, useSidebarTheme } from "./shared";

const EASE = [0.16, 1, 0.3, 1] as const;

const NAV = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, section: "BAY 01" },
  { id: "projects", label: "Builds", icon: FolderOpen, badge: "12", section: "BAY 01" },
  { id: "tasks", label: "Tasks", icon: CheckSquare, badge: "5", section: "BAY 01" },
  { id: "team", label: "Crew", icon: Users, section: "BAY 01" },
  { id: "analytics", label: "Telemetry", icon: BarChart3, section: "BAY 02" },
  { id: "reports", label: "Logs", icon: Star, section: "BAY 02" },
  { id: "activity", label: "Uptime", icon: Clock, section: "BAY 02" },
  { id: "archive", label: "Storage", icon: Archive, section: "BAY 03" },
  { id: "settings", label: "Config", icon: Settings, section: "BAY 03" },
  { id: "help", label: "Manual", icon: HelpCircle, section: "BAY 03" },
];

export function CarbonFiberSidebar() {
  const { isDark, toggle } = useSidebarTheme(true); // dark default
  const { collapsed, setCollapsed, containerRef, searchInputRef, expandAndFocusSearch, reducedMotion } = useResponsiveSidebarCollapse();
  const [active, setActive] = useState("dashboard");
  const [search, setSearch] = useState("");

  const filtered = NAV.filter(i => i.label.toLowerCase().includes(search.toLowerCase()));
  const sections = filtered.reduce((acc, i) => { (acc[i.section] = acc[i.section] || []).push(i); return acc; }, {} as Record<string, typeof NAV>);

  const bg = isDark ? "#0d0d0d" : "#f8fafc";
  const sidebarBg = isDark ? "#141414" : "#ffffff";
  const border = isDark ? "#2a2a2a" : "#e2e8f0";
  const textPrimary = isDark ? "#fb923c" : "#0f172a";
  const textSecondary = isDark ? "#a8a8a8" : "#64748b";
  const textMuted = isDark ? "#525252" : "#94a3b8";
  const sectionLabel = isDark ? "#737373" : "#cbd5e1";
  const inputBg = isDark ? "#1a1a1a" : "#f8fafc";
  const inputBorder = isDark ? "#2a2a2a" : "#e2e8f0";
  const hoverBg = isDark ? "#1a1a1a" : "#f1f5f9";
  const activeBg = isDark ? "rgba(251,146,60,0.10)" : "rgba(251,146,60,0.08)";
  const accent = "#fb923c";

  return (
    <div ref={containerRef} data-theme={isDark ? "dark" : "light"} className={sidebarRootClassName(isDark, "flex h-full min-h-full w-full overflow-hidden")} style={{ background: bg }}>
      <motion.aside
        animate={{ width: collapsed ? 60 : 252 }}
        transition={{ duration: reducedMotion ? 0 : 0.3, ease: EASE }}
        className="relative flex h-full shrink-0 flex-col"
        style={{ background: sidebarBg, borderRight: `1px solid ${border}` }}
      >
        {/* Carbon fiber weave texture */}
        {isDark && (
          <div className="pointer-events-none absolute inset-0 z-0 opacity-30" style={{
            backgroundImage: `
              repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(255,255,255,0.02) 3px, rgba(255,255,255,0.02) 6px),
              repeating-linear-gradient(-45deg, transparent, transparent 3px, rgba(255,255,255,0.015) 3px, rgba(255,255,255,0.015) 6px)
            `,
          }} />
        )}

        {/* Brand */}
        <div className="relative z-10 flex h-14 shrink-0 items-center gap-2.5 px-4" style={{ borderBottom: `1px solid ${border}`, justifyContent: collapsed ? "center" : "flex-start" }}>
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded" style={{ background: accent, boxShadow: `0 0 12px ${accent}40` }}>
            <Wrench className="h-5 w-5 text-black" strokeWidth={2.5} />
          </div>
          <AnimatePresence>{!collapsed && <motion.div initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -6 }} transition={{ duration: 0.15 }} className="flex flex-col leading-none">
            <span className="text-[13px] font-black uppercase tracking-wide" style={{ color: isDark ? "#fff" : textPrimary }}>CARBON</span>
            <span className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.2em]" style={{ color: accent }}>Fiber OS</span>
          </motion.div>}</AnimatePresence>
          <AnimatePresence>{!collapsed && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="ml-auto flex items-center gap-1">
            <button {...sidebarThemeButtonProps(isDark)} onClick={toggle} className="flex h-7 w-7 items-center justify-center rounded transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted }}>
              {isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
            </button>
            <button aria-label="Collapse sidebar" aria-expanded={!collapsed} onClick={() => setCollapsed(true)} className="flex h-7 w-7 items-center justify-center rounded transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted }}><ChevronLeft className="h-3.5 w-3.5" /></button>
          </motion.div>}</AnimatePresence>
        </div>

        {/* Search */}
        <div className="relative z-10 shrink-0 px-3 py-2">
          {!collapsed ? (
            <div className="relative">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2" style={{ color: textMuted }} />
              <input ref={searchInputRef} aria-label="Search navigation" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..."
                className="w-full rounded border py-1.5 pl-8 pr-3 text-[11px] font-medium outline-none focus:border-orange-500/50"
                style={{ background: inputBg, borderColor: inputBorder, color: textPrimary }} />
            </div>
          ) : (
            <button onClick={expandAndFocusSearch} aria-label="Expand sidebar and search" className="flex h-8 w-full items-center justify-center rounded border transition" style={{ background: inputBg, borderColor: inputBorder, color: textMuted }}><Search className="h-3.5 w-3.5" /></button>
          )}
        </div>

        {/* Nav */}
        <nav aria-label="Primary navigation" className="relative z-10 flex-1 overflow-y-auto overflow-x-hidden px-2" style={{ scrollbarWidth: "none" }}>
          {Object.entries(sections).map(([section, items]) => (
            <div key={section} className="mb-3">
              <AnimatePresence>{!collapsed && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mb-1 flex items-center gap-2 px-2">
                <span className="text-[9px] font-black uppercase tracking-[0.18em]" style={{ color: sectionLabel }}>{section}</span>
                <div className="flex-1 border-t border-dashed" style={{ borderColor: inputBorder }} />
              </motion.div>}</AnimatePresence>
              <div className="space-y-0.5">
                {items.map(item => {
                  const isActive = active === item.id;
                  const Icon = item.icon;
                  return (
                    <button key={item.id} aria-label={item.label} aria-current={isActive ? "page" : undefined} onClick={() => setActive(item.id)} className="group relative flex w-full items-center gap-2.5 rounded px-2 py-2 text-[12px] font-bold uppercase tracking-wide outline-none transition"
                      style={{ color: isActive ? accent : textSecondary, background: isActive ? activeBg : "transparent", borderLeft: isActive ? `3px solid ${accent}` : "3px solid transparent", justifyContent: collapsed ? "center" : "flex-start" }}>
                      <Icon className="relative z-10 h-4 w-4 shrink-0" strokeWidth={2} style={{ color: isActive ? accent : textMuted }} />
                      <AnimatePresence>{!collapsed && <motion.span initial={{ opacity: 0, x: -3 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -3 }} transition={{ duration: 0.12 }} className="relative z-10 flex-1 text-left">{item.label}</motion.span>}</AnimatePresence>
                      {!collapsed && item.badge && <span className="relative z-10 rounded px-1.5 py-0.5 text-[9px] font-black" style={{ background: accent, color: "#000" }}>{item.badge}</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Telemetry gauge */}
        {!collapsed && (
          <div className="relative z-10 shrink-0 px-3 py-2" style={{ borderTop: `1px solid ${border}` }}>
            <div className="flex items-center justify-between mb-1">
              <span className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider" style={{ color: textMuted }}><Gauge className="h-3 w-3" /> RPM</span>
              <span className="text-[10px] font-black" style={{ color: accent }}>7,400</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full" style={{ background: inputBg }}>
              <div className="h-full rounded-full" style={{ width: "74%", background: `linear-gradient(90deg, ${accent}, #ef4444)` }} />
            </div>
          </div>
        )}

        {collapsed && <div className="relative z-10 shrink-0 flex flex-col items-center gap-2 px-2 pb-3"><button {...sidebarThemeButtonProps(isDark)} onClick={toggle} className="flex h-7 w-7 items-center justify-center rounded transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted }}>{isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}</button><button aria-label="Expand sidebar" aria-expanded={!collapsed} onClick={() => setCollapsed(false)} className="flex h-8 w-full items-center justify-center rounded border transition" style={{ background: inputBg, borderColor: inputBorder, color: textMuted }}><ChevronLeft className="h-3.5 w-3.5 rotate-180" /></button></div>}

        {/* User */}
        <div className="relative z-10 shrink-0 p-2" style={{ borderTop: `1px solid ${border}` }}>
          <div className="flex items-center gap-2.5 rounded transition" style={{ justifyContent: collapsed ? "center" : "flex-start", padding: collapsed ? "0" : "0.375rem" }}>
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80" alt="Alex" className="h-7 w-7 shrink-0 rounded-full object-cover" style={{ border: `2px solid ${accent}` }} />
            <AnimatePresence>{!collapsed && <motion.div initial={{ opacity: 0, x: -3 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -3 }} transition={{ duration: 0.12 }} className="flex min-w-0 flex-1 items-center justify-between">
              <div><p className="truncate text-[11px] font-black uppercase" style={{ color: isDark ? "#fff" : textPrimary }}>Alex Morgan</p><p className="truncate text-[9px] font-bold uppercase tracking-wider" style={{ color: accent }}>Chief Engineer</p></div>
              <button aria-label="Log out" className="transition hover:text-rose-500" style={{ color: textMuted }}><LogOut className="h-3.5 w-3.5" /></button>
            </motion.div>}</AnimatePresence>
          </div>
        </div>
      </motion.aside>

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col" style={{ background: bg }}>
        <header className="flex h-14 shrink-0 items-center gap-4 px-6" style={{ borderBottom: `1px solid ${border}` }}>
          <h1 className="text-[14px] font-black uppercase tracking-wide" style={{ color: isDark ? "#fff" : textPrimary }}>{NAV.find(i => i.id === active)?.label}</h1>
          <div className="flex-1" />
          <button aria-label="Add item" className="flex h-8 w-8 items-center justify-center rounded transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted }}><Plus className="h-4 w-4" /></button>
          <button aria-label="Notifications" className="relative flex h-8 w-8 items-center justify-center rounded transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted }}><Bell className="h-4 w-4" /><span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full" style={{ background: accent }} /></button>
        </header>
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center"><div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded" style={{ background: hoverBg, border: `1px solid ${border}` }}><Wrench className="h-7 w-7" strokeWidth={1.5} style={{ color: textMuted }} /></div><p className="text-[13px] font-bold uppercase tracking-wide" style={{ color: textMuted }}>System nominal</p></div>
        </div>
      </div>
    </div>
  );
}
