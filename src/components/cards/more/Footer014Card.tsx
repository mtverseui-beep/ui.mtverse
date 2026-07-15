"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Twitter, Github, Linkedin, Mail } from "lucide-react";

// ════════════════════════════════════════════════════════════════════════════
// Footer 014 — Aether (Centered brand)
// Pure white + concentric pulsing ring SVG + radial nav + center brand
// ════════════════════════════════════════════════════════════════════════════

const NAV_GROUPS = [
  { label: "Product", items: ["Features", "Pricing", "Integrations", "Changelog"] },
  { label: "Company", items: ["About", "Blog", "Careers", "Press"] },
  { label: "Resources", items: ["Docs", "Help", "Community", "API"] },
  { label: "Legal", items: ["Privacy", "Terms", "Security", "DPA"] },
];

export function Footer014Card() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: "#ffffff",
        color: "#0a0a0a",
        fontFamily: "var(--font-manrope), system-ui, sans-serif",
      }}
    >
      {/* Concentric rings SVG */}
      <ConcentricRings />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-12 py-20">
        {/* Centered brand block */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center justify-center mb-6"
          >
            <AetherLogo />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-4"
            style={{ letterSpacing: "-0.04em" }}
          >
            Aether
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-black/60 max-w-md mx-auto"
          >
            Software for teams who care about the work. Quietly powerful, beautifully simple.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-7"
          >
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all hover:scale-105"
              style={{ background: "#0a0a0a", color: "#fff", boxShadow: "0 10px 30px -8px rgba(10,10,10,0.3)" }}
            >
              Get started free
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </motion.div>
        </div>

        {/* Centered nav — single row of groups */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto py-10 border-t border-black/10">
          {NAV_GROUPS.map((g, gi) => (
            <motion.div
              key={g.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: gi * 0.08 }}
              className="text-center"
            >
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-black/40 mb-4">{g.label}</h4>
              <ul className="space-y-2">
                {g.items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="text-sm text-black/70 hover:text-black transition-colors inline-flex items-center gap-1 group"
                    >
                      {item}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Social icons in centered row */}
        <div className="flex items-center justify-center gap-3 py-8 border-t border-black/10">
          {[Twitter, Github, Linkedin, Mail].map((Icon, i) => (
            <motion.a
              key={i}
              href="#"
              onClick={(e) => e.preventDefault()}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.06 }}
              className="w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-110"
              style={{ background: "#f4f4f5", color: "#0a0a0a" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#0a0a0a"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#f4f4f5"; e.currentTarget.style.color = "#0a0a0a"; }}
            >
              <Icon className="w-4 h-4" />
            </motion.a>
          ))}
        </div>

        {/* Centered copyright */}
        <p className="text-center text-xs text-black/40 pt-6" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
          © {new Date().getFullYear()} Aether Software · Made with care in Copenhagen
        </p>
      </div>
    </footer>
  );
}

// ── Concentric rings SVG (pulsing) ─────────────────────────────────────────
function ConcentricRings() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      <svg className="w-[1200px] h-[1200px] max-w-none opacity-40" viewBox="0 0 1200 1200">
        <defs>
          <radialGradient id="aether-ring-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0" />
            <stop offset="80%" stopColor="#6366f1" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </radialGradient>
        </defs>
        {[100, 200, 300, 400, 500, 600].map((r, i) => (
          <motion.circle
            key={r}
            cx="600"
            cy="600"
            r={r}
            fill="none"
            stroke="#6366f1"
            strokeWidth="1"
            opacity={0.15}
            animate={{
              scale: [1, 1.03, 1],
              opacity: [0.1, 0.25, 0.1],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
            style={{ transformOrigin: "600px 600px" }}
          />
        ))}
        {/* Center glow */}
        <circle cx="600" cy="600" r="80" fill="url(#aether-ring-grad)" opacity="0.3" />
      </svg>
    </div>
  );
}

// ── Aether logo — concentric dot glyph ─────────────────────────────────────
function AetherLogo() {
  return (
    <svg viewBox="0 0 80 80" className="w-16 h-16" aria-hidden="true">
      <defs>
        <linearGradient id="aether-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#4f46e5" />
        </linearGradient>
      </defs>
      <circle cx="40" cy="40" r="36" fill="none" stroke="url(#aether-grad)" strokeWidth="1" opacity="0.3" />
      <circle cx="40" cy="40" r="26" fill="none" stroke="url(#aether-grad)" strokeWidth="1.5" opacity="0.5" />
      <circle cx="40" cy="40" r="16" fill="none" stroke="url(#aether-grad)" strokeWidth="2" opacity="0.8" />
      <circle cx="40" cy="40" r="8" fill="url(#aether-grad)" />
    </svg>
  );
}
