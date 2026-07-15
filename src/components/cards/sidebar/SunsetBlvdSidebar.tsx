"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, FolderOpen, CheckSquare, Users, BarChart3, Settings,
  ChevronLeft, Search, Bell, Plus, Star, Clock, Archive,
  HelpCircle, LogOut, Sunset, Sun, Moon,
} from "lucide-react";
import { useSidebarTheme } from "./shared";

const EASE = [0.16, 1, 0.3, 1] as const;

const SECTIONS = [
  { name: "Today", from: "#f97316", to: "#ec4899", items: [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "projects", label: "Projects", icon: FolderOpen, badge: "12" },
    { id: "tasks", label: "Tasks", icon: CheckSquare, badge: "5" },
    { id: "team", label: "Team", icon: Users },
  ]},
  { name: "Memories", from: "#ec4899", to: "#a855f7", items: [
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "reports", label: "Reports", icon: Star },
    { id: "activity", label: "Activity", icon: Clock },
  ]},
  { name: "Settings", from: "#a855f7", to: "#6366f1", items: [
    { id: "archive", label: "Archive", icon: Archive },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "help", label: "Help", icon: HelpCircle },
  ]},
];

export function SunsetBlvdSidebar() {
  const { isDark, toggle } = useSidebarTheme(false);
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState("dashboard");
  const [search, setSearch] = useState("");

  const bg = isDark
    ? "linear-gradient(180deg, #1a0f1f 0%, #2d1438 50%, #1a0f2e 100%)"
    : "linear-gradient(180deg, #fff7ed 0%, #fdf2f8 50%, #faf5ff 100%)";
  const sidebarBg = isDark ? "rgba(30,15,35,0.6)" : "rgba(255,255,255,0.55)";
  const border = isDark ? "rgba(249,115,22,0.12)" : "rgba(249,115,22,0.20)";
  const textPrimary = isDark ? "#fef3c7" : "#7c2d12";
  const textSecondary = isDark ? "rgba(254,243,199,0.6)" : "#9a3412";
  const textMuted = isDark ? "rgba(254,243,199,0.35)" : "#c2410c";
  const inputBg = isDark ? "rgba(249,115,22,0.06)" : "rgba(249,115,22,0.05)";
  const inputBorder = isDark ? "rgba(249,115,22,0.12)" : "rgba(249,115,22,0.20)";
  const hoverBg = isDark ? "rgba(249,115,22,0.08)" : "rgba(249,115,22,0.06)";

  // Time of day indicator
  const hour = new Date().getHours();
  const timeOfDay = hour < 12 ? "Morning" : hour < 17 ? "Afternoon" : hour < 20 ? "Evening" : "Night";
  const timeColor = hour < 12 ? "#f59e0b" : hour < 17 ? "#f97316" : hour < 20 ? "#ec4899" : "#a855f7";

  return (
    <div className="relative flex h-full min-h-full w-full overflow-hidden" style={{ background: bg }}>
      {/* Warm ambient glow */}
      <div className="pointer-events-none absolute -top-20 right-10 h-72 w-72 rounded-full blur-3xl" style={{ background: "rgba(249,115,22,0.20)" }} />
      <div className="pointer-events-none absolute bottom-0 left-1/4 h-72 w-72 rounded-full blur-3xl" style={{ background: "rgba(236,72,153,0.15)" }} />

      <motion.aside
        animate={{ width: collapsed ? 68 : 260 }}
        transition={{ duration: 0.35, ease: EASE }}
        className="relative z-10 flex h-full shrink-0 flex-col m-3 rounded-3xl overflow-hidden"
        style={{
          background: sidebarBg,
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: `1px solid ${border}`,
          boxShadow: "0 8px 32px rgba(249,115,22,0.12)",
        }}
      >
        {/* Brand + time of day */}
        <div className="flex h-14 shrink-0 items-center gap-2.5 px-4" style={{ borderBottom: `1px solid ${border}`, justifyContent: collapsed ? "center" : "flex-start" }}>
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl" style={{ background: "linear-gradient(135deg, #f97316, #ec4899, #a855f7)" }}>
            <Sunset className="h-5 w-5 text-white" strokeWidth={2} />
          </div>
          <AnimatePresence>{!collapsed && <motion.div initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -6 }} transition={{ duration: 0.18 }}>
            <span className="text-[14px] font-bold" style={{ color: textPrimary }}>Sunset</span>
            <p className="text-[9px] font-medium" style={{ color: timeColor }}>Good {timeOfDay}</p>
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
                className="w-full rounded-full border py-2 pl-9 pr-3 text-[12px] outline-none focus:ring-2"
                style={{ background: inputBg, borderColor: inputBorder, color: textPrimary }} />
            </div>
          ) : (
            <button className="flex h-9 w-full items-center justify-center rounded-full transition" style={{ background: inputBg, color: textMuted }}><Search className="h-4 w-4" /></button>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden px-3" style={{ scrollbarWidth: "none" }}>
          {SECTIONS.map(sec => {
            const items = sec.items.filter(i => i.label.toLowerCase().includes(search.toLowerCase()));
            if (items.length === 0) return null;
            return (
              <div key={sec.name} className="mb-3">
                <AnimatePresence>{!collapsed && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mb-1.5 px-3 text-[9px] font-bold uppercase tracking-wider" style={{ color: sec.from }}>{sec.name}</motion.p>}</AnimatePresence>
                <div className="space-y-1">
                  {items.map(item => {
                    const isActive = active === item.id;
                    const Icon = item.icon;
                    return (
                      <button key={item.id} onClick={() => setActive(item.id)} className="group relative flex w-full items-center gap-2.5 rounded-2xl px-3 py-2.5 text-[12.5px] font-semibold outline-none transition"
                        style={{
                          color: isActive ? "#fff" : textSecondary,
                          background: isActive ? `linear-gradient(135deg, ${sec.from}, ${sec.to})` : "transparent",
                          boxShadow: isActive ? `0 4px 14px ${sec.from}50` : "none",
                          justifyContent: collapsed ? "center" : "flex-start",
                        }}>
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl transition" style={{ background: isActive ? "rgba(255,255,255,0.25)" : `${sec.from}18` }}>
                          <Icon className="h-3.5 w-3.5" strokeWidth={2.2} style={{ color: isActive ? "#fff" : sec.from }} />
                        </div>
                        <AnimatePresence>{!collapsed && <motion.span initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -4 }} transition={{ duration: 0.15 }} className="flex-1 text-left">{item.label}</motion.span>}</AnimatePresence>
                        {!collapsed && item.badge && <span className="rounded-full px-2 py-0.5 text-[9px] font-bold" style={{ background: isActive ? "rgba(255,255,255,0.25)" : `${sec.from}18`, color: isActive ? "#fff" : sec.from }}>{item.badge}</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>

        {collapsed && <div className="shrink-0 flex flex-col items-center gap-2 px-2 pb-3"><button onClick={toggle} className="flex h-7 w-7 items-center justify-center rounded-lg transition hover:bg-white/10" style={{ color: textMuted }}>{isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}</button><button onClick={() => setCollapsed(false)} className="flex h-9 w-full items-center justify-center rounded-full transition" style={{ background: inputBg, color: textMuted }}><ChevronLeft className="h-4 w-4 rotate-180" /></button></div>}

        {/* User */}
        <div className="shrink-0 p-3" style={{ borderTop: `1px solid ${border}` }}>
          <div className="flex items-center gap-2.5 rounded-2xl transition" style={{ justifyContent: collapsed ? "center" : "flex-start", padding: collapsed ? "0" : "0.5rem" }}>
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80" alt="Alex" className="h-9 w-9 shrink-0 rounded-full object-cover" style={{ border: `2px solid transparent`, backgroundImage: `linear-gradient(white, white), linear-gradient(135deg, #f97316, #ec4899)`, backgroundOrigin: "border-box", backgroundClip: "padding-box, border-box" }} />
            </div>
            <AnimatePresence>{!collapsed && <motion.div initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -4 }} transition={{ duration: 0.15 }} className="flex min-w-0 flex-1 items-center justify-between">
              <div><p className="truncate text-[12px] font-bold" style={{ color: textPrimary }}>Alex Morgan</p><p className="truncate text-[9px]" style={{ color: textMuted }}>alex@sunset.io</p></div>
              <button className="transition hover:text-rose-400" style={{ color: textMuted }}><LogOut className="h-3.5 w-3.5" /></button>
            </motion.div>}</AnimatePresence>
          </div>
        </div>
      </motion.aside>

      {/* Content */}
      <div className="relative z-10 flex min-w-0 flex-1 flex-col p-3">
        <header className="flex h-12 shrink-0 items-center gap-3 rounded-full px-5 backdrop-blur-xl" style={{ background: sidebarBg, border: `1px solid ${border}` }}>
          <h1 className="text-[14px] font-bold capitalize" style={{ color: textPrimary }}>{SECTIONS.flatMap(s => s.items).find(i => i.id === active)?.label}</h1>
          <div className="flex-1" />
          <button className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-white/10" style={{ color: textMuted }}><Plus className="h-4 w-4" /></button>
          <button className="relative flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-white/10" style={{ color: textMuted }}><Bell className="h-4 w-4" /><span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full" style={{ background: "#ec4899" }} /></button>
        </header>
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center"><div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl backdrop-blur-sm" style={{ background: hoverBg }}><Sunset className="h-7 w-7" strokeWidth={1.5} style={{ color: textMuted }} /></div><p className="text-[13px] font-semibold" style={{ color: textMuted }}>Every sunset brings a new dawn</p></div>
        </div>
      </div>
    </div>
  );
}
