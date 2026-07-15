"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Mountain, ArrowRight } from "lucide-react";
import { useScrollAware } from "./navbar-helpers";

// ════════════════════════════════════════════════════════════════════════════
// Navbar023 — Summit (transparent over hero → solid white on scroll)
// Photo background hero. Navbar starts transparent with white text, morphs
// to solid white bg + dark text on scroll. Mobile drawer slides in.
// ════════════════════════════════════════════════════════════════════════════

const NAV = ["Adventures", "Trips", "Journal", "About"];

export function Navbar023Card({ scrollContainerRef }: { scrollContainerRef?: React.RefObject<HTMLElement | null> }) {
  const { scrolled } = useScrollAware(60, scrollContainerRef);
  const [open, setOpen] = useState(false);

  return (
    <div
      data-navbar023
      className="relative min-h-full"
      style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}
    >
      {/* Hero photo background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=80"
          alt="Mountain landscape"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      </div>

      <header
        className={`sticky top-0 z-40 transition-all duration-500 ${
          scrolled ? "bg-white/95 shadow-md backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6">
          <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-2">
            <Mountain className={`h-6 w-6 transition-colors ${scrolled ? "text-slate-900" : "text-white"}`} />
            <span className={`text-xl font-bold tracking-tight transition-colors ${scrolled ? "text-slate-900" : "text-white"}`}>Summit</span>
          </a>
          <nav className="hidden items-center gap-7 md:flex">
            {NAV.map((n) => (
              <a
                key={n}
                href="#"
                onClick={(e) => e.preventDefault()}
                className={`group relative text-sm font-medium transition-colors ${scrolled ? "text-slate-700 hover:text-slate-900" : "text-white/90 hover:text-white"}`}
              >
                {n}
                <span className={`absolute -bottom-1 left-0 h-px w-0 transition-all duration-300 group-hover:w-full ${scrolled ? "bg-slate-900" : "bg-white"}`} />
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className={`hidden items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-all md:inline-flex ${
                scrolled
                  ? "bg-slate-900 text-white hover:bg-slate-800"
                  : "bg-white text-slate-900 hover:bg-white/90"
              }`}
            >
              Book a trip <ArrowRight className="h-3 w-3" />
            </a>
            <button
              onClick={() => setOpen(true)}
              className={`md:hidden ${scrolled ? "text-slate-900" : "text-white"}`}
              aria-label="Menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero content */}
      <div className="relative z-10 px-6 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs uppercase tracking-[0.4em] text-white/80" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
            Alpine expeditions · Est. 2009
          </p>
          <h1 className="mx-auto mt-6 max-w-3xl text-6xl font-bold tracking-tight text-white md:text-8xl" style={{ letterSpacing: "-0.04em" }}>
            Reach<br />the summit.
          </h1>
          <p className="mx-auto mt-5 max-w-md text-lg text-white/80">
            Guided ascents, backcountry skiing, and wilderness expeditions across six continents.
          </p>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900"
          >
            View upcoming trips <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 right-0 z-50 w-72 bg-white p-5 md:hidden"
          >
            <button onClick={() => setOpen(false)} className="absolute right-4 top-4" aria-label="Close">
              <X className="h-5 w-5" />
            </button>
            <nav className="mt-8 flex flex-col gap-1">
              {NAV.map((n) => (
                <a key={n} href="#" onClick={(e) => { e.preventDefault(); setOpen(false); }} className="border-b border-slate-100 py-3 text-base text-slate-800">
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
