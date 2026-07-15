"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ArrowRight, Menu, Sparkles } from "lucide-react";

// ════════════════════════════════════════════════════════════════════════════
// Navbar022 — Bloom (dismissible cycling announcement + minimal nav)
// Pink/rose theme. Top strip cycles through 3 promo messages with sliding
// indicator dots. Below: minimal logo + 4-link nav + CTA. Dismissible.
// ════════════════════════════════════════════════════════════════════════════

const PROMOS = [
  { text: "Free shipping on orders over $50", cta: "Shop now", icon: Sparkles },
  { text: "New Spring collection just dropped", cta: "Explore", icon: Sparkles },
  { text: "Members get 20% off — join free today", cta: "Join", icon: Sparkles },
];

const NAV = ["Shop", "Collections", "Journal", "About"];

export function Navbar022Card() {
  const [dismissed, setDismissed] = useState(false);
  const [promoIdx, setPromoIdx] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const i = setInterval(() => setPromoIdx((p) => (p + 1) % PROMOS.length), 4000);
    return () => clearInterval(i);
  }, [dismissed]);

  return (
    <div
      data-navbar022
      className="min-h-full"
      style={{ background: "#fff5f7", fontFamily: "var(--font-manrope), system-ui, sans-serif", color: "#1a0a0e" }}
    >
      {/* Cycling announcement */}
      <AnimatePresence>
        {!dismissed && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="overflow-hidden"
            style={{ background: "linear-gradient(90deg, #ec4899 0%, #f43f5e 100%)" }}
          >
            <div className="relative flex items-center justify-center px-12 py-2.5 text-white">
              <AnimatePresence mode="wait">
                <motion.div
                  key={promoIdx}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-2 text-sm"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>{PROMOS[promoIdx].text}</span>
                  <a href="#" onClick={(e) => e.preventDefault()} className="inline-flex items-center gap-1 underline underline-offset-2 font-semibold">
                    {PROMOS[promoIdx].cta} <ChevronRight className="h-3 w-3" />
                  </a>
                </motion.div>
              </AnimatePresence>
              {/* Indicator dots */}
              <div className="absolute left-1/2 -translate-x-1/2 bottom-1 flex gap-1">
                {PROMOS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPromoIdx(i)}
                    className="h-1 rounded-full transition-all"
                    style={{
                      width: i === promoIdx ? 16 : 4,
                      background: i === promoIdx ? "#fff" : "rgba(255,255,255,0.5)",
                    }}
                    aria-label={`Promo ${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={() => setDismissed(true)}
                className="absolute right-4 text-white/80 hover:text-white"
                aria-label="Dismiss"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="sticky top-0 z-40 border-b border-rose-100 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6">
          <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-2">
            <BloomLogo />
            <span className="text-xl font-bold tracking-tight text-rose-900">Bloom</span>
          </a>
          <nav className="hidden items-center gap-7 md:flex">
            {NAV.map((n) => (
              <a
                key={n}
                href="#"
                onClick={(e) => e.preventDefault()}
                className="group relative text-sm text-rose-900/70 transition-colors hover:text-rose-600"
              >
                {n}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-rose-500 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="hidden items-center gap-1.5 rounded-full bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition-all hover:scale-105 hover:bg-rose-600 md:inline-flex"
            >
              Shop spring <ArrowRight className="h-3 w-3" />
            </a>
            <button onClick={() => setMobileOpen(true)} className="md:hidden" aria-label="Menu">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="px-6 py-20 text-center">
        <h1 className="mx-auto max-w-3xl text-5xl font-bold tracking-tight text-rose-950 md:text-7xl" style={{ letterSpacing: "-0.03em" }}>
          Spring, in full <span style={{ color: "#e11d48", fontStyle: "italic" }}>bloom</span>.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-lg text-rose-800/70">
          Fresh florals, feminine silhouettes, and the season's most-wanted pieces.
        </p>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 right-0 z-50 w-72 bg-white p-5 shadow-xl md:hidden"
          >
            <button onClick={() => setMobileOpen(false)} className="absolute right-4 top-4" aria-label="Close">
              <X className="h-5 w-5" />
            </button>
            <nav className="mt-8 flex flex-col gap-1">
              {NAV.map((n) => (
                <a key={n} href="#" onClick={(e) => { e.preventDefault(); setMobileOpen(false); }} className="border-b border-rose-50 py-3 text-base text-rose-900">
                  {n}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function BloomLogo() {
  return (
    <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden="true">
      <defs>
        <linearGradient id="bl-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fb7185" />
          <stop offset="100%" stopColor="#e11d48" />
        </linearGradient>
      </defs>
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <ellipse
          key={deg}
          cx="16"
          cy="10"
          rx="4"
          ry="7"
          fill="url(#bl-grad)"
          opacity="0.7"
          transform={`rotate(${deg} 16 16)`}
        />
      ))}
      <circle cx="16" cy="16" r="3" fill="#fef3c7" />
    </svg>
  );
}
