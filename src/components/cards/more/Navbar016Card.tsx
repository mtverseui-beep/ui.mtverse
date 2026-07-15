"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

// ════════════════════════════════════════════════════════════════════════════
// Navbar016 — Monolith (creative agency wordmark + numbered links)
// Off-black + Archivo Black wordmark + tiny numbered nav links (01, 02, 03)
// + fullscreen overlay menu with staggered giant link reveal.
// ════════════════════════════════════════════════════════════════════════════

const NAV = [
  { num: "01", label: "Work" },
  { num: "02", label: "Studio" },
  { num: "03", label: "Process" },
  { num: "04", label: "Journal" },
];

export function Navbar016Card() {
  const [open, setOpen] = useState(false);

  return (
    <div
      data-navbar016
      className="min-h-full"
      style={{ background: "#0a0a0a", fontFamily: "var(--font-archivo), system-ui, sans-serif", color: "#ffffff" }}
    >
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6">
          {/* Logo */}
          <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-2">
            <MonolithLogo />
            <span className="text-xl font-black uppercase tracking-tight">MONOLITH</span>
          </a>

          {/* Numbered nav */}
          <nav className="hidden items-center gap-7 md:flex">
            {NAV.map((n) => (
              <a
                key={n.label}
                href="#"
                onClick={(e) => e.preventDefault()}
                className="group flex items-center gap-1.5 text-sm font-medium text-white/70 transition-colors hover:text-[#ffea00]"
              >
                <span className="text-[10px] font-mono text-white/30 transition-colors group-hover:text-[#ffea00]" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
                  {n.num}
                </span>
                {n.label}
              </a>
            ))}
          </nav>

          {/* CTA + mobile menu */}
          <div className="flex items-center gap-3">
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="hidden items-center gap-1.5 border border-white/20 px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all hover:border-[#ffea00] hover:text-[#ffea00] md:inline-flex"
            >
              Start a project <ArrowUpRight className="h-3 w-3" />
            </a>
            <button
              onClick={() => setOpen(true)}
              className="flex h-10 w-10 items-center justify-center border border-white/20 md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="px-6 py-20">
        <p className="text-xs uppercase tracking-[0.25em] text-white/40" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
          Independent creative studio · Est. 2018
        </p>
        <h1 className="mt-6 max-w-4xl text-6xl font-black uppercase leading-[0.9] md:text-8xl" style={{ letterSpacing: "-0.05em" }}>
          We build<br />
          <span style={{ color: "#ffea00" }}>monumental</span><br />
          brands.
        </h1>
      </div>

      {/* Fullscreen overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0a0a0a] md:hidden"
          >
            <div className="flex items-center justify-between p-6">
              <span className="text-xl font-black uppercase">MONOLITH</span>
              <button onClick={() => setOpen(false)} className="flex h-10 w-10 items-center justify-center border border-white/20" aria-label="Close">
                <X className="h-4 w-4" />
              </button>
            </div>
            <nav className="flex flex-col gap-2 px-6 pt-12">
              {NAV.map((n, i) => (
                <motion.a
                  key={n.label}
                  href="#"
                  onClick={(e) => { e.preventDefault(); setOpen(false); }}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.1 }}
                  className="flex items-baseline gap-3 border-b border-white/10 py-5"
                >
                  <span className="text-xs text-white/30" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>{n.num}</span>
                  <span className="text-5xl font-black uppercase tracking-tight" style={{ letterSpacing: "-0.04em" }}>{n.label}</span>
                </motion.a>
              ))}
            </nav>
            <motion.a
              href="#"
              onClick={(e) => e.preventDefault()}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mx-6 mt-12 flex items-center justify-center gap-2 bg-[#ffea00] py-4 text-sm font-black uppercase text-black"
            >
              Start a project <ArrowUpRight className="h-4 w-4" />
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MonolithLogo() {
  return (
    <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden="true">
      <rect x="4" y="4" width="24" height="24" fill="#ffea00" />
      <rect x="11" y="11" width="10" height="10" fill="#0a0a0a" />
    </svg>
  );
}
