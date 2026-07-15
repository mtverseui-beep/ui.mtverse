"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Command, ChevronRight, Home, FileText, Settings, Bell, Star, Clock, ArrowRight } from "lucide-react";
import { UnsplashAvatar, useDismissable } from "./navbar-helpers";

// ════════════════════════════════════════════════════════════════════════════
// Navbar007 — Vector (search-first center command bar)
// White minimal + center search bar that expands to fullscreen ⌘K palette
// + breadcrumb trail on left + icon actions on right + Unsplash avatar.
// ════════════════════════════════════════════════════════════════════════════

const BREADCRUMBS = ["Workspace", "Engineering", "Frontend", "Components"];
const RECENT = ["Button component spec", "Auth flow redesign", "Q3 roadmap draft", "Design system tokens"];
const SUGGESTIONS = [
  { icon: FileText, label: "Create new doc", shortcut: "N" },
  { icon: Star, label: "Add to favorites", shortcut: "F" },
  { icon: Settings, label: "Open settings", shortcut: "," },
];

export function Navbar007Card() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [query, setQuery] = useState("");
  const paletteRef = useRef<HTMLDivElement>(null);
  useDismissable(paletteOpen, () => setPaletteOpen(false), paletteRef);

  return (
    <div
      data-navbar007
      className="min-h-full"
      style={{ background: "#fafafa", fontFamily: "var(--font-inter-tight), system-ui, sans-serif", color: "#0a0a0a" }}
    >
      <header className="sticky top-0 z-40 border-b border-black/10 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-[1400px] items-center gap-4 px-6">
          {/* Left: logo + breadcrumbs */}
          <div className="flex items-center gap-3">
            <VectorLogo />
            <span className="text-lg font-bold tracking-tight">Vector</span>
            <nav className="ml-3 hidden items-center gap-1 text-xs text-black/50 md:flex" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
              {BREADCRUMBS.map((b, i) => (
                <span key={b} className="flex items-center gap-1">
                  <span className={i === 0 ? "text-black/40" : ""}>{b}</span>
                  {i < BREADCRUMBS.length - 1 && <ChevronRight className="h-3 w-3 text-black/30" />}
                </span>
              ))}
            </nav>
          </div>

          {/* Center: search */}
          <div className="mx-auto flex-1 max-w-md">
            <button
              onClick={() => setPaletteOpen(true)}
              className="group flex w-full items-center gap-2 rounded-lg border border-black/10 bg-black/[0.02] px-3 py-2 text-sm text-black/40 transition-colors hover:border-black/20 hover:bg-black/[0.04]"
            >
              <Search className="h-4 w-4" />
              <span className="flex-1 text-left">Search or jump to…</span>
              <kbd className="rounded border border-black/10 bg-white px-1.5 py-0.5 text-[10px] font-medium" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Right: actions + avatar */}
          <div className="flex items-center gap-1.5">
            <button className="relative flex h-9 w-9 items-center justify-center rounded-lg text-black/60 hover:bg-black/5" aria-label="Notifications">
              <Bell className="h-4 w-4" />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-rose-500" />
            </button>
            <button className="flex h-9 w-9 items-center justify-center rounded-lg text-black/60 hover:bg-black/5" aria-label="Settings">
              <Settings className="h-4 w-4" />
            </button>
            <button className="ml-1 flex items-center gap-2 rounded-full border border-black/10 py-0.5 pl-0.5 pr-3 hover:bg-black/5">
              <UnsplashAvatar seed="photo-1494790108377-be9c29b29330" alt="User" size={28} className="rounded-full" />
              <span className="text-xs font-medium">Alex</span>
            </button>
          </div>
        </div>
      </header>

      {/* Body content for visual richness */}
      <div className="mx-auto max-w-[1400px] px-6 py-8">
        <div className="rounded-xl border border-black/10 bg-white p-6">
          <p className="text-xs uppercase tracking-wider text-black/40" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
            Quick actions
          </p>
          <div className="mt-3 grid grid-cols-1 gap-2 md:grid-cols-3">
            {[
              { label: "New document", icon: FileText, color: "#3b82f6" },
              { label: "Recent files", icon: Clock, color: "#10b981" },
              { label: "Open settings", icon: Settings, color: "#8b5cf6" },
            ].map((a) => (
              <button
                key={a.label}
                onClick={() => setPaletteOpen(true)}
                className="group flex items-center gap-3 rounded-lg border border-black/10 p-3 text-left transition-all hover:-translate-y-0.5 hover:border-black/20 hover:shadow-sm"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: `${a.color}15`, color: a.color }}>
                  <a.icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{a.label}</p>
                  <p className="text-[11px] text-black/50">Press ⌘K to search</p>
                </div>
                <ArrowRight className="h-4 w-4 text-black/30 transition-all group-hover:translate-x-0.5 group-hover:text-black/60" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ⌘K Palette */}
      <AnimatePresence>
        {paletteOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center bg-black/30 p-4 pt-24 backdrop-blur-sm"
            onClick={() => setPaletteOpen(false)}
          >
            <motion.div
              ref={paletteRef}
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl overflow-hidden rounded-xl border border-black/10 bg-white shadow-2xl"
            >
              <div className="flex items-center gap-3 border-b border-black/10 px-4">
                <Search className="h-4 w-4 text-black/40" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search docs, files, people, commands…"
                  className="flex-1 bg-transparent py-3.5 text-sm outline-none"
                />
                <kbd className="rounded border border-black/10 bg-black/5 px-1.5 py-0.5 text-[10px]" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
                  ESC
                </kbd>
              </div>
              <div className="max-h-80 overflow-y-auto p-2">
                {query ? (
                  <div className="px-2 py-6 text-center text-xs text-black/40">No results for “{query}”</div>
                ) : (
                  <>
                    <p className="px-2 py-1 text-[10px] uppercase tracking-wider text-black/40" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
                      Recent
                    </p>
                    {RECENT.map((r) => (
                      <button key={r} className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left text-sm hover:bg-black/5">
                        <Clock className="h-4 w-4 text-black/40" />
                        <span className="flex-1">{r}</span>
                      </button>
                    ))}
                    <p className="mt-2 px-2 py-1 text-[10px] uppercase tracking-wider text-black/40" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
                      Quick actions
                    </p>
                    {SUGGESTIONS.map((s) => (
                      <button key={s.label} className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left text-sm hover:bg-black/5">
                        <s.icon className="h-4 w-4 text-black/40" />
                        <span className="flex-1">{s.label}</span>
                        <kbd className="rounded border border-black/10 bg-black/5 px-1.5 py-0.5 text-[10px]" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
                          ⌘{s.shortcut}
                        </kbd>
                      </button>
                    ))}
                  </>
                )}
              </div>
              <div className="flex items-center justify-between border-t border-black/10 px-4 py-2 text-[11px] text-black/50">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1"><Command className="h-3 w-3" /> + ↵ Open</span>
                  <span className="flex items-center gap-1">↕ Navigate</span>
                </div>
                <span>Vector Search</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function VectorLogo() {
  return (
    <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden="true">
      <defs>
        <linearGradient id="vec-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="7" fill="url(#vec-grad)" />
      <path d="M9 22 L16 9 L23 22" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="16" cy="9" r="2" fill="white" />
      <circle cx="9" cy="22" r="2" fill="white" />
      <circle cx="23" cy="22" r="2" fill="white" />
    </svg>
  );
}
