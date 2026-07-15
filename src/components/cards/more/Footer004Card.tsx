"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Heart, Github, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";

// ════════════════════════════════════════════════════════════════════════════
// Footer 004 — Glow (Modern dark)
// Deep purple-black + animated aurora blobs + pink/orange accent
// Tilt-on-hover link cards + glow CTA
// ════════════════════════════════════════════════════════════════════════════

const LINKS: { title: string; items: string[] }[] = [
  { title: "Product", items: ["Features", "Integrations", "Pricing", "Changelog", "Roadmap"] },
  { title: "Resources", items: ["Documentation", "Tutorials", "Blog", "Community", "Support"] },
  { title: "Company", items: ["About", "Careers", "Press", "Partners", "Contact"] },
];

const ACCENT = "#ff4d8c";

export function Footer004Card() {
  return (
    <footer
      className="relative overflow-hidden text-white"
      style={{
        background: "linear-gradient(180deg, #0a0613 0%, #1a0a2e 50%, #0a0613 100%)",
        fontFamily: "var(--font-manrope), system-ui, sans-serif",
      }}
    >
      {/* Aurora blobs */}
      <AuroraBlobs />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-12">
        {/* CTA band */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="py-20 text-center"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.02] max-w-4xl mx-auto" style={{ letterSpacing: "-0.04em" }}>
            Ready to make<br />
            something <span className="relative inline-block">
              <span style={{ background: "linear-gradient(135deg, #ff4d8c 0%, #fbbf24 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>glow</span>
              <motion.span
                aria-hidden
                className="absolute -inset-4 rounded-full pointer-events-none blur-2xl"
                style={{ background: "radial-gradient(circle, rgba(255,77,140,0.4), transparent 70%)" }}
                animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.9, 1.05, 0.9] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            </span>?
          </h2>
          <p className="mt-6 text-lg text-white/60 max-w-xl mx-auto">
            Join 12,000+ creators using Glow to build delightful experiences.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <GlowButton primary>Get started free</GlowButton>
            <GlowButton>Book a demo</GlowButton>
          </div>
        </motion.div>

        {/* Main grid */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-5 gap-10 border-t border-white/10">
          {/* Brand */}
          <div className="col-span-2">
            <a href="#" onClick={(e) => e.preventDefault()} className="inline-flex items-center gap-2 mb-5">
              <GlowLogo />
              <span className="text-2xl font-bold tracking-tight">Glow</span>
            </a>
            <p className="text-sm text-white/60 mb-6 max-w-xs leading-relaxed">
              The creator-first platform for building delightful, animated web experiences without writing code.
            </p>
            {/* Socials with hover scale + tint */}
            <div className="flex gap-2">
              {[
                { icon: Twitter, label: "Twitter", color: "#1d9bf0" },
                { icon: Instagram, label: "Instagram", color: "#e1306c" },
                { icon: Youtube, label: "YouTube", color: "#ff0000" },
                { icon: Github, label: "GitHub", color: "#ffffff" },
                { icon: Linkedin, label: "LinkedIn", color: "#0a66c2" },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  aria-label={s.label}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white/70 transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `${s.color}20`;
                    e.currentTarget.style.color = s.color;
                    e.currentTarget.style.borderColor = `${s.color}50`;
                    e.currentTarget.style.boxShadow = `0 8px 24px -8px ${s.color}80`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.7)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns with tilt-on-hover cards */}
          {LINKS.map((col, ci) => (
            <TiltColumn key={col.title} col={col} delay={ci * 0.08} />
          ))}
        </div>

        {/* Bottom bar */}
        <div className="py-7 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40 inline-flex items-center gap-1.5">
            © {new Date().getFullYear()} Glow Labs. Made with <Heart className="w-3 h-3" style={{ color: ACCENT, fill: ACCENT }} /> in Brooklyn.
          </p>
          <div className="flex items-center gap-5 text-xs text-white/40">
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">Privacy</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">Terms</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">Cookies</a>
            <span className="px-2 py-1 rounded" style={{ background: "rgba(255,77,140,0.1)", color: ACCENT, fontFamily: "var(--font-jetbrains), monospace" }}>v3.0.1</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── Aurora blobs ───────────────────────────────────────────────────────────
function AuroraBlobs() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(255,77,140,0.25) 0%, transparent 60%)" }}
        animate={{ x: [0, 100, 0], y: [0, 80, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 -right-32 w-[450px] h-[450px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(168,85,247,0.25) 0%, transparent 60%)" }}
        animate={{ x: [0, -80, 0], y: [0, 60, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-32 left-1/3 w-[400px] h-[400px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(251,191,36,0.2) 0%, transparent 60%)" }}
        animate={{ x: [0, 60, 0], y: [0, -40, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

// ── Glow button ────────────────────────────────────────────────────────────
function GlowButton({ children, primary = false }: { children: React.ReactNode; primary?: boolean }) {
  const [hover, setHover] = useState(false);
  return (
    <a
      href="#"
      onClick={(e) => e.preventDefault()}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group relative inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300"
      style={{
        background: primary
          ? hover
            ? "linear-gradient(135deg, #ff4d8c 0%, #fbbf24 100%)"
            : "linear-gradient(135deg, #ff4d8c 0%, #ec4899 100%)"
          : "rgba(255,255,255,0.05)",
        color: primary ? "#fff" : "#fff",
        border: primary ? "none" : "1px solid rgba(255,255,255,0.15)",
        boxShadow: primary && hover ? "0 12px 40px -8px rgba(255,77,140,0.6)" : "none",
        transform: hover ? "translateY(-2px)" : "translateY(0)",
      }}
    >
      {children}
      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
    </a>
  );
}

// ── Tilt-on-hover link column ──────────────────────────────────────────────
function TiltColumn({ col, delay }: { col: { title: string; items: string[] }; delay: number }) {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="p-5 rounded-2xl transition-transform"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
        transform: `perspective(800px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
      }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        setTilt({ rx: -py * 8, ry: px * 8 });
      }}
      onMouseLeave={() => setTilt({ rx: 0, ry: 0 })}
    >
      <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/50 mb-4">{col.title}</h3>
      <ul className="space-y-2.5">
        {col.items.map((item) => (
          <li key={item}>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="group inline-flex items-center gap-1 text-sm text-white/70 hover:text-white transition-colors"
            >
              <span className="w-0 group-hover:w-3 h-px transition-all duration-300" style={{ background: ACCENT }} />
              {item}
            </a>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

// ── Glow logo ──────────────────────────────────────────────────────────────
function GlowLogo() {
  return (
    <svg viewBox="0 0 64 64" className="w-9 h-9" aria-hidden="true">
      <defs>
        <radialGradient id="glow-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff4d8c" />
          <stop offset="60%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#fbbf24" />
        </radialGradient>
      </defs>
      <circle cx="32" cy="32" r="14" fill="url(#glow-grad)" />
      <circle cx="32" cy="32" r="22" fill="none" stroke="url(#glow-grad)" strokeWidth="1.5" opacity="0.4" />
      <circle cx="32" cy="32" r="28" fill="none" stroke="url(#glow-grad)" strokeWidth="1" opacity="0.2" />
    </svg>
  );
}
