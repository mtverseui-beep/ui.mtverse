"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Heart, ShoppingBag, User, Menu, X, ChevronRight, Truck, RotateCcw, Shield } from "lucide-react";

// ════════════════════════════════════════════════════════════════════════════
// Navbar014 — MARQUE (ecommerce mega menu)
// Light + service strip + main bar (logo + nav + cart) + full-width mega
// with category panels + promo column + accordion mobile drawer.
// ════════════════════════════════════════════════════════════════════════════

const CATEGORIES = [
  {
    label: "Women",
    sections: [
      { title: "Clothing", links: ["Dresses", "Tops", "Bottoms", "Outerwear", "Sweaters"] },
      { title: "Accessories", links: ["Bags", "Belts", "Scarves", "Sunglasses"] },
      { title: "Featured", links: ["New Arrivals", "Bestsellers", "Sale"] },
    ],
    promo: { title: "Spring Edit", desc: "Fresh looks for the new season", color: "#ec4899" },
  },
  {
    label: "Men",
    sections: [
      { title: "Clothing", links: ["Shirts", "T-Shirts", "Pants", "Jackets", "Suits"] },
      { title: "Accessories", links: ["Wallets", "Belts", "Ties", "Bags"] },
      { title: "Featured", links: ["New Arrivals", "Bestsellers", "Sale"] },
    ],
    promo: { title: "Capsule Wardrobe", desc: "12 pieces. 30 outfits.", color: "#0ea5e9" },
  },
  {
    label: "Accessories",
    sections: [
      { title: "Bags", links: ["Tote", "Crossbody", "Backpacks", "Clutches"] },
      { title: "Jewelry", links: ["Necklaces", "Earrings", "Rings", "Bracelets"] },
      { title: "Watches", links: ["Smart", "Analog", "Luxury"] },
    ],
    promo: { title: "Watches Sale", desc: "Up to 40% off luxury timepieces", color: "#f59e0b" },
  },
  { label: "Sale", sections: [] },
  { label: "Stories", sections: [] },
];

const MOBILE_TREE = [
  { label: "Women", children: ["Dresses", "Tops", "Bottoms", "Outerwear", "Sweaters", "Bags", "Belts"] },
  { label: "Men", children: ["Shirts", "T-Shirts", "Pants", "Jackets", "Suits", "Wallets"] },
  { label: "Accessories", children: ["Bags", "Jewelry", "Watches", "Sunglasses"] },
  { label: "Sale", children: [] },
  { label: "Stories", children: [] },
];

export function Navbar014Card() {
  const [open, setOpen] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>("Women");
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = (i: number) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(i);
  };
  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setOpen(null), 150);
  };

  return (
    <div
      data-navbar014
      className="min-h-full"
      style={{ background: "#ffffff", fontFamily: "var(--font-manrope), system-ui, sans-serif", color: "#0a0a0a" }}
    >
      {/* Service strip */}
      <div className="bg-neutral-900 px-4 py-2 text-center text-[11px] uppercase tracking-wider text-white/80" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
        <Truck className="mr-1.5 inline h-3 w-3" /> Free shipping over $75 · <RotateCcw className="mx-1 inline h-3 w-3" /> 30-day returns · <Shield className="mx-1 inline h-3 w-3" /> Secure checkout
      </div>

      <header onMouseLeave={handleLeave} className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-6 px-6">
          {/* Mobile menu button */}
          <button onClick={() => setMobileOpen(true)} className="md:hidden" aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </button>

          {/* Logo */}
          <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-2">
            <MarqueLogo />
            <span className="text-xl font-bold tracking-tight">MARQUE</span>
          </a>

          {/* Categories */}
          <nav className="hidden items-center gap-6 md:flex">
            {CATEGORIES.map((c, i) => (
              <button
                key={c.label}
                onMouseEnter={() => handleEnter(i)}
                className={`relative text-sm font-medium transition-colors ${open === i ? "text-rose-600" : "text-black/80 hover:text-rose-600"} ${c.label === "Sale" ? "text-rose-600" : ""}`}
              >
                {c.label}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Search className="h-5 w-5 text-black/70 hover:text-rose-600" />
            <User className="hidden h-5 w-5 text-black/70 hover:text-rose-600 md:block" />
            <div className="relative">
              <Heart className="h-5 w-5 text-black/70 hover:text-rose-600" />
              <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white">3</span>
            </div>
            <div className="relative">
              <ShoppingBag className="h-5 w-5 text-black/70 hover:text-rose-600" />
              <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white">2</span>
            </div>
          </div>
        </div>

        {/* Mega dropdown */}
        <AnimatePresence>
          {open !== null && (CATEGORIES[open] || CATEGORIES[0])?.sections.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-x-0 top-full border-t border-black/5 bg-white shadow-2xl"
            >
              <div className="mx-auto max-w-[1400px] px-6 py-8">
                <div className="grid grid-cols-4 gap-8">
                  {(CATEGORIES[open] || CATEGORIES[0]).sections.map((s) => (
                    <div key={s.title}>
                      <p className="mb-3 text-xs font-bold uppercase tracking-wider text-black/50">{s.title}</p>
                      <ul className="space-y-2">
                        {s.links.map((l) => (
                          <li key={l}>
                            <a href="#" onClick={(e) => e.preventDefault()} className="group inline-flex items-center gap-1 text-sm text-black/70 hover:text-rose-600">
                              {l}
                              <ChevronRight className="h-3 w-3 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  {/* Promo column */}
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="group relative overflow-hidden rounded-xl p-5 text-white"
                    style={{ background: (CATEGORIES[open] || CATEGORIES[0])?.promo?.color || "#000" }}
                  >
                    <p className="text-xs uppercase tracking-wider opacity-80">Featured</p>
                    <p className="mt-2 text-2xl font-bold">{(CATEGORIES[open] || CATEGORIES[0])?.promo?.title || ""}</p>
                    <p className="mt-1 text-sm text-white/80">{(CATEGORIES[open] || CATEGORIES[0])?.promo?.desc || ""}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold underline-offset-4 group-hover:underline">
                      Shop now <ChevronRight className="h-3 w-3" />
                    </span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Body */}
      <div className="bg-neutral-50 px-6 py-20 text-center">
        <h1 className="text-5xl font-bold tracking-tight" style={{ letterSpacing: "-0.03em" }}>
          Spring 2025 Collection
        </h1>
        <p className="mt-3 text-lg text-black/60">Hover any category to explore the mega menu</p>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/40 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 z-50 w-80 overflow-y-auto bg-white p-5 md:hidden"
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="text-lg font-bold">Menu</span>
                <button onClick={() => setMobileOpen(false)} aria-label="Close"><X className="h-5 w-5" /></button>
              </div>
              <nav className="flex flex-col">
                {MOBILE_TREE.map((n) => (
                  <div key={n.label} className="border-b border-black/5">
                    <button
                      onClick={() => setMobileExpanded(mobileExpanded === n.label ? null : n.label)}
                      className="flex w-full items-center justify-between py-3 text-left font-medium"
                    >
                      {n.label}
                      {n.children.length > 0 && (
                        <ChevronRight className={`h-4 w-4 transition-transform ${mobileExpanded === n.label ? "rotate-90" : ""}`} />
                      )}
                    </button>
                    <AnimatePresence initial={false}>
                      {mobileExpanded === n.label && n.children.length > 0 && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: "auto" }}
                          exit={{ height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="pb-3 pl-3">
                            {n.children.map((c) => (
                              <a key={c} href="#" onClick={(e) => e.preventDefault()} className="block py-1.5 text-sm text-black/70">
                                {c}
                              </a>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function MarqueLogo() {
  return (
    <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden="true">
      <defs>
        <linearGradient id="mq-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fb7185" />
          <stop offset="100%" stopColor="#e11d48" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="6" fill="url(#mq-grad)" />
      <text x="16" y="22" textAnchor="middle" fontSize="14" fontWeight="900" fill="white" fontFamily="var(--font-manrope)">M</text>
    </svg>
  );
}
