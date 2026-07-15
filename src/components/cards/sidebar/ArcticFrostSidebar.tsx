"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, FolderOpen, CheckSquare, Users, BarChart3, Settings,
  ChevronLeft, Search, Bell, Plus, Star, Clock, Archive,
  HelpCircle, LogOut, Snowflake, Sun, Moon,
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

export function ArcticFrostSidebar() {
  const { isDark, toggle } = useSidebarTheme(false);
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState("dashboard");
  const [search, setSearch] = useState("");

  const filtered = NAV.filter(i => i.label.toLowerCase().includes(search.toLowerCase()));
  const sections = filtered.reduce((acc, i) => { (acc[i.section] = acc[i.section] || []).push(i); return acc; }, {} as Record<string, typeof NAV>);

  const bg = isDark
    ? "linear-gradient(180deg, #0c1929 0%, #0f1f33 100%)"
    : "linear-gradient(180deg, #f0f9ff 0%, #e0f2fe 100%)";
  const sidebarBg = isDark ? "rgba(15,31,51,0.6)" : "rgba(255,255,255,0.6)";
  const border = isDark ? "rgba(14,165,233,0.15)" : "rgba(14,165,233,0.20)";
  const textPrimary = isDark ? "#f0f9ff" : "#0c4a6e";
  const textSecondary = isDark ? "rgba(240,249,255,0.6)" : "#475569";
  const textMuted = isDark ? "rgba(240,249,255,0.35)" : "#94a3b8";
  const sectionLabel = isDark ? "rgba(14,165,233,0.6)" : "#0ea5e9";
  const inputBg = isDark ? "rgba(14,165,233,0.06)" : "rgba(14,165,233,0.05)";
  const inputBorder = isDark ? "rgba(14,165,233,0.15)" : "rgba(14,165,233,0.20)";
  const hoverBg = isDark ? "rgba(14,165,233,0.08)" : "rgba(14,165,233,0.06)";
  const accent = "#0ea5e9";

  return (
    <div className="relative flex h-full min-h-full w-full overflow-hidden" style={{ background: bg }}>
      {/* Snow texture */}
      <div className="pointer-events-none absolute inset-0 opacity-30" style={{
        backgroundImage: "radial-gradient(circle at 15% 25%, rgba(255,255,255,0.6) 1px, transparent 1px), radial-gradient(circle at 75% 50%, rgba(255,255,255,0.4) 1px, transparent 1px), radial-gradient(circle at 45% 80%, rgba(255,255,255,0.5) 1px, transparent 1px)",
        backgroundSize: "60px 60px, 80px 80px, 50px 50px",
      }} />

      <motion.aside
        animate={{ width: collapsed ? 68 : 256 }}
        transition={{ duration: 0.35, ease: EASE }}
        className="relative z-10 flex h-full shrink-0 flex-col m-3 rounded-3xl overflow-hidden"
        style={{
          background: sidebarBg,
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: `1px solid ${border}`,
          boxShadow: isDark ? "0 8px 32px rgba(0,0,0,0.4)" : "0 8px 32px rgba(14,165,233,0.12)",
        }}
      >
        {/* Brand */}
        <div className="flex h-14 shrink-0 items-center gap-2.5 px-4" style={{ borderBottom: `1px solid ${border}`, justifyContent: collapsed ? "center" : "flex-start" }}>
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl" style={{ background: `linear-gradient(135deg, #38bdf8, ${accent})`, boxShadow: `0 4px 12px ${accent}40` }}>
            <Snowflake className="h-5 w-5 text-white" strokeWidth={2} />
          </div>
          <AnimatePresence>{!collapsed && <motion.div initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -6 }} transition={{ duration: 0.18 }}>
            <span className="text-[14px] font-bold" style={{ color: textPrimary }}>Arctic</span>
            <p className="text-[9px]" style={{ color: textMuted }}>Frost UI</p>
          </motion.div>}</AnimatePresence>
          <AnimatePresence>{!collapsed && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="ml-auto flex items-center gap-1">
            <button onClick={toggle} className="flex h-7 w-7 items-center justify-center rounded-lg transition hover:bg-white/10" style={{ color: textMuted }}>
              {isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
            </button>
            <button onClick={() => setCollapsed(true)} className="flex h-7 w-7 items-center justify-center rounded-lg transition hover:bg-white/10" style={{ color: textMuted }}><ChevronLeft className="h-3.5 w-3.5" /></button>
          </motion.div>}</AnimatePresence>
        </div>

        {/* Search */}
        <div className="shrink-0 px-4 py-2">
          {!collapsed ? (
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2" style={{ color: textMuted }} />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..."
                className="w-full rounded-xl border py-2 pl-9 pr-3 text-[12px] outline-none focus:ring-2"
                style={{ background: inputBg, borderColor: inputBorder, color: textPrimary }} />
            </div>
          ) : (
            <button className="flex h-9 w-full items-center justify-center rounded-xl transition" style={{ background: inputBg, color: textMuted }}><Search className="h-4 w-4" /></button>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden px-3" style={{ scrollbarWidth: "none" }}>
          {Object.entries(sections).map(([section, items]) => (
            <div key={section} className="mb-3">
              <AnimatePresence>{!collapsed && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mb-1.5 px-2 text-[9px] font-bold uppercase tracking-wider" style={{ color: sectionLabel }}>{section}</motion.p>}</AnimatePresence>
              <div className="space-y-1">
                {items.map(item => {
                  const isActive = active === item.id;
                  const Icon = item.icon;
                  return (
                    <button key={item.id} onClick={() => setActive(item.id)} className="group relative flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-[12.5px] font-semibold outline-none transition"
                      style={{
                        color: isActive ? "#fff" : textSecondary,
                        background: isActive ? `linear-gradient(135deg, #38bdf8, ${accent})` : "transparent",
                        boxShadow: isActive ? `0 4px 12px ${accent}40` : "none",
                        justifyContent: collapsed ? "center" : "flex-start",
                      }}>
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition" style={{ background: isActive ? "rgba(255,255,255,0.25)" : `${accent}15` }}>
                        <Icon className="h-3.5 w-3.5" strokeWidth={2.2} style={{ color: isActive ? "#fff" : accent }} />
                      </div>
                      <AnimatePresence>{!collapsed && <motion.span initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -4 }} transition={{ duration: 0.15 }} className="flex-1 text-left">{item.label}</motion.span>}</AnimatePresence>
                      {!collapsed && item.badge && <span className="rounded-full px-2 py-0.5 text-[9px] font-bold" style={{ background: isActive ? "rgba(255,255,255,0.25)" : `${accent}15`, color: isActive ? "#fff" : accent }}>{item.badge}</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {collapsed && <div className="shrink-0 flex flex-col items-center gap-2 px-2 pb-3"><button onClick={toggle} className="flex h-7 w-7 items-center justify-center rounded-lg transition hover:bg-white/10" style={{ color: textMuted }}>{isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}</button><button onClick={() => setCollapsed(false)} className="flex h-9 w-full items-center justify-center rounded-xl transition" style={{ background: inputBg, color: textMuted }}><ChevronLeft className="h-4 w-4 rotate-180" /></button></div>}

        {/* User */}
        <div className="shrink-0 p-3" style={{ borderTop: `1px solid ${border}` }}>
          <div className="flex items-center gap-2.5 rounded-xl transition" style={{ justifyContent: collapsed ? "center" : "flex-start", padding: collapsed ? "0" : "0.5rem" }}>
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80" alt="Alex" className="h-9 w-9 shrink-0 rounded-full object-cover" style={{ border: `2px solid ${accent}40` }} />
            <AnimatePresence>{!collapsed && <motion.div initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -4 }} transition={{ duration: 0.15 }} className="flex min-w-0 flex-1 items-center justify-between">
              <div><p className="truncate text-[12px] font-bold" style={{ color: textPrimary }}>Alex Morgan</p><p className="truncate text-[9px]" style={{ color: textMuted }}>alex@arctic.io</p></div>
              <button className="transition hover:text-rose-400" style={{ color: textMuted }}><LogOut className="h-3.5 w-3.5" /></button>
            </motion.div>}</AnimatePresence>
          </div>
        </div>
      </motion.aside>

      {/* Content */}
      <div className="relative z-10 flex min-w-0 flex-1 flex-col p-3">
        <header className="flex h-12 shrink-0 items-center gap-3 rounded-2xl px-5 backdrop-blur-xl" style={{ background: sidebarBg, border: `1px solid ${border}` }}>
          <h1 className="text-[14px] font-bold capitalize" style={{ color: textPrimary }}>{NAV.find(i => i.id === active)?.label}</h1>
          <div className="flex-1" />
          <button className="flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-white/10" style={{ color: textMuted }}><Plus className="h-4 w-4" /></button>
          <button className="relative flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-white/10" style={{ color: textMuted }}><Bell className="h-4 w-4" /><span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full" style={{ background: accent }} /></button>
        </header>
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center"><div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl backdrop-blur-sm" style={{ background: hoverBg }}><Snowflake className="h-7 w-7" strokeWidth={1.5} style={{ color: textMuted }} /></div><p className="text-[13px] font-semibold" style={{ color: textMuted }}>Stay cool. Stay organized.</p></div>
        </div>
      </div>
    </div>
  );
}
