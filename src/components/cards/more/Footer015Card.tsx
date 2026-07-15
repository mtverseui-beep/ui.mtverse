"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Leaf, Sprout, Sun, ArrowUpRight, Mail, MapPin, Phone, Instagram, Twitter, Facebook } from "lucide-react";

// ════════════════════════════════════════════════════════════════════════════
// Footer 015 — Verdant (Asymmetric split)
// Dark forest-green left panel + cream right panel + organic blob divider
// ════════════════════════════════════════════════════════════════════════════

const NAV: { title: string; links: string[] }[] = [
  { title: "Shop", links: ["Plant Care", "Tools", "Seeds", "Pottery", "Gift Cards"] },
  { title: "Learn", links: ["Plant Library", "Care Guides", "Workshops", "Journal", "Ask Verdant"] },
  { title: "About", links: ["Our Story", "Sustainability", "Partners", "Press", "Contact"] },
];

export function Footer015Card() {
  return (
    <footer
      className="relative grid grid-cols-1 lg:grid-cols-12"
      style={{
        background: "#f5f1e8",
        color: "#1a2e1a",
        fontFamily: "var(--font-manrope), system-ui, sans-serif",
      }}
    >
      {/* LEFT: dark green brand panel */}
      <div
        className="relative overflow-hidden lg:col-span-5 p-10 lg:p-14 text-emerald-50"
        style={{ background: "linear-gradient(135deg, #14532d 0%, #052e16 100%)" }}
      >
        {/* Organic blob decoration */}
        <motion.div
          aria-hidden
          className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(34,197,94,0.25), transparent 70%)", filter: "blur(40px)" }}
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute top-0 right-0 w-64 h-64 pointer-events-none"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          <Leaf className="w-full h-full" style={{ color: "rgba(134,239,172,0.06)" }} />
        </motion.div>

        <div className="relative z-10 flex flex-col h-full">
          <a href="#" onClick={(e) => e.preventDefault()} className="inline-flex items-center gap-2.5 mb-6">
            <VerdantLogo />
            <span className="text-2xl font-bold tracking-tight">Verdant</span>
          </a>

          <p className="text-base text-emerald-100/80 leading-relaxed mb-6 max-w-sm">
            Plants, tools, and education for the modern indoor gardener. Rooted in sustainability, grown with care.
          </p>

          {/* Newsletter (within dark panel) */}
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/70 mb-3" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>Weekly Care Tips</p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2 max-w-sm">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 h-11 px-4 text-sm bg-emerald-950/40 border rounded-lg outline-none transition-colors focus:border-emerald-400 text-emerald-50 placeholder:text-emerald-200/40"
                style={{ borderColor: "rgba(134,239,172,0.2)" }}
              />
              <button
                type="submit"
                className="h-11 px-4 rounded-lg transition-all hover:scale-105"
                style={{ background: "#22c55e", color: "#052e16" }}
              >
                <ArrowUpRight className="w-5 h-5" />
              </button>
            </form>
            <p className="text-xs text-emerald-200/50 mt-2">12,400 plant lovers subscribed</p>
          </div>

          {/* Contact info */}
          <div className="mt-auto space-y-2 text-sm text-emerald-100/70">
            <div className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 text-emerald-400" /> Greenhouse No. 7, 230 Evergreen St, Portland, OR</div>
            <div className="flex items-start gap-2"><Mail className="w-4 h-4 mt-0.5 text-emerald-400" /> <a href="mailto:hello@verdant.co" className="hover:text-emerald-300 transition-colors">hello@verdant.co</a></div>
            <div className="flex items-start gap-2"><Phone className="w-4 h-4 mt-0.5 text-emerald-400" /> (503) 555-0173</div>
          </div>

          {/* Sustainability badges */}
          <div className="mt-6 flex flex-wrap gap-2">
            {[
              { icon: Leaf, label: "Carbon Negative" },
              { icon: Sun, label: "Solar Greenhouses" },
              { icon: Sprout, label: "Certified Organic" },
            ].map((b) => (
              <span key={b.label} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs" style={{ background: "rgba(34,197,94,0.15)", color: "#86efac" }}>
                <b.icon className="w-3 h-3" /> {b.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT: cream links panel */}
      <div className="lg:col-span-7 p-10 lg:p-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {NAV.map((col, ci) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: ci * 0.08 }}
            >
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] mb-4" style={{ fontFamily: "var(--font-jetbrains), monospace", color: "#15803d" }}>
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="group inline-flex items-center gap-2 text-sm hover:underline transition-colors"
                      style={{ color: "#1a2e1a" }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = "#15803d"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = "#1a2e1a"; }}
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-emerald-700 transition-all duration-300 mr-0 group-hover:mr-1.5" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Visit section */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-12 p-6 rounded-2xl"
          style={{ background: "#fff", border: "1px solid rgba(20,83,45,0.1)" }}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] mb-2" style={{ fontFamily: "var(--font-jetbrains), monospace", color: "#15803d" }}>Visit the Greenhouse</p>
              <p className="text-2xl font-bold tracking-tight" style={{ letterSpacing: "-0.02em" }}>Open Thu–Sun · 10am–6pm</p>
              <p className="text-sm text-black/60 mt-1">Free workshops every Saturday at 11am. Coffee on us.</p>
            </div>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="group inline-flex items-center gap-2 px-5 py-3 rounded-lg font-semibold text-sm whitespace-nowrap transition-all hover:scale-105"
              style={{ background: "#14532d", color: "#fff" }}
            >
              Plan your visit
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderColor: "rgba(20,83,45,0.12)" }}>
          <p className="text-xs" style={{ fontFamily: "var(--font-jetbrains), monospace", color: "#15803d" }}>
            © {new Date().getFullYear()} Verdant Nursery Co. — Portland, OR
          </p>
          <div className="flex items-center gap-2">
            {[Instagram, Twitter, Facebook].map((Icon, i) => (
              <a
                key={i}
                href="#"
                onClick={(e) => e.preventDefault()}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ background: "rgba(20,83,45,0.08)", color: "#15803d" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#14532d"; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(20,83,45,0.08)"; e.currentTarget.style.color = "#15803d"; }}
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── Verdant logo — leaf/sprout glyph ───────────────────────────────────────
function VerdantLogo() {
  return (
    <svg viewBox="0 0 64 64" className="w-9 h-9" aria-hidden="true">
      <defs>
        <linearGradient id="vd-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4ade80" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
      </defs>
      <path d="M32 56 C32 38 22 28 12 24 C12 38 22 48 32 56 Z" fill="url(#vd-grad)" />
      <path d="M32 56 C32 38 42 28 52 24 C52 38 42 48 32 56 Z" fill="url(#vd-grad)" opacity="0.8" />
      <path d="M32 56 L32 24" stroke="url(#vd-grad)" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="32" cy="20" r="4" fill="url(#vd-grad)" />
    </svg>
  );
}
