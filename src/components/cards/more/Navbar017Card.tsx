"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingBag, Leaf } from "lucide-react";
import { useScrollAware } from "./navbar-helpers";

// ════════════════════════════════════════════════════════════════════════════
// Navbar017 — Verdant (split navigation with center CTA + scroll shrink)
// Off-white + emerald accent + 4-link split nav around a center CTA button.
// Scroll shrinks the bar from 80→56px and morphs the CTA.
// ════════════════════════════════════════════════════════════════════════════

const LEFT = ["Shop", "Learn", "Journal"];
const RIGHT = ["About", "Visit", "Account"];

export function Navbar017Card({ scrollContainerRef }: { scrollContainerRef?: React.RefObject<HTMLElement | null> }) {
  const { scrolled } = useScrollAware(30, scrollContainerRef);

  return (
    <div
      data-navbar017
      className="min-h-full"
      style={{ background: "#f5f1e8", fontFamily: "var(--font-manrope), system-ui, sans-serif", color: "#1a2e1a" }}
    >
      <header className="sticky top-0 z-40 bg-[#f5f1e8]/85 backdrop-blur-xl">
        <div className="mx-auto grid max-w-[1300px] grid-cols-[1fr_auto_1fr] items-center gap-4 px-6 transition-all duration-500" style={{ height: scrolled ? 56 : 80 }}>
          {/* Left nav */}
          <nav className="hidden items-center gap-7 text-sm font-medium md:flex">
            {LEFT.map((l) => (
              <a
                key={l}
                href="#"
                onClick={(e) => e.preventDefault()}
                className="group relative text-emerald-900/70 transition-colors hover:text-emerald-700"
              >
                {l}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-emerald-700 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Mobile menu placeholder */}
          <div className="md:hidden" />

          {/* Center logo + CTA */}
          <a href="#" onClick={(e) => e.preventDefault()} className="flex flex-col items-center gap-1">
            <motion.div animate={{ scale: scrolled ? 0.85 : 1 }} transition={{ duration: 0.3 }} className="flex items-center gap-2">
              <VerdantLogo />
              <span className="text-xl font-bold tracking-tight text-emerald-900">Verdant</span>
            </motion.div>
          </a>

          {/* Right nav */}
          <nav className="hidden items-center justify-end gap-7 text-sm font-medium md:flex">
            {RIGHT.map((l) => (
              <a
                key={l}
                href="#"
                onClick={(e) => e.preventDefault()}
                className="group relative text-emerald-900/70 transition-colors hover:text-emerald-700"
              >
                {l}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-emerald-700 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <Search className="h-4 w-4 text-emerald-900/70 hover:text-emerald-700" />
            <ShoppingBag className="h-4 w-4 text-emerald-900/70 hover:text-emerald-700" />
          </nav>
        </div>
      </header>

      {/* Body */}
      <div className="px-6 py-24 text-center">
        <Leaf className="mx-auto h-12 w-12 text-emerald-600" />
        <h1 className="mx-auto mt-6 max-w-3xl text-5xl font-bold tracking-tight text-emerald-900 md:text-7xl" style={{ letterSpacing: "-0.03em" }}>
          Plants, tools, and education for the modern indoor gardener.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-lg text-emerald-800/70">
          Rooted in sustainability. Grown with care. Shipped from our solar-powered greenhouse in Portland.
        </p>
      </div>
    </div>
  );
}

function VerdantLogo() {
  return (
    <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden="true">
      <defs>
        <linearGradient id="vd-nb-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4ade80" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
      </defs>
      <path d="M16 28 C16 18 11 14 5 12 C5 20 11 26 16 28 Z" fill="url(#vd-nb-grad)" />
      <path d="M16 28 C16 18 21 14 27 12 C27 20 21 26 16 28 Z" fill="url(#vd-nb-grad)" opacity="0.8" />
      <path d="M16 28 L16 12" stroke="url(#vd-nb-grad)" strokeWidth="2" strokeLinecap="round" />
      <circle cx="16" cy="9" r="3" fill="url(#vd-nb-grad)" />
    </svg>
  );
}
