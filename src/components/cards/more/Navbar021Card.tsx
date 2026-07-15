"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronDown, ArrowRight, Zap, ShieldCheck, Headphones, Menu, X } from "lucide-react";

// ════════════════════════════════════════════════════════════════════════════
// Navbar021 — Cascader (multi-level cascading 3-level dropdown)
// Light + indigo accent + Product tab opens a cascading 3-level menu:
// Product → Categories → Sub-categories. Each level flies out to the right.
// Mobile: accordion multi-level drawer.
// ════════════════════════════════════════════════════════════════════════════

type SubLink = { label: string; href: string };
type Level2 = { label: string; children?: SubLink[] };
type Level1 = { label: string; children?: Level2[] };

const NAV: Level1[] = [
  {
    label: "Product",
    children: [
      {
        label: "Workflows",
        children: [
          { label: "Triggers", href: "#" },
          { label: "Actions", href: "#" },
          { label: "Conditions", href: "#" },
          { label: "Webhooks", href: "#" },
        ],
      },
      {
        label: "Integrations",
        children: [
          { label: "Slack", href: "#" },
          { label: "Notion", href: "#" },
          { label: "Linear", href: "#" },
          { label: "Figma", href: "#" },
        ],
      },
      {
        label: "AI",
        children: [
          { label: "Models", href: "#" },
          { label: "Prompts", href: "#" },
          { label: "Embeddings", href: "#" },
        ],
      },
    ],
  },
  {
    label: "Solutions",
    children: [
      { label: "Engineering", children: [{ label: "CI/CD", href: "#" }, { label: "Code Review", href: "#" }] },
      { label: "Marketing", children: [{ label: "Campaigns", href: "#" }, { label: "Analytics", href: "#" }] },
    ],
  },
  { label: "Pricing" },
  { label: "Docs" },
];

export function Navbar021Card() {
  const [openL1, setOpenL1] = useState<string | null>(null);
  const [openL2, setOpenL2] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenL1(label);
    setOpenL2(null);
  };
  const handleLeave = () => {
    closeTimer.current = setTimeout(() => { setOpenL1(null); setOpenL2(null); }, 150);
  };

  return (
    <div
      data-navbar021
      className="min-h-full"
      style={{ background: "#fbfbfd", fontFamily: "var(--font-manrope), system-ui, sans-serif", color: "#0a0a0a" }}
    >
      <header
        ref={containerRef}
        onMouseLeave={handleLeave}
        className="sticky top-0 z-40 border-b border-black/10 bg-white/85 backdrop-blur-xl"
      >
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6">
          <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-2">
            <CascaderLogo />
            <span className="text-xl font-bold tracking-tight">Cascader</span>
          </a>
          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((n) => (
              <button
                key={n.label}
                onMouseEnter={() => handleEnter(n.label)}
                className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${openL1 === n.label ? "bg-indigo-50 text-indigo-700" : "text-black/70 hover:bg-black/5"}`}
              >
                {n.label}
                {n.children && <ChevronDown className="h-3 w-3" />}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 md:flex">
              {[
                { icon: Zap, label: "No-code" },
                { icon: ShieldCheck, label: "SOC 2" },
              ].map((b) => (
                <span key={b.label} className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] text-indigo-700" style={{ background: "#eef2ff", fontFamily: "var(--font-jetbrains), monospace" }}>
                  <b.icon className="h-2.5 w-2.5" /> {b.label}
                </span>
              ))}
            </div>
            <a href="#" onClick={(e) => e.preventDefault()} className="hidden rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 md:inline-block">
              Start free
            </a>
            <button onClick={() => setMobileOpen(true)} className="md:hidden" aria-label="Menu">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Cascading dropdown */}
        <AnimatePresence>
          {openL1 && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="absolute left-0 right-0 top-full z-30 mx-auto max-w-[1200px] px-6"
            >
              <div className="mt-1 flex gap-2 rounded-xl border border-black/10 bg-white p-2 shadow-2xl">
                {/* Level 2 */}
                <div className="w-48 space-y-0.5">
                  {NAV.find((n) => n.label === openL1)?.children?.map((l2) => (
                    <button
                      key={l2.label}
                      onMouseEnter={() => setOpenL2(l2.label)}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${openL2 === l2.label ? "bg-indigo-50 text-indigo-700" : "hover:bg-black/5"}`}
                    >
                      {l2.label}
                      {l2.children && <ChevronRight className="h-3.5 w-3.5" />}
                    </button>
                  ))}
                </div>
                {/* Level 3 */}
                <div className="flex-1 rounded-lg bg-black/[0.02] p-2">
                  {openL2 ? (
                    <div className="grid grid-cols-2 gap-1">
                      {NAV.find((n) => n.label === openL1)?.children?.find((l2) => l2.label === openL2)?.children?.map((l3) => (
                        <a
                          key={l3.label}
                          href={l3.href}
                          onClick={(e) => e.preventDefault()}
                          className="group flex items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-white"
                        >
                          <span className="text-black/80 group-hover:text-indigo-700">{l3.label}</span>
                          <ArrowRight className="h-3 w-3 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                        </a>
                      ))}
                    </div>
                  ) : (
                    <div className="flex h-full items-center justify-center p-6 text-center text-xs text-black/40">
                      Hover a category to see its sub-items
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Body */}
      <div className="px-6 py-20 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200 bg-white px-3 py-1 text-xs font-medium text-indigo-700">
          <Headphones className="h-3 w-3" /> Hover "Product" to see cascading menu
        </span>
        <h1 className="mx-auto mt-6 max-w-3xl text-5xl font-bold tracking-tight md:text-7xl" style={{ letterSpacing: "-0.03em" }}>
          Automate anything.<br />Connect everything.
        </h1>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-50 bg-black/40 md:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 right-0 z-50 w-80 overflow-y-auto bg-white p-5 md:hidden"
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="text-lg font-bold">Menu</span>
                <button onClick={() => setMobileOpen(false)} aria-label="Close"><X className="h-5 w-5" /></button>
              </div>
              <MobileCascader nav={NAV} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileCascader({ nav }: { nav: Level1[] }) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const toggle = (label: string) => setExpanded((p) => ({ ...p, [label]: !p[label] }));

  return (
    <nav className="flex flex-col">
      {nav.map((l1) => (
        <div key={l1.label} className="border-b border-black/5">
          <button
            onClick={() => l1.children && toggle(l1.label)}
            className="flex w-full items-center justify-between py-3 text-left font-medium"
          >
            {l1.label}
            {l1.children && <ChevronDown className={`h-4 w-4 transition-transform ${expanded[l1.label] ? "rotate-180" : ""}`} />}
          </button>
          <AnimatePresence initial={false}>
            {expanded[l1.label] && l1.children && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden pl-3"
              >
                {l1.children.map((l2) => (
                  <div key={l2.label}>
                    <button
                      onClick={() => l2.children && toggle(`${l1.label}-${l2.label}`)}
                      className="flex w-full items-center justify-between py-2 text-left text-sm text-black/70"
                    >
                      {l2.label}
                      {l2.children && <ChevronRight className={`h-3 w-3 transition-transform ${expanded[`${l1.label}-${l2.label}`] ? "rotate-90" : ""}`} />}
                    </button>
                    <AnimatePresence initial={false}>
                      {expanded[`${l1.label}-${l2.label}`] && l2.children && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: "auto" }}
                          exit={{ height: 0 }}
                          className="overflow-hidden pl-3"
                        >
                          {l2.children.map((l3) => (
                            <a key={l3.label} href={l3.href} onClick={(e) => e.preventDefault()} className="block py-1.5 text-xs text-black/60">
                              {l3.label}
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </nav>
  );
}

function CascaderLogo() {
  return (
    <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden="true">
      <defs>
        <linearGradient id="cc-nb-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#4f46e5" />
        </linearGradient>
      </defs>
      <circle cx="6" cy="6" r="3" fill="url(#cc-nb-grad)" />
      <circle cx="26" cy="6" r="3" fill="url(#cc-nb-grad)" opacity="0.6" />
      <circle cx="6" cy="26" r="3" fill="url(#cc-nb-grad)" opacity="0.6" />
      <circle cx="26" cy="26" r="3" fill="url(#cc-nb-grad)" />
      <circle cx="16" cy="16" r="4" fill="url(#cc-nb-grad)" />
      <line x1="6" y1="6" x2="16" y2="16" stroke="url(#cc-nb-grad)" strokeWidth="1.5" />
      <line x1="26" y1="6" x2="16" y2="16" stroke="url(#cc-nb-grad)" strokeWidth="1.5" />
      <line x1="6" y1="26" x2="16" y2="16" stroke="url(#cc-nb-grad)" strokeWidth="1.5" />
      <line x1="26" y1="26" x2="16" y2="16" stroke="url(#cc-nb-grad)" strokeWidth="1.5" />
    </svg>
  );
}
