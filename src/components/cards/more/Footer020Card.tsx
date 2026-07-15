"use client";

import { motion } from "framer-motion";
import { ArrowRight, Rocket, Sparkles, TrendingUp, Twitter, Linkedin, Github, Megaphone } from "lucide-react";

// ════════════════════════════════════════════════════════════════════════════
// Footer 020 — Launch (Startup Landing)
// Off-white + animated dot grid + gradient CTA band + 3 cols + coral accent
// ════════════════════════════════════════════════════════════════════════════

const NAV: { title: string; links: { name: string; tag?: string }[] }[] = [
  {
    title: "Product",
    links: [
      { name: "Features", tag: "New" },
      { name: "Pricing" },
      { name: "Integrations" },
      { name: "Changelog" },
      { name: "Roadmap" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Documentation" },
      { name: "Tutorials" },
      { name: "Blog" },
      { name: "Templates" },
      { name: "Community" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About" },
      { name: "Careers", tag: "Hiring" },
      { name: "Press Kit" },
      { name: "Investors" },
      { name: "Contact" },
    ],
  },
];

export function Footer020Card() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: "#fafaf5",
        color: "#1a0e08",
        fontFamily: "var(--font-inter-tight), system-ui, sans-serif",
      }}
    >
      {/* Animated dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.5]"
        style={{
          backgroundImage: "radial-gradient(rgba(249,115,22,0.25) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          maskImage: "radial-gradient(ellipse at top, black, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-12">
        {/* CTA band */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="my-12 p-8 md:p-14 rounded-3xl text-center relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #f97316 0%, #ea580c 50%, #dc2626 100%)",
            color: "#fff",
          }}
        >
          {/* Decorative grid inside CTA */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              backgroundImage: "radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />
          {/* Floating shapes */}
          <motion.div
            aria-hidden
            className="absolute -top-12 -right-12 w-48 h-48 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(255,255,255,0.2), transparent 60%)" }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs mb-5" style={{ background: "rgba(255,255,255,0.15)", color: "#fff" }}>
              <Rocket className="w-3 h-3" /> Launch week — 40% off all annual plans
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] mb-4" style={{ letterSpacing: "-0.03em" }}>
              Ship your startup<br />
              in days, not months.
            </h2>
            <p className="text-base md:text-lg text-white/85 max-w-xl mx-auto mb-8">
              Join 8,400+ founders using Launch to build, launch, and scale — without the engineering overhead.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all hover:scale-105"
                style={{ background: "#fff", color: "#dc2626" }}
              >
                Start free for 14 days
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all hover:bg-white/10"
                style={{ border: "1px solid rgba(255,255,255,0.3)" }}
              >
                Book a demo
              </a>
            </div>

            {/* Social proof */}
            <div className="mt-8 flex items-center justify-center gap-2 text-xs text-white/80">
              <div className="flex -space-x-1.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-full border-2"
                    style={{
                      background: `hsl(${i * 35}, 70%, 65%)`,
                      borderColor: "#dc2626",
                    }}
                  />
                ))}
              </div>
              <span className="ml-2">Trusted by 8,400+ founders</span>
            </div>
          </div>
        </motion.div>

        {/* Main grid */}
        <div className="py-14 grid grid-cols-2 md:grid-cols-5 gap-10 border-t" style={{ borderColor: "rgba(26,14,8,0.1)" }}>
          {/* Brand */}
          <div className="col-span-2">
            <a href="#" onClick={(e) => e.preventDefault()} className="inline-flex items-center gap-2 mb-5">
              <LaunchLogo />
              <span className="text-2xl font-bold tracking-tight">Launch</span>
            </a>
            <p className="text-sm text-black/60 mb-6 max-w-xs leading-relaxed">
              The fastest way to launch your startup. Landing pages, payments, analytics, and email — all in one place.
            </p>
            {/* Stats */}
            <div className="flex items-center gap-5 mb-6">
              <div>
                <p className="text-2xl font-bold" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>8.4K</p>
                <p className="text-[10px] uppercase tracking-wider text-black/50">Startups</p>
              </div>
              <div className="h-8 w-px bg-black/10" />
              <div>
                <p className="text-2xl font-bold" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>$24M</p>
                <p className="text-[10px] uppercase tracking-wider text-black/50">Raised by users</p>
              </div>
              <div className="h-8 w-px bg-black/10" />
              <div>
                <p className="text-2xl font-bold inline-flex items-center gap-1" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
                  <TrendingUp className="w-4 h-4 text-orange-600" /> 3.2x
                </p>
                <p className="text-[10px] uppercase tracking-wider text-black/50">Avg growth</p>
              </div>
            </div>
            {/* Socials */}
            <div className="flex gap-2">
              {[
                { icon: Twitter, label: "Twitter", color: "#1d9bf0" },
                { icon: Linkedin, label: "LinkedIn", color: "#0a66c2" },
                { icon: Megaphone, label: "ProductHunt", color: "#da552f" },
                { icon: Github, label: "GitHub", color: "#1a1a1a" },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  aria-label={s.label}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                  style={{ background: "rgba(26,14,8,0.05)", color: "#1a0e08" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = s.color; e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(26,14,8,0.05)"; e.currentTarget.style.color = "#1a0e08"; }}
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {NAV.map((col, ci) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: ci * 0.08 }}
            >
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-black/40 mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="group inline-flex items-center gap-2 text-sm text-black/70 hover:text-orange-600 transition-colors"
                    >
                      {link.name}
                      {link.tag && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded font-medium" style={{ background: "rgba(249,115,22,0.15)", color: "#c2410c", fontFamily: "var(--font-jetbrains), monospace" }}>
                          {link.tag}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="py-7 border-t flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderColor: "rgba(26,14,8,0.1)" }}>
          <p className="text-xs text-black/50" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
            © {new Date().getFullYear()} Launch Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-xs text-black/60">
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-orange-600 transition-colors">Privacy</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-orange-600 transition-colors">Terms</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-orange-600 transition-colors">Cookies</a>
            <span className="inline-flex items-center gap-1.5" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
              <Sparkles className="w-3 h-3" /> Made in San Francisco
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── Launch logo — rocket glyph ─────────────────────────────────────────────
function LaunchLogo() {
  return (
    <svg viewBox="0 0 64 64" className="w-9 h-9" aria-hidden="true">
      <defs>
        <linearGradient id="ln-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fb923c" />
          <stop offset="50%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>
      </defs>
      <path d="M32 4 C40 12 44 22 44 32 L44 44 L20 44 L20 32 C20 22 24 12 32 4 Z" fill="url(#ln-grad)" />
      <circle cx="32" cy="24" r="5" fill="#fff" />
      <circle cx="32" cy="24" r="2.5" fill="url(#ln-grad)" />
      <path d="M20 44 L14 56 L24 50 Z" fill="url(#ln-grad)" opacity="0.7" />
      <path d="M44 44 L50 56 L40 50 Z" fill="url(#ln-grad)" opacity="0.7" />
      <path d="M28 44 L32 56 L36 44 Z" fill="#fbbf24" />
    </svg>
  );
}
