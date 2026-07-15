"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Heart, ShoppingBag, User, ChevronDown, Menu, X, Truck, RotateCcw, MapPin, Tag } from "lucide-react";
import { UnsplashAvatar } from "./navbar-helpers";

// ════════════════════════════════════════════════════════════════════════════
// Navbar029 — Marketly (marketplace with category-prefixed search)
// Three-tier: service strip + main bar (logo + category-prefixed search +
// cart/wishlist) + secondary category bar. Search has a category dropdown
// prefix. Mobile: slide-in drawer.
// ════════════════════════════════════════════════════════════════════════════

const CATEGORIES = ["All", "Electronics", "Fashion", "Home", "Beauty", "Sports", "Books", "Toys"];
const CATEGORY_BAR = ["Today's Deals", "Best Sellers", "New Arrivals", "Gift Cards", "Customer Service"];

export function Navbar029Card() {
  const [cat, setCat] = useState("All");
  const [catOpen, setCatOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const catRef = useRef<HTMLDivElement>(null);

  return (
    <div
      data-navbar029
      className="min-h-full"
      style={{ background: "#faf9f6", fontFamily: "var(--font-manrope), system-ui, sans-serif", color: "#1a1a1a" }}
    >
      {/* Service strip */}
      <div className="bg-emerald-700 px-4 py-1.5 text-center text-[11px] text-white" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
        <Truck className="mr-1 inline h-3 w-3" /> Free shipping over $35 · <Tag className="mx-1 inline h-3 w-3" /> Use code WELCOME10 for 10% off · <RotateCcw className="mx-1 inline h-3 w-3" /> 30-day returns
      </div>

      <header className="sticky top-0 z-40 bg-white shadow-sm">
        {/* Main bar */}
        <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-4 px-4">
          <button onClick={() => setMobileOpen(true)} className="md:hidden" aria-label="Menu">
            <Menu className="h-5 w-5" />
          </button>
          <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-2">
            <MarketlyLogo />
            <span className="text-xl font-bold tracking-tight">Marketly</span>
          </a>

          {/* Category-prefixed search */}
          <div className="hidden flex-1 items-stretch rounded-lg border-2 border-emerald-600 bg-white md:flex">
            <div ref={catRef} className="relative">
              <button
                onClick={() => setCatOpen((v) => !v)}
                className="flex h-full items-center gap-1 border-r border-slate-200 px-3 text-xs font-medium hover:bg-slate-50"
              >
                {cat} <ChevronDown className="h-3 w-3" />
              </button>
              <AnimatePresence>
                {catOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setCatOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 top-full mt-1 w-44 rounded-lg border border-slate-200 bg-white py-1 shadow-lg"
                    >
                      {CATEGORIES.map((c) => (
                        <button
                          key={c}
                          onClick={() => { setCat(c); setCatOpen(false); }}
                          className={`block w-full px-3 py-1.5 text-left text-xs hover:bg-slate-50 ${c === cat ? "text-emerald-700 font-semibold" : ""}`}
                        >
                          {c}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
            <input
              placeholder={`Search ${cat}…`}
              className="flex-1 px-3 text-sm outline-none"
            />
            <button className="flex items-center justify-center bg-amber-400 px-4 hover:bg-amber-500" aria-label="Search">
              <Search className="h-4 w-4 text-slate-900" />
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="hidden flex-col items-center text-[10px] text-slate-600 hover:text-emerald-700 md:flex">
              <MapPin className="h-5 w-5" /> Deliver to
            </button>
            <button className="hidden flex-col items-center text-[10px] text-slate-600 hover:text-emerald-700 md:flex">
              <User className="h-5 w-5" /> Account
            </button>
            <button className="relative flex flex-col items-center text-[10px] text-slate-600 hover:text-emerald-700">
              <Heart className="h-5 w-5" />
              <span className="absolute -right-1 top-0 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-rose-500 text-[8px] font-bold text-white">3</span>
            </button>
            <button className="relative flex flex-col items-center text-[10px] text-slate-600 hover:text-emerald-700">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -right-1 top-0 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-600 text-[8px] font-bold text-white">2</span>
            </button>
          </div>
        </div>

        {/* Category bar */}
        <div className="border-t border-slate-100">
          <div className="mx-auto flex h-10 max-w-[1400px] items-center gap-1 overflow-x-auto px-4 scrollbar-none">
            {CATEGORY_BAR.map((c, i) => (
              <a
                key={c}
                href="#"
                onClick={(e) => e.preventDefault()}
                className={`flex-shrink-0 px-3 py-1 text-xs font-medium transition-colors hover:text-emerald-700 ${i === 0 ? "font-bold text-amber-700" : "text-slate-700"}`}
              >
                {c}
              </a>
            ))}
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="px-4 py-8">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200" />
                <div className="p-3">
                  <p className="text-xs text-slate-500">Brand {i}</p>
                  <p className="text-sm font-semibold">Product Name {i}</p>
                  <p className="mt-1 text-sm font-bold text-emerald-700" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>${(i * 29).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 left-0 z-50 w-72 overflow-y-auto bg-white p-5 md:hidden"
          >
            <button onClick={() => setMobileOpen(false)} className="absolute right-4 top-4" aria-label="Close">
              <X className="h-5 w-5" />
            </button>
            <div className="mt-8 mb-4">
              <UnsplashAvatar seed="photo-1500648767791-00dcc994a43e" alt="User" size={48} className="rounded-full" />
              <p className="mt-2 text-sm font-semibold">Hello, Marcus</p>
              <p className="text-xs text-slate-500">Premium member</p>
            </div>
            <nav className="flex flex-col gap-1">
              {CATEGORY_BAR.map((c) => (
                <a key={c} href="#" onClick={(e) => e.preventDefault()} className="border-b border-slate-100 py-2.5 text-sm">
                  {c}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MarketlyLogo() {
  return (
    <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden="true">
      <defs>
        <linearGradient id="mk-nb-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>
      <path d="M7 9 L5 27 h22 l-2 -18 z" fill="url(#mk-nb-grad)" />
      <path d="M11 12 v-2 a5 5 0 0 1 10 0 v 2" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <circle cx="16" cy="18" r="2" fill="white" />
    </svg>
  );
}
