"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, FolderOpen, CheckSquare, Users, BarChart3, Settings,
  Search, Bell, Plus, Star, Clock, Archive, HelpCircle, LogOut, Grid3x3, Sun, Moon,
} from "lucide-react";
import { useSidebarTheme } from "./shared";

const EASE = [0.16, 1, 0.3, 1] as const;

const TILES = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, color: "#6366f1", span: 2 },
  { id: "projects", label: "Projects", icon: FolderOpen, color: "#8b5cf6", span: 1, badge: "12" },
  { id: "tasks", label: "Tasks", icon: CheckSquare, color: "#ec4899", span: 1, badge: "5" },
  { id: "team", label: "Team", icon: Users, color: "#f59e0b", span: 2 },
  { id: "analytics", label: "Analytics", icon: BarChart3, color: "#10b981", span: 1 },
  { id: "reports", label: "Reports", icon: Star, color: "#06b6d4", span: 1 },
  { id: "activity", label: "Activity", icon: Clock, color: "#3b82f6", span: 2 },
  { id: "archive", label: "Archive", icon: Archive, color: "#a855f7", span: 1 },
  { id: "settings", label: "Settings", icon: Settings, color: "#64748b", span: 1 },
  { id: "help", label: "Help", icon: HelpCircle, color: "#94a3b8", span: 2 },
];

export function AuroraBentoSidebar() {
  const { isDark, toggle } = useSidebarTheme(false);
  const [active, setActive] = useState("dashboard");
  const [search, setSearch] = useState("");

  const filtered = TILES.filter(t => t.label.toLowerCase().includes(search.toLowerCase()));

  // Theme-aware palette
  const appBg = isDark ? "#0a0a0f" : "#f8fafc";
  const sidebarBg = isDark ? "#0f0f17" : "#ffffff";
  const headerBorder = isDark ? "#1a1a24" : "#f1f5f9";
  const mainBorder = isDark ? "#1a1a24" : "#e2e8f0";
  const textPrimary = isDark ? "#ffffff" : "#0f172a";
  const textSecondary = isDark ? "rgba(255,255,255,0.6)" : "#475569";
  const textMuted = isDark ? "rgba(255,255,255,0.4)" : "#94a3b8";
  const tileBg = isDark ? "#14141c" : "#f8fafc";
  const tileBorder = isDark ? "#1f1f2a" : "#e2e8f0";
  const inputBg = isDark ? "#14141c" : "#f8fafc";
  const inputBorder = isDark ? "#1f1f2a" : "#e2e8f0";

  return (
    <div className="flex h-full min-h-full w-full overflow-hidden" style={{ background: appBg }}>
      <aside className="relative flex h-full shrink-0 flex-col" style={{ width: 340, background: sidebarBg, borderRight: `1px solid ${mainBorder}` }}>
        {/* Brand */}
        <div className="flex h-14 shrink-0 items-center gap-2.5 px-5" style={{ borderBottom: `1px solid ${headerBorder}` }}>
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 shadow-lg shadow-indigo-500/20">
            <Grid3x3 className="h-5 w-5 text-white" strokeWidth={2} />
          </div>
          <div><span className="text-[14px] font-bold" style={{ color: textPrimary }}>Bento</span><p className="text-[9px]" style={{ color: textMuted }}>Grid Nav</p></div>
          <button onClick={toggle} className="ml-auto flex h-7 w-7 items-center justify-center rounded-lg transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted }}>
            {isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
          </button>
        </div>

        {/* Search */}
        <div className="shrink-0 p-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2" style={{ color: textMuted }} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..."
              className="w-full rounded-2xl border py-2.5 pl-10 pr-4 text-[12px] outline-none focus:ring-2 focus:ring-indigo-100"
              style={{ background: inputBg, borderColor: inputBorder, color: textPrimary }} />
          </div>
        </div>

        {/* Bento grid nav */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden px-4 pb-4" style={{ scrollbarWidth: "none" }}>
          <div className="grid grid-cols-2 gap-2.5">
            {filtered.map((tile, i) => {
              const isActive = active === tile.id;
              const Icon = tile.icon;
              return (
                <motion.button
                  key={tile.id}
                  onClick={() => setActive(tile.id)}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.04, duration: 0.3, ease: EASE }}
                  whileHover={{ y: -2 }}
                  className="group relative flex flex-col gap-2 rounded-2xl p-3 text-left outline-none transition"
                  style={{
                    gridColumn: tile.span === 2 ? "span 2" : "span 1",
                    background: isActive ? tile.color : tileBg,
                    border: isActive ? "none" : `1px solid ${tileBorder}`,
                    boxShadow: isActive ? `0 8px 20px ${tile.color}30` : "none",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl transition" style={{ background: isActive ? "rgba(255,255,255,0.2)" : `${tile.color}12` }}>
                      <Icon className="h-4 w-4" strokeWidth={2.2} style={{ color: isActive ? "#fff" : tile.color }} />
                    </div>
                    {tile.badge && <span className="rounded-full px-1.5 py-0.5 text-[8px] font-bold" style={{ background: isActive ? "rgba(255,255,255,0.2)" : `${tile.color}12`, color: isActive ? "#fff" : tile.color }}>{tile.badge}</span>}
                  </div>
                  <span className="text-[12px] font-semibold" style={{ color: isActive ? "#fff" : textSecondary }}>{tile.label}</span>
                </motion.button>
              );
            })}
          </div>
        </nav>

        {/* User — wide tile */}
        <div className="shrink-0 p-4" style={{ borderTop: `1px solid ${headerBorder}` }}>
          <div className="flex items-center gap-2.5 rounded-2xl p-2.5 transition hover:bg-black/5 dark:hover:bg-white/5" style={{ border: `1px solid ${tileBorder}` }}>
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 text-[11px] font-bold text-white ring-2 ring-white/20">AM</div>
            <div className="min-w-0 flex-1"><p className="truncate text-[12px] font-semibold" style={{ color: textPrimary }}>Alex Morgan</p><p className="truncate text-[10px]" style={{ color: textMuted }}>alex@bento.io</p></div>
            <button className="flex h-7 w-7 items-center justify-center rounded-lg transition hover:text-rose-500" style={{ color: textMuted }}><LogOut className="h-3.5 w-3.5" /></button>
          </div>
        </div>
      </aside>

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col" style={{ background: appBg }}>
        <header className="flex h-14 shrink-0 items-center gap-4 px-6" style={{ borderBottom: `1px solid ${mainBorder}`, background: sidebarBg }}>
          <h1 className="text-[14px] font-bold capitalize" style={{ color: textPrimary }}>{TILES.find(t => t.id === active)?.label}</h1>
          <div className="flex-1" />
          <button className="flex h-8 w-8 items-center justify-center rounded-xl transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted }}><Plus className="h-4 w-4" /></button>
          <button className="relative flex h-8 w-8 items-center justify-center rounded-xl transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted }}><Bell className="h-4 w-4" /><span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-rose-500" /></button>
        </header>
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center"><div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: tileBg }}><LayoutDashboard className="h-7 w-7" strokeWidth={1.5} style={{ color: textMuted }} /></div><p className="text-[13px] font-semibold" style={{ color: textMuted }}>Select a tile</p><p className="text-[11px]" style={{ color: textMuted }}>Content will appear here</p></div>
        </div>
      </div>
    </div>
  );
}
