"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, FolderOpen, CheckSquare, Users, BarChart3, Settings,
  ChevronLeft, Search, Bell, Plus, Star, Clock, Archive,
  HelpCircle, LogOut, Terminal, Sun, Moon, Activity,
} from "lucide-react";
import { useSidebarTheme } from "./shared";

const EASE = [0.16, 1, 0.3, 1] as const;

const NAV = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, section: "main", status: "online" },
  { id: "projects", label: "Projects", icon: FolderOpen, section: "main", badge: "12", status: "online" },
  { id: "tasks", label: "Tasks", icon: CheckSquare, section: "main", badge: "5", status: "idle" },
  { id: "team", label: "Team", icon: Users, section: "main", status: "online" },
  { id: "analytics", label: "Analytics", icon: BarChart3, section: "monitor", status: "online" },
  { id: "reports", label: "Reports", icon: Star, section: "monitor", status: "online" },
  { id: "activity", label: "Activity", icon: Clock, section: "monitor", status: "idle" },
  { id: "archive", label: "Archive", icon: Archive, section: "system", status: "offline" },
  { id: "settings", label: "Settings", icon: Settings, section: "system", status: "online" },
  { id: "help", label: "Help", icon: HelpCircle, section: "system", status: "online" },
];

const STATUS_COLORS = {
  online: "#10b981",
  idle: "#f59e0b",
  offline: "#6b7280",
};

export function CommandCenterSidebar() {
  const { isDark, toggle } = useSidebarTheme(true); // dark default (name has "dark" vibe)
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState("dashboard");
  const [search, setSearch] = useState("");

  const filtered = NAV.filter(i => i.label.toLowerCase().includes(search.toLowerCase()));
  const sections = filtered.reduce((acc, i) => { (acc[i.section] = acc[i.section] || []).push(i); return acc; }, {} as Record<string, typeof NAV>);

  // Theme palette
  const bg = isDark ? "#0a0a0a" : "#f8fafc";
  const sidebarBg = isDark ? "#0d0d0d" : "#ffffff";
  const border = isDark ? "#1a1a1a" : "#e2e8f0";
  const textPrimary = isDark ? "#ffffff" : "#0f172a";
  const textSecondary = isDark ? "#a3a3a3" : "#64748b";
  const textMuted = isDark ? "#525252" : "#94a3b8";
  const sectionLabel = isDark ? "#404040" : "#cbd5e1";
  const inputBg = isDark ? "#141414" : "#f8fafc";
  const inputBorder = isDark ? "#262626" : "#e2e8f0";
  const hoverBg = isDark ? "#141414" : "#f1f5f9";
  const activeBg = isDark ? "rgba(59,130,246,0.10)" : "rgba(59,130,246,0.08)";
  const accent = "#3b82f6";

  return (
    <div className="flex h-full min-h-full w-full overflow-hidden font-mono" style={{ background: bg }}>
      <motion.aside
        animate={{ width: collapsed ? 60 : 248 }}
        transition={{ duration: 0.3, ease: EASE }}
        className="relative flex h-full shrink-0 flex-col"
        style={{ background: sidebarBg, borderRight: `1px solid ${border}` }}
      >
        {/* Brand */}
        <div className="flex h-14 shrink-0 items-center gap-2.5 px-4" style={{ borderBottom: `1px solid ${border}`, justifyContent: collapsed ? "center" : "flex-start" }}>
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ background: `${accent}15`, border: `1px solid ${accent}30` }}>
            <Terminal className="h-4 w-4" strokeWidth={2.2} style={{ color: accent }} />
          </div>
          <AnimatePresence>{!collapsed && <motion.div initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -6 }} transition={{ duration: 0.15 }} className="flex flex-col leading-none">
            <span className="text-[13px] font-bold" style={{ color: textPrimary }}>cmd_center</span>
            <span className="mt-0.5 text-[9px]" style={{ color: accent }}>v2.4.1</span>
          </motion.div>}</AnimatePresence>
          <AnimatePresence>{!collapsed && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="ml-auto flex items-center gap-1">
            <button onClick={toggle} className="flex h-7 w-7 items-center justify-center rounded-md transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted }}>
              {isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
            </button>
            <button onClick={() => setCollapsed(true)} className="flex h-7 w-7 items-center justify-center rounded-md transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted }}>
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
          </motion.div>}</AnimatePresence>
        </div>

        {/* Search */}
        <div className="shrink-0 px-3 py-2">
          {!collapsed ? (
            <div className="relative">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2" style={{ color: textMuted }} />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="$ search..."
                className="w-full rounded-md border py-1.5 pl-8 pr-3 text-[11px] outline-none focus:border-blue-500/50"
                style={{ background: inputBg, borderColor: inputBorder, color: textPrimary }} />
            </div>
          ) : (
            <button className="flex h-8 w-full items-center justify-center rounded-md border transition" style={{ background: inputBg, borderColor: inputBorder, color: textMuted }}><Search className="h-3.5 w-3.5" /></button>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden px-2" style={{ scrollbarWidth: "none" }}>
          {Object.entries(sections).map(([section, items]) => (
            <div key={section} className="mb-3">
              <AnimatePresence>{!collapsed && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mb-1 px-2 text-[9px] font-bold uppercase tracking-[0.15em]" style={{ color: sectionLabel }}>{`// ${section}`}</motion.p>}</AnimatePresence>
              <div className="space-y-0.5">
                {items.map(item => {
                  const isActive = active === item.id;
                  const Icon = item.icon;
                  return (
                    <button key={item.id} onClick={() => setActive(item.id)} className="group relative flex w-full items-center gap-2.5 rounded-md px-2 py-2 text-[12px] font-medium outline-none transition"
                      style={{ color: isActive ? accent : textSecondary, background: isActive ? activeBg : "transparent", justifyContent: collapsed ? "center" : "flex-start" }}>
                      {isActive && <motion.div layoutId="cmd-active-bar" className="absolute left-0 top-1/2 h-5 w-[2px] -translate-y-1/2 rounded-full" style={{ background: accent }} transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
                      <Icon className="relative z-10 h-4 w-4 shrink-0" strokeWidth={1.8} style={{ color: isActive ? accent : textMuted }} />
                      <AnimatePresence>{!collapsed && <motion.span initial={{ opacity: 0, x: -3 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -3 }} transition={{ duration: 0.12 }} className="relative z-10 flex-1 text-left">{item.label}</motion.span>}</AnimatePresence>
                      {!collapsed && (
                        <div className="relative z-10 flex items-center gap-1.5">
                          {item.badge && <span className="rounded px-1.5 py-0.5 text-[9px] font-bold" style={{ background: isActive ? `${accent}20` : hoverBg, color: isActive ? accent : textMuted }}>{item.badge}</span>}
                          <span className="h-1.5 w-1.5 rounded-full" style={{ background: STATUS_COLORS[item.status as keyof typeof STATUS_COLORS] }} title={item.status} />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Activity sparkline */}
        {!collapsed && (
          <div className="shrink-0 px-3 py-2" style={{ borderTop: `1px solid ${border}` }}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color: textMuted }}>CPU Load</span>
              <span className="text-[10px] font-bold" style={{ color: accent }}>42%</span>
            </div>
            <div className="flex h-8 items-end gap-0.5">
              {[40, 65, 50, 80, 45, 70, 55, 90, 60, 75, 50, 85, 42].map((h, i) => (
                <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: h > 70 ? "#ef4444" : accent, opacity: 0.6 + (i / 13) * 0.4 }} />
              ))}
            </div>
          </div>
        )}

        {collapsed && <div className="shrink-0 flex flex-col items-center gap-2 px-2 pb-3"><button onClick={toggle} className="flex h-7 w-7 items-center justify-center rounded-md transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted }}>{isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}</button><button onClick={() => setCollapsed(false)} className="flex h-8 w-full items-center justify-center rounded-md border transition" style={{ background: inputBg, borderColor: inputBorder, color: textMuted }}><ChevronLeft className="h-3.5 w-3.5 rotate-180" /></button></div>}

        {/* User */}
        <div className="shrink-0 p-2" style={{ borderTop: `1px solid ${border}` }}>
          <div className="flex items-center gap-2.5 rounded-md transition" style={{ justifyContent: collapsed ? "center" : "flex-start", padding: collapsed ? "0" : "0.375rem" }}>
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80" alt="Alex" className="h-7 w-7 shrink-0 rounded-full object-cover" />
            <AnimatePresence>{!collapsed && <motion.div initial={{ opacity: 0, x: -3 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -3 }} transition={{ duration: 0.12 }} className="flex min-w-0 flex-1 items-center justify-between">
              <div><p className="truncate text-[11px] font-bold" style={{ color: textPrimary }}>alex@cmd:~$</p><p className="truncate text-[9px]" style={{ color: textMuted }}>admin · root</p></div>
              <button className="transition hover:text-rose-500" style={{ color: textMuted }}><LogOut className="h-3.5 w-3.5" /></button>
            </motion.div>}</AnimatePresence>
          </div>
        </div>
      </motion.aside>

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col" style={{ background: bg }}>
        <header className="flex h-14 shrink-0 items-center gap-4 px-6" style={{ borderBottom: `1px solid ${border}` }}>
          <h1 className="text-[14px] font-bold capitalize" style={{ color: textPrimary }}>{NAV.find(i => i.id === active)?.label}</h1>
          <div className="flex-1" />
          <button className="flex h-8 w-8 items-center justify-center rounded-md transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted }}><Plus className="h-4 w-4" /></button>
          <button className="relative flex h-8 w-8 items-center justify-center rounded-md transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted }}><Bell className="h-4 w-4" /><span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full" style={{ background: accent }} /></button>
        </header>
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center"><div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-xl" style={{ background: hoverBg }}><Activity className="h-7 w-7" strokeWidth={1.5} style={{ color: textMuted }} /></div><p className="text-[13px] font-medium" style={{ color: textMuted }}>System operational</p></div>
        </div>
      </div>
    </div>
  );
}
