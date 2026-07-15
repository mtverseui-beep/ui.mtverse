"use client";

import { motion } from "framer-motion";
import { BookOpen, Mail, Bookmark, Search, Archive, Feather, Twitter, Instagram, Github } from "lucide-react";

// ════════════════════════════════════════════════════════════════════════════
// Footer 011 — The Quarterly (Editorial Magazine)
// Newsprint cream + serif masthead + issue archive grid + ISSN
// ════════════════════════════════════════════════════════════════════════════

const NAV = [
  { title: "Sections", links: ["Fiction", "Poetry", "Essays", "Interviews", "Reviews", "Letters"] },
  { title: "Issues", links: ["Current — Vol. XII", "Archive — Vols. I–XI", "Subscribe in Print", "Digital Editions", "Back Issues", "Anthologies"] },
  { title: "Editorial", links: ["Submit Your Work", "Editorial Guidelines", "Masthead", "Contributors", "Reader Letters", "Permissions"] },
  { title: "Support", links: ["Renew Subscription", "Account", "Gift a Subscription", "Libraries", "Retailers", "Contact"] },
];

const ISSUES = [
  { vol: "VOL. XII", season: "WINTER 2026", theme: "On Memory" },
  { vol: "VOL. XI", season: "AUTUMN 2025", theme: "On Solitude" },
  { vol: "VOL. X", season: "SUMMER 2025", theme: "On Craft" },
  { vol: "VOL. IX", season: "SPRING 2025", theme: "On Light" },
];

export function Footer011Card() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: "#f5f0e6",
        color: "#1a1612",
        fontFamily: "var(--font-fraunces), Georgia, serif",
      }}
    >
      {/* Newsprint texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.7 0'/></filter><rect width='300' height='300' filter='url(%23n)'/></svg>\")",
        }}
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-12">
        {/* Masthead */}
        <div className="py-12 border-b-2" style={{ borderColor: "#1a1612" }}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] uppercase tracking-[0.3em]" style={{ fontFamily: "var(--font-jetbrains), monospace", color: "#7c6f5a" }}>
              Est. MMXVI
            </p>
            <p className="text-[10px] uppercase tracking-[0.3em]" style={{ fontFamily: "var(--font-jetbrains), monospace", color: "#7c6f5a" }}>
              ISSN 2768-4051
            </p>
          </div>
          <h1 className="text-center text-6xl md:text-8xl lg:text-9xl font-black tracking-tight leading-none" style={{ letterSpacing: "-0.03em" }}>
            The Quarterly
          </h1>
          <div className="flex items-center justify-center gap-4 mt-3 text-xs uppercase tracking-[0.3em]" style={{ fontFamily: "var(--font-jetbrains), monospace", color: "#7c6f5a" }}>
            <span>Literature</span>
            <span>·</span>
            <span>Art</span>
            <span>·</span>
            <span>Ideas</span>
            <span>·</span>
            <span>Since 2016</span>
          </div>
        </div>

        {/* Issue archive band */}
        <div className="py-10 border-b" style={{ borderColor: "rgba(26,22,18,0.2)" }}>
          <div className="flex items-center justify-between mb-5">
            <h3 className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em]" style={{ fontFamily: "var(--font-jetbrains), monospace", color: "#7c6f5a" }}>
              <Archive className="w-3.5 h-3.5" /> Recent Issues
            </h3>
            <a href="#" onClick={(e) => e.preventDefault()} className="text-xs uppercase tracking-[0.2em] hover:underline" style={{ fontFamily: "var(--font-jetbrains), monospace", color: "#1a1612" }}>
              View All →
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {ISSUES.map((issue, i) => (
              <motion.a
                key={issue.vol}
                href="#"
                onClick={(e) => e.preventDefault()}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group p-5 border-2 transition-all hover:-translate-y-1"
                style={{ background: "#fffaef", borderColor: "rgba(26,22,18,0.15)" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#1a1612"; e.currentTarget.style.boxShadow = "6px 6px 0 0 #1a1612"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(26,22,18,0.15)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <p className="text-[10px] uppercase tracking-[0.25em] mb-2" style={{ fontFamily: "var(--font-jetbrains), monospace", color: "#7c6f5a" }}>{issue.vol}</p>
                <p className="text-base font-bold mb-2" style={{ letterSpacing: "-0.01em" }}>{issue.season}</p>
                <p className="text-sm italic" style={{ color: "#7c6f5a" }}>{issue.theme}</p>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Main grid */}
        <div className="py-12 grid grid-cols-2 md:grid-cols-4 gap-10 border-b" style={{ borderColor: "rgba(26,22,18,0.2)" }}>
          {NAV.map((col, ci) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: ci * 0.08 }}
            >
              <h4 className="text-[11px] uppercase tracking-[0.25em] mb-4 font-bold" style={{ fontFamily: "var(--font-jetbrains), monospace", color: "#7c6f5a" }}>
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="group inline-flex items-baseline gap-1.5 text-base transition-colors"
                      style={{ color: "#1a1612" }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = "#7c2d12"; e.currentTarget.style.fontStyle = "italic"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = "#1a1612"; e.currentTarget.style.fontStyle = "normal"; }}
                    >
                      <span className="text-xs opacity-30 group-hover:opacity-100 transition-opacity" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>§</span>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Subscribe band */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center border-b" style={{ borderColor: "rgba(26,22,18,0.2)" }}>
          <div>
            <h3 className="text-3xl md:text-4xl font-bold mb-3 leading-tight" style={{ letterSpacing: "-0.02em" }}>
              <Feather className="inline-block w-7 h-7 mr-2 -mt-1" style={{ color: "#7c2d12" }} />
              Letters from the editor.
            </h3>
            <p className="text-base" style={{ color: "#7c6f5a" }}>
              A weekly dispatch. Long-form reads, dispatches from the editorial desk, and first access to new issues. No advertisements, ever.
            </p>
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
            <input
              type="email"
              placeholder="reader@correspondence.com"
              className="flex-1 h-12 px-4 text-base bg-transparent border-2 outline-none transition-colors"
              style={{ borderColor: "rgba(26,22,18,0.2)", color: "#1a1612" }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "#1a1612"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(26,22,18,0.2)"; }}
            />
            <button
              type="submit"
              className="px-5 h-12 font-bold text-sm uppercase tracking-wider transition-all hover:scale-105"
              style={{ background: "#1a1612", color: "#f5f0e6" }}
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Bottom bar */}
        <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-5">
          <p className="text-xs" style={{ fontFamily: "var(--font-jetbrains), monospace", color: "#7c6f5a" }}>
            © {new Date().getFullYear()} The Quarterly. Printed with care. All works copyright their respective authors.
          </p>
          <div className="flex items-center gap-2">
            {[
              { icon: Twitter, label: "Twitter" },
              { icon: Instagram, label: "Instagram" },
              { icon: BookOpen, label: "Goodreads" },
              { icon: Github, label: "GitHub" },
            ].map((s) => (
              <a
                key={s.label}
                href="#"
                onClick={(e) => e.preventDefault()}
                aria-label={s.label}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ border: "1.5px solid rgba(26,22,18,0.3)", color: "#1a1612" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#1a1612"; e.currentTarget.style.color = "#f5f0e6"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#1a1612"; }}
              >
                <s.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
