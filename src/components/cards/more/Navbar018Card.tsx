"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X } from "lucide-react";

// ════════════════════════════════════════════════════════════════════════════
// Navbar018 — AURÉLIE (centered logo + serif typography + hairline underline)
// Cream + Cormorant Garamond + symmetric split nav + center serif wordmark
// + thin gold hairlines + animated underline that wipes in on hover.
// ════════════════════════════════════════════════════════════════════════════

const LEFT = ["Atelier", "Collections", "Maison"];
const RIGHT = ["Boutiques", "Journal", "Contact"];

export function Navbar018Card() {
  const [open, setOpen] = useState(false);

  return (
    <div
      data-navbar018
      className="min-h-full"
      style={{ background: "#faf6f0", fontFamily: "var(--font-cormorant), Georgia, serif", color: "#1a1612" }}
    >
      <header className="sticky top-0 z-40 bg-[#faf6f0]/85 backdrop-blur-xl">
        {/* Top hairline */}
        <div className="h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(196,163,90,0.4), transparent)" }} />
        <div className="mx-auto grid max-w-[1300px] grid-cols-[1fr_auto_1fr] items-center gap-6 px-6 py-5">
          {/* Left nav */}
          <nav className="hidden items-center justify-end gap-7 text-sm uppercase tracking-[0.25em] md:flex" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
            {LEFT.map((l) => (
              <a key={l} href="#" onClick={(e) => e.preventDefault()} className="group relative text-black/70 transition-colors hover:text-amber-800" style={{ letterSpacing: "0.25em" }}>
                {l}
                <span className="absolute -bottom-1 left-1/2 h-px w-0 -translate-x-1/2 bg-amber-700 transition-all duration-500 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Mobile menu */}
          <button onClick={() => setOpen(true)} className="md:hidden" aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </button>

          {/* Center wordmark */}
          <a href="#" onClick={(e) => e.preventDefault()} className="flex flex-col items-center">
            <span
              className="text-3xl md:text-4xl"
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontStyle: "italic",
                letterSpacing: "0.15em",
                backgroundImage: "linear-gradient(135deg, #d4af37 0%, #b8860b 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Aurélie
            </span>
            <span className="mt-0.5 text-[9px] uppercase tracking-[0.5em] text-black/40" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
              Paris · MMXVI
            </span>
          </a>

          {/* Right nav */}
          <nav className="hidden items-center justify-start gap-7 text-sm uppercase tracking-[0.25em] md:flex" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
            {RIGHT.map((l) => (
              <a key={l} href="#" onClick={(e) => e.preventDefault()} className="group relative text-black/70 transition-colors hover:text-amber-800" style={{ letterSpacing: "0.25em" }}>
                {l}
                <span className="absolute -bottom-1 left-1/2 h-px w-0 -translate-x-1/2 bg-amber-700 transition-all duration-500 group-hover:w-full" />
              </a>
            ))}
            <Search className="h-4 w-4 text-black/70 hover:text-amber-800" />
          </nav>

          {/* Mobile actions */}
          <div className="flex items-center gap-3 md:hidden">
            <Search className="h-5 w-5" />
          </div>
        </div>
        {/* Bottom hairline */}
        <div className="h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(196,163,90,0.4), transparent)" }} />
      </header>

      {/* Body */}
      <div className="px-6 py-24 text-center">
        <p className="text-[10px] uppercase tracking-[0.5em] text-amber-700/70" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
          The Spring Collection
        </p>
        <h1 className="mx-auto mt-6 max-w-3xl text-6xl leading-tight md:text-8xl" style={{ fontStyle: "italic", letterSpacing: "-0.02em" }}>
          <span style={{ backgroundImage: "linear-gradient(135deg, #d4af37, #b8860b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Lumière d'Été
          </span>
        </h1>
        <p className="mt-4 text-lg italic text-black/60">A study in light — summer 2025</p>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-[#faf6f0] md:hidden"
          >
            <button onClick={() => setOpen(false)} className="absolute right-6 top-6" aria-label="Close">
              <X className="h-6 w-6" />
            </button>
            <div className="flex h-full flex-col items-center justify-center gap-8 text-2xl uppercase tracking-[0.3em] text-black/80" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
              {[...LEFT, ...RIGHT].map((l) => (
                <a key={l} href="#" onClick={(e) => { e.preventDefault(); setOpen(false); }} className="italic" style={{ fontFamily: "var(--font-cormorant), serif", fontStyle: "normal" }}>
                  {l}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
