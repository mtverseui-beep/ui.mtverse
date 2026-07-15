"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import {
  Menu, ArrowRight, Search, BookOpen, PlayCircle, FileText, Newspaper, X,
} from "lucide-react";
import { useScrollAware } from "./navbar-helpers";

// ════════════════════════════════════════════════════════════════════════════
// Navbar024 — Pinpoint (sticky shrinking with progress bar + mega)
// White bg. Tall → compact on scroll. Top has a scroll-progress bar.
// LayoutId sliding active underline + Resources mega-dropdown.
// Blue (#0066ff) accent.
// ════════════════════════════════════════════════════════════════════════════

const ACCENT = "#0066ff";
const NAV = ["Overview", "Features", "Resources", "Pricing", "Company"];

const RESOURCES = [
  { icon: BookOpen, title: "Documentation", desc: "Guides & API reference" },
  { icon: PlayCircle, title: "Tutorials", desc: "Learn by building" },
  { icon: FileText, title: "Templates", desc: "Start from a blueprint" },
  { icon: Newspaper, title: "Blog", desc: "Product & engineering" },
];

export function Navbar024Card({ scrollContainerRef }: { scrollContainerRef?: React.RefObject<HTMLElement | null> }) {
  const { scrolled, progress, hidden } = useScrollAware(40, scrollContainerRef);
  const [active, setActive] = useState("Overview");
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div
      data-navbar024
      className="min-h-full"
      style={{ background: "#ffffff", fontFamily: "var(--font-inter-tight), system-ui, sans-serif", color: "#0a0a0a" }}
    >
      {/* Progress bar */}
      <div className="fixed inset-x-0 top-0 z-50 h-0.5 bg-black/5">
        <motion.div
          className="h-full"
          style={{ background: ACCENT, width: `${progress * 100}%` }}
        />
      </div>

      <motion.header
        animate={{ y: hidden && !menuOpen ? -100 : 0 }}
        transition={{ duration: 0.3 }}
        className="sticky top-0 z-40 border-b border-black/5 bg-white/85 backdrop-blur-xl"
      >
        <div className={`mx-auto flex max-w-[1200px] items-center justify-between px-6 transition-all duration-300 ${scrolled ? "h-12" : "h-20"}`}>
          {/* Logo + tagline (morphs on scroll) */}
          <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-2.5">
            <PinpointLogo />
            <div className="flex flex-col">
              <span className={`font-bold tracking-tight transition-all ${scrolled ? "text-base" : "text-xl"}`}>Pinpoint</span>
              {!scrolled && (
                <motion.span
                  initial={{ opacity: 1 }}
                  animate={{ opacity: scrolled ? 0 : 1 }}
                  className="text-[10px] text-black/40"
                  style={{ fontFamily: "var(--font-jetbrains), monospace" }}
                >
                  Observability platform
                </motion.span>
              )}
            </div>
          </a>

          {/* Nav with sliding underline */}
          <LayoutGroup>
            <nav className="relative hidden items-center gap-1 md:flex">
              {NAV.map((n) => (
                <button
                  key={n}
                  onMouseEnter={() => n === "Resources" && setMenuOpen(true)}
                  onClick={() => setActive(n)}
                  className="relative px-3 py-2 text-sm transition-colors"
                  style={{ color: active === n ? "#0a0a0a" : "rgba(0,0,0,0.6)", fontWeight: active === n ? 600 : 400 }}
                >
                  {n}
                  {active === n && (
                    <motion.span
                      layoutId="navbar024-underline"
                      className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full"
                      style={{ background: ACCENT }}
                    />
                  )}
                </button>
              ))}
            </nav>
          </LayoutGroup>

          {/* Search + CTA */}
          <div className="flex items-center gap-2">
            <button className="hidden h-9 w-9 items-center justify-center rounded-lg text-black/60 hover:bg-black/5 md:flex" aria-label="Search">
              <Search className="h-4 w-4" />
            </button>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="hidden items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold text-white transition-all hover:scale-105 md:inline-flex"
              style={{ background: ACCENT }}
            >
              Start free <ArrowRight className="h-3 w-3" />
            </a>
            <button onClick={() => setMobileOpen(true)} className="md:hidden" aria-label="Menu">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Resources mega dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              onMouseLeave={() => setMenuOpen(false)}
              transition={{ duration: 0.18 }}
              className="absolute inset-x-0 top-full hidden border-t border-black/5 bg-white shadow-2xl md:block"
            >
              <div className="mx-auto max-w-[1200px] px-6 py-6">
                <div className="grid grid-cols-4 gap-3">
                  {RESOURCES.map((r) => (
                    <a
                      key={r.title}
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="group rounded-xl border border-black/5 p-4 transition-all hover:-translate-y-0.5 hover:border-black/10 hover:shadow-md"
                    >
                      <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: `${ACCENT}15`, color: ACCENT }}>
                        <r.icon className="h-4 w-4" />
                      </div>
                      <p className="text-sm font-semibold">{r.title}</p>
                      <p className="text-xs text-black/50">{r.desc}</p>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Body */}
      <div className="px-6 py-20 text-center">
        <h1 className="mx-auto max-w-3xl text-5xl font-bold tracking-tight md:text-7xl" style={{ letterSpacing: "-0.04em" }}>
          See everything.<br />Fix anything.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-lg text-black/60">
          Metrics, traces, logs, and synthetics — unified in one observability platform.
        </p>
        <p className="mt-8 text-xs uppercase tracking-wider text-black/40" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
          ↓ Scroll to see the navbar shrink + progress bar fill
        </p>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-50 bg-black/30 md:hidden"
            />
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
                  <a key={n} href="#" onClick={(e) => { e.preventDefault(); setMobileOpen(false); }} className="border-b border-black/5 py-3 text-base">
                    {n}
                  </a>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function PinpointLogo() {
  return (
    <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden="true">
      <defs>
        <linearGradient id="pp-nb-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#0066ff" />
        </linearGradient>
      </defs>
      <path d="M16 2 C9 2 4 7 4 14 c0 8 12 16 12 16 s12-8 12-16 c0-7-5-12-12-12 z" fill="url(#pp-nb-grad)" />
      <circle cx="16" cy="14" r="4" fill="white" />
      <circle cx="16" cy="14" r="2" fill="url(#pp-nb-grad)" />
    </svg>
  );
}
