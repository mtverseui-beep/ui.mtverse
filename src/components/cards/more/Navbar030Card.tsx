"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Home, Compass, Bell, User, Search, MessageSquare, X, Sparkles, ArrowRight,
} from "lucide-react";
import { UnsplashAvatar } from "./navbar-helpers";

// ════════════════════════════════════════════════════════════════════════════
// Navbar030 — Orbit (announcement + floating pill dock + FAB hybrid)
// Dismissible announcement strip on top + main transparent hero header
// + a floating pill-shaped dock that sticks at the bottom with 5 icons and
// a center FAB. Clicking the FAB expands a radial action menu.
// ════════════════════════════════════════════════════════════════════════════

const DOCK = [
  { icon: Home, label: "Home" },
  { icon: Compass, label: "Discover" },
  { icon: Bell, label: "Activity" },
  { icon: MessageSquare, label: "Inbox" },
  { icon: User, label: "Profile" },
];

const FAB_ACTIONS = [
  { icon: Sparkles, label: "New post", color: "#8b5cf6" },
  { icon: Search, label: "Search", color: "#3b82f6" },
  { icon: Plus, label: "Quick add", color: "#10b981" },
];

export function Navbar030Card() {
  const [dismissed, setDismissed] = useState(false);
  const [fabOpen, setFabOpen] = useState(false);
  const [active, setActive] = useState("Home");

  return (
    <div
      data-navbar030
      className="relative flex min-h-full flex-col"
      style={{
        background: "linear-gradient(180deg, #0a0613 0%, #1a0a2e 50%, #0a0613 100%)",
        fontFamily: "var(--font-inter-tight), system-ui, sans-serif",
        color: "#ffffff",
      }}
    >
      {/* Aurora blobs */}
      <motion.div
        className="absolute top-20 left-1/4 h-72 w-72 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(168,85,247,0.25), transparent 60%)", filter: "blur(50px)" }}
        animate={{ x: [0, 80, 0], y: [0, -40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Dismissible announcement */}
      <AnimatePresence>
        {!dismissed && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="overflow-hidden bg-gradient-to-r from-violet-600 to-indigo-600"
          >
            <div className="flex items-center justify-center gap-2 px-12 py-2 text-sm text-white">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Orbit v2 just launched — explore the new universe</span>
              <a href="#" onClick={(e) => e.preventDefault()} className="inline-flex items-center gap-1 underline underline-offset-2 font-semibold">
                Read more <ArrowRight className="h-3 w-3" />
              </a>
              <button onClick={() => setDismissed(true)} className="absolute right-4 text-white/80 hover:text-white" aria-label="Dismiss">
                <X className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top transparent header */}
      <header className="sticky top-0 z-40 bg-transparent">
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6">
          <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-2">
            <OrbitLogo />
            <span className="text-xl font-bold tracking-tight">Orbit</span>
          </a>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur-md transition-colors hover:bg-white/20"
          >
            Sign in
          </a>
        </div>
      </header>

      {/* Hero body */}
      <div className="flex-1 px-6 py-20 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="mx-auto max-w-3xl text-5xl font-bold tracking-tight md:text-7xl" style={{ letterSpacing: "-0.04em" }}>
            Find your<br />
            <span style={{ background: "linear-gradient(135deg, #a78bfa, #60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              orbit.
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-md text-lg text-white/60">
            A community for builders, dreamers, and the quietly ambitious.
          </p>
        </motion.div>
      </div>

      {/* Floating pill dock */}
      <div className="sticky bottom-4 z-40 flex justify-center px-4">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative flex items-center gap-1 rounded-full border border-white/10 bg-white/10 p-1.5 backdrop-blur-2xl"
        >
          {DOCK.slice(0, 2).map((d) => (
            <DockButton key={d.label} item={d} active={active === d.label} onClick={() => setActive(d.label)} />
          ))}

          {/* Center FAB */}
          <div className="relative">
            <motion.button
              onClick={() => setFabOpen((v) => !v)}
              whileTap={{ scale: 0.9 }}
              animate={{ rotate: fabOpen ? 45 : 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="flex h-12 w-12 items-center justify-center rounded-full text-white shadow-xl"
              style={{ background: "linear-gradient(135deg, #8b5cf6, #6366f1)" }}
              aria-label="Create"
            >
              <Plus className="h-5 w-5" />
            </motion.button>

            {/* Radial FAB actions */}
            <AnimatePresence>
              {fabOpen && (
                <>
                  {FAB_ACTIONS.map((a, i) => {
                    const angle = (i - 1) * -60; // -60, 0, 60
                    const rad = (angle * Math.PI) / 180;
                    const distance = 70;
                    const x = Math.sin(rad) * distance;
                    const y = -Math.cos(rad) * distance;
                    return (
                      <motion.button
                        key={a.label}
                        initial={{ opacity: 0, x: 0, y: 0, scale: 0.5 }}
                        animate={{ opacity: 1, x, y, scale: 1 }}
                        exit={{ opacity: 0, x: 0, y: 0, scale: 0.5 }}
                        transition={{ delay: i * 0.04, type: "spring", stiffness: 400, damping: 25 }}
                        onClick={() => setFabOpen(false)}
                        className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-white shadow-lg"
                        style={{ background: a.color }}
                        aria-label={a.label}
                      >
                        <a.icon className="h-4 w-4" />
                      </motion.button>
                    );
                  })}
                </>
              )}
            </AnimatePresence>
          </div>

          {DOCK.slice(2).map((d) => (
            <DockButton key={d.label} item={d} active={active === d.label} onClick={() => setActive(d.label)} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function DockButton({ item, active, onClick }: { item: { icon: React.ComponentType<{ className?: string }>; label: string }; active: boolean; onClick: () => void }) {
  return (
    <motion.button
      whileHover={{ scale: 1.1, y: -4 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="group relative flex h-10 w-10 items-center justify-center rounded-full"
      style={{ background: active ? "rgba(255,255,255,0.15)" : "transparent", color: active ? "#fff" : "rgba(255,255,255,0.6)" }}
      aria-label={item.label}
    >
      <item.icon className="h-4 w-4" />
      <span className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-neutral-900 px-2 py-1 text-[10px] opacity-0 transition-opacity group-hover:opacity-100">
        {item.label}
      </span>
    </motion.button>
  );
}

function OrbitLogo() {
  return (
    <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden="true">
      <defs>
        <linearGradient id="ob-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
      </defs>
      <circle cx="16" cy="16" r="4" fill="url(#ob-grad)" />
      <ellipse cx="16" cy="16" rx="13" ry="6" fill="none" stroke="url(#ob-grad)" strokeWidth="1.5" opacity="0.6" />
      <ellipse cx="16" cy="16" rx="6" ry="13" fill="none" stroke="url(#ob-grad)" strokeWidth="1.5" opacity="0.6" />
      <circle cx="29" cy="16" r="2" fill="#a78bfa" />
    </svg>
  );
}
