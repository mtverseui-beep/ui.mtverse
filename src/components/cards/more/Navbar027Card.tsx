"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Search, Plus, Bell, User, MapPin, Heart } from "lucide-react";

// ════════════════════════════════════════════════════════════════════════════
// Navbar027 — Mobily (mobile-first bottom tab bar + center FAB)
// Designed for mobile. Top has minimal app header. Bottom has fixed tab bar
// with 4 tabs + a center FAB that scales on tap. Active tab gets a pill bg.
// Tab content swaps with a spring animation.
// ════════════════════════════════════════════════════════════════════════════

const TABS = [
  { id: "home", label: "Home", icon: Home },
  { id: "search", label: "Explore", icon: Search },
  { id: "favorites", label: "Saved", icon: Heart },
  { id: "profile", label: "Profile", icon: User },
];

export function Navbar027Card() {
  const [active, setActive] = useState("home");

  return (
    <div
      data-navbar027
      className="flex min-h-full flex-col"
      style={{ background: "#f5f5f7", fontFamily: "var(--font-manrope), system-ui, sans-serif", color: "#0a0a0a" }}
    >
      {/* Top app bar */}
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between bg-white/85 px-4 backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <MobilyLogo />
          <div>
            <p className="text-[10px] text-black/40" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>Location</p>
            <p className="flex items-center gap-1 text-xs font-semibold">
              <MapPin className="h-3 w-3 text-indigo-600" /> San Francisco
            </p>
          </div>
        </div>
        <button className="relative flex h-9 w-9 items-center justify-center rounded-full bg-black/5" aria-label="Notifications">
          <Bell className="h-4 w-4" />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-rose-500" />
        </button>
      </header>

      {/* Content area */}
      <div className="flex-1 px-4 py-5">
        <AnimatePresence mode="wait">
          {active === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-2xl font-bold tracking-tight">Good morning, Alex</p>
              <p className="mt-1 text-sm text-black/50">What would you like to do today?</p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {[
                  { label: "Tasks", value: "5 due today", color: "#6366f1" },
                  { label: "Habits", value: "3 of 5 done", color: "#10b981" },
                  { label: "Notes", value: "12 new", color: "#f59e0b" },
                  { label: "Schedule", value: "Next at 10:30", color: "#ec4899" },
                ].map((c) => (
                  <div key={c.label} className="rounded-2xl border border-black/5 bg-white p-4">
                    <p className="text-xs text-black/50">{c.label}</p>
                    <p className="mt-1 text-lg font-bold" style={{ color: c.color }}>{c.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
          {active === "search" && (
            <motion.div key="search" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <p className="text-2xl font-bold">Explore</p>
              <div className="mt-4 flex items-center gap-2 rounded-xl border border-black/10 bg-white px-3 py-2.5">
                <Search className="h-4 w-4 text-black/40" />
                <input className="flex-1 bg-transparent text-sm outline-none" placeholder="Search tasks, notes, habits…" />
              </div>
            </motion.div>
          )}
          {active === "favorites" && (
            <motion.div key="favorites" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <p className="text-2xl font-bold">Saved</p>
              <p className="mt-1 text-sm text-black/50">Your favorite items appear here.</p>
            </motion.div>
          )}
          {active === "profile" && (
            <motion.div key="profile" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <p className="text-2xl font-bold">Profile</p>
              <p className="mt-1 text-sm text-black/50">Manage your account and preferences.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom tab bar with center FAB */}
      <div className="sticky bottom-0 z-30 px-3 pb-3">
        <div className="relative mx-auto flex max-w-md items-center justify-between rounded-full border border-black/5 bg-white/90 px-3 py-2 shadow-2xl backdrop-blur-xl">
          {TABS.slice(0, 2).map((t) => (
            <TabButton key={t.id} tab={t} active={active === t.id} onClick={() => setActive(t.id)} />
          ))}
          {/* Center FAB */}
          <div className="relative -mt-8">
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => {}}
              className="flex h-14 w-14 items-center justify-center rounded-full text-white shadow-xl"
              style={{ background: "linear-gradient(135deg, #6366f1, #4f46e5)" }}
              aria-label="Create"
            >
              <Plus className="h-6 w-6" />
            </motion.button>
          </div>
          {TABS.slice(2).map((t) => (
            <TabButton key={t.id} tab={t} active={active === t.id} onClick={() => setActive(t.id)} />
          ))}
        </div>
      </div>
    </div>
  );
}

function TabButton({ tab, active, onClick }: { tab: { id: string; label: string; icon: React.ComponentType<{ className?: string }> }; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="relative flex flex-1 items-center justify-center gap-1.5 rounded-full px-3 py-2 text-xs font-medium transition-colors"
      style={{ color: active ? "#4f46e5" : "rgba(0,0,0,0.5)" }}
    >
      <tab.icon className="h-5 w-5" />
      <span className="hidden sm:inline">{tab.label}</span>
      {active && (
        <motion.span
          layoutId="navbar027-active"
          className="absolute inset-0 -z-10 rounded-full bg-indigo-50"
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
    </button>
  );
}

function MobilyLogo() {
  return (
    <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden="true">
      <defs>
        <linearGradient id="mb-nb-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#4f46e5" />
        </linearGradient>
      </defs>
      <rect x="9" y="3" width="14" height="26" rx="3" fill="url(#mb-nb-grad)" />
      <rect x="11" y="6" width="10" height="16" rx="1" fill="white" />
      <circle cx="16" cy="26" r="1.5" fill="white" />
    </svg>
  );
}
