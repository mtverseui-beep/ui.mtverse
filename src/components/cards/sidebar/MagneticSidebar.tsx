"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, FolderOpen, CheckSquare, Users, BarChart3, Settings,
  ChevronLeft, Search, Bell, Plus, Star, Clock, Archive,
  HelpCircle, LogOut, Magnet, Sun, Moon,
} from "lucide-react";
import { sidebarRootClassName, sidebarThemeButtonProps, useResponsiveSidebarCollapse, useSidebarTheme } from "./shared";

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

export function MagneticSidebar() {
  const { isDark, toggle } = useSidebarTheme(false);
  const { collapsed, setCollapsed, containerRef, searchInputRef, expandAndFocusSearch, reducedMotion } = useResponsiveSidebarCollapse();
  const [active, setActive] = useState("dashboard");
  const [search, setSearch] = useState("");

  const filtered = NAV.filter(i => i.label.toLowerCase().includes(search.toLowerCase()));
  const sections = filtered.reduce((acc, i) => { (acc[i.section] = acc[i.section] || []).push(i); return acc; }, {} as Record<string, typeof NAV>);

  // Theme-aware palette
  const bg = isDark
    ? "linear-gradient(180deg, #0c0c1d 0%, #131329 100%)"
    : "linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)";
  const asideBg = isDark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.7)";
  const asideBorder = isDark ? "rgba(255,255,255,0.05)" : "#e2e8f0";
  const textPrimary = isDark ? "#ffffff" : "#0f172a";
  const textSecondary = isDark ? "rgba(255,255,255,0.5)" : "#64748b";
  const textMuted = isDark ? "rgba(255,255,255,0.3)" : "#94a3b8";
  const sectionLabel = isDark ? "rgba(255,255,255,0.2)" : "#cbd5e1";
  const inputBg = isDark ? "rgba(255,255,255,0.05)" : "#f8fafc";
  const inputBorder = isDark ? "rgba(255,255,255,0.05)" : "#e2e8f0";

  return (
    <div ref={containerRef} data-theme={isDark ? "dark" : "light"} className={sidebarRootClassName(isDark, "flex h-full min-h-full w-full overflow-hidden")} style={{ background: bg }}>
      <motion.aside
        animate={{ width: collapsed ? 64 : 250 }}
        transition={{ duration: reducedMotion ? 0 : 0.35, ease: EASE }}
        className="relative flex h-full shrink-0 flex-col"
        style={{ background: asideBg, borderRight: `1px solid ${asideBorder}`, backdropFilter: "blur(20px)" }}
      >
        {/* Brand */}
        <div className="flex h-14 shrink-0 items-center gap-2.5 px-4" style={{ justifyContent: collapsed ? "center" : "flex-start" }}>
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl" style={{ background: "linear-gradient(135deg, #6366f1, #ec4899)" }}>
            <Magnet className="h-5 w-5 text-white" strokeWidth={2.2} />
          </div>
          <AnimatePresence>{!collapsed && <motion.span initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -6 }} transition={{ duration: 0.15 }} className="text-[14px] font-bold" style={{ color: textPrimary }}>Magnet</motion.span>}</AnimatePresence>
          <AnimatePresence>{!collapsed && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="ml-auto flex items-center gap-1">
            <button {...sidebarThemeButtonProps(isDark)} onClick={toggle} className="flex h-7 w-7 items-center justify-center rounded-lg transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted }}>
              {isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
            </button>
            <motion.button aria-label="Collapse sidebar" aria-expanded={!collapsed} onClick={() => setCollapsed(true)} className="flex h-7 w-7 items-center justify-center rounded-lg transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted }}><ChevronLeft className="h-3.5 w-3.5" /></motion.button>
          </motion.div>}</AnimatePresence>
        </div>

        {/* Search */}
        <div className="shrink-0 px-3 pb-2">
          {!collapsed ? (
            <input ref={searchInputRef} aria-label="Search navigation" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..."
              className="w-full rounded-xl border py-2 px-3 text-[12px] outline-none focus:border-indigo-500/30"
              style={{ background: inputBg, borderColor: inputBorder, color: textPrimary }} />
          ) : (
            <button onClick={expandAndFocusSearch} aria-label="Expand sidebar and search" className="flex h-9 w-full items-center justify-center rounded-xl border transition" style={{ background: inputBg, borderColor: inputBorder, color: textMuted }}><Search className="h-4 w-4" /></button>
          )}
        </div>

        {/* Nav with magnetic effect */}
        <nav aria-label="Primary navigation" className="flex-1 overflow-y-auto overflow-x-hidden px-2" style={{ scrollbarWidth: "none" }}>
          {Object.entries(sections).map(([section, items]) => (
            <div key={section} className="mb-2">
              <AnimatePresence>{!collapsed && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mb-1 px-2 text-[8px] font-bold uppercase tracking-[0.16em]" style={{ color: sectionLabel }}>{section}</motion.p>}</AnimatePresence>
              <div className="space-y-0.5">
                {items.map(item => {
                  const isActive = active === item.id;
                  return (
                    <MagneticItem key={item.id} item={item} isActive={isActive} onClick={() => setActive(item.id)} collapsed={collapsed} reducedMotion={reducedMotion} isDark={isDark} textPrimary={textPrimary} textSecondary={textSecondary} textMuted={textMuted} />
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {collapsed && <div className="shrink-0 flex flex-col items-center gap-2 px-2 pb-3"><button {...sidebarThemeButtonProps(isDark)} onClick={toggle} className="flex h-7 w-7 items-center justify-center rounded-lg transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted }}>{isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}</button><button aria-label="Expand sidebar" aria-expanded={!collapsed} onClick={() => setCollapsed(false)} className="flex h-9 w-full items-center justify-center rounded-xl border transition" style={{ background: inputBg, borderColor: inputBorder, color: textMuted }}><ChevronLeft className="h-4 w-4 rotate-180" /></button></div>}

        {/* User */}
        <div className="shrink-0 p-2" style={{ borderTop: `1px solid ${asideBorder}` }}>
          <div className="flex items-center gap-2.5 rounded-xl transition" style={{ justifyContent: collapsed ? "center" : "flex-start", padding: collapsed ? "0" : "0.375rem" }}>
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80" alt="Alex" className="h-8 w-8 shrink-0 rounded-full object-cover" />
            <AnimatePresence>{!collapsed && <motion.div initial={{ opacity: 0, x: -3 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -3 }} transition={{ duration: 0.12 }} className="flex min-w-0 flex-1 items-center justify-between"><p className="truncate text-[11px] font-medium" style={{ color: textPrimary }}>Alex Morgan</p><button aria-label="Log out" className="transition hover:text-rose-400" style={{ color: textMuted }}><LogOut className="h-3.5 w-3.5" /></button></motion.div>}</AnimatePresence>
          </div>
        </div>
      </motion.aside>

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 shrink-0 items-center gap-4 px-6" style={{ borderBottom: `1px solid ${asideBorder}` }}>
          <h1 className="text-[14px] font-bold capitalize" style={{ color: textPrimary }}>{NAV.find(i => i.id === active)?.label}</h1>
          <div className="flex-1" />
          <button aria-label="Add item" className="flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted }}><Plus className="h-4 w-4" /></button>
          <button aria-label="Notifications" className="relative flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted }}><Bell className="h-4 w-4" /><span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-indigo-400" /></button>
        </header>
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center"><div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)" }}><LayoutDashboard className="h-7 w-7" strokeWidth={1.5} style={{ color: textMuted }} /></div><p className="text-[13px] font-medium" style={{ color: textMuted }}>Move cursor to feel magnetic pull</p></div>
        </div>
      </div>
    </div>
  );
}

function MagneticItem({ item, isActive, onClick, collapsed, reducedMotion, isDark, textPrimary, textSecondary, textMuted }: {
  item: typeof NAV[0]; isActive: boolean; onClick: () => void; collapsed: boolean; reducedMotion: boolean;
  isDark: boolean; textPrimary: string; textSecondary: string; textMuted: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [localX, setLocalX] = useState(0);
  const Icon = item.icon;

  function handleMove(e: React.MouseEvent) {
    if (reducedMotion || !ref.current || collapsed) return;
    const rect = ref.current.getBoundingClientRect();
    const center = rect.left + rect.width / 2;
    const dist = e.clientX - center;
    const pull = Math.max(-6, Math.min(6, dist * 0.08));
    setLocalX(pull);
  }

  function handleLeave() { setLocalX(0); }

  return (
    <motion.button
      ref={ref}
      aria-label={item.label}
      aria-current={isActive ? "page" : undefined}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onFocus={handleLeave}
      animate={{ x: reducedMotion ? 0 : localX }}
      transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 20 }}
      className="group relative flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-[12px] font-medium outline-none transition focus-visible:ring-2 focus-visible:ring-indigo-400"
      style={{
        color: isActive ? (isDark ? "#fff" : "#4338ca") : textSecondary,
        background: isActive
          ? isDark
            ? "linear-gradient(90deg, rgba(99,102,241,0.2), rgba(236,72,153,0.1))"
            : "linear-gradient(90deg, rgba(99,102,241,0.12), rgba(236,72,153,0.06))"
          : "transparent",
        boxShadow: isActive ? "inset 0 0 0 1px rgba(99,102,241,0.2)" : "none",
        justifyContent: collapsed ? "center" : "flex-start",
      }}
    >
      {isActive && <motion.div layoutId="magnetic-glow" className="absolute inset-0 rounded-xl" style={{ background: "radial-gradient(circle at 20% 50%, rgba(99,102,241,0.15), transparent 70%)" }} transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
      <Icon className="relative z-10 h-4 w-4 shrink-0 transition" strokeWidth={2} style={{ color: isActive ? "#818cf8" : textMuted, filter: isActive ? "drop-shadow(0 0 6px rgba(99,102,241,0.5))" : "none" }} />
      <AnimatePresence>{!collapsed && <motion.span initial={{ opacity: 0, x: -3 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -3 }} transition={{ duration: 0.12 }} className="relative z-10 flex-1 text-left">{item.label}</motion.span>}</AnimatePresence>
      {!collapsed && item.badge && <span className="relative z-10 rounded-full px-1.5 py-0.5 text-[9px] font-bold" style={{ background: isActive ? "rgba(99,102,241,0.2)" : isDark ? "rgba(255,255,255,0.05)" : "#f1f5f9", color: isActive ? "#a5b4fc" : textMuted }}>{item.badge}</span>}
    </motion.button>
  );
}
