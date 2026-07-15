"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingBag, Menu, X, Globe } from "lucide-react";

// ════════════════════════════════════════════════════════════════════════════
// Navbar010 — Maison Noir (luxury symmetric center logo + split nav)
// True black + gold accents + Cormorant serif + thin gold hairlines
// Symmetric split nav with center monogram. Scroll-morphs from tall to slim.
// ════════════════════════════════════════════════════════════════════════════

const LEFT = ["Maison", "Collections", "Haute Couture"];
const RIGHT = ["Joaillerie", "Boutiques", "Contact"];

export function Navbar010Card() {
  const [open, setOpen] = useState(false);

  return (
    <div
      data-navbar010
      className="min-h-full"
      style={{ background: "#0a0a0a", fontFamily: "var(--font-cormorant), Georgia, serif", color: "#e5e2d9" }}
    >
      {/* Announcement strip */}
      <div className="border-b border-amber-200/10 bg-black px-4 py-1.5 text-center text-[10px] uppercase tracking-[0.3em] text-amber-200/70" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
        Complimentary worldwide delivery · Private appointments available
      </div>

      <header className="sticky top-0 z-40 bg-black/90 backdrop-blur-xl">
        {/* Thin gold hairline top */}
        <div className="h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(196,163,90,0.5), transparent)" }} />
        <div className="mx-auto grid max-w-[1400px] grid-cols-[1fr_auto_1fr] items-center gap-6 px-6 py-4">
          {/* Left nav */}
          <nav className="hidden items-center justify-end gap-7 text-sm uppercase tracking-[0.25em] md:flex">
            {LEFT.map((l) => (
              <a
                key={l}
                href="#"
                onClick={(e) => e.preventDefault()}
                className="group relative text-amber-100/80 transition-colors hover:text-amber-200"
                style={{ letterSpacing: "0.25em" }}
              >
                {l}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-amber-300 transition-all duration-500 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(true)}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-100 md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Center monogram */}
          <a href="#" onClick={(e) => e.preventDefault()} className="flex flex-col items-center">
            <MaisonMonogram />
            <span
              className="mt-2 text-2xl tracking-[0.4em] md:text-3xl"
              style={{
                fontFamily: "var(--font-cormorant), serif",
                backgroundImage: "linear-gradient(135deg, #d4af37 0%, #f4e5b1 50%, #c4a35a 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              MAISON
            </span>
            <span className="mt-0.5 text-[9px] uppercase tracking-[0.5em] text-amber-200/50" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
              Paris · 1923
            </span>
          </a>

          {/* Right nav */}
          <nav className="hidden items-center justify-start gap-7 text-sm uppercase tracking-[0.25em] md:flex">
            {RIGHT.map((l) => (
              <a
                key={l}
                href="#"
                onClick={(e) => e.preventDefault()}
                className="group relative text-amber-100/80 transition-colors hover:text-amber-200"
                style={{ letterSpacing: "0.25em" }}
              >
                {l}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-amber-300 transition-all duration-500 group-hover:w-full" />
              </a>
            ))}
            <button className="ml-2 text-amber-100/70 hover:text-amber-200" aria-label="Search"><Search className="h-4 w-4" /></button>
            <button className="text-amber-100/70 hover:text-amber-200" aria-label="Cart"><ShoppingBag className="h-4 w-4" /></button>
            <button className="text-amber-100/70 hover:text-amber-200" aria-label="Language"><Globe className="h-4 w-4" /></button>
          </nav>

          {/* Mobile actions */}
          <div className="absolute right-4 top-1/2 flex -translate-y-1/2 gap-3 text-amber-100 md:hidden">
            <Search className="h-5 w-5" />
            <ShoppingBag className="h-5 w-5" />
          </div>
        </div>
        {/* Thin gold hairline bottom */}
        <div className="h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(196,163,90,0.5), transparent)" }} />
      </header>

      {/* Hero body */}
      <div className="px-6 py-24 text-center">
        <p className="text-[10px] uppercase tracking-[0.5em] text-amber-200/60" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
          The Winter Collection
        </p>
        <h1
          className="mx-auto mt-6 max-w-3xl text-6xl leading-tight md:text-8xl"
          style={{ fontStyle: "italic", letterSpacing: "-0.02em" }}
        >
          <span style={{ backgroundImage: "linear-gradient(135deg, #d4af37, #f4e5b1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Éternelle
          </span>
        </h1>
        <p className="mt-4 text-lg italic text-amber-100/60">A study in permanence — autumn 2025</p>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-black md:hidden"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute right-6 top-6 text-amber-200"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="flex h-full flex-col items-center justify-center gap-8 text-2xl uppercase tracking-[0.3em] text-amber-100">
              {[...LEFT, ...RIGHT].map((l) => (
                <a key={l} href="#" onClick={(e) => { e.preventDefault(); setOpen(false); }} className="italic">
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

function MaisonMonogram() {
  return (
    <svg viewBox="0 0 64 64" className="h-10 w-10" aria-hidden="true">
      <defs>
        <linearGradient id="ms-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f4e5b1" />
          <stop offset="50%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#c4a35a" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill="none" stroke="url(#ms-grad)" strokeWidth="1" opacity="0.4" />
      <circle cx="32" cy="32" r="26" fill="none" stroke="url(#ms-grad)" strokeWidth="0.5" opacity="0.6" />
      <path d="M16 44 L16 20 L32 36 L48 20 L48 44" fill="none" stroke="url(#ms-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
