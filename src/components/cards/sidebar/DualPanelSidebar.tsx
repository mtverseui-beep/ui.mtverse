"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, FolderOpen, CheckSquare, Users, BarChart3, Settings,
  ChevronLeft, Search, Bell, Plus, Star, Clock, Archive,
  HelpCircle, LogOut, ChevronDown, Layers, Sun, Moon,
} from "lucide-react";
import { useSidebarTheme } from "./shared";

const EASE = [0.16, 1, 0.3, 1] as const;

const GROUPS = [
  { id: "workspace", label: "Workspace", icon: Layers, items: [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "projects", label: "Projects", icon: FolderOpen, badge: "12" },
    { id: "tasks", label: "Tasks", icon: CheckSquare, badge: "5" },
    { id: "team", label: "Team", icon: Users },
  ]},
  { id: "insights", label: "Insights", icon: BarChart3, items: [
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "reports", label: "Reports", icon: Star },
    { id: "activity", label: "Activity", icon: Clock },
  ]},
  { id: "system", label: "System", icon: Settings, items: [
    { id: "archive", label: "Archive", icon: Archive },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "help", label: "Help", icon: HelpCircle },
  ]},
];

export function DualPanelSidebar() {
  const { isDark, toggle } = useSidebarTheme(false);
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState("dashboard");
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(["workspace"]));
  const [search, setSearch] = useState("");

  function toggleGroup(id: string) {
    setExpandedGroups(prev => { const next = new Set(prev); if (next.has(id)) next.delete(id); else next.add(id); return next; });
  }

  // Theme-aware palette
  const appBg = isDark ? "#0a0a0f" : "#f8fafc";
  const sidebarBg = isDark ? "#0f0f17" : "#ffffff";
  const headerBorder = isDark ? "#1a1a24" : "#f1f5f9";
  const mainBorder = isDark ? "#1a1a24" : "#e2e8f0";
  const textPrimary = isDark ? "#ffffff" : "#0f172a";
  const textSecondary = isDark ? "rgba(255,255,255,0.5)" : "#64748b";
  const textMuted = isDark ? "rgba(255,255,255,0.35)" : "#94a3b8";
  const sectionLabel = isDark ? "rgba(255,255,255,0.4)" : "#64748b";
  const inputBg = isDark ? "#14141c" : "#f8fafc";
  const inputBorder = isDark ? "#1f1f2a" : "#e2e8f0";
  const hoverBg = isDark ? "rgba(255,255,255,0.04)" : "#f1f5f9";
  const activeColor = isDark ? "#60a5fa" : "#3b82f6";
  const activeBg = isDark ? "rgba(59,130,246,0.12)" : "rgba(59,130,246,0.08)";
  const childBorder = isDark ? "#1f1f2a" : "#e2e8f0";

  return (
    <div className="flex h-full min-h-full w-full overflow-hidden" style={{ background: appBg }}>
      <motion.aside
        animate={{ width: collapsed ? 64 : 256 }}
        transition={{ duration: 0.35, ease: EASE }}
        className="relative flex h-full shrink-0 flex-col"
        style={{ background: sidebarBg, borderRight: `1px solid ${mainBorder}` }}
      >
        {/* Brand */}
        <div className="flex h-14 shrink-0 items-center gap-2.5 px-4" style={{ borderBottom: `1px solid ${headerBorder}`, justifyContent: collapsed ? "center" : "flex-start" }}>
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/20">
            <Layers className="h-5 w-5 text-white" strokeWidth={2} />
          </div>
          <AnimatePresence>{!collapsed && <motion.div initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -6 }} transition={{ duration: 0.18 }}><span className="text-[14px] font-bold" style={{ color: textPrimary }}>Dual</span><p className="text-[9px]" style={{ color: textMuted }}>Panel Nav</p></motion.div>}</AnimatePresence>
          <AnimatePresence>{!collapsed && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="ml-auto flex items-center gap-1">
            <button onClick={toggle} className="flex h-7 w-7 items-center justify-center rounded-lg transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted }}>
              {isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
            </button>
            <motion.button onClick={() => setCollapsed(true)} className="flex h-7 w-7 items-center justify-center rounded-lg transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted }}><ChevronLeft className="h-4 w-4" /></motion.button>
          </motion.div>}</AnimatePresence>
        </div>

        {/* Search */}
        <div className="shrink-0 p-3">
          {!collapsed ? (
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2" style={{ color: textMuted }} />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..."
                className="w-full rounded-lg border py-2 pl-9 pr-3 text-[12px] outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
                style={{ background: inputBg, borderColor: inputBorder, color: textPrimary }} />
            </div>
          ) : (
            <button className="flex h-9 w-full items-center justify-center rounded-lg border transition" style={{ background: inputBg, borderColor: inputBorder, color: textMuted }}><Search className="h-4 w-4" /></button>
          )}
        </div>

        {/* Dual-level nav */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden px-2" style={{ scrollbarWidth: "none" }}>
          {GROUPS.map(group => {
            const isExpanded = expandedGroups.has(group.id);
            const filteredItems = group.items.filter(i => i.label.toLowerCase().includes(search.toLowerCase()));
            if (filteredItems.length === 0 && search) return null;
            const GroupIcon = group.icon;
            return (
              <div key={group.id} className="mb-1">
                {/* Parent */}
                <button onClick={() => toggleGroup(group.id)} className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-[12px] font-bold uppercase tracking-wider transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: sectionLabel, justifyContent: collapsed ? "center" : "flex-start" }}>
                  <GroupIcon className="h-4 w-4 shrink-0" strokeWidth={2} style={{ color: textMuted }} />
                  <AnimatePresence>{!collapsed && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 text-left">{group.label}</motion.span>}</AnimatePresence>
                  {!collapsed && <motion.span animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}><ChevronDown className="h-3.5 w-3.5" style={{ color: textMuted }} /></motion.span>}
                </button>
                {/* Children */}
                <AnimatePresence initial={false}>
                  {isExpanded && !collapsed && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: EASE }} className="overflow-hidden">
                      <div className="ml-4 pl-2 pt-1" style={{ borderLeft: `1px solid ${childBorder}` }}>
                        {filteredItems.map(item => {
                          const isActive = active === item.id;
                          const Icon = item.icon;
                          return (
                            <button key={item.id} onClick={() => setActive(item.id)} className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-[12px] font-medium transition" style={{ color: isActive ? activeColor : textSecondary, background: isActive ? activeBg : "transparent" }}>
                              <Icon className="h-3.5 w-3.5 shrink-0" strokeWidth={2} style={{ color: isActive ? activeColor : textMuted }} />
                              <span className="flex-1 text-left">{item.label}</span>
                              {item.badge && <span className="rounded-full px-1.5 py-0.5 text-[8px] font-bold" style={{ background: isActive ? "rgba(59,130,246,0.15)" : hoverBg, color: isActive ? activeColor : textMuted }}>{item.badge}</span>}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                {/* Collapsed: show dots for children */}
                {collapsed && (
                  <div className="flex flex-col items-center gap-1 py-1">
                    {filteredItems.map(item => {
                      const isActive = active === item.id;
                      const Icon = item.icon;
                      return <button key={item.id} onClick={() => setActive(item.id)} className="h-7 w-7 rounded-lg transition" style={{ background: isActive ? activeBg : "transparent" }}><Icon className="h-3.5 w-3.5 mx-auto" strokeWidth={2} style={{ color: isActive ? activeColor : textMuted }} /></button>;
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {collapsed && <div className="shrink-0 flex flex-col items-center gap-2 px-2 pb-3"><button onClick={toggle} className="flex h-7 w-7 items-center justify-center rounded-lg transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted }}>{isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}</button><button onClick={() => setCollapsed(false)} className="flex h-9 w-full items-center justify-center rounded-lg border transition" style={{ background: inputBg, borderColor: inputBorder, color: textMuted }}><ChevronLeft className="h-4 w-4 rotate-180" /></button></div>}

        {/* User */}
        <div className="shrink-0 p-2" style={{ borderTop: `1px solid ${headerBorder}` }}>
          <div className="flex items-center gap-2.5 rounded-lg transition hover:bg-black/5 dark:hover:bg-white/5" style={{ justifyContent: collapsed ? "center" : "flex-start", padding: collapsed ? "0" : "0.375rem" }}>
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80" alt="Alex" className="h-8 w-8 shrink-0 rounded-full object-cover" />
            <AnimatePresence>{!collapsed && <motion.div initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -4 }} transition={{ duration: 0.15 }} className="flex min-w-0 flex-1 items-center justify-between"><p className="truncate text-[12px] font-semibold" style={{ color: textPrimary }}>Alex Morgan</p><button className="transition hover:text-rose-500" style={{ color: textMuted }}><LogOut className="h-3.5 w-3.5" /></button></motion.div>}</AnimatePresence>
          </div>
        </div>
      </motion.aside>

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col" style={{ background: appBg }}>
        <header className="flex h-14 shrink-0 items-center gap-4 px-6" style={{ borderBottom: `1px solid ${mainBorder}`, background: sidebarBg }}>
          <h1 className="text-[14px] font-bold capitalize" style={{ color: textPrimary }}>{GROUPS.flatMap(g => g.items).find(i => i.id === active)?.label}</h1>
          <div className="flex-1" />
          <button className="flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted }}><Plus className="h-4 w-4" /></button>
          <button className="relative flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted }}><Bell className="h-4 w-4" /><span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-rose-500" /></button>
        </header>
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center"><div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: hoverBg }}><LayoutDashboard className="h-7 w-7" strokeWidth={1.5} style={{ color: textMuted }} /></div><p className="text-[13px] font-semibold" style={{ color: textMuted }}>Expand categories to browse</p></div>
        </div>
      </div>
    </div>
  );
}
