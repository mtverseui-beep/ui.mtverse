"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Menu, ArrowRight } from "lucide-react";
import { useScrollAware } from "./navbar-helpers";

// ════════════════════════════════════════════════════════════════════════════
// Navbar013 — Aether (detached floating glass pill + inline search expand)
// Light theme + detached floating pill (margin from edges) + nav links
// + inline search that expands to swallow nav when active.
// Mobile: bottom sheet that slides up from bottom edge.
// ════════════════════════════════════════════════════════════════════════════

const NAV = ["Features", "Pricing", "Customers", "Resources"];

export function Navbar013Card({ scrollContainerRef }: { scrollContainerRef?: React.RefObject<HTMLElement | null> }) {
  const { scrolled } = useScrollAware(30, scrollContainerRef);
  const [searchOpen, setSearchOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <div
      data-navbar013
      className="min-h-full"
      style={{
        background: "linear-gradient(180deg, #f0f4ff 0%, #e0e7ff 100%)",
        fontFamily: "var(--font-manrope), system-ui, sans-serif",
        color: "#0f172a",
      }}
    >
      <header className={`sticky top-0 z-40 px-4 pt-3 transition-all duration-500 ${scrolled ? "pt-2" : "pt-5"}`}>
        <nav
          className={`mx-auto flex items-center gap-3 rounded-2xl border border-indigo-200/60 bg-white/70 px-3 py-2 shadow-lg backdrop-blur-2xl transition-all duration-500 ${
            scrolled ? "max-w-[1000px]" : "max-w-[1100px]"
          }`}
        >
          {/* Logo */}
          <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-2 px-1">
            <AetherLogo />
            <span className="text-lg font-bold tracking-tight">Aether</span>
          </a>

          {/* Nav (hidden when search open) */}
          <nav className="hidden flex-1 items-center justify-center gap-1 md:flex">
            <AnimatePresence mode="popLayout">
              {!searchOpen && NAV.map((n) => (
                <motion.a
                  key={n}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.15 }}
                  className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-indigo-50 hover:text-indigo-700"
                >
                  {n}
                </motion.a>
              ))}
            </AnimatePresence>
          </nav>

          {/* Search bar (inline expand) */}
          <div className={`relative ${searchOpen ? "flex-1" : ""} hidden md:block`}>
            <AnimatePresence mode="wait">
              {searchOpen ? (
                <motion.div
                  key="search-open"
                  initial={{ width: 40, opacity: 0.5 }}
                  animate={{ width: "100%", opacity: 1 }}
                  exit={{ width: 40, opacity: 0.5 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-center gap-2 rounded-lg border border-indigo-200 bg-white px-3 py-1.5"
                >
                  <Search className="h-3.5 w-3.5 text-slate-400" />
                  <input
                    autoFocus
                    placeholder="Search the cosmos…"
                    className="flex-1 bg-transparent text-sm outline-none"
                    onBlur={() => setSearchOpen(false)}
                  />
                  <kbd className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-500" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
                    ESC
                  </kbd>
                </motion.div>
              ) : (
                <motion.button
                  key="search-closed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSearchOpen(true)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 hover:bg-indigo-50 hover:text-indigo-700"
                  aria-label="Search"
                >
                  <Search className="h-4 w-4" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* CTA */}
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="hidden items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-1.5 text-sm font-semibold text-white transition-all hover:scale-105 hover:bg-indigo-700 md:inline-flex"
          >
            Start free <ArrowRight className="h-3 w-3" />
          </a>

          {/* Mobile: menu button */}
          <button
            onClick={() => setSheetOpen(true)}
            className="ml-auto flex h-9 w-9 items-center justify-center rounded-lg text-slate-700 hover:bg-indigo-50 md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-4 w-4" />
          </button>
        </nav>
      </header>

      {/* Body */}
      <div className="px-6 py-20 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200 bg-white/60 px-3 py-1 text-xs font-medium text-indigo-700 backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" /> New: Aether AI v2
        </span>
        <h1 className="mx-auto mt-6 max-w-3xl text-5xl font-bold tracking-tight md:text-7xl" style={{ letterSpacing: "-0.04em" }}>
          Software for teams<br />who care about the work.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-lg text-slate-600">
          Quietly powerful. Beautifully simple. Built in Copenhagen.
        </p>
      </div>

      {/* Mobile bottom sheet */}
      <AnimatePresence>
        {sheetOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSheetOpen(false)}
              className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-sm md:hidden"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-x-0 bottom-0 z-50 rounded-t-3xl border-t border-indigo-200 bg-white p-6 md:hidden"
            >
              <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-slate-300" />
              <button
                onClick={() => setSheetOpen(false)}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
              <nav className="flex flex-col gap-1">
                {NAV.map((n, i) => (
                  <motion.a
                    key={n}
                    href="#"
                    onClick={(e) => { e.preventDefault(); setSheetOpen(false); }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.06 }}
                    className="border-b border-slate-100 py-3 text-xl font-medium text-slate-800"
                  >
                    {n}
                  </motion.a>
                ))}
              </nav>
              <a href="#" onClick={(e) => e.preventDefault()} className="mt-5 block rounded-xl bg-indigo-600 py-3 text-center text-sm font-semibold text-white">
                Start free
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function AetherLogo() {
  return (
    <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden="true">
      <defs>
        <linearGradient id="aether-nb-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#4f46e5" />
        </linearGradient>
      </defs>
      <circle cx="16" cy="16" r="14" fill="none" stroke="url(#aether-nb-grad)" strokeWidth="1" opacity="0.4" />
      <circle cx="16" cy="16" r="9" fill="none" stroke="url(#aether-nb-grad)" strokeWidth="1.5" opacity="0.7" />
      <circle cx="16" cy="16" r="4" fill="url(#aether-nb-grad)" />
    </svg>
  );
}
