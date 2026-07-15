"use client";

import { motion } from "framer-motion";
import { Star, Smartphone, ScanLine, QrCode, Shield, Apple, Twitter, Instagram, Youtube } from "lucide-react";

// ════════════════════════════════════════════════════════════════════════════
// Footer 017 — Mobily (App Download)
// Light + QR code + app store badges + phone mockup + floating UI cards
// ════════════════════════════════════════════════════════════════════════════

const NAV: { title: string; links: string[] }[] = [
  { title: "Product", links: ["Features", "Pricing", "Release Notes", "Roadmap"] },
  { title: "Company", links: ["About", "Careers", "Blog", "Press Kit"] },
  { title: "Support", links: ["Help Center", "Contact", "Status", "Community"] },
  { title: "Legal", links: ["Privacy", "Terms", "Security", "DPA"] },
];

export function Footer017Card() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #fafafa 0%, #f0f0f5 100%)",
        color: "#0a0a0a",
        fontFamily: "var(--font-manrope), system-ui, sans-serif",
      }}
    >
      {/* Floating blobs */}
      <motion.div
        className="absolute top-20 right-1/4 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.15), transparent 70%)" }}
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-12">
        {/* Download hero */}
        <div className="py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center border-b" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs mb-5" style={{ background: "#6366f115", color: "#6366f1" }}>
                <Smartphone className="w-3 h-3" /> Now on iOS & Android
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] mb-5" style={{ letterSpacing: "-0.03em" }}>
                Your life,<br />
                <span style={{ background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  beautifully organized.
                </span>
              </h2>
              <p className="text-base text-black/60 max-w-md mb-7 leading-relaxed">
                Get the Mobily app. Tasks, notes, habits, and schedule — synced across all your devices. Works offline.
              </p>

              {/* App store badges */}
              <div className="flex flex-wrap gap-3 mb-6">
                <StoreBadge platform="apple" />
                <StoreBadge platform="google" />
              </div>

              {/* Ratings */}
              <div className="flex items-center gap-6">
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3.5 h-3.5" style={{ color: "#facc15", fill: "#facc15" }} />
                    ))}
                  </div>
                  <p className="text-xs text-black/60">4.9 · 28,400 ratings on App Store</p>
                </div>
                <div className="h-8 w-px bg-black/10" />
                <div>
                  <p className="text-2xl font-bold" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>1.2M+</p>
                  <p className="text-xs text-black/60">Downloads</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Phone mockup + QR */}
          <div className="flex items-center justify-center gap-6">
            {/* QR code */}
            <motion.div
              initial={{ opacity: 0, x: 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="p-3 rounded-2xl bg-white" style={{ border: "2px solid #0a0a0a", boxShadow: "6px 6px 0 0 #6366f1" }}>
                <QrCodeArt />
              </div>
              <p className="text-xs text-black/60 inline-flex items-center gap-1.5">
                <ScanLine className="w-3 h-3" /> Scan to download
              </p>
            </motion.div>

            {/* Phone mockup */}
            <PhoneMockup />
          </div>
        </div>

        {/* Main grid */}
        <div className="py-14 grid grid-cols-2 md:grid-cols-6 gap-10">
          <div className="col-span-2">
            <a href="#" onClick={(e) => e.preventDefault()} className="inline-flex items-center gap-2 mb-5">
              <MobilyLogo />
              <span className="text-2xl font-bold tracking-tight">Mobily</span>
            </a>
            <p className="text-sm text-black/60 mb-6 max-w-xs leading-relaxed">
              The all-in-one productivity app trusted by 1.2 million people worldwide. Built with privacy in mind.
            </p>
            <div className="flex items-center gap-2 text-xs text-black/50">
              <Shield className="w-3.5 h-3.5" style={{ color: "#6366f1" }} /> End-to-end encrypted
              <span className="mx-1">·</span>
              <span style={{ fontFamily: "var(--font-jetbrains), monospace" }}>iOS 16+ · Android 12+</span>
            </div>
          </div>

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
                  <li key={link}>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="group inline-flex items-center gap-1.5 text-sm text-black/70 hover:text-indigo-600 transition-colors"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-indigo-600 transition-all duration-300 mr-0 group-hover:mr-1.5" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="py-7 border-t flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
          <p className="text-xs text-black/50" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
            © {new Date().getFullYear()} Mobily Inc. · Made with care in Stockholm
          </p>
          <div className="flex items-center gap-2">
            {[Twitter, Instagram, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                onClick={(e) => e.preventDefault()}
                className="w-9 h-9 rounded-full flex items-center justify-center text-black/60 hover:text-white transition-all hover:scale-110"
                style={{ background: "rgba(0,0,0,0.05)" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#6366f1"; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(0,0,0,0.05)"; e.currentTarget.style.color = "rgba(0,0,0,0.6)"; }}
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

// ── Phone mockup with floating UI cards ────────────────────────────────────
function PhoneMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="relative"
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-44 h-80 rounded-[2.5rem] p-1.5"
        style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #3a3a3a 100%)", boxShadow: "0 20px 60px -15px rgba(99,102,241,0.4)" }}
      >
        <div className="w-full h-full rounded-[2rem] overflow-hidden p-3" style={{ background: "#fff" }}>
          <div className="text-center mb-3">
            <p className="text-[10px] text-black/40" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>9:41</p>
          </div>
          <div className="space-y-2">
            <div className="p-2 rounded-lg" style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
              <p className="text-[10px] text-white/80">Today</p>
              <p className="text-sm font-bold text-white">5 tasks</p>
            </div>
            <div className="p-2 rounded-lg" style={{ background: "#f4f4f5" }}>
              <p className="text-[10px] text-black/60">Habits</p>
              <div className="flex gap-1 mt-1">
                {[1, 2, 3, 4, 5].map((d) => (
                  <div key={d} className="flex-1 h-2 rounded-full" style={{ background: d <= 3 ? "#6366f1" : "rgba(0,0,0,0.1)" }} />
                ))}
              </div>
            </div>
            <div className="p-2 rounded-lg" style={{ background: "#fef3c7" }}>
              <p className="text-[10px]" style={{ color: "#92400e" }}>Next meeting</p>
              <p className="text-xs font-bold" style={{ color: "#78350f" }}>10:30 AM</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating UI cards */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-2 -left-8 p-2 rounded-lg flex items-center gap-1.5"
        style={{ background: "#fff", boxShadow: "0 8px 20px -5px rgba(0,0,0,0.15)" }}
      >
        <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "#d1fae5" }}>
          <Star className="w-3 h-3" style={{ color: "#059669", fill: "#059669" }} />
        </div>
        <div>
          <p className="text-[9px] font-bold">Streak!</p>
          <p className="text-[8px] text-black/50">14 days</p>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-2 -right-6 p-2 rounded-lg"
        style={{ background: "#fff", boxShadow: "0 8px 20px -5px rgba(0,0,0,0.15)" }}
      >
        <p className="text-[9px] text-black/60">Synced</p>
        <p className="text-xs font-bold" style={{ color: "#6366f1" }}>just now</p>
      </motion.div>
    </motion.div>
  );
}

// ── Decorative QR code ─────────────────────────────────────────────────────
function QrCodeArt() {
  // Procedurally generate a QR-looking pattern
  const cells = Array.from({ length: 25 * 25 }, (_, i) => {
    const x = i % 25;
    const y = Math.floor(i / 25);
    // Corner squares
    const inCorner = (x < 7 && y < 7) || (x > 17 && y < 7) || (x < 7 && y > 17);
    if (inCorner) {
      const cx = x < 7 ? 3 : 21;
      const cy = y < 7 ? 3 : 21;
      const dx = Math.abs(x - cx);
      const dy = Math.abs(y - cy);
      const d = Math.max(dx, dy);
      return d === 0 || d === 2 || d === 3;
    }
    // Pseudo-random pattern
    return ((x * 7 + y * 11 + x * y) % 3) === 0;
  });

  return (
    <div className="grid" style={{ gridTemplateColumns: "repeat(25, 1fr)", width: "120px", height: "120px" }}>
      {cells.map((on, i) => (
        <div key={i} style={{ background: on ? "#0a0a0a" : "transparent" }} />
      ))}
    </div>
  );
}

// ── Store badge ────────────────────────────────────────────────────────────
function StoreBadge({ platform }: { platform: "apple" | "google" }) {
  return (
    <a
      href="#"
      onClick={(e) => e.preventDefault()}
      className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all hover:scale-105"
      style={{ background: "#0a0a0a", color: "#fff" }}
    >
      {platform === "apple" ? <Apple className="w-6 h-6" /> : (
        <svg viewBox="0 0 24 24" className="w-6 h-6">
          <path fill="#34a853" d="M16.61 15.15l-2.79-1.62L12 15.25l2.39 1.39z" />
          <path fill="#fbbc04" d="M3.61 21.39c.27.15.6.13.86-.05l8.53-5.09-2.23-2.23z" />
          <path fill="#ea4335" d="M3 12l8 4-2.23-2.23L3.61 8.61c-.37.22-.61.62-.61 1.07v4.64c0 .45.24.85.61 1.07z" />
          <path fill="#4285f4" d="M21 12.93c0-.45-.24-.85-.61-1.07l-8.39-5.07L12 8.93l7.61 4.46c.37.22.61.62.61 1.07z" />
        </svg>
      )}
      <div className="text-left">
        <p className="text-[9px] text-white/60 leading-none">{platform === "apple" ? "Download on the" : "GET IT ON"}</p>
        <p className="text-sm font-semibold leading-tight">{platform === "apple" ? "App Store" : "Google Play"}</p>
      </div>
    </a>
  );
}

// ── Mobily logo — phone glyph ──────────────────────────────────────────────
function MobilyLogo() {
  return (
    <svg viewBox="0 0 64 64" className="w-9 h-9" aria-hidden="true">
      <defs>
        <linearGradient id="mb-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
      </defs>
      <rect x="18" y="6" width="28" height="52" rx="5" fill="url(#mb-grad)" />
      <rect x="22" y="12" width="20" height="32" rx="2" fill="#fff" />
      <circle cx="32" cy="51" r="2.5" fill="#fff" />
      <rect x="26" y="18" width="12" height="3" rx="1.5" fill="url(#mb-grad)" opacity="0.6" />
      <rect x="26" y="24" width="8" height="3" rx="1.5" fill="url(#mb-grad)" opacity="0.4" />
    </svg>
  );
}
