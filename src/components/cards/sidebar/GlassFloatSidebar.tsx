"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, FolderOpen, CheckSquare, Users, BarChart3, Settings,
  ChevronLeft, Search, Bell, Plus, Star, Clock, Archive,
  HelpCircle, LogOut, Sparkles, Sun, Moon,
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
  { id: "archive", label: "Archive", icon: Archive, section: "Workspace" },
  { id: "settings", label: "Settings", icon: Settings, section: "Workspace" },
  { id: "help", label: "Help", icon: HelpCircle, section: "Workspace" },
];

export function GlassFloatSidebar() {
  const { isDark, toggle } = useSidebarTheme(false);
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState("dashboard");
  const [search, setSearch] = useState("");

  const filtered = NAV.filter(i => i.label.toLowerCase().includes(search.toLowerCase()));
  const sections = filtered.reduce((acc, i) => { (acc[i.section] = acc[i.section] || []).push(i); return acc; }, {} as Record<string, typeof NAV>);

  // Theme-aware palette
  const bg = isDark
    ? "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)"
    : "linear-gradient(135deg, #e0e7ff 0%, #f0fdfa 50%, #fdf2f8 100%)";
  const glassBg = isDark ? "rgba(20,20,30,0.55)" : "rgba(255,255,255,0.55)";
  const glassBorder = isDark ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.6)";
  const textPrimary = isDark ? "#ffffff" : "#1e293b";
  const textSecondary = isDark ? "rgba(255,255,255,0.6)" : "#64748b";
  const textMuted = isDark ? "rgba(255,255,255,0.35)" : "#94a3b8";
  const sectionLabel = isDark ? "rgba(255,255,255,0.3)" : "rgba(148,163,184,0.7)";
  const inputBg = isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.4)";
  const inputBorder = isDark ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.4)";
  const hoverBg = isDark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.4)";
  const activeBg = isDark ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.7)";
  const accentColor = isDark ? "#a78bfa" : "#7c3aed";

  return (
    <div className="relative flex h-full min-h-full w-full overflow-hidden" style={{ background: bg }}>
      {/* Ambient blobs */}
      <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-violet-400/20 blur-3xl" />
      <div className="pointer-events-none absolute right-10 top-1/2 h-80 w-80 rounded-full bg-cyan-400/15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-pink-400/15 blur-3xl" />

      {/* Floating glass sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 260 }}
        transition={{ duration: 0.35, ease: EASE }}
        className="relative z-10 flex h-full shrink-0 flex-col m-3 rounded-3xl overflow-hidden"
        style={{
          background: glassBg,
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: `1px solid ${glassBorder}`,
          boxShadow: "0 8px 32px rgba(31,38,135,0.12)",
        }}
      >
        {/* Brand */}
        <div className="flex h-14 shrink-0 items-center gap-2.5 px-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400 shadow-lg shadow-violet-500/20">
            <Sparkles className="h-4.5 w-4.5 text-white" strokeWidth={2.2} />
          </div>
          <AnimatePresence>{!collapsed && (
            <motion.span initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }} transition={{ duration: 0.18 }} className="text-[14px] font-bold" style={{ color: textPrimary }}>Glass</motion.span>
          )}</AnimatePresence>
          <AnimatePresence>{!collapsed && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="ml-auto flex items-center gap-1">
              <button onClick={toggle} className="flex h-7 w-7 items-center justify-center rounded-lg transition hover:bg-white/20" style={{ color: textMuted }}>
                {isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
              </button>
              <motion.button onClick={() => setCollapsed(true)} className="flex h-6 w-6 items-center justify-center rounded-lg transition hover:bg-white/20" style={{ color: textMuted }}>
                <ChevronLeft className="h-3.5 w-3.5" />
              </motion.button>
            </motion.div>
          )}</AnimatePresence>
        </div>

        {/* Search */}
        <div className="shrink-0 px-3 pb-2">
          {!collapsed ? (
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2" style={{ color: textMuted }} />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..."
                className="w-full rounded-xl border py-2 pl-9 pr-3 text-[12px] outline-none focus:ring-2 focus:ring-violet-200"
                style={{ background: inputBg, borderColor: inputBorder, color: textPrimary }} />
            </div>
          ) : (
            <button className="flex h-9 w-full items-center justify-center rounded-xl border transition hover:bg-white/20" style={{ background: inputBg, borderColor: inputBorder, color: textMuted }}><Search className="h-4 w-4" /></button>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden py-1 px-2" style={{ scrollbarWidth: "none" }}>
          {Object.entries(sections).map(([section, items]) => (
            <div key={section} className="mb-2">
              <AnimatePresence>{!collapsed && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mb-1 px-2.5 text-[9px] font-bold uppercase tracking-wider" style={{ color: sectionLabel }}>{section}</motion.p>}</AnimatePresence>
              <div className="space-y-0.5">
                {items.map(item => {
                  const isActive = active === item.id;
                  const Icon = item.icon;
                  return (
                    <button key={item.id} onClick={() => setActive(item.id)} className="group relative flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-[12px] font-medium outline-none transition"
                      style={{ color: isActive ? accentColor : textSecondary, background: isActive ? activeBg : "transparent", boxShadow: isActive ? `0 2px 8px ${accentColor}20` : "none", justifyContent: collapsed ? "center" : "flex-start" }}>
                      <Icon className="relative z-10 h-4 w-4 shrink-0" strokeWidth={2} style={{ color: isActive ? accentColor : textMuted }} />
                      <AnimatePresence>{!collapsed && <motion.span initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -4 }} transition={{ duration: 0.15 }} className="relative z-10 flex-1 text-left">{item.label}</motion.span>}</AnimatePresence>
                      {!collapsed && item.badge && <span className="relative z-10 rounded-full px-1.5 py-0.5 text-[9px] font-bold" style={{ background: isActive ? `${accentColor}25` : hoverBg, color: isActive ? accentColor : textMuted }}>{item.badge}</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {collapsed && <div className="shrink-0 flex flex-col items-center gap-2 px-2 pb-3"><button onClick={toggle} className="flex h-7 w-7 items-center justify-center rounded-lg transition hover:bg-white/20" style={{ color: textMuted }}>{isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}</button><button onClick={() => setCollapsed(false)} className="flex h-9 w-full items-center justify-center rounded-xl border transition hover:bg-white/20" style={{ background: inputBg, borderColor: inputBorder, color: textMuted }}><ChevronLeft className="h-4 w-4 rotate-180" /></button></div>}

        {/* User */}
        <div className="shrink-0 p-2" style={{ borderTop: `1px solid ${glassBorder}` }}>
          <div className="flex items-center gap-2.5 rounded-xl p-1.5 transition hover:bg-white/10" style={{ justifyContent: collapsed ? "center" : "flex-start", padding: collapsed ? "0" : "0.375rem" }}>
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-violet-500 text-[10px] font-bold text-white">AM</div>
            <AnimatePresence>{!collapsed && <motion.div initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -4 }} transition={{ duration: 0.15 }} className="flex min-w-0 flex-1 items-center justify-between"><div><p className="truncate text-[11px] font-semibold" style={{ color: textPrimary }}>Alex Morgan</p><p className="truncate text-[9px]" style={{ color: textMuted }}>alex@glass.io</p></div><button className="transition hover:text-rose-500" style={{ color: textMuted }}><LogOut className="h-3.5 w-3.5" /></button></motion.div>}</AnimatePresence>
          </div>
        </div>
      </motion.aside>

      {/* Content area */}
      <div className="flex min-w-0 flex-1 flex-col p-3">
        <header className="flex h-12 shrink-0 items-center gap-3 rounded-2xl px-5 backdrop-blur-xl" style={{ background: glassBg, border: `1px solid ${glassBorder}` }}>
          <h1 className="text-[14px] font-bold capitalize" style={{ color: textPrimary }}>{NAV.find(i => i.id === active)?.label}</h1>
          <div className="flex-1" />
          <button className="flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-white/20" style={{ color: textMuted }}><Plus className="h-4 w-4" /></button>
          <button className="relative flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-white/20" style={{ color: textMuted }}><Bell className="h-4 w-4" /><span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-rose-500" /></button>
        </header>
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center"><div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl backdrop-blur-sm" style={{ background: hoverBg }}><LayoutDashboard className="h-7 w-7" strokeWidth={1.5} style={{ color: textMuted }} /></div><p className="text-[13px] font-semibold" style={{ color: textMuted }}>Select a menu item</p><p className="text-[11px]" style={{ color: textMuted }}>Content will appear here</p></div>
        </div>
      </div>
    </div>
  );
}
