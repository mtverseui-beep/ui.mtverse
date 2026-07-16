"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, FolderOpen, CheckSquare, Users, BarChart3, Settings,
  ChevronLeft, Search, Bell, Plus, Star, Clock, Archive,
  HelpCircle, LogOut, Crown, Sun, Moon,
} from "lucide-react";
import { sidebarRootClassName, sidebarThemeButtonProps, useResponsiveSidebarCollapse, useSidebarTheme } from "./shared";

const EASE = [0.16, 1, 0.3, 1] as const;

const NAV = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, section: "Suite" },
  { id: "projects", label: "Projects", icon: FolderOpen, badge: "12", section: "Suite" },
  { id: "tasks", label: "Tasks", icon: CheckSquare, badge: "5", section: "Suite" },
  { id: "team", label: "Team", icon: Users, section: "Suite" },
  { id: "analytics", label: "Analytics", icon: BarChart3, section: "Intelligence" },
  { id: "reports", label: "Reports", icon: Star, section: "Intelligence" },
  { id: "activity", label: "Activity", icon: Clock, section: "Intelligence" },
  { id: "archive", label: "Archive", icon: Archive, section: "Vault" },
  { id: "settings", label: "Settings", icon: Settings, section: "Vault" },
  { id: "help", label: "Concierge", icon: HelpCircle, section: "Vault" },
];

export function MidnightVelvetSidebar() {
  const { isDark, toggle } = useSidebarTheme(true); // dark default
  const { collapsed, setCollapsed, containerRef, searchInputRef, expandAndFocusSearch, reducedMotion } = useResponsiveSidebarCollapse();
  const [active, setActive] = useState("dashboard");
  const [search, setSearch] = useState("");

  const filtered = NAV.filter(i => i.label.toLowerCase().includes(search.toLowerCase()));
  const sections = filtered.reduce((acc, i) => { (acc[i.section] = acc[i.section] || []).push(i); return acc; }, {} as Record<string, typeof NAV>);

  // Velvet palette — pale parchment in light mode, rich aubergine in dark mode.
  const bg = isDark ? "#0f0820" : "#fffaf0";
  const sidebarBg = isDark ? "#150a26" : "#fffdf7";
  const border = isDark ? "rgba(245,158,11,0.18)" : "rgba(120,53,15,0.22)";
  const textPrimary = isDark ? "#fdf2f8" : "#3b1d12";
  const textSecondary = isDark ? "rgba(253,242,248,0.78)" : "#6b3b24";
  const textMuted = isDark ? "rgba(253,242,248,0.58)" : "#8a5a3b";
  const sectionLabel = isDark ? "#fbbf24" : "#92400e";
  const inputBg = isDark ? "rgba(245,158,11,0.08)" : "rgba(180,83,9,0.06)";
  const inputBorder = isDark ? "rgba(245,158,11,0.24)" : "rgba(120,53,15,0.24)";
  const hoverBg = isDark ? "rgba(245,158,11,0.10)" : "rgba(180,83,9,0.08)";
  const goldStart = isDark ? "#f59e0b" : "#b45309";
  const goldEnd = isDark ? "#d97706" : "#92400e";

  return (
    <div ref={containerRef} data-theme={isDark ? "dark" : "light"} className={sidebarRootClassName(isDark, "relative flex h-full min-h-full w-full overflow-hidden")} style={{ background: bg }}>
      {/* Velvet texture overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-30" style={{ background: "radial-gradient(circle at 20% 20%, rgba(245,158,11,0.10), transparent 50%), radial-gradient(circle at 80% 80%, rgba(168,85,247,0.10), transparent 50%)" }} />

      <motion.aside
        animate={{ width: collapsed ? 68 : 260 }}
        transition={{ duration: reducedMotion ? 0 : 0.35, ease: EASE }}
        className="relative z-10 flex h-full shrink-0 flex-col"
        style={{ background: sidebarBg, borderRight: `1px solid ${border}` }}
      >
        {/* Gold divider line at top */}
        <div className="h-[2px] w-full" style={{ background: `linear-gradient(90deg, transparent, ${goldStart}, transparent)` }} />

        {/* Brand */}
        <div className="flex h-16 shrink-0 items-center gap-3 px-5" style={{ borderBottom: `1px solid ${border}`, justifyContent: collapsed ? "center" : "flex-start" }}>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ background: `linear-gradient(135deg, ${goldStart}, ${goldEnd})`, boxShadow: `0 4px 12px ${goldStart}40` }}>
            <Crown className="h-5 w-5 text-white" strokeWidth={2.2} />
          </div>
          <AnimatePresence>{!collapsed && <motion.div initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -6 }} transition={{ duration: 0.18 }}>
            <span className="text-[15px] font-bold tracking-wide" style={{ color: textPrimary, fontFamily: "Georgia, serif" }}>Velvet</span>
            <p className="text-[9px] font-bold uppercase tracking-[0.2em]" style={{ color: goldStart }}>VIP Access</p>
          </motion.div>}</AnimatePresence>
          <AnimatePresence>{!collapsed && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="ml-auto flex items-center gap-1">
            <button {...sidebarThemeButtonProps(isDark)} onClick={toggle} className="flex h-7 w-7 items-center justify-center rounded-lg transition hover:bg-white/5" style={{ color: textMuted }}>
              {isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
            </button>
            <button aria-label="Collapse sidebar" aria-expanded={!collapsed} onClick={() => setCollapsed(true)} className="flex h-7 w-7 items-center justify-center rounded-lg transition hover:bg-white/5" style={{ color: textMuted }}><ChevronLeft className="h-3.5 w-3.5" /></button>
          </motion.div>}</AnimatePresence>
        </div>

        {/* Search */}
        <div className="shrink-0 px-4 py-3">
          {!collapsed ? (
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2" style={{ color: textMuted }} />
              <input ref={searchInputRef} aria-label="Search navigation" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search the vault..."
                className="w-full rounded-xl border py-2 pl-9 pr-3 text-[12px] outline-none focus:ring-1"
                style={{ background: inputBg, borderColor: inputBorder, color: textPrimary }} />
            </div>
          ) : (
            <button onClick={expandAndFocusSearch} aria-label="Expand sidebar and search" className="flex h-9 w-full items-center justify-center rounded-xl border transition" style={{ background: inputBg, borderColor: inputBorder, color: textMuted }}><Search className="h-4 w-4" /></button>
          )}
        </div>

        {/* Nav */}
        <nav aria-label="Primary navigation" className="flex-1 overflow-y-auto overflow-x-hidden px-3" style={{ scrollbarWidth: "none" }}>
          {Object.entries(sections).map(([section, items]) => (
            <div key={section} className="mb-4">
              <AnimatePresence>{!collapsed && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mb-2 flex items-center gap-2 px-2">
                <span className="text-[9px] font-bold uppercase tracking-[0.22em]" style={{ color: sectionLabel, fontFamily: "Georgia, serif" }}>{section}</span>
                <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${goldStart}30, transparent)` }} />
              </motion.div>}</AnimatePresence>
              <div className="space-y-1">
                {items.map(item => {
                  const isActive = active === item.id;
                  const Icon = item.icon;
                  return (
                    <button key={item.id} aria-label={item.label} aria-current={isActive ? "page" : undefined} onClick={() => setActive(item.id)} className="group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[12.5px] font-medium outline-none transition"
                      style={{
                        color: isActive ? "#fff" : textSecondary,
                        background: isActive ? `linear-gradient(135deg, ${goldStart}, ${goldEnd})` : "transparent",
                        boxShadow: isActive ? `0 4px 16px ${goldStart}50` : "none",
                        justifyContent: collapsed ? "center" : "flex-start",
                      }}>
                      <Icon className="relative z-10 h-4 w-4 shrink-0" strokeWidth={2} style={{ color: isActive ? "#fff" : textMuted }} />
                      <AnimatePresence>{!collapsed && <motion.span initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -4 }} transition={{ duration: 0.15 }} className="relative z-10 flex-1 text-left" style={{ fontFamily: "Georgia, serif" }}>{item.label}</motion.span>}</AnimatePresence>
                      {!collapsed && item.badge && <span className="relative z-10 rounded-full px-2 py-0.5 text-[9px] font-bold" style={{ background: isActive ? "rgba(255,255,255,0.25)" : `${goldStart}25`, color: isActive ? "#fff" : goldStart }}>{item.badge}</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {collapsed && <div className="shrink-0 flex flex-col items-center gap-2 px-2 pb-3"><button {...sidebarThemeButtonProps(isDark)} onClick={toggle} className="flex h-7 w-7 items-center justify-center rounded-lg transition hover:bg-white/5" style={{ color: textMuted }}>{isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}</button><button aria-label="Expand sidebar" aria-expanded={!collapsed} onClick={() => setCollapsed(false)} className="flex h-9 w-full items-center justify-center rounded-xl border transition" style={{ background: inputBg, borderColor: inputBorder, color: textMuted }}><ChevronLeft className="h-4 w-4 rotate-180" /></button></div>}

        {/* User */}
        <div className="shrink-0 p-3" style={{ borderTop: `1px solid ${border}` }}>
          <div className="flex items-center gap-3 rounded-xl transition" style={{ justifyContent: collapsed ? "center" : "flex-start", padding: collapsed ? "0" : "0.5rem" }}>
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80" alt="Alex" className="h-9 w-9 shrink-0 rounded-full object-cover" style={{ border: `2px solid ${goldStart}` }} />
              <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full" style={{ background: goldStart }}><Crown className="h-2.5 w-2.5 text-white" strokeWidth={2.5} /></span>
            </div>
            <AnimatePresence>{!collapsed && <motion.div initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -4 }} transition={{ duration: 0.15 }} className="flex min-w-0 flex-1 items-center justify-between">
              <div><p className="truncate text-[12px] font-bold" style={{ color: textPrimary, fontFamily: "Georgia, serif" }}>Alex Morgan</p><p className="truncate text-[9px] font-bold uppercase tracking-wider" style={{ color: goldStart }}>Gold Member</p></div>
              <button aria-label="Log out" className="transition hover:text-rose-400" style={{ color: textMuted }}><LogOut className="h-3.5 w-3.5" /></button>
            </motion.div>}</AnimatePresence>
          </div>
        </div>
      </motion.aside>

      {/* Content */}
      <div className="relative z-10 flex min-w-0 flex-1 flex-col" style={{ background: bg }}>
        <header className="flex h-16 shrink-0 items-center gap-4 px-6" style={{ borderBottom: `1px solid ${border}` }}>
          <h1 className="text-[16px] font-bold capitalize" style={{ color: textPrimary, fontFamily: "Georgia, serif" }}>{NAV.find(i => i.id === active)?.label}</h1>
          <div className="flex-1" />
          <button aria-label="Add item" className="flex h-9 w-9 items-center justify-center rounded-xl transition hover:bg-white/5" style={{ color: textMuted }}><Plus className="h-4 w-4" /></button>
          <button aria-label="Notifications" className="relative flex h-9 w-9 items-center justify-center rounded-xl transition hover:bg-white/5" style={{ color: textMuted }}><Bell className="h-4 w-4" /><span className="absolute right-2 top-2 h-2 w-2 rounded-full" style={{ background: goldStart }} /></button>
        </header>
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center"><div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-xl" style={{ background: hoverBg, border: `1px solid ${border}` }}><Crown className="h-7 w-7" strokeWidth={1.5} style={{ color: goldStart }} /></div><p className="text-[14px] font-medium" style={{ color: textMuted, fontFamily: "Georgia, serif" }}>Welcome to your private suite</p></div>
        </div>
      </div>
    </div>
  );
}
