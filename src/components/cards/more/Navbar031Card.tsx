"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ArrowRight, Sparkles, Rocket, TrendingUp } from "lucide-react";
import { useScrollAware } from "./navbar-helpers";

// ════════════════════════════════════════════════════════════════════════════
// Navbar031 — Launch (startup landing — gradient CTA + dropdown nav)
// Off-white + orange/red accent. Sticky bar with logo + 3 nav links +
// gradient CTA. "Features" has a feature-rich dropdown with icons + descriptions.
// Scroll shrinks the bar. Mobile: slide-down panel.
// ════════════════════════════════════════════════════════════════════════════

const NAV = [
  {
    label: "Features",
    dropdown: [
      { icon: Rocket, title: "1-click deploy", desc: "Ship to prod in seconds" },
      { icon: Sparkles, title: "AI templates", desc: "200+ pre-built starters" },
      { icon: TrendingUp, title: "Analytics", desc: "Built-in metrics & growth" },
    ],
  },
  { label: "Pricing" },
  { label: "Customers" },
  { label: "Docs" },
];

export function Navbar031Card({ scrollContainerRef }: { scrollContainerRef?: React.RefObject<HTMLElement | null> }) {
  const { scrolled } = useScrollAware(30, scrollContainerRef);
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = (i: number) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenIdx(i);
  };
  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setOpenIdx(null), 150);
  };

  return (
    <div
      data-navbar031
      className="min-h-full"
      style={{ background: "#fafaf5", fontFamily: "var(--font-inter-tight), system-ui, sans-serif", color: "#1a0e08" }}
    >
      {/* Dot grid bg */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: "radial-gradient(rgba(249,115,22,0.2) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          maskImage: "radial-gradient(ellipse at top, black, transparent 60%)",
        }}
      />

      <header
        onMouseLeave={handleLeave}
        className="sticky top-0 z-40 bg-[#fafaf5]/85 backdrop-blur-xl"
      >
        <div className={`mx-auto flex max-w-[1200px] items-center justify-between px-6 transition-all duration-300 ${scrolled ? "h-12" : "h-16"}`}>
          <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-2">
            <LaunchLogo />
            <span className="text-lg font-bold tracking-tight">Launch</span>
          </a>

          {/* Nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((n, i) => (
              <button
                key={n.label}
                onMouseEnter={() => handleEnter(i)}
                className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-black/70 transition-colors hover:text-orange-600"
              >
                {n.label}
                {n.dropdown && <ChevronDown className={`h-3 w-3 transition-transform ${openIdx === i ? "rotate-180" : ""}`} />}
              </button>
            ))}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="hidden text-sm text-black/70 hover:text-orange-600 md:inline-block"
            >
              Sign in
            </a>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="group hidden items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-white transition-all hover:scale-105 md:inline-flex"
              style={{ background: "linear-gradient(135deg, #f97316 0%, #dc2626 100%)" }}
            >
              Start free <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
            </a>
            <button onClick={() => setMobileOpen(true)} className="md:hidden" aria-label="Menu">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Features dropdown */}
        <AnimatePresence>
          {openIdx !== null && NAV[openIdx]?.dropdown && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="absolute inset-x-0 top-full hidden border-t border-orange-100 bg-white shadow-2xl md:block"
            >
              <div className="mx-auto max-w-[1200px] px-6 py-5">
                <div className="grid grid-cols-3 gap-3">
                  {NAV[openIdx].dropdown!.map((f) => (
                    <a
                      key={f.title}
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="group flex items-start gap-3 rounded-xl border border-orange-100 p-4 transition-all hover:-translate-y-0.5 hover:border-orange-300 hover:shadow-md"
                    >
                      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg" style={{ background: "rgba(249,115,22,0.1)", color: "#ea580c" }}>
                        <f.icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{f.title}</p>
                        <p className="text-xs text-black/60">{f.desc}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Body */}
      <div className="px-6 py-20 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-white px-3 py-1 text-xs font-medium text-orange-700">
          <Rocket className="h-3 w-3" /> Launch week — 40% off annual plans
        </span>
        <h1 className="mx-auto mt-6 max-w-3xl text-5xl font-bold tracking-tight md:text-7xl" style={{ letterSpacing: "-0.03em" }}>
          Ship your startup<br />
          <span style={{ background: "linear-gradient(135deg, #f97316 0%, #dc2626 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            in days, not months.
          </span>
        </h1>
        <p className="mx-auto mt-5 max-w-md text-lg text-black/60">
          Join 8,400+ founders using Launch to build, ship, and scale.
        </p>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-x-0 top-0 z-50 border-b border-orange-100 bg-white p-5 md:hidden"
          >
            <button onClick={() => setMobileOpen(false)} className="absolute right-4 top-4" aria-label="Close">
              <X className="h-5 w-5" />
            </button>
            <nav className="mt-8 flex flex-col gap-1">
              {NAV.map((n) => (
                <a key={n.label} href="#" onClick={(e) => { e.preventDefault(); setMobileOpen(false); }} className="border-b border-orange-50 py-3 text-base">
                  {n.label}
                </a>
              ))}
            </nav>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="mt-5 block rounded-full py-3 text-center text-sm font-semibold text-white"
              style={{ background: "linear-gradient(135deg, #f97316 0%, #dc2626 100%)" }}
            >
              Start free
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function LaunchLogo() {
  return (
    <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden="true">
      <defs>
        <linearGradient id="lc-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fb923c" />
          <stop offset="50%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>
      </defs>
      <path d="M16 2 C20 6 22 12 22 16 L22 22 L10 22 L10 16 C10 12 12 6 16 2 Z" fill="url(#lc-grad)" />
      <circle cx="16" cy="13" r="2.5" fill="white" />
      <path d="M10 22 L7 28 L12 25 Z" fill="url(#lc-grad)" opacity="0.7" />
      <path d="M22 22 L25 28 L20 25 Z" fill="url(#lc-grad)" opacity="0.7" />
      <path d="M14 22 L16 28 L18 22 Z" fill="#fbbf24" />
    </svg>
  );
}
