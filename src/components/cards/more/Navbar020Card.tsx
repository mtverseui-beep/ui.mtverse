"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, TrendingUp, ArrowUpRight, Sparkles, ArrowRight } from "lucide-react";

// ════════════════════════════════════════════════════════════════════════════
// Navbar020 — Seekr (search-focused navbar with expandable takeover)
// Center logo + minimal nav + search button that expands into a full
// takeover overlay with trending searches, recent searches, and suggestions.
// ════════════════════════════════════════════════════════════════════════════

const NAV = ["Discover", "Collections", "Pricing"];
const TRENDING = ["Minimalist workspace", "Mid-century modern", "Sustainable fashion", "Editorial photography", "Brutalist architecture"];
const RECENT = ["Linen shirts", "Ceramic vases", "Saffron spice"];

export function Navbar020Card() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      data-navbar020
      className="min-h-full"
      style={{ background: "#0a0a0a", fontFamily: "var(--font-inter-tight), system-ui, sans-serif", color: "#fafafa" }}
    >
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0a0a0a]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between px-6">
          <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-2">
            <SeekrLogo />
            <span className="text-lg font-bold tracking-tight">Seekr</span>
          </a>
          <nav className="hidden items-center gap-6 md:flex">
            {NAV.map((n) => (
              <a key={n} href="#" onClick={(e) => e.preventDefault()} className="group relative text-sm text-white/70 transition-colors hover:text-white">
                {n}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-amber-300 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button
              onClick={() => { setSearchOpen(true); setTimeout(() => inputRef.current?.focus(), 100); }}
              className="flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/60 hover:bg-white/5"
            >
              <Search className="h-3.5 w-3.5" /> Search
              <kbd className="rounded bg-white/10 px-1.5 py-0.5 text-[10px]" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>/</kbd>
            </button>
            <a href="#" onClick={(e) => e.preventDefault()} className="hidden rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-black md:inline-block">
              Sign up
            </a>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="px-6 py-24 text-center">
        <Sparkles className="mx-auto h-10 w-10 text-amber-300" />
        <h1 className="mx-auto mt-6 max-w-3xl text-5xl font-bold tracking-tight md:text-7xl" style={{ letterSpacing: "-0.04em" }}>
          Find what you're<br />
          <span style={{ background: "linear-gradient(135deg, #fbbf24, #f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>looking for.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-md text-lg text-white/60">
          A visual discovery engine for designers, makers, and the curious.
        </p>
      </div>

      {/* Search takeover */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-xl"
          >
            <div className="mx-auto max-w-2xl px-6 pt-16">
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-3 border-b border-white/20 pb-4"
              >
                <Search className="h-6 w-6 text-amber-300" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search anything…"
                  className="flex-1 bg-transparent text-2xl outline-none placeholder:text-white/30"
                  onKeyDown={(e) => e.key === "Escape" && setSearchOpen(false)}
                />
                <button onClick={() => setSearchOpen(false)} className="text-white/40 hover:text-white" aria-label="Close">
                  <X className="h-5 w-5" />
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2"
              >
                <div>
                  <p className="mb-3 flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-white/40" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
                    <TrendingUp className="h-3 w-3" /> Trending now
                  </p>
                  <ul className="space-y-1.5">
                    {TRENDING.map((t, i) => (
                      <li key={t}>
                        <button className="group flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 text-left text-sm text-white/80 hover:bg-white/5">
                          <span className="w-4 text-xs text-white/30" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>{i + 1}</span>
                          <span className="flex-1">{t}</span>
                          <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="mb-3 text-[11px] uppercase tracking-wider text-white/40" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
                    Recent searches
                  </p>
                  <ul className="space-y-1.5">
                    {RECENT.map((r) => (
                      <li key={r}>
                        <button className="group flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 text-left text-sm text-white/80 hover:bg-white/5">
                          <Search className="h-3.5 w-3.5 text-white/30" />
                          <span className="flex-1">{r}</span>
                          <X className="h-3 w-3 opacity-0 hover:opacity-100 group-hover:opacity-50" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-12 flex items-center justify-center gap-3 text-xs text-white/40"
              >
                <span className="flex items-center gap-1"><kbd className="rounded bg-white/10 px-1.5 py-0.5" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>↵</kbd> Search</span>
                <span className="flex items-center gap-1"><kbd className="rounded bg-white/10 px-1.5 py-0.5" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>ESC</kbd> Close</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SeekrLogo() {
  return (
    <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden="true">
      <defs>
        <linearGradient id="sk-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
      </defs>
      <circle cx="14" cy="14" r="10" fill="none" stroke="url(#sk-grad)" strokeWidth="2.5" />
      <line x1="21" y1="21" x2="28" y2="28" stroke="url(#sk-grad)" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
