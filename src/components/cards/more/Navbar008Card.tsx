"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingBag, Apple, ChevronDown } from "lucide-react";

// ════════════════════════════════════════════════════════════════════════════
// Navbar008 — Orchard (Apple-style full-width hover mega menu)
// Frosted light glass + thin nav links + full-width mega dropdown on hover
// with 3-column category layout + product thumbnails.
// ════════════════════════════════════════════════════════════════════════════

const NAV = [
  {
    label: "Store",
    sections: [
      { title: "Shop", links: ["Mac", "iPad", "iPhone", "Apple Watch", "Apple TV"] },
      { title: "Quick Links", links: ["Find a Store", "Order Status", "Financing", "Apple Trade In"] },
      { title: "Shop Special", links: ["Education", "Business", "Refurbished", "Gift Cards"] },
    ],
  },
  {
    label: "Mac",
    sections: [
      { title: "Explore Mac", links: ["MacBook Air", "MacBook Pro", "iMac", "Mac mini", "Mac Studio"] },
      { title: "Shop Mac", links: ["Shop Mac", "Mac Accessories", "Apple Trade In"] },
      { title: "More", links: ["macOS Sequoia", "Mac for Business", "Compare"] },
    ],
  },
  {
    label: "iPad",
    sections: [
      { title: "Explore iPad", links: ["iPad Pro", "iPad Air", "iPad", "iPad mini"] },
      { title: "Shop iPad", links: ["Shop iPad", "iPad Accessories", "Apple Trade In"] },
      { title: "More", links: ["iPadOS 18", "Compare", "Education"] },
    ],
  },
  {
    label: "iPhone",
    sections: [
      { title: "Explore iPhone", links: ["iPhone 16 Pro", "iPhone 16", "iPhone 15"] },
      { title: "Shop iPhone", links: ["Shop iPhone", "iPhone Accessories", "Apple Trade In"] },
      { title: "More", links: ["iOS 18", "Compare", "Switch to iPhone"] },
    ],
  },
  { label: "Watch", sections: [] },
  { label: "AirPods", sections: [] },
  { label: "Support", sections: [] },
];

export function Navbar008Card() {
  const [open, setOpen] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
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
      data-navbar008
      className="min-h-full"
      style={{ background: "#f5f5f7", fontFamily: "var(--font-inter-tight), system-ui, sans-serif", color: "#1d1d1f" }}
    >
      <header
        ref={containerRef}
        onMouseLeave={handleLeave}
        className="sticky top-0 z-40 bg-white/70 backdrop-blur-2xl"
        style={{ borderBottom: open !== null ? "none" : "1px solid rgba(0,0,0,0.06)" }}
      >
        <nav className="mx-auto flex h-11 max-w-[1024px] items-center justify-between px-6 text-[13px]">
          <a href="#" onClick={(e) => e.preventDefault()} aria-label="Orchard">
            <Apple className="h-4 w-4" fill="currentColor" />
          </a>
          {NAV.map((n, i) => (
            <button
              key={n.label}
              onMouseEnter={() => handleEnter(i)}
              className={`relative transition-colors ${open === i ? "text-black" : "text-black/80 hover:text-black"}`}
            >
              {n.label}
            </button>
          ))}
          <div className="flex items-center gap-4">
            <Search className="h-4 w-4 text-black/80 hover:text-black" />
            <ShoppingBag className="h-4 w-4 text-black/80 hover:text-black" />
          </div>
        </nav>

        {/* Full-width mega dropdown */}
        <AnimatePresence>
          {open !== null && NAV[open]?.sections.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-x-0 top-full border-t border-black/5 bg-white/95 backdrop-blur-2xl"
            >
              <div className="mx-auto max-w-[1024px] px-6 py-8">
                <div className="grid grid-cols-3 gap-8">
                  {NAV[open].sections.map((s) => (
                    <div key={s.title}>
                      <p className="mb-3 text-[11px] font-semibold text-black/40">{s.title}</p>
                      <ul className="space-y-2">
                        {s.links.map((l) => (
                          <li key={l}>
                            <a
                              href="#"
                              onClick={(e) => e.preventDefault()}
                              className="text-sm text-black/70 hover:text-black transition-colors"
                            >
                              {l}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero body */}
      <div className="px-6 pt-16 pb-10 text-center">
        <h1 className="text-5xl font-semibold tracking-tight" style={{ letterSpacing: "-0.03em" }}>
          MacBook Pro
        </h1>
        <p className="mt-2 text-2xl text-black/60">Mind-blowing. Head-turning.</p>
        <div className="mt-5 flex items-center justify-center gap-4 text-sm text-blue-600">
          <a href="#" onClick={(e) => e.preventDefault()} className="hover:underline">Learn more</a>
          <a href="#" onClick={(e) => e.preventDefault()} className="hover:underline">Buy</a>
        </div>
        <div className="mt-8 text-[11px] text-black/40" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
          Hover any nav link to see the mega menu
        </div>
      </div>
    </div>
  );
}
