"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home, BarChart3, Users, FileText, Settings, Bell, Search, ChevronDown, Plus,
  Command, Inbox, Calendar, MessageSquare, LogOut, User, CreditCard,
} from "lucide-react";
import { UnsplashAvatar, useDismissable } from "./navbar-helpers";

// ════════════════════════════════════════════════════════════════════════════
// Navbar011 — Dashboard product (icon rail + top bar + workspace switcher)
// Left icon rail + top bar with workspace switcher + search + notifications
// dropdown + user menu. Linear/Vercel-style dashboard chrome.
// ════════════════════════════════════════════════════════════════════════════

const RAIL = [
  { icon: Home, label: "Home", active: false },
  { icon: BarChart3, label: "Analytics", active: true },
  { icon: Users, label: "Customers", active: false },
  { icon: FileText, label: "Invoices", active: false, badge: 4 },
  { icon: Calendar, label: "Schedule", active: false },
  { icon: MessageSquare, label: "Messages", active: false, badge: 2 },
  { icon: Settings, label: "Settings", active: false },
];

const NOTIFS = [
  { id: 1, name: "Sarah Parker", action: "commented on Q4 report", time: "2m ago", unread: true },
  { id: 2, name: "System", action: "Weekly backup completed", time: "1h ago", unread: true },
  { id: 3, name: "Marcus Chen", action: "approved your expense", time: "3h ago", unread: false },
];

export function Navbar011Card() {
  const [notifOpen, setNotifOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  useDismissable(notifOpen, () => setNotifOpen(false), notifRef);
  useDismissable(userOpen, () => setUserOpen(false), userRef);

  return (
    <div
      data-navbar011
      className="flex min-h-full"
      style={{ background: "#0a0a0a", fontFamily: "var(--font-inter-tight), system-ui, sans-serif", color: "#e5e5e5" }}
    >
      {/* Icon rail */}
      <aside className="sticky top-0 flex h-screen w-14 flex-col items-center gap-1 border-r border-white/10 bg-[#0a0a0a] py-3">
        <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 text-sm font-bold text-white">
          A
        </div>
        {RAIL.map((r) => (
          <button
            key={r.label}
            className={`group relative flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
              r.active ? "bg-white/10 text-white" : "text-white/50 hover:bg-white/5 hover:text-white"
            }`}
            aria-label={r.label}
          >
            <r.icon className="h-4 w-4" />
            {r.badge && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[9px] font-bold text-white">
                {r.badge}
              </span>
            )}
            {/* Tooltip */}
            <span className="absolute left-full ml-2 hidden whitespace-nowrap rounded-md border border-white/10 bg-neutral-900 px-2 py-1 text-xs text-white shadow-lg group-hover:block">
              {r.label}
            </span>
          </button>
        ))}
      </aside>

      {/* Top bar + content */}
      <div className="flex-1">
        <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b border-white/10 bg-[#0a0a0a]/80 px-5 backdrop-blur-xl">
          {/* Workspace switcher */}
          <button className="flex items-center gap-2 rounded-lg border border-white/10 px-2.5 py-1.5 text-sm hover:bg-white/5">
            <div className="flex h-5 w-5 items-center justify-center rounded bg-gradient-to-br from-emerald-400 to-cyan-500 text-[10px] font-bold text-white">
              P
            </div>
            <span className="font-medium">Production</span>
            <ChevronDown className="h-3.5 w-3.5 text-white/40" />
          </button>

          {/* Breadcrumb */}
          <div className="hidden items-center gap-1.5 text-sm text-white/40 md:flex" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
            <span>Analytics</span>
            <span>/</span>
            <span className="text-white/80">Overview</span>
          </div>

          {/* Search */}
          <button className="ml-auto hidden items-center gap-2 rounded-lg border border-white/10 px-3 py-1.5 text-sm text-white/40 hover:bg-white/5 md:flex">
            <Search className="h-3.5 w-3.5" />
            <span>Search…</span>
            <kbd className="rounded bg-white/5 px-1.5 py-0.5 text-[10px]" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
              ⌘K
            </kbd>
          </button>

          {/* Notifications */}
          <div ref={notifRef} className="relative">
            <button
              onClick={() => setNotifOpen((v) => !v)}
              className="relative flex h-9 w-9 items-center justify-center rounded-lg text-white/60 hover:bg-white/5 hover:text-white"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-rose-500" />
            </button>
            <AnimatePresence>
              {notifOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-1 w-80 overflow-hidden rounded-xl border border-white/10 bg-neutral-900 shadow-2xl"
                >
                  <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
                    <span className="text-sm font-medium">Notifications</span>
                    <button className="text-[11px] text-violet-400 hover:text-violet-300">Mark all read</button>
                  </div>
                  <div className="max-h-72 overflow-y-auto">
                    {NOTIFS.map((n) => (
                      <button key={n.id} className="flex w-full items-start gap-2.5 border-b border-white/5 px-4 py-3 text-left hover:bg-white/5">
                        {n.unread && <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-violet-500" />}
                        <div className={n.unread ? "" : "ml-4"}>
                          <p className="text-xs"><span className="font-medium text-white">{n.name}</span> <span className="text-white/60">{n.action}</span></p>
                          <p className="mt-0.5 text-[11px] text-white/40">{n.time}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                  <button className="block w-full py-2.5 text-center text-xs text-violet-400 hover:bg-white/5">
                    View all
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User menu */}
          <div ref={userRef} className="relative">
            <button
              onClick={() => setUserOpen((v) => !v)}
              className="flex items-center gap-2 rounded-lg hover:bg-white/5"
            >
              <UnsplashAvatar seed="photo-1438761681033-6461ffad8d80" alt="User" size={32} className="rounded-full" />
              <ChevronDown className="h-3.5 w-3.5 text-white/40" />
            </button>
            <AnimatePresence>
              {userOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-1 w-56 overflow-hidden rounded-xl border border-white/10 bg-neutral-900 shadow-2xl"
                >
                  <div className="border-b border-white/10 p-3">
                    <p className="text-sm font-medium text-white">Mia Wallace</p>
                    <p className="text-xs text-white/50">mia@acme.com</p>
                  </div>
                  <div className="p-1">
                    {[
                      { icon: User, label: "Your profile" },
                      { icon: CreditCard, label: "Billing" },
                      { icon: Settings, label: "Settings" },
                      { icon: Plus, label: "Invite teammates" },
                    ].map((m) => (
                      <button key={m.label} className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm text-white/80 hover:bg-white/5">
                        <m.icon className="h-3.5 w-3.5 text-white/50" /> {m.label}
                      </button>
                    ))}
                  </div>
                  <div className="border-t border-white/10 p-1">
                    <button className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm text-rose-400 hover:bg-white/5">
                      <LogOut className="h-3.5 w-3.5" /> Sign out
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </header>

        {/* Dashboard body */}
        <div className="p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              { label: "Revenue", value: "$84,210", trend: "+12.4%", color: "#10b981" },
              { label: "Active users", value: "12,847", trend: "+3.2%", color: "#06b6d4" },
              { label: "Conversion", value: "3.4%", trend: "-0.8%", color: "#f59e0b" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
                <p className="text-xs uppercase tracking-wider text-white/40">{s.label}</p>
                <p className="mt-2 text-2xl font-bold text-white" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>{s.value}</p>
                <p className="mt-1 text-xs" style={{ color: s.color }}>{s.trend} vs last week</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
