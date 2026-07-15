"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Bell, ChevronRight, ArrowUpRight, Sparkles, Code2, BookOpen,
  Layers, Zap, ShieldCheck, Users, Menu, X,
} from "lucide-react";
import { UnsplashAvatar } from "./navbar-helpers";

// ════════════════════════════════════════════════════════════════════════════
// Navbar026 — Bento (grid dropdown with mixed-size cards + hover transitions)
// Light + violet accent. "Product" hover opens a bento-grid dropdown where
// cards have mixed sizes (one large featured + smaller supporting cards).
// Each card has hover lift + icon swap.
// ════════════════════════════════════════════════════════════════════════════

const NAV = [
  { label: "Product", hasMega: true },
  { label: "Solutions" },
  { label: "Pricing" },
  { label: "Docs" },
];

const BENTO = [
  { id: 1, icon: Sparkles, title: "AI Assistant", desc: "Your 24/7 AI pair programmer", color: "#8b5cf6", span: "lg" },
  { id: 2, icon: Code2, title: "Code Editor", desc: "Edit in browser", color: "#3b82f6" },
  { id: 3, icon: Layers, title: "Components", desc: "200+ pre-built", color: "#06b6d4" },
  { id: 4, icon: Zap, title: "Deploy", desc: "1-click to prod", color: "#f59e0b" },
  { id: 5, icon: ShieldCheck, title: "Security", desc: "SOC 2 + SSO", color: "#10b981" },
  { id: 6, icon: Users, title: "Collab", desc: "Real-time editing", color: "#ec4899" },
  { id: 7, icon: BookOpen, title: "Docs", desc: "Inline + API ref", color: "#6366f1" },
];

export function Navbar026Card() {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  };

  return (
    <div
      data-navbar026
      className="min-h-full"
      style={{ background: "#fbfbfd", fontFamily: "var(--font-manrope), system-ui, sans-serif", color: "#0a0a0a" }}
    >
      <header
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className="sticky top-0 z-40 border-b border-black/5 bg-white/85 backdrop-blur-xl"
      >
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6">
          <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-2">
            <BentoLogo />
            <span className="text-xl font-bold tracking-tight">Bento</span>
          </a>
          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((n) => (
              <button
                key={n.label}
                className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${open && n.hasMega ? "bg-violet-50 text-violet-700" : "text-black/70 hover:bg-black/5"}`}
              >
                {n.label}
                {n.hasMega && <ChevronRight className={`h-3 w-3 transition-transform ${open ? "rotate-90" : ""}`} />}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button className="flex h-9 w-9 items-center justify-center rounded-lg text-black/60 hover:bg-black/5" aria-label="Search">
              <Search className="h-4 w-4" />
            </button>
            <button className="relative flex h-9 w-9 items-center justify-center rounded-lg text-black/60 hover:bg-black/5" aria-label="Notifications">
              <Bell className="h-4 w-4" />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-rose-500" />
            </button>
            <UnsplashAvatar seed="photo-1517841905240-472988babdf9" alt="User" size={32} className="rounded-full" />
            <button onClick={() => setMobileOpen(true)} className="ml-1 md:hidden" aria-label="Menu">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Bento mega dropdown */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="absolute inset-x-0 top-full border-t border-black/5 bg-white shadow-2xl"
            >
              <div className="mx-auto max-w-[1200px] px-6 py-6">
                <div className="grid grid-cols-3 gap-3" style={{ gridAutoRows: "minmax(80px, auto)" }}>
                  {BENTO.map((b, i) => (
                    <motion.a
                      key={b.id}
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className={`group relative overflow-hidden rounded-xl border border-black/5 p-4 transition-all hover:-translate-y-0.5 hover:border-black/15 hover:shadow-lg ${b.span === "lg" ? "col-span-2 row-span-2" : ""}`}
                      style={{ background: `linear-gradient(135deg, ${b.color}08, transparent)` }}
                    >
                      <div className={`flex items-start justify-between ${b.span === "lg" ? "flex-col" : ""}`}>
                        <div className={`flex items-center justify-center rounded-lg ${b.span === "lg" ? "h-12 w-12 mb-3" : "h-8 w-8 mb-2"}`} style={{ background: `${b.color}15`, color: b.color }}>
                          <b.icon className={b.span === "lg" ? "h-6 w-6" : "h-4 w-4"} />
                        </div>
                        <ArrowUpRight className="h-3.5 w-3.5 text-black/30 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                      </div>
                      <p className={`mt-2 font-semibold ${b.span === "lg" ? "text-xl" : "text-sm"}`}>{b.title}</p>
                      <p className={`text-black/50 ${b.span === "lg" ? "text-sm mt-1" : "text-[11px]"}`}>{b.desc}</p>
                      {b.span === "lg" && (
                        <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold" style={{ color: b.color }}>
                          Try it now <ArrowUpRight className="h-3 w-3" />
                        </div>
                      )}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Body */}
      <div className="px-6 py-20 text-center">
        <h1 className="mx-auto max-w-3xl text-5xl font-bold tracking-tight md:text-7xl" style={{ letterSpacing: "-0.03em" }}>
          A bento box<br />of <span style={{ color: "#8b5cf6" }}>superpowers</span>.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-lg text-black/60">
          Hover "Product" to see the bento grid dropdown.
        </p>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 right-0 z-50 w-72 bg-white p-5 md:hidden"
          >
            <button onClick={() => setMobileOpen(false)} className="absolute right-4 top-4" aria-label="Close">
              <X className="h-5 w-5" />
            </button>
            <nav className="mt-8 flex flex-col gap-1">
              {NAV.map((n) => (
                <a key={n.label} href="#" onClick={(e) => { e.preventDefault(); setMobileOpen(false); }} className="border-b border-black/5 py-3 text-base">
                  {n.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function BentoLogo() {
  return (
    <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden="true">
      <rect x="3" y="3" width="12" height="12" rx="2" fill="#8b5cf6" />
      <rect x="17" y="3" width="12" height="6" rx="2" fill="#8b5cf6" opacity="0.6" />
      <rect x="17" y="11" width="12" height="18" rx="2" fill="#8b5cf6" opacity="0.4" />
      <rect x="3" y="17" width="12" height="12" rx="2" fill="#8b5cf6" opacity="0.8" />
    </svg>
  );
}
