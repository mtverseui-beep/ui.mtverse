"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, FolderOpen, CheckSquare, Users, BarChart3, Settings,
  ChevronLeft, Search, Bell, Plus, Star, Clock, Archive,
  HelpCircle, LogOut, Terminal, Sun, Moon, Cpu,
} from "lucide-react";
import { useSidebarTheme } from "./shared";

const EASE = [0.16, 1, 0.3, 1] as const;

const NAV = [
  { id: "dashboard", label: "root:/", icon: LayoutDashboard, section: "system" },
  { id: "projects", label: "projects.bin", icon: FolderOpen, badge: "12", section: "system" },
  { id: "tasks", label: "queue.run", icon: CheckSquare, badge: "5", section: "system" },
  { id: "team", label: "users.list", icon: Users, section: "system" },
  { id: "analytics", label: "metrics.log", icon: BarChart3, section: "monitor" },
  { id: "reports", label: "output.txt", icon: Star, section: "monitor" },
  { id: "activity", label: "trace.pid", icon: Clock, section: "monitor" },
  { id: "archive", label: "vault.zip", icon: Archive, section: "core" },
  { id: "settings", label: "config.sys", icon: Settings, section: "core" },
  { id: "help", label: "man.help", icon: HelpCircle, section: "core" },
];

export function CyberGridSidebar() {
  const { isDark, toggle } = useSidebarTheme(true); // dark default
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState("dashboard");
  const [search, setSearch] = useState("");

  const filtered = NAV.filter(i => i.label.toLowerCase().includes(search.toLowerCase()));
  const sections = filtered.reduce((acc, i) => { (acc[i.section] = acc[i.section] || []).push(i); return acc; }, {} as Record<string, typeof NAV>);

  const bg = isDark ? "#000000" : "#f8fafc";
  const sidebarBg = isDark ? "#0a0a0a" : "#ffffff";
  const border = isDark ? "#00ff8820" : "#e2e8f0";
  const textPrimary = isDark ? "#00ff88" : "#0f172a";
  const textSecondary = isDark ? "#00ff8890" : "#64748b";
  const textMuted = isDark ? "#00ff8850" : "#94a3b8";
  const sectionLabel = isDark ? "#00ff8840" : "#cbd5e1";
  const inputBg = isDark ? "#00ff8808" : "#f8fafc";
  const inputBorder = isDark ? "#00ff8820" : "#e2e8f0";
  const hoverBg = isDark ? "#00ff8808" : "#f1f5f9";
  const activeBg = isDark ? "#00ff8815" : "rgba(0,255,136,0.08)";
  const accent = "#00ff88";

  return (
    <div className="flex h-full min-h-full w-full overflow-hidden font-mono" style={{ background: bg }}>
      <motion.aside
        animate={{ width: collapsed ? 60 : 252 }}
        transition={{ duration: 0.3, ease: EASE }}
        className="relative flex h-full shrink-0 flex-col"
        style={{ background: sidebarBg, borderRight: `1px solid ${border}` }}
      >
        {/* Scanline overlay */}
        {isDark && (
          <div className="pointer-events-none absolute inset-0 z-0 opacity-20" style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,136,0.03) 2px, rgba(0,255,136,0.03) 4px)",
          }} />
        )}

        {/* Brand */}
        <div className="relative z-10 flex h-14 shrink-0 items-center gap-2.5 px-4" style={{ borderBottom: `1px solid ${border}`, justifyContent: collapsed ? "center" : "flex-start" }}>
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded" style={{ background: `${accent}15`, border: `1px solid ${accent}40`, boxShadow: isDark ? `0 0 12px ${accent}40` : "none" }}>
            <Terminal className="h-4 w-4" strokeWidth={2.2} style={{ color: accent }} />
          </div>
          <AnimatePresence>{!collapsed && <motion.div initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -6 }} transition={{ duration: 0.15 }} className="flex flex-col leading-none">
            <span className="text-[13px] font-bold" style={{ color: textPrimary }}>cyber@grid</span>
            <span className="mt-0.5 text-[9px]" style={{ color: accent }}>{"// matrix_v3"}</span>
          </motion.div>}</AnimatePresence>
          <AnimatePresence>{!collapsed && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="ml-auto flex items-center gap-1">
            <button onClick={toggle} className="flex h-7 w-7 items-center justify-center rounded transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted }}>
              {isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
            </button>
            <button onClick={() => setCollapsed(true)} className="flex h-7 w-7 items-center justify-center rounded transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted }}><ChevronLeft className="h-3.5 w-3.5" /></button>
          </motion.div>}</AnimatePresence>
        </div>

        {/* Search */}
        <div className="relative z-10 shrink-0 px-3 py-2">
          {!collapsed ? (
            <div className="relative">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2" style={{ color: textMuted }} />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="grep..."
                className="w-full rounded border py-1.5 pl-8 pr-3 text-[11px] outline-none focus:border-green-500/50"
                style={{ background: inputBg, borderColor: inputBorder, color: textPrimary }} />
            </div>
          ) : (
            <button className="flex h-8 w-full items-center justify-center rounded border transition" style={{ background: inputBg, borderColor: inputBorder, color: textMuted }}><Search className="h-3.5 w-3.5" /></button>
          )}
        </div>

        {/* Nav */}
        <nav className="relative z-10 flex-1 overflow-y-auto overflow-x-hidden px-2" style={{ scrollbarWidth: "none" }}>
          {Object.entries(sections).map(([section, items]) => (
            <div key={section} className="mb-3">
              <AnimatePresence>{!collapsed && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mb-1 px-2 text-[9px] font-bold uppercase tracking-[0.15em]" style={{ color: sectionLabel }}># {section}</motion.p>}</AnimatePresence>
              <div className="space-y-0.5">
                {items.map(item => {
                  const isActive = active === item.id;
                  const Icon = item.icon;
                  return (
                    <button key={item.id} onClick={() => setActive(item.id)} className="group relative flex w-full items-center gap-2.5 rounded px-2 py-2 text-[12px] font-medium outline-none transition"
                      style={{ color: isActive ? accent : textSecondary, background: isActive ? activeBg : "transparent", border: isActive ? `1px solid ${accent}30` : "1px solid transparent", justifyContent: collapsed ? "center" : "flex-start" }}>
                      {isActive && isDark && <div className="pointer-events-none absolute inset-0 rounded" style={{ boxShadow: `inset 0 0 12px ${accent}20` }} />}
                      {isActive && <motion.div layoutId="cyber-active-bar" className="absolute left-0 top-1/2 h-5 w-[2px] -translate-y-1/2 rounded-full" style={{ background: accent, boxShadow: isDark ? `0 0 8px ${accent}` : "none" }} transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
                      <Icon className="relative z-10 h-4 w-4 shrink-0" strokeWidth={1.8} style={{ color: isActive ? accent : textMuted, filter: isActive && isDark ? `drop-shadow(0 0 4px ${accent})` : "none" }} />
                      <AnimatePresence>{!collapsed && <motion.span initial={{ opacity: 0, x: -3 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -3 }} transition={{ duration: 0.12 }} className="relative z-10 flex-1 text-left">{item.label}</motion.span>}</AnimatePresence>
                      {!collapsed && item.badge && <span className="relative z-10 rounded px-1.5 py-0.5 text-[9px] font-bold" style={{ background: isActive ? `${accent}20` : hoverBg, color: isActive ? accent : textMuted, border: `1px solid ${accent}30` }}>{item.badge}</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* System status */}
        {!collapsed && (
          <div className="relative z-10 shrink-0 px-3 py-2" style={{ borderTop: `1px solid ${border}` }}>
            <div className="flex items-center justify-between text-[9px] font-bold" style={{ color: textMuted }}>
              <span className="flex items-center gap-1"><Cpu className="h-3 w-3" /> CPU</span>
              <span style={{ color: accent }}>98% <span className="inline-block h-1.5 w-1.5 rounded-full ml-1" style={{ background: accent, boxShadow: isDark ? `0 0 6px ${accent}` : "none" }} /></span>
            </div>
          </div>
        )}

        {collapsed && <div className="relative z-10 shrink-0 flex flex-col items-center gap-2 px-2 pb-3"><button onClick={toggle} className="flex h-7 w-7 items-center justify-center rounded transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted }}>{isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}</button><button onClick={() => setCollapsed(false)} className="flex h-8 w-full items-center justify-center rounded border transition" style={{ background: inputBg, borderColor: inputBorder, color: textMuted }}><ChevronLeft className="h-3.5 w-3.5 rotate-180" /></button></div>}

        {/* User */}
        <div className="relative z-10 shrink-0 p-2" style={{ borderTop: `1px solid ${border}` }}>
          <div className="flex items-center gap-2.5 rounded transition" style={{ justifyContent: collapsed ? "center" : "flex-start", padding: collapsed ? "0" : "0.375rem" }}>
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80" alt="Alex" className="h-7 w-7 shrink-0 rounded-full object-cover" style={{ filter: isDark ? "hue-rotate(80deg) saturate(0.8)" : "none" }} />
            <AnimatePresence>{!collapsed && <motion.div initial={{ opacity: 0, x: -3 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -3 }} transition={{ duration: 0.12 }} className="flex min-w-0 flex-1 items-center justify-between">
              <div><p className="truncate text-[11px] font-bold" style={{ color: textPrimary }}>root@matrix</p><p className="truncate text-[9px]" style={{ color: textMuted }}>uid:0 · sudo</p></div>
              <button className="transition hover:text-rose-500" style={{ color: textMuted }}><LogOut className="h-3.5 w-3.5" /></button>
            </motion.div>}</AnimatePresence>
          </div>
        </div>
      </motion.aside>

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col" style={{ background: bg }}>
        <header className="flex h-14 shrink-0 items-center gap-4 px-6" style={{ borderBottom: `1px solid ${border}` }}>
          <h1 className="text-[14px] font-bold" style={{ color: textPrimary }}>{NAV.find(i => i.id === active)?.label}<span className="ml-1 inline-block h-3 w-2 animate-pulse" style={{ background: accent }} /></h1>
          <div className="flex-1" />
          <button className="flex h-8 w-8 items-center justify-center rounded transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted }}><Plus className="h-4 w-4" /></button>
          <button className="relative flex h-8 w-8 items-center justify-center rounded transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted }}><Bell className="h-4 w-4" /><span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full" style={{ background: accent, boxShadow: isDark ? `0 0 6px ${accent}` : "none" }} /></button>
        </header>
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center"><div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded" style={{ background: hoverBg, border: `1px solid ${border}` }}><Cpu className="h-7 w-7" strokeWidth={1.5} style={{ color: textMuted }} /></div><p className="text-[13px] font-medium" style={{ color: textMuted }}>system: ready_<span className="animate-pulse">|</span></p></div>
        </div>
      </div>
    </div>
  );
}
