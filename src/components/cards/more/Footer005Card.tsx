"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Sun, Leaf, Coffee, Github, Twitter, Instagram, Mail } from "lucide-react";

// ════════════════════════════════════════════════════════════════════════════
// Footer 005 — Lumina (Warm editorial)
// Warm beige + giant outlined serif wordmark + amber accents + grain texture
// ════════════════════════════════════════════════════════════════════════════

const NAV: { title: string; links: string[] }[] = [
  { title: "Shop", links: ["New Arrivals", "Bestsellers", "Limited Edition", "Gift Cards", "Lookbook"] },
  { title: "About", links: ["Our Story", "Sustainability", "Materials", "Craftsmanship", "Journal"] },
  { title: "Help", links: ["Shipping", "Returns", "Size Guide", "FAQ", "Contact"] },
];

export function Footer005Card() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: "#f0e9dc",
        color: "#2d2418",
        fontFamily: "var(--font-fraunces), Georgia, serif",
      }}
    >
      {/* Grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.08] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.6 0'/></filter><rect width='200' height='200' filter='url(%23n)'/></svg>\")",
        }}
      />

      {/* Warm radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(217,119,6,0.18) 0%, transparent 70%)" }} />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-12">
        {/* Top: brand + tagline */}
        <div className="py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 border-b" style={{ borderColor: "rgba(45,36,24,0.12)" }}>
          <div className="lg:col-span-5">
            <a href="#" onClick={(e) => e.preventDefault()} className="inline-flex items-center gap-3 mb-6">
              <LuminaLogo />
              <span className="text-3xl font-medium tracking-tight" style={{ fontStyle: "italic" }}>Lumina</span>
            </a>
            <p className="text-lg leading-relaxed max-w-md" style={{ color: "#5c4a32" }}>
              Slow-made objects for considered living. Each piece is crafted in small batches by artisans we know by name.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {[
                { icon: Leaf, label: "Organic materials" },
                { icon: Sun, label: "Solar-powered studio" },
                { icon: Coffee, label: "Made slowly" },
              ].map((b) => (
                <span key={b.label} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs" style={{ background: "rgba(217,119,6,0.1)", color: "#92400e" }}>
                  <b.icon className="w-3 h-3" /> {b.label}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3 lg:col-start-7">
            <p className="text-xs uppercase tracking-[0.25em] mb-3" style={{ color: "#92400e", fontFamily: "var(--font-jetbrains), monospace" }}>Newsletter</p>
            <p className="text-base mb-4 leading-relaxed" style={{ color: "#5c4a32" }}>
              Letters from the studio. Twice a month. No noise.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 text-sm bg-transparent border rounded-lg outline-none transition-colors focus:border-amber-700"
                style={{ borderColor: "rgba(45,36,24,0.2)", color: "#2d2418" }}
              />
              <button
                type="submit"
                className="px-4 py-3 rounded-lg transition-all hover:scale-105"
                style={{ background: "#92400e", color: "#f0e9dc" }}
              >
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </form>
            <p className="text-xs mt-3" style={{ color: "#92400e", opacity: 0.7 }}>
              4,200 subscribers · Unsubscribe anytime
            </p>
          </div>

          <div className="lg:col-span-2">
            <p className="text-xs uppercase tracking-[0.25em] mb-3" style={{ color: "#92400e", fontFamily: "var(--font-jetbrains), monospace" }}>Visit</p>
            <p className="text-sm leading-relaxed" style={{ color: "#5c4a32" }}>
              The Studio<br />
              47 Walnut Lane<br />
              Brooklyn, NY 11211<br />
              <span className="inline-block mt-2 text-xs" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>Thu–Sun · 11–6</span>
            </p>
          </div>
        </div>

        {/* Middle: nav columns */}
        <div className="py-12 grid grid-cols-3 gap-8">
          {NAV.map((col, ci) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: ci * 0.1 }}
            >
              <h3 className="text-xs uppercase tracking-[0.25em] mb-4" style={{ color: "#92400e", fontFamily: "var(--font-jetbrains), monospace" }}>
                {col.title}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="group inline-flex items-center gap-1.5 text-base transition-colors hover:underline"
                      style={{ color: "#2d2418" }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = "#92400e"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = "#2d2418"; }}
                    >
                      <span className="w-0 group-hover:w-3 h-px transition-all duration-300" style={{ background: "#92400e" }} />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Giant outlined wordmark */}
        <div className="py-12 overflow-hidden border-t" style={{ borderColor: "rgba(45,36,24,0.12)" }}>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-[18vw] md:text-[15vw] leading-[0.85] font-medium tracking-[-0.04em] select-none text-center"
            style={{
              fontStyle: "italic",
              color: "transparent",
              WebkitTextStroke: "1.5px rgba(45,36,24,0.3)",
            }}
          >
            Lumina
          </motion.h2>
        </div>

        {/* Bottom bar */}
        <div className="py-7 border-t flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderColor: "rgba(45,36,24,0.12)" }}>
          <p className="text-xs" style={{ color: "#5c4a32", fontFamily: "var(--font-jetbrains), monospace" }}>
            © {new Date().getFullYear()} Lumina Studio. Crafted in Brooklyn.
          </p>
          <div className="flex items-center gap-3">
            {[Instagram, Twitter, Mail, Github].map((Icon, i) => (
              <a
                key={i}
                href="#"
                onClick={(e) => e.preventDefault()}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ border: "1px solid rgba(45,36,24,0.2)", color: "#5c4a32" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#92400e"; e.currentTarget.style.color = "#f0e9dc"; e.currentTarget.style.borderColor = "#92400e"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#5c4a32"; e.currentTarget.style.borderColor = "rgba(45,36,24,0.2)"; }}
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
          <div className="flex items-center gap-5 text-xs" style={{ color: "#5c4a32" }}>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-amber-700 transition-colors">Privacy</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-amber-700 transition-colors">Terms</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-amber-700 transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── Lumina logo — sun/leaf glyph ───────────────────────────────────────────
function LuminaLogo() {
  return (
    <svg viewBox="0 0 64 64" className="w-10 h-10" aria-hidden="true">
      <defs>
        <linearGradient id="lum-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#92400e" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="20" fill="none" stroke="url(#lum-grad)" strokeWidth="2" />
      <circle cx="32" cy="32" r="10" fill="url(#lum-grad)" />
      <g stroke="url(#lum-grad)" strokeWidth="2" strokeLinecap="round">
        <line x1="32" y1="4" x2="32" y2="10" />
        <line x1="32" y1="54" x2="32" y2="60" />
        <line x1="4" y1="32" x2="10" y2="32" />
        <line x1="54" y1="32" x2="60" y2="32" />
        <line x1="12" y1="12" x2="16" y2="16" />
        <line x1="48" y1="48" x2="52" y2="52" />
        <line x1="12" y1="52" x2="16" y2="48" />
        <line x1="48" y1="16" x2="52" y2="12" />
      </g>
    </svg>
  );
}
