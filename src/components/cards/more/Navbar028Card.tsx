"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, Menu, X, BookOpen, Github, ArrowRight, FileText, Terminal, Star } from "lucide-react";

// ════════════════════════════════════════════════════════════════════════════
// Navbar028 — Docflow (documentation navbar with version selector)
// Light + emerald accent. Big prominent search bar in the center.
// Version selector dropdown on left. GitHub stars on right. Mobile drawer.
// ════════════════════════════════════════════════════════════════════════════

const NAV = ["Guides", "API", "Examples", "Showcase"];

export function Navbar028Card() {
  const [versionOpen, setVersionOpen] = useState(false);
  const [version, setVersion] = useState("v3.2");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div
      data-navbar028
      className="min-h-full"
      style={{ background: "#f8fafc", fontFamily: "var(--font-inter-tight), system-ui, sans-serif", color: "#0f172a" }}
    >
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1200px] items-center gap-4 px-6">
          {/* Logo + version */}
          <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-2.5">
            <DocflowLogo />
            <span className="text-lg font-bold tracking-tight">Docflow</span>
            <div className="relative">
              <button
                onClick={() => setVersionOpen((v) => !v)}
                className="flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-0.5 text-xs font-medium text-emerald-700 hover:bg-slate-50"
                style={{ fontFamily: "var(--font-jetbrains), monospace" }}
              >
                {version}
                <ChevronDown className="h-3 w-3" />
              </button>
              <AnimatePresence>
                {versionOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setVersionOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 top-full mt-1 w-44 rounded-lg border border-slate-200 bg-white py-1 shadow-lg"
                    >
                      {["v3.2 (stable)", "v3.1", "v3.0", "v2.9 (LTS)"].map((v) => (
                        <button
                          key={v}
                          onClick={() => { setVersion(v.split(" ")[0]); setVersionOpen(false); }}
                          className="flex w-full items-center justify-between px-3 py-1.5 text-left text-xs hover:bg-slate-50"
                        >
                          <span style={{ fontFamily: "var(--font-jetbrains), monospace" }}>{v}</span>
                          {v.includes("stable") && <span className="rounded bg-emerald-100 px-1 text-[9px] text-emerald-700">STABLE</span>}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </a>

          {/* Prominent search */}
          <div className="relative mx-auto hidden flex-1 max-w-md md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              placeholder="Search the docs…"
              className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-12 text-sm outline-none transition-colors focus:border-emerald-600"
            />
            <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[10px]" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
              ⌘K
            </kbd>
          </div>

          {/* Nav */}
          <nav className="hidden items-center gap-5 md:flex">
            {NAV.map((n) => (
              <a key={n} href="#" onClick={(e) => e.preventDefault()} className="group relative text-sm text-slate-700 hover:text-emerald-700">
                {n}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-emerald-600 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* GitHub stars + mobile menu */}
          <div className="flex items-center gap-2">
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="hidden items-center gap-2 rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs hover:bg-slate-50 md:inline-flex"
            >
              <Star className="h-3.5 w-3.5 text-amber-500" fill="currentColor" />
              <span className="font-semibold">14.2k</span>
              <Github className="h-3.5 w-3.5 text-slate-600" />
            </a>
            <button onClick={() => setMobileOpen(true)} className="md:hidden" aria-label="Menu">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="mx-auto max-w-[1200px] px-6 py-10">
        <div className="rounded-2xl border border-slate-200 bg-white p-8">
          <p className="text-xs uppercase tracking-wider text-emerald-700" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
            Get started
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight" style={{ letterSpacing: "-0.02em" }}>
            Welcome to Docflow
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            The documentation platform for modern teams. Build, search, and scale your docs.
          </p>
          <div className="mt-5 grid grid-cols-1 gap-2 md:grid-cols-3">
            {[
              { icon: BookOpen, label: "Quickstart", desc: "5 minutes" },
              { icon: Terminal, label: "CLI Reference", desc: "v3.2 commands" },
              { icon: FileText, label: "Concepts", desc: "Core ideas" },
            ].map((c) => (
              <a
                key={c.label}
                href="#"
                onClick={(e) => e.preventDefault()}
                className="group flex items-center gap-2.5 rounded-lg border border-slate-200 p-3 hover:border-emerald-600 hover:bg-emerald-50/30"
              >
                <c.icon className="h-4 w-4 text-emerald-700" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{c.label}</p>
                  <p className="text-[11px] text-slate-500">{c.desc}</p>
                </div>
                <ArrowRight className="h-3.5 w-3.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 right-0 z-50 w-72 bg-white p-5 md:hidden"
          >
            <button onClick={() => setMobileOpen(false)} className="absolute right-4 top-4" aria-label="Close">
              <X className="h-5 w-5" />
            </button>
            <nav className="mt-8 flex flex-col gap-1">
              {NAV.map((n) => (
                <a key={n} href="#" onClick={(e) => { e.preventDefault(); setMobileOpen(false); }} className="border-b border-slate-100 py-3 text-base">
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

function DocflowLogo() {
  return (
    <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden="true">
      <defs>
        <linearGradient id="df-nb-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>
      <rect x="3" y="5" width="26" height="6" rx="1.5" fill="url(#df-nb-grad)" />
      <rect x="3" y="13" width="26" height="6" rx="1.5" fill="url(#df-nb-grad)" opacity="0.7" />
      <rect x="3" y="21" width="26" height="6" rx="1.5" fill="url(#df-nb-grad)" opacity="0.4" />
    </svg>
  );
}
