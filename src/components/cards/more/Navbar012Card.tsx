"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

// ════════════════════════════════════════════════════════════════════════════
// Navbar012 — Lumio (minimal SaaS — ultra-thin sparse top bar)
// Pure white + thin 48px bar + sparse 4-link nav + sparse CTA
// Slide-down mobile menu with staggered reveal.
// ════════════════════════════════════════════════════════════════════════════

const NAV = ["Product", "Pricing", "Docs", "Customers"];

export function Navbar012Card() {
  const [open, setOpen] = useState(false);

  return (
    <div
      data-navbar012
      className="min-h-full"
      style={{ background: "#ffffff", fontFamily: "var(--font-inter-tight), system-ui, sans-serif", color: "#0a0a0a" }}
    >
      <header className="sticky top-0 z-40 border-b border-black/10 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-12 max-w-[1100px] items-center justify-between px-6">
          {/* Left: logo + nav */}
          <div className="flex items-center gap-8">
            <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-2">
              <LumioLogo />
              <span className="text-base font-semibold tracking-tight">Lumio</span>
            </a>
            <nav className="hidden items-center gap-6 md:flex">
              {NAV.map((n, i) => (
                <a
                  key={n}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="group relative text-sm text-black/60 transition-colors hover:text-black"
                  style={{ transitionDelay: `${i * 20}ms` }}
                >
                  {n}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-black transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>
          </div>

          {/* Right: actions */}
          <div className="hidden items-center gap-4 md:flex">
            <a href="#" onClick={(e) => e.preventDefault()} className="text-sm text-black/60 hover:text-black transition-colors">
              Sign in
            </a>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="group inline-flex items-center gap-1.5 rounded-full bg-black px-4 py-1.5 text-sm font-medium text-white transition-all hover:scale-105"
            >
              Start free
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>

          {/* Mobile menu */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden"
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile slide-down */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden border-t border-black/10 md:hidden"
            >
              <div className="flex flex-col gap-1 px-6 py-3">
                {NAV.map((n, i) => (
                  <motion.a
                    key={n}
                    href="#"
                    onClick={(e) => { e.preventDefault(); setOpen(false); }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="py-2 text-base text-black/70 hover:text-black"
                  >
                    {n}
                  </motion.a>
                ))}
                <a href="#" onClick={(e) => e.preventDefault()} className="mt-2 rounded-full bg-black px-4 py-2.5 text-center text-sm font-medium text-white">
                  Start free
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Body */}
      <div className="px-6 py-20 text-center">
        <h1 className="mx-auto max-w-2xl text-5xl font-semibold tracking-tight md:text-6xl" style={{ letterSpacing: "-0.04em" }}>
          Software for teams who care about the work.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-lg text-black/60">
          Quietly powerful. Beautifully simple. Built in Copenhagen.
        </p>
        <a href="#" onClick={(e) => e.preventDefault()} className="mt-8 inline-flex items-center gap-1.5 rounded-full bg-black px-6 py-3 text-sm font-medium text-white">
          Get started free <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}

function LumioLogo() {
  return (
    <svg viewBox="0 0 32 32" className="h-6 w-6" aria-hidden="true">
      <circle cx="16" cy="16" r="14" fill="#0a0a0a" />
      <circle cx="16" cy="16" r="6" fill="#fff" />
      <circle cx="16" cy="16" r="3" fill="#84cc16" />
    </svg>
  );
}
