"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, FolderOpen, CheckSquare, Users, BarChart3, Settings,
  ChevronLeft, Search, Bell, Plus, Star, Clock, Archive,
  HelpCircle, LogOut, Hexagon, Sun, Moon,
} from "lucide-react";
import { useSidebarTheme } from "./shared";

const EASE = [0.16, 1, 0.3, 1] as const;

const NAV = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, section: "Main" },
  { id: "projects", label: "Projects", icon: FolderOpen, badge: "12", section: "Main" },
  { id: "tasks", label: "Tasks", icon: CheckSquare, badge: "5", section: "Main" },
  { id: "team", label: "Team", icon: Users, section: "Main" },
  { id: "analytics", label: "Analytics", icon: BarChart3, section: "Insights" },
  { id: "reports", label: "Reports", icon: Star, section: "Insights" },
  { id: "activity", label: "Activity", icon: Clock, section: "Insights" },
  { id: "archive", label: "Archive", icon: Archive, section: "System" },
  { id: "settings", label: "Settings", icon: Settings, section: "System" },
  { id: "help", label: "Help", icon: HelpCircle, section: "System" },
];

export function NeumorphicSidebar() {
  const { isDark, toggle } = useSidebarTheme(false);
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState("dashboard");
  const [search, setSearch] = useState("");
  const [hovered, setHovered] = useState<string | null>(null);

  const filtered = NAV.filter(i => i.label.toLowerCase().includes(search.toLowerCase()));
  const sections = filtered.reduce((acc, i) => { (acc[i.section] = acc[i.section] || []).push(i); return acc; }, {} as Record<string, typeof NAV>);

  // Theme-aware neumorphic palette
  const surface = isDark ? "#2a2a35" : "#e0e5ec";
  const shadowDark = isDark ? "#1a1a22" : "#c5c5c8";
  const shadowLight = isDark ? "#3a3a48" : "#ffffff";
  const textPrimary = isDark ? "#ffffff" : "#475569";
  const textSecondary = isDark ? "rgba(255,255,255,0.5)" : "#64748b";
  const textMuted = isDark ? "rgba(255,255,255,0.35)" : "#94a3b8";
  const accentColor = isDark ? "#818cf8" : "#6366f1";

  const neumorphicShadow = {
    raised: isDark
      ? `6px 6px 12px ${shadowDark}, -6px -6px 12px ${shadowLight}`
      : `6px 6px 12px ${shadowDark}, -6px -6px 12px ${shadowLight}`,
    pressed: isDark
      ? `inset 4px 4px 8px ${shadowDark}, inset -4px -4px 8px ${shadowLight}`
      : `inset 4px 4px 8px ${shadowDark}, inset -4px -4px 8px ${shadowLight}`,
    small: isDark
      ? `3px 3px 6px ${shadowDark}, -3px -3px 6px ${shadowLight}`
      : `3px 3px 6px ${shadowDark}, -3px -3px 6px ${shadowLight}`,
  };

  return (
    <div className="flex h-full min-h-full w-full overflow-hidden" style={{ background: surface }}>
      <motion.aside
        animate={{ width: collapsed ? 72 : 250 }}
        transition={{ duration: 0.35, ease: EASE }}
        className="relative flex h-full shrink-0 flex-col m-3 rounded-3xl"
        style={{ background: surface, boxShadow: `8px 8px 16px ${shadowDark}, -8px -8px 16px ${shadowLight}` }}
      >
        {/* Brand */}
        <div className="flex h-14 shrink-0 items-center gap-2.5 px-4" style={{ justifyContent: collapsed ? "center" : "flex-start" }}>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl" style={{ background: surface, boxShadow: neumorphicShadow.raised }}>
            <Hexagon className="h-5 w-5" strokeWidth={2.2} style={{ color: accentColor }} />
          </div>
          <AnimatePresence>{!collapsed && <motion.span initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -6 }} transition={{ duration: 0.18 }} className="text-[14px] font-bold" style={{ color: textPrimary }}>Neumo</motion.span>}</AnimatePresence>
          <AnimatePresence>{!collapsed && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="ml-auto flex items-center gap-1">
            <button onClick={toggle} className="flex h-7 w-7 items-center justify-center rounded-xl transition" style={{ background: surface, boxShadow: neumorphicShadow.small, color: textMuted }}>
              {isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
            </button>
            <motion.button onClick={() => setCollapsed(true)} className="flex h-7 w-7 items-center justify-center rounded-xl transition" style={{ background: surface, boxShadow: neumorphicShadow.small, color: textMuted }}><ChevronLeft className="h-3.5 w-3.5" /></motion.button>
          </motion.div>}</AnimatePresence>
        </div>

        {/* Search */}
        <div className="shrink-0 px-3 pb-2">
          {!collapsed ? (
            <div className="relative">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2" style={{ color: textMuted }} />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..."
                className="w-full rounded-xl py-2.5 pl-10 pr-3 text-[12px] outline-none"
                style={{ background: surface, boxShadow: neumorphicShadow.pressed, color: textPrimary }} />
            </div>
          ) : (
            <button className="flex h-10 w-full items-center justify-center rounded-xl transition" style={{ background: surface, boxShadow: neumorphicShadow.raised, color: textMuted }}><Search className="h-4 w-4" /></button>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden px-3" style={{ scrollbarWidth: "none" }}>
          {Object.entries(sections).map(([section, items]) => (
            <div key={section} className="mb-2">
              <AnimatePresence>{!collapsed && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mb-1.5 px-2 text-[9px] font-bold uppercase tracking-wider" style={{ color: textMuted }}>{section}</motion.p>}</AnimatePresence>
              <div className="space-y-1.5">
                {items.map(item => {
                  const isActive = active === item.id;
                  const isHovered = hovered === item.id;
                  const Icon = item.icon;
                  return (
                    <button key={item.id} onClick={() => setActive(item.id)} onMouseEnter={() => setHovered(item.id)} onMouseLeave={() => setHovered(null)}
                      className="group relative flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-[12.5px] font-semibold outline-none transition"
                      style={{
                        color: isActive ? accentColor : textSecondary,
                        background: surface,
                        boxShadow: isActive ? neumorphicShadow.pressed : isHovered ? neumorphicShadow.raised : "none",
                        justifyContent: collapsed ? "center" : "flex-start",
                      }}>
                      <Icon className="relative z-10 h-4 w-4 shrink-0" strokeWidth={2} style={{ color: isActive ? accentColor : textMuted }} />
                      <AnimatePresence>{!collapsed && <motion.span initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -4 }} transition={{ duration: 0.15 }} className="flex-1 text-left">{item.label}</motion.span>}</AnimatePresence>
                      {!collapsed && item.badge && <span className="rounded-full px-1.5 py-0.5 text-[9px] font-bold" style={{ background: isActive ? `${accentColor}20` : surface, color: isActive ? accentColor : textMuted, boxShadow: isActive ? "none" : neumorphicShadow.small }}>{item.badge}</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {collapsed && <div className="shrink-0 flex flex-col items-center gap-2 px-2 pb-3"><button onClick={toggle} className="flex h-7 w-7 items-center justify-center rounded-xl transition" style={{ background: surface, boxShadow: neumorphicShadow.small, color: textMuted }}>{isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}</button><button onClick={() => setCollapsed(false)} className="flex h-9 w-full items-center justify-center rounded-xl transition" style={{ background: surface, boxShadow: neumorphicShadow.raised, color: textMuted }}><ChevronLeft className="h-4 w-4 rotate-180" /></button></div>}

        {/* User */}
        <div className="shrink-0 p-2">
          <div className="flex items-center gap-2.5 rounded-2xl transition" style={{ background: surface, boxShadow: neumorphicShadow.raised, justifyContent: collapsed ? "center" : "flex-start", padding: collapsed ? "0" : "0.5rem" }}>
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80" alt="Alex" className="h-9 w-9 shrink-0 rounded-full object-cover" />
            <AnimatePresence>{!collapsed && <motion.div initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -4 }} transition={{ duration: 0.15 }} className="flex min-w-0 flex-1 items-center justify-between"><div><p className="truncate text-[12px] font-bold" style={{ color: textPrimary }}>Alex Morgan</p><p className="truncate text-[9px]" style={{ color: textMuted }}>alex@neumo.io</p></div><button className="transition hover:text-rose-500" style={{ color: textMuted }}><LogOut className="h-3.5 w-3.5" /></button></motion.div>}</AnimatePresence>
          </div>
        </div>
      </motion.aside>

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col p-3">
        <header className="flex h-12 shrink-0 items-center gap-3 rounded-2xl px-5" style={{ background: surface, boxShadow: neumorphicShadow.raised }}>
          <h1 className="text-[14px] font-bold capitalize" style={{ color: textPrimary }}>{NAV.find(i => i.id === active)?.label}</h1>
          <div className="flex-1" />
          <button className="flex h-8 w-8 items-center justify-center rounded-xl transition" style={{ background: surface, boxShadow: neumorphicShadow.small, color: textMuted }}><Plus className="h-4 w-4" /></button>
          <button className="relative flex h-8 w-8 items-center justify-center rounded-xl transition" style={{ background: surface, boxShadow: neumorphicShadow.small, color: textMuted }}><Bell className="h-4 w-4" /><span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-rose-500" /></button>
        </header>
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center"><div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: surface, boxShadow: neumorphicShadow.raised }}><LayoutDashboard className="h-7 w-7" strokeWidth={1.5} style={{ color: textMuted }} /></div><p className="text-[13px] font-semibold" style={{ color: textMuted }}>Select a menu item</p></div>
        </div>
      </div>
    </div>
  );
}
