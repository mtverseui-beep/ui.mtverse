"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Plus } from "lucide-react";

// ════════════════════════════════════════════════════════════════════════════
// Navbar025 — GRID (fullscreen menu takeover with staggered links)
// Pure black bar with just logo + hamburger. Clicking opens a fullscreen
// takeover with staggered giant link reveal + meta info on the right.
// ════════════════════════════════════════════════════════════════════════════

const LINKS = [
  { num: "01", label: "Work", desc: "Selected projects" },
  { num: "02", label: "Studio", desc: "About our practice" },
  { num: "03", label: "Process", desc: "How we work" },
  { num: "04", label: "Journal", desc: "Notes & writing" },
  { num: "05", label: "Contact", desc: "Start a project" },
];

export function Navbar025Card() {
  const [open, setOpen] = useState(false);

  return (
    <div
      data-navbar025
      className="min-h-full"
      style={{ background: "#ffffff", fontFamily: "var(--font-archivo), system-ui, sans-serif", color: "#0a0a0a" }}
    >
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-black/10 bg-white/85 px-6 backdrop-blur-xl">
        <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-2">
          <GridLogo />
          <span className="text-lg font-black uppercase tracking-tight">GRID</span>
        </a>
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider"
          aria-label="Open menu"
        >
          <Plus className="h-4 w-4" /> Menu
        </button>
      </header>

      {/* Body */}
      <div className="px-6 py-24">
        <p className="text-xs uppercase tracking-[0.25em] text-black/40" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
          Independent design practice · NYC
        </p>
        <h1 className="mt-6 max-w-3xl text-6xl font-black uppercase leading-[0.9] md:text-8xl" style={{ letterSpacing: "-0.05em" }}>
          We design<br />systems that<br />
          <span style={{ color: "#0066ff" }}>scale.</span>
        </h1>
        <p className="mt-8 text-xs text-black/40" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
          Click "Menu" to see the fullscreen takeover
        </p>
      </div>

      {/* Fullscreen takeover */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0a0a0a]"
            style={{ color: "#fff" }}
          >
            <div className="flex items-center justify-between p-6">
              <span className="text-lg font-black uppercase tracking-tight">GRID</span>
              <button onClick={() => setOpen(false)} className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider" aria-label="Close">
                <X className="h-4 w-4" /> Close
              </button>
            </div>
            <div className="grid h-[calc(100%-72px)] grid-cols-1 gap-8 px-6 md:grid-cols-[1fr_280px]">
              {/* Giant links */}
              <nav className="flex flex-col justify-center">
                {LINKS.map((l, i) => (
                  <motion.a
                    key={l.label}
                    href="#"
                    onClick={(e) => { e.preventDefault(); setOpen(false); }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    className="group flex items-baseline gap-4 border-b border-white/10 py-4"
                  >
                    <span className="text-xs text-white/30" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>{l.num}</span>
                    <span
                      className="text-5xl font-black uppercase tracking-tight transition-colors group-hover:text-[#0066ff] md:text-7xl"
                      style={{ letterSpacing: "-0.04em" }}
                    >
                      {l.label}
                    </span>
                    <ArrowUpRight className="ml-auto h-6 w-6 text-white/30 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                  </motion.a>
                ))}
              </nav>
              {/* Meta info */}
              <motion.aside
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="hidden flex-col justify-end pb-8 text-sm text-white/60 md:flex"
              >
                <p className="mb-3 text-xs uppercase tracking-wider text-white/40" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
                  Studio
                </p>
                <p className="mb-6">231 Bowery, Floor 4<br />New York, NY 10002</p>
                <p className="mb-3 text-xs uppercase tracking-wider text-white/40" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
                  General
                </p>
                <p className="mb-6">
                  <a href="mailto:hello@grid.studio" className="hover:text-white">hello@grid.studio</a><br />
                  <a href="tel:+12125550199" className="hover:text-white">+1 (212) 555-0199</a>
                </p>
                <p className="mb-3 text-xs uppercase tracking-wider text-white/40" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
                  Social
                </p>
                <div className="flex gap-3">
                  {["Instagram", "Twitter", "LinkedIn"].map((s) => (
                    <a key={s} href="#" onClick={(e) => e.preventDefault()} className="hover:text-white">{s}</a>
                  ))}
                </div>
              </motion.aside>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function GridLogo() {
  return (
    <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden="true">
      <rect x="3" y="3" width="11" height="11" fill="#0a0a0a" />
      <rect x="18" y="3" width="11" height="11" fill="#0066ff" />
      <rect x="3" y="18" width="11" height="11" fill="#0066ff" />
      <rect x="18" y="18" width="11" height="11" fill="#0a0a0a" />
    </svg>
  );
}
