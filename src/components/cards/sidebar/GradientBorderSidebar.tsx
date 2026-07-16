"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, FolderOpen, CheckSquare, Users, BarChart3, Settings,
  ChevronLeft, Search, Bell, Plus, Star, Clock, Archive,
  HelpCircle, LogOut, Hexagon,
} from "lucide-react";
import { SidebarThemeToggle, sidebarRootClassName, useResponsiveSidebarCollapse, useSidebarTheme } from "./shared";

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

export function GradientBorderSidebar() {
  const { isDark, toggle } = useSidebarTheme(false);
  const { collapsed, setCollapsed, containerRef, searchInputRef, expandAndFocusSearch, reducedMotion } = useResponsiveSidebarCollapse();
  const [active, setActive] = useState("dashboard");
  const [search, setSearch] = useState("");
  const [hovered, setHovered] = useState<string | null>(null);

  const filtered = NAV.filter(i => i.label.toLowerCase().includes(search.toLowerCase()));
  const sections = filtered.reduce((acc, i) => { (acc[i.section] = acc[i.section] || []).push(i); return acc; }, {} as Record<string, typeof NAV>);

  // Theme-aware palette
  const bg = isDark ? "#0f0f14" : "#f8fafc";
  const cardBg = isDark ? "#12121a" : "#ffffff";
  const textPrimary = isDark ? "#ffffff" : "#0f172a";
  const textSecondary = isDark ? "#71717a" : "#64748b";
  const textMuted = isDark ? "#52525b" : "#94a3b8";
  const border = isDark ? "rgba(255,255,255,0.05)" : "#e2e8f0";
  const sectionLabel = isDark ? "#3f3f46" : "#cbd5e1";
  const inputBg = isDark ? "rgba(255,255,255,0.05)" : "#f8fafc";
  const inputBorder = isDark ? "rgba(255,255,255,0.05)" : "#e2e8f0";
  const hoverBg = isDark ? "rgba(255,255,255,0.05)" : "#f1f5f9";

  return (
    <div ref={containerRef} data-theme={isDark ? "dark" : "light"} className={sidebarRootClassName(isDark, "flex h-full min-h-full w-full overflow-hidden")} style={{ background: bg }}>
      <motion.aside
        animate={{ width: collapsed ? 64 : 250 }}
        transition={{ duration: reducedMotion ? 0 : 0.35, ease: EASE }}
        className="relative flex h-full shrink-0 flex-col p-2"
      >
        {/* Animated gradient border wrapper */}
        <div className="relative flex h-full flex-col overflow-hidden rounded-2xl" style={{ background: cardBg }}>
          {/* Gradient border glow */}
          <motion.div className="pointer-events-none absolute inset-0 rounded-2xl"
            animate={reducedMotion ? { backgroundPosition: "50% 50%" } : { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={reducedMotion ? { duration: 0 } : { duration: 6, ease: "linear", repeat: Infinity }}
            style={{
              padding: "1px",
              backgroundImage: "linear-gradient(120deg, #f43f5e, #a855f7, #3b82f6, #10b981, #f43f5e)",
              backgroundPosition: "0% 50%",
              backgroundSize: "300% 300%",
              WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
              opacity: isDark ? 0.6 : 0.4,
            }} />
          {/* Glow accent on active */}
          {active && <div className="pointer-events-none absolute -left-4 top-20 h-32 w-32 rounded-full blur-3xl" style={{ background: "rgba(168,85,247,0.15)" }} />}

          {/* Brand */}
          <div className="relative flex h-14 shrink-0 items-center gap-2.5 px-4" style={{ justifyContent: collapsed ? "center" : "flex-start" }}>
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl" style={{ background: "linear-gradient(135deg, #f43f5e, #a855f7)" }}>
              <Hexagon className="h-5 w-5 text-white" strokeWidth={2.2} />
            </div>
            <AnimatePresence>{!collapsed && <motion.span initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -6 }} transition={{ duration: 0.15 }} className="text-[14px] font-bold" style={{ color: textPrimary }}>Neon</motion.span>}</AnimatePresence>
            <AnimatePresence>{!collapsed && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="ml-auto flex items-center gap-1">
              <SidebarThemeToggle isDark={isDark} onToggle={toggle} lightColor={textMuted} darkColor="rgba(255,255,255,0.5)" />
              <motion.button aria-label="Collapse sidebar" aria-expanded={!collapsed} onClick={() => setCollapsed(true)} className="flex h-7 w-7 items-center justify-center rounded-lg transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted }}><ChevronLeft className="h-3.5 w-3.5" /></motion.button>
            </motion.div>}</AnimatePresence>
          </div>

          {/* Search */}
          <div className="relative shrink-0 px-3 pb-2">
            {!collapsed ? (
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2" style={{ color: textMuted }} />
                <input ref={searchInputRef} aria-label="Search navigation" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..."
                  className="w-full rounded-xl border py-2 pl-9 pr-3 text-[12px] outline-none focus:border-purple-500/40 focus:ring-1 focus:ring-purple-500/20"
                  style={{ background: inputBg, borderColor: inputBorder, color: textPrimary }} />
              </div>
            ) : (
              <button onClick={expandAndFocusSearch} aria-label="Expand sidebar and search" className="flex h-9 w-full items-center justify-center rounded-xl border transition" style={{ background: inputBg, borderColor: inputBorder, color: textMuted }}><Search className="h-4 w-4" /></button>
            )}
          </div>

          {/* Nav */}
          <nav aria-label="Primary navigation" className="relative flex-1 overflow-y-auto overflow-x-hidden px-2" style={{ scrollbarWidth: "none" }}>
            {Object.entries(sections).map(([section, items]) => (
              <div key={section} className="mb-2">
                <AnimatePresence>{!collapsed && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mb-1 px-2.5 text-[8px] font-bold uppercase tracking-[0.16em]" style={{ color: sectionLabel }}>{section}</motion.p>}</AnimatePresence>
                <div className="space-y-0.5">
                  {items.map(item => {
                    const isActive = active === item.id;
                    const isHovered = hovered === item.id;
                    const Icon = item.icon;
                    return (
                      <button key={item.id} aria-label={item.label} aria-current={isActive ? "page" : undefined} onClick={() => setActive(item.id)} onMouseEnter={() => setHovered(item.id)} onMouseLeave={() => setHovered(null)} onFocus={() => setHovered(item.id)} onBlur={() => setHovered(null)} className="group relative flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-[12px] font-medium outline-none transition focus-visible:ring-2 focus-visible:ring-purple-400"
                        style={{
                          color: isActive ? (isDark ? "#fff" : "#a855f7") : textSecondary,
                          background: isActive
                            ? "linear-gradient(135deg, rgba(244,63,94,0.12), rgba(168,85,247,0.12))"
                            : isHovered ? hoverBg : "transparent",
                          boxShadow: isActive ? "inset 0 0 0 1px rgba(168,85,247,0.25)" : "none",
                          justifyContent: collapsed ? "center" : "flex-start"
                        }}>
                        <Icon className="relative z-10 h-4 w-4 shrink-0 transition" strokeWidth={2} style={{ color: isActive ? "#a855f7" : textMuted, filter: isActive ? "drop-shadow(0 0 4px rgba(168,85,247,0.5))" : "none" }} />
                        <AnimatePresence>{!collapsed && <motion.span initial={{ opacity: 0, x: -3 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -3 }} transition={{ duration: 0.12 }} className="relative z-10 flex-1 text-left">{item.label}</motion.span>}</AnimatePresence>
                        {!collapsed && item.badge && <span className="relative z-10 rounded-full px-1.5 py-0.5 text-[9px] font-bold" style={{ background: isActive ? "rgba(168,85,247,0.2)" : isDark ? "rgba(255,255,255,0.05)" : "#f1f5f9", color: isActive ? "#c084fc" : textMuted }}>{item.badge}</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          {collapsed && <div className="relative shrink-0 flex flex-col items-center gap-2 px-2 pb-3"><SidebarThemeToggle isDark={isDark} onToggle={toggle} lightColor={textMuted} darkColor="rgba(255,255,255,0.5)" /><button aria-label="Expand sidebar" aria-expanded={!collapsed} onClick={() => setCollapsed(false)} className="flex h-9 w-full items-center justify-center rounded-xl border transition" style={{ background: inputBg, borderColor: inputBorder, color: textMuted }}><ChevronLeft className="h-4 w-4 rotate-180" /></button></div>}

          {/* User */}
          <div className="relative shrink-0 p-2" style={{ borderTop: `1px solid ${border}` }}>
            <div className="flex items-center gap-2.5 rounded-xl transition" style={{ justifyContent: collapsed ? "center" : "flex-start", padding: collapsed ? "0" : "0.375rem" }}>
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80" alt="Alex Morgan" className="h-8 w-8 shrink-0 rounded-full object-cover" style={{ boxShadow: "0 0 8px rgba(168,85,247,0.3)" }} />
              <AnimatePresence>{!collapsed && <motion.div initial={{ opacity: 0, x: -3 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -3 }} transition={{ duration: 0.12 }} className="flex min-w-0 flex-1 items-center justify-between"><p className="truncate text-[11px] font-medium" style={{ color: textPrimary }}>Alex Morgan</p><button aria-label="Log out" className="transition hover:text-rose-400" style={{ color: textMuted }}><LogOut className="h-3.5 w-3.5" /></button></motion.div>}</AnimatePresence>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col" style={{ background: bg }}>
        <header className="flex h-14 shrink-0 items-center gap-4 px-6" style={{ borderBottom: `1px solid ${border}` }}>
          <h1 className="text-[14px] font-bold capitalize" style={{ color: textPrimary }}>{NAV.find(i => i.id === active)?.label}</h1>
          <div className="flex-1" />
          <button aria-label="Add item" className="flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted }}><Plus className="h-4 w-4" /></button>
          <button aria-label="Notifications" className="relative flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-black/5 dark:hover:bg-white/5" style={{ color: textMuted }}><Bell className="h-4 w-4" /><span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full" style={{ background: "#a855f7" }} /></button>
        </header>
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center"><div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: hoverBg }}><LayoutDashboard className="h-7 w-7" strokeWidth={1.5} style={{ color: textMuted }} /></div><p className="text-[13px] font-medium" style={{ color: textMuted }}>Select a menu item</p></div>
        </div>
      </div>
    </div>
  );
}
