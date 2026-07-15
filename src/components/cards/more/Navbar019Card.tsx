"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Command, ArrowRight, FileText, Settings, User, Star, Clock, Hash, Home } from "lucide-react";

// ════════════════════════════════════════════════════════════════════════════
// Navbar019 — Cmdr (minimal command palette takeover)
// White ultra-minimal bar with just logo + ⌘K trigger. The whole navbar IS
// the command palette — opening it takes over the screen with grouped results,
// keyboard navigation, footer hints.
// ════════════════════════════════════════════════════════════════════════════

const GROUPS = [
  {
    title: "Pages",
    items: [
      { icon: Home, label: "Home", shortcut: "G H" },
      { icon: FileText, label: "Documentation", shortcut: "G D" },
      { icon: User, label: "Profile", shortcut: "G P" },
      { icon: Star, label: "Favorites", shortcut: "G F" },
    ],
  },
  {
    title: "Actions",
    items: [
      { icon: Settings, label: "Open settings", shortcut: "," },
      { icon: FileText, label: "Create new document", shortcut: "N" },
      { icon: Hash, label: "Join a channel", shortcut: "J" },
    ],
  },
  {
    title: "Recent",
    items: [
      { icon: Clock, label: "Q3 roadmap draft", shortcut: "" },
      { icon: Clock, label: "Design system v2", shortcut: "" },
    ],
  },
];

export function Navbar019Card() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const paletteRef = useRef<HTMLDivElement>(null);

  // Flatten items for keyboard nav
  const allItems = GROUPS.flatMap((g) => g.items);

  // ⌘K shortcut
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
    else { setActive(0); setQuery(""); }
  }, [open]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, allItems.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      setOpen(false);
    }
  };

  let runningIdx = -1;

  return (
    <div
      data-navbar019
      className="min-h-full"
      style={{ background: "#fafafa", fontFamily: "var(--font-inter-tight), system-ui, sans-serif", color: "#0a0a0a" }}
    >
      {/* Minimal bar */}
      <header className="sticky top-0 z-40 flex h-12 items-center justify-between border-b border-black/10 bg-white/80 px-4 backdrop-blur-xl">
        <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-2">
          <CmdrLogo />
          <span className="text-base font-bold tracking-tight">Cmdr</span>
        </a>
        <button
          onClick={() => setOpen(true)}
          className="group flex items-center gap-2 rounded-md border border-black/10 bg-black/[0.02] px-2.5 py-1 text-xs text-black/50 hover:bg-black/5"
        >
          <Search className="h-3 w-3" />
          Quick search
          <kbd className="rounded border border-black/10 bg-white px-1.5 py-0.5 text-[10px]" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
            ⌘K
          </kbd>
        </button>
      </header>

      {/* Body */}
      <div className="px-6 py-20 text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-black/40" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
          The command palette is the navbar
        </p>
        <h1 className="mx-auto mt-4 max-w-2xl text-5xl font-semibold tracking-tight md:text-7xl" style={{ letterSpacing: "-0.04em" }}>
          Press <kbd className="rounded border border-black/10 bg-white px-3 py-1 text-3xl" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>⌘K</kbd> to start.
        </h1>
        <button
          onClick={() => setOpen(true)}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-medium text-white"
        >
          Open command palette <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* Command palette */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center bg-black/30 p-4 pt-24 backdrop-blur-sm"
            onClick={() => setOpen(false)}
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
                  ref={inputRef}
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setActive(0); }}
                  onKeyDown={onKeyDown}
                  placeholder="Type a command or search…"
                  className="flex-1 bg-transparent py-3.5 text-sm outline-none"
                />
                <kbd className="rounded border border-black/10 bg-black/5 px-1.5 py-0.5 text-[10px]" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
                  ESC
                </kbd>
              </div>
              <div className="max-h-80 overflow-y-auto p-2">
                {GROUPS.map((g) => (
                  <div key={g.title} className="mb-1">
                    <p className="px-2 py-1 text-[10px] uppercase tracking-wider text-black/40" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
                      {g.title}
                    </p>
                    {g.items.map((item) => {
                      runningIdx++;
                      const idx = runningIdx;
                      const isActive = idx === active;
                      return (
                        <button
                          key={item.label}
                          onMouseEnter={() => setActive(idx)}
                          onClick={() => setOpen(false)}
                          className={`flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left text-sm ${isActive ? "bg-black/5" : ""}`}
                        >
                          <item.icon className={`h-4 w-4 ${isActive ? "text-black" : "text-black/40"}`} />
                          <span className="flex-1">{item.label}</span>
                          {item.shortcut && (
                            <kbd className="rounded border border-black/10 bg-black/5 px-1.5 py-0.5 text-[10px] text-black/60" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
                              {item.shortcut}
                            </kbd>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between border-t border-black/10 px-4 py-2 text-[11px] text-black/50">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1"><Command className="h-3 w-3" /> + ↵ Open</span>
                  <span>↕ Navigate</span>
                  <span>ESC Close</span>
                </div>
                <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Online</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CmdrLogo() {
  return (
    <svg viewBox="0 0 32 32" className="h-6 w-6" aria-hidden="true">
      <rect width="32" height="32" rx="7" fill="#0a0a0a" />
      <path d="M12 11 L7 16 L12 21 M20 11 L25 16 L20 21" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
