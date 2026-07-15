"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, ArrowRight, Check, Twitter, Github, Linkedin } from "lucide-react";

// ════════════════════════════════════════════════════════════════════════════
// Footer 022 — Swift (Compact Utility)
// Light + ultra-compact 2-row + inline nav + marquee brand strip + cyan
// ════════════════════════════════════════════════════════════════════════════

const NAV = ["Product", "Pricing", "Docs", "Customers", "Changelog", "Careers", "Blog", "Status"];
const LEGAL = ["Privacy", "Terms", "Security", "DPA"];

export function Footer022Card() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: "#ffffff",
        color: "#0a0a0a",
        fontFamily: "var(--font-inter-tight), system-ui, sans-serif",
      }}
    >
      {/* Marquee brand strip */}
      <div className="py-3 overflow-hidden border-y" style={{ borderColor: "rgba(0,0,0,0.06)", background: "#0a0a0a" }}>
        <motion.div
          className="flex items-center gap-8 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(8)].map((_, i) => (
            <span key={i} className="text-2xl font-bold tracking-tight text-white/90 inline-flex items-center gap-3" style={{ letterSpacing: "-0.02em" }}>
              <Zap className="w-4 h-4" style={{ color: "#06b6d4" }} />
              Swift fast. Swift simple. Swift everywhere.
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#06b6d4" }} />
            </span>
          ))}
        </motion.div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-8">
        {/* Row 1: brand + nav + CTA */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <a href="#" onClick={(e) => e.preventDefault()} className="inline-flex items-center gap-2 group">
            <SwiftLogo />
            <span className="text-xl font-bold tracking-tight">Swift</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: "#06b6d415", color: "#0891b2", fontFamily: "var(--font-jetbrains), monospace" }}>v1</span>
          </a>

          <nav className="flex items-center gap-0.5 overflow-x-auto -mx-2 px-2 md:mx-0 md:px-0 scrollbar-none">
            {NAV.map((n) => (
              <a
                key={n}
                href="#"
                onClick={(e) => e.preventDefault()}
                className="px-3 py-1.5 text-sm text-black/70 hover:text-black hover:bg-black/5 rounded-md transition-colors whitespace-nowrap"
              >
                {n}
              </a>
            ))}
          </nav>

          <CompactSubscribe />
        </div>

        {/* Row 2: meta + socials */}
        <div className="mt-6 pt-6 border-t flex flex-col md:flex-row md:items-center justify-between gap-4" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
          <div className="flex items-center gap-4 text-xs text-black/50">
            <span className="inline-flex items-center gap-1.5">
              <span className="relative flex w-1.5 h-1.5">
                <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping" style={{ background: "#06b6d4" }} />
                <span className="relative inline-flex w-1.5 h-1.5 rounded-full" style={{ background: "#06b6d4" }} />
              </span>
              All systems operational
            </span>
            <span>·</span>
            <span style={{ fontFamily: "var(--font-jetbrains), monospace" }}>v1.0.4</span>
            <span>·</span>
            <span>© {new Date().getFullYear()} Swift Inc.</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 text-xs text-black/50">
              {LEGAL.map((l) => (
                <a key={l} href="#" onClick={(e) => e.preventDefault()} className="hover:text-black transition-colors">{l}</a>
              ))}
            </div>
            <div className="flex items-center gap-1">
              {[Twitter, Github, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="w-8 h-8 rounded-md flex items-center justify-center text-black/60 transition-all hover:scale-110"
                  style={{ background: "rgba(0,0,0,0.04)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#06b6d4"; e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(0,0,0,0.04)"; e.currentTarget.style.color = "rgba(0,0,0,0.6)"; }}
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── Compact subscribe ──────────────────────────────────────────────────────
function CompactSubscribe() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 800));
    setStatus("done");
    setEmail("");
    setTimeout(() => setStatus("idle"), 2500);
  };

  return (
    <form onSubmit={submit} className="relative flex items-center group">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Get product updates"
        disabled={status !== "idle"}
        className="h-9 pl-3 pr-24 text-sm rounded-full border bg-transparent outline-none transition-colors disabled:opacity-50 w-56"
        style={{ borderColor: "rgba(0,0,0,0.15)" }}
        onFocus={(e) => { e.currentTarget.style.borderColor = "#06b6d4"; }}
        onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(0,0,0,0.15)"; }}
      />
      <button
        type="submit"
        disabled={status !== "idle"}
        className="absolute right-1 inline-flex items-center gap-1 h-7 px-3 rounded-full text-xs font-medium transition-all disabled:opacity-50"
        style={{ background: "#0a0a0a", color: "#fff" }}
      >
        {status === "loading" ? "..." : status === "done" ? <><Check className="w-3 h-3" /> Done</> : <>Join <ArrowRight className="w-3 h-3" /></>}
      </button>
    </form>
  );
}

// ── Swift logo — lightning bolt glyph ───────────────────────────────────────
function SwiftLogo() {
  return (
    <svg viewBox="0 0 32 32" className="w-7 h-7" aria-hidden="true">
      <defs>
        <linearGradient id="sw-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#0891b2" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="28" height="28" rx="7" fill="#0a0a0a" />
      <path d="M18 4 L8 18 L14 18 L12 28 L24 12 L18 12 Z" fill="url(#sw-grad)" />
    </svg>
  );
}
