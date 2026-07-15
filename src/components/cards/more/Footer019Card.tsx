"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, Github, Twitter, Dribbble, Figma, Clock } from "lucide-react";

// ════════════════════════════════════════════════════════════════════════════
// Footer 019 — Sarah Chen (Personal Portfolio)
// Minimal white + Instrument Serif display + cursor blink + project tiles
// ════════════════════════════════════════════════════════════════════════════

const PROJECTS = [
  { year: "2025", name: "Atlas Analytics", role: "Lead Product Designer", client: "Fintech" },
  { year: "2025", name: "Mira Health", role: "Senior UX Designer", client: "Healthcare" },
  { year: "2024", name: "Loop Commerce", role: "Design Lead", client: "E-commerce" },
  { year: "2024", name: "North Studio", role: "Brand Designer", client: "Agency" },
];

export function Footer019Card() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: "#fafaf7",
        color: "#0a0a0a",
        fontFamily: "var(--font-instrument), Georgia, serif",
      }}
    >
      {/* Subtle dot bg */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.5]"
        style={{
          backgroundImage: "radial-gradient(rgba(0,0,0,0.05) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-12">
        {/* Top: huge name with cursor */}
        <div className="py-20">
          <p className="text-xs uppercase tracking-[0.25em] text-black/40 mb-4" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
            Designer & Art Director
          </p>
          <h2 className="text-6xl md:text-8xl lg:text-[9rem] leading-[0.95] tracking-tight mb-6" style={{ letterSpacing: "-0.04em" }}>
            Sarah Chen<span className="inline-block w-1.5 md:w-2.5 h-[0.9em] ml-1 align-middle animate-pulse" style={{ background: "#d97706" }} />
          </h2>
          <p className="text-2xl md:text-3xl leading-tight max-w-3xl" style={{ fontStyle: "italic", color: "#525252" }}>
            I design thoughtful interfaces and brand systems for companies that care about the details.
          </p>
        </div>

        {/* Project tiles */}
        <div className="py-10 border-t border-black/10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xs uppercase tracking-[0.25em] text-black/40" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
              Selected Work
            </h3>
            <a href="#" onClick={(e) => e.preventDefault()} className="text-xs uppercase tracking-[0.2em] text-black/60 hover:text-black transition-colors" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
              View All →
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PROJECTS.map((p, i) => (
              <motion.a
                key={p.name}
                href="#"
                onClick={(e) => e.preventDefault()}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group p-5 rounded-2xl flex items-center justify-between gap-4 transition-all"
                style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.08)" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#0a0a0a"; e.currentTarget.style.color = "#fafaf7"; e.currentTarget.style.borderColor = "#0a0a0a"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#0a0a0a"; e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)"; }}
              >
                <div>
                  <p className="text-xs mb-1 opacity-50" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>{p.year} · {p.client}</p>
                  <p className="text-2xl font-medium tracking-tight">{p.name}</p>
                  <p className="text-sm opacity-60 italic" style={{ fontFamily: "var(--font-instrument), serif" }}>{p.role}</p>
                </div>
                <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Contact + meta */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-black/10">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-black/40 mb-3" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>Get in touch</p>
            <a href="mailto:sarah@sarahchen.design" className="text-xl font-medium underline-offset-4 hover:underline block" style={{ letterSpacing: "-0.01em" }}>
              sarah@sarahchen.design
            </a>
            <p className="text-sm text-black/60 mt-2" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>Replies within 24h</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-black/40 mb-3" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>Based in</p>
            <p className="text-xl font-medium inline-flex items-center gap-2"><MapPin className="w-4 h-4 text-amber-700" /> San Francisco, CA</p>
            <p className="text-sm text-black/60 mt-2 inline-flex items-center gap-1.5" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
              <Clock className="w-3 h-3" /> <LocalTime />
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-black/40 mb-3" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>Availability</p>
            <p className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm" style={{ background: "#d1fae5", color: "#065f46" }}>
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping" style={{ background: "#10b981" }} />
                <span className="relative inline-flex w-2 h-2 rounded-full" style={{ background: "#10b981" }} />
              </span>
              Open for Q1 2026
            </p>
            <p className="text-sm text-black/60 mt-2" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>Product · Brand · Consulting</p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-7 border-t border-black/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-black/50" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
            © {new Date().getFullYear()} Sarah Chen. Designed & built with care.
          </p>
          <div className="flex items-center gap-2">
            {[
              { icon: Figma, label: "Figma" },
              { icon: Dribbble, label: "Dribbble" },
              { icon: Twitter, label: "Twitter" },
              { icon: Github, label: "GitHub" },
            ].map((s) => (
              <a
                key={s.label}
                href="#"
                onClick={(e) => e.preventDefault()}
                aria-label={s.label}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ background: "#0a0a0a08", color: "#0a0a0a" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#0a0a0a"; e.currentTarget.style.color = "#fafaf7"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#0a0a0a08"; e.currentTarget.style.color = "#0a0a0a"; }}
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

// ── Local time ─────────────────────────────────────────────────────────────
function LocalTime() {
  const [time, setTime] = useState<string>("");
  useEffect(() => {
    const update = () => {
      setTime(new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", timeZone: "America/Los_Angeles" }) + " PST");
    };
    update();
    const i = setInterval(update, 30000);
    return () => clearInterval(i);
  }, []);
  return <span>{time || "--:-- PST"}</span>;
}
