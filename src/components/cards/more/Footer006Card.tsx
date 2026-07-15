"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Loader2 } from "lucide-react";

// ════════════════════════════════════════════════════════════════════════════
// Footer 006 — Lumio (Minimal SaaS)
// Pure white + thin hairlines + ultra-compact + horizontal scroll on mobile
// Lime status dot + minimal micro-interactions
// ════════════════════════════════════════════════════════════════════════════

const NAV = ["Product", "Pricing", "Customers", "Changelog", "Docs", "Careers"];
const LEGAL = ["Privacy", "Terms", "Security", "DPA", "Cookies"];

export function Footer006Card() {
  return (
    <footer
      className="relative"
      style={{
        background: "#ffffff",
        color: "#0a0a0a",
        fontFamily: "var(--font-inter-tight), system-ui, sans-serif",
      }}
    >
      {/* Top hairline */}
      <div className="h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent)" }} />

      <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-10">
        {/* Row 1: brand + nav + CTA */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-black/10">
          <a href="#" onClick={(e) => e.preventDefault()} className="inline-flex items-center gap-2 group">
            <LumioLogo />
            <span className="text-lg font-semibold tracking-tight">Lumio</span>
          </a>

          <nav className="flex items-center gap-1 overflow-x-auto -mx-2 px-2 md:mx-0 md:px-0 scrollbar-none">
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

          <MinimalSubscribe />
        </div>

        {/* Row 2: meta */}
        <div className="pt-6 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs text-black/50">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <span className="relative flex w-1.5 h-1.5">
                <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping" style={{ background: "#84cc16" }} />
                <span className="relative inline-flex w-1.5 h-1.5 rounded-full" style={{ background: "#84cc16" }} />
              </span>
              All systems operational
            </span>
            <span className="hidden md:inline">·</span>
            <span className="hidden md:inline" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>v2.4.0</span>
          </div>
          <div className="flex items-center gap-4 overflow-x-auto scrollbar-none">
            {LEGAL.map((l) => (
              <a key={l} href="#" onClick={(e) => e.preventDefault()} className="whitespace-nowrap hover:text-black transition-colors">
                {l}
              </a>
            ))}
            <span className="hidden md:inline">·</span>
            <span className="whitespace-nowrap">© {new Date().getFullYear()} Lumio Inc.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── Minimal subscribe form (inline pill) ───────────────────────────────────
function MinimalSubscribe() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 900));
    setStatus("success");
    setEmail("");
    setTimeout(() => setStatus("idle"), 2500);
  };

  return (
    <form onSubmit={submit} className="relative flex items-center group">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Subscribe to changelog"
        disabled={status !== "idle"}
        className="w-64 h-9 pl-3 pr-24 text-sm rounded-full border bg-transparent outline-none transition-colors disabled:opacity-50"
        style={{ borderColor: "rgba(0,0,0,0.15)" }}
        onFocus={(e) => { e.currentTarget.style.borderColor = "#0a0a0a"; }}
        onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(0,0,0,0.15)"; }}
      />
      <button
        type="submit"
        disabled={status !== "idle"}
        className="absolute right-1 inline-flex items-center gap-1 h-7 px-3 rounded-full text-xs font-medium transition-all disabled:opacity-50"
        style={{ background: "#0a0a0a", color: "#fff" }}
      >
        {status === "loading" ? (
          <><Loader2 className="w-3 h-3 animate-spin" /> ...</>
        ) : status === "success" ? (
          <><Check className="w-3 h-3" /> Done</>
        ) : (
          <>Subscribe <ArrowRight className="w-3 h-3" /></>
        )}
      </button>
    </form>
  );
}

// ── Lumio logo — luminous dot ───────────────────────────────────────────────
function LumioLogo() {
  return (
    <svg viewBox="0 0 32 32" className="w-7 h-7" aria-hidden="true">
      <circle cx="16" cy="16" r="14" fill="#0a0a0a" />
      <circle cx="16" cy="16" r="6" fill="#fff" />
      <circle cx="16" cy="16" r="3" fill="#84cc16" />
    </svg>
  );
}
