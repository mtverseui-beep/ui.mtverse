"use client";

import { useState, useEffect, useRef } from "react";
import { Search, ShoppingBag, User, Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ════════════════════════════════════════════════════════════════════════════
// Navbar004Card — glow.co beauty boutique (polished) · ADVANCED
// ════════════════════════════════════════════════════════════════════════════
// Premium boutique navbar:
//   • Scroll-aware morph: tall (h-20) transparent → compact (h-16) frosted + shadow
//   • Centered "glow.co" wordmark with pink dot; symmetric split layout
//   • Expandable search icon → spring width transition to a full field
//   • Cart badge + account; ambient indigo/pink blobs (scoped to canvas)
//   • Mobile slide-down menu with staggered links
//   • Pink (#ff4d8c) accent · scrollContainerRef-driven (window fallback)

const ACCENT = "#ff4d8c";
const EASE = [0.16, 1, 0.3, 1] as const;
const NAV_LINKS = [
  { label: "Shop", href: "#" },
  { label: "About", href: "#" },
  { label: "Journal", href: "#" },
];

interface Navbar004CardProps {
  scrollContainerRef?: React.RefObject<HTMLElement | null>;
}

export function Navbar004Card({ scrollContainerRef }: Navbar004CardProps = {}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const el = scrollContainerRef?.current ?? null;
    const target: Element | Window = el ?? window;
    const onScroll = () => setScrolled((el ? el.scrollTop : window.scrollY) > 24);
    onScroll();
    target.addEventListener("scroll", onScroll, { passive: true } as AddEventListenerOptions);
    return () => target.removeEventListener("scroll", onScroll);
  }, [scrollContainerRef]);

  useEffect(() => {
    if (searchExpanded) {
      const t = setTimeout(() => searchInputRef.current?.focus(), 280);
      return () => clearTimeout(t);
    }
  }, [searchExpanded]);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  return (
    <div data-navbar004 className="relative min-h-full bg-[#fafafa] text-black">
      {/* Ambient blobs (scoped to the canvas) */}
      <div className="pointer-events-none absolute -left-[10%] -top-[10%] h-[500px] w-[500px] rounded-full opacity-60 blur-[80px]" style={{ background: "radial-gradient(circle, rgb(224,231,255) 0%, rgba(255,255,255,0) 70%)" }} />
      <div className="pointer-events-none absolute -right-[10%] top-[30%] h-[600px] w-[600px] rounded-full opacity-60 blur-[80px]" style={{ background: "radial-gradient(circle, rgb(255,228,230) 0%, rgba(255,255,255,0) 70%)" }} />

      <header
        className={`sticky top-0 z-50 flex items-center justify-between px-4 transition-all duration-500 md:px-12 ${
          scrolled
            ? "h-16 border-b border-black/[0.04] bg-white/85 shadow-[0_4px_24px_rgba(255,77,140,0.06)] backdrop-blur-xl"
            : "h-20 border-b border-transparent bg-[#fafafa]/60 backdrop-blur-md"
        }`}
      >
        {/* Mobile menu button */}
        <button
          className="text-black transition-transform hover:scale-110 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Desktop nav (left) */}
        <nav className="hidden md:block" aria-label="Primary">
          <ul className="flex list-none gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href} onClick={(e) => e.preventDefault()} className="group relative text-sm font-medium text-[#444] transition-colors hover:text-black">
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full" style={{ background: ACCENT }} />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Centered logo */}
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          aria-label="glow.co home"
          className={`absolute left-1/2 -translate-x-1/2 font-bold tracking-[-0.03em] text-black transition-all duration-500 ${scrolled ? "text-xl" : "text-xl md:text-2xl"}`}
        >
          glow<span style={{ color: ACCENT }}>.</span>co
        </a>

        {/* Right actions */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Expandable search */}
          <div className="hidden items-center md:flex">
            <motion.div
              initial={false}
              animate={{ width: searchExpanded ? 280 : 40 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="relative flex items-center overflow-hidden rounded-full border border-black/10 bg-white/60"
              style={{ height: 40 }}
            >
              <button
                onClick={() => setSearchExpanded((v) => !v)}
                className="absolute left-0 z-10 flex h-10 w-10 items-center justify-center transition-transform hover:scale-110"
                aria-label="Search"
              >
                <Search className="h-5 w-5 text-[#444]" />
              </button>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search products..."
                className="w-full bg-transparent pl-10 pr-4 text-sm text-[#111] placeholder:text-[#999] focus:outline-none"
                style={{ opacity: searchExpanded ? 1 : 0, transition: "opacity 0.2s ease 0.1s" }}
                onBlur={() => setSearchExpanded(false)}
              />
            </motion.div>
          </div>

          {/* Account */}
          <button className="hidden text-[#444] transition-transform hover:scale-110 hover:text-black sm:block" aria-label="Account">
            <User className="h-[22px] w-[22px]" strokeWidth={1.8} />
          </button>

          {/* Cart */}
          <button className="relative text-black transition-transform hover:scale-110" aria-label="Cart, 2 items">
            <ShoppingBag className="h-[22px] w-[22px]" strokeWidth={1.8} />
            <span className="absolute -right-2 -top-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ background: ACCENT }}>2</span>
          </button>
        </div>
      </header>

      {/* Hero content */}
      <div className="relative z-10 mx-auto max-w-3xl px-6 pb-32 pt-16 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/70 px-3 py-1 text-xs font-medium text-[#666] backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: ACCENT }} /> New — Radiance Serum
        </span>
        <h1 className="mt-6 text-5xl font-bold tracking-tight md:text-6xl">
          Skincare that <span style={{ color: ACCENT }}>glows</span> with you
        </h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-[#666]">Clean, effective formulas. Scroll to watch the header frost and compress.</p>
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="mt-8 inline-flex h-11 items-center gap-2 rounded-full px-6 text-sm font-semibold text-white"
          style={{ background: ACCENT }}
        >
          Shop the collection <ArrowRight className="h-4 w-4" />
        </a>
      </div>
      <div aria-hidden style={{ height: 620 }} />

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="fixed inset-x-0 top-16 z-40 overflow-hidden border-b border-black/[0.04] bg-white/98 backdrop-blur-xl md:hidden"
          >
            <nav className="px-4 py-6" aria-label="Mobile">
              <ul className="flex list-none flex-col gap-4">
                {NAV_LINKS.map((link, i) => (
                  <motion.li key={link.label} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                    <a href={link.href} onClick={(e) => { e.preventDefault(); setMobileOpen(false); }} className="block py-2 text-lg font-medium text-[#444] transition-colors hover:text-black">
                      {link.label}
                    </a>
                  </motion.li>
                ))}
                <motion.li initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="border-t border-black/5 pt-3">
                  <div className="flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-2">
                    <Search className="h-5 w-5 text-[#444]" />
                    <input type="text" placeholder="Search..." className="flex-1 bg-transparent text-base text-[#444] placeholder:text-[#999] focus:outline-none" />
                  </div>
                </motion.li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
