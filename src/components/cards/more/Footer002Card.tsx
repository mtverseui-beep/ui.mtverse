"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github, Twitter, Linkedin, Dribbble, Mail, MapPin, Clock } from "lucide-react";

// ════════════════════════════════════════════════════════════════════════════
// Footer 002 — Portfolio (Personal)
// Brutalist ivory + electric blue + giant wordmark + magnetic social + typewriter
// ════════════════════════════════════════════════════════════════════════════

const PAGES = [
  { label: "Selected Work", href: "#", n: "01" },
  { label: "About", href: "#about", n: "02" },
  { label: "Process", href: "#process", n: "03" },
  { label: "Journal", href: "#journal", n: "04" },
  { label: "Contact", href: "#contact", n: "05" },
];

const SERVICES = ["Brand Identity", "Web Design", "Product UI", "Art Direction", "Motion"];

const TAGLINE_WORDS = ["Independent", "designer", "crafting", "thoughtful", "digital", "experiences."];

export function Footer002Card() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: "#f4f1ea",
        color: "#0a0a0a",
        fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
      }}
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      {/* Floating electric-blue blob */}
      <motion.div
        aria-hidden
        className="absolute -top-32 -right-32 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(32,62,236,0.18) 0%, transparent 70%)" }}
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-12">
        {/* Top: tagline (typewriter) */}
        <div className="pt-20 pb-12 border-b border-black/10">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-2 h-2 rounded-full" style={{ background: "#203eec" }} />
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-black/60">Open for projects — Q3 2026</span>
          </div>
          <TypewriterTagline />
        </div>

        {/* Middle: nav grid */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand block */}
          <div className="md:col-span-5">
            <a href="#" onClick={(e) => e.preventDefault()} className="inline-flex items-baseline gap-2 mb-6">
              <span className="text-3xl font-bold tracking-tight">portfolio</span>
              <span className="text-xs" style={{ color: "#203eec", fontFamily: "var(--font-jetbrains), monospace" }}>.studio</span>
            </a>
            <div className="flex items-start gap-2 text-sm text-black/60 mb-3">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#203eec" }} />
              <span>Lisbon, Portugal — 38.7223° N, 9.1393° W</span>
            </div>
            <div className="flex items-start gap-2 text-sm text-black/60 mb-6">
              <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#203eec" }} />
              <span>Local time: <LocalTime /></span>
            </div>
            <a
              href="mailto:hello@portfolio.studio"
              className="inline-flex items-center gap-2 text-sm font-medium underline-offset-4 hover:underline"
              style={{ color: "#203eec" }}
            >
              <Mail className="w-4 h-4" />
              hello@portfolio.studio
            </a>
          </div>

          {/* Pages */}
          <div className="md:col-span-4">
            <h4 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-black/40 mb-5" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
              Index
            </h4>
            <ul className="space-y-0">
              {PAGES.map((p) => (
                <li key={p.label}>
                  <a
                    href={p.href}
                    onClick={(e) => e.preventDefault()}
                    className="group flex items-center justify-between py-2.5 border-b border-black/10 text-base font-medium transition-all hover:pl-3"
                    onMouseEnter={(e) => { e.currentTarget.style.color = "#203eec"; e.currentTarget.style.borderColor = "#203eec"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "#0a0a0a"; e.currentTarget.style.borderColor = "rgba(0,0,0,0.1)"; }}
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-[10px] text-black/30 font-mono">{p.n}</span>
                      {p.label}
                    </span>
                    <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="md:col-span-3">
            <h4 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-black/40 mb-5" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
              Services
            </h4>
            <ul className="space-y-2">
              {SERVICES.map((s) => (
                <li key={s}>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="text-sm text-black/70 hover:text-black transition-colors inline-flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-black/30" />
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Giant wordmark */}
        <div className="py-12 border-t border-black/10 overflow-hidden">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[15vw] md:text-[12vw] leading-[0.85] font-bold tracking-[-0.04em] select-none"
            style={{ fontFeatureSettings: '"ss01"' }}
          >
            portfolio<span style={{ color: "#203eec" }}>.</span>
          </motion.h2>
        </div>

        {/* Bottom + magnetic socials */}
        <div className="py-8 border-t border-black/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-black/50" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
            © {new Date().getFullYear()} Portfolio Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {[
              { icon: Twitter, label: "Twitter" },
              { icon: Github, label: "GitHub" },
              { icon: Linkedin, label: "LinkedIn" },
              { icon: Dribbble, label: "Dribbble" },
            ].map((s) => (
              <MagneticSocial key={s.label} icon={s.icon} label={s.label} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── Typewriter tagline ─────────────────────────────────────────────────────
function TypewriterTagline() {
  const [visible, setVisible] = useState(0);
  useEffect(() => {
    if (visible >= TAGLINE_WORDS.length) return;
    const t = setTimeout(() => setVisible((v) => v + 1), 280);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium leading-[1.05] tracking-[-0.03em] max-w-4xl">
      {TAGLINE_WORDS.map((w, i) => (
        <span key={i} className="inline-block">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={i < visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.25 }}
            className="inline-block"
            style={i === 1 ? { color: "#203eec" } : undefined}
          >
            {w}
          </motion.span>
          {i < TAGLINE_WORDS.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
      <span className="inline-block w-[3px] h-[0.9em] ml-2 align-middle animate-pulse" style={{ background: "#203eec" }} />
    </h1>
  );
}

// ── Local time ─────────────────────────────────────────────────────────────
function LocalTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () => {
      const d = new Date();
      setTime(d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Lisbon" }));
    };
    update();
    const i = setInterval(update, 30000);
    return () => clearInterval(i);
  }, []);
  return <span style={{ fontFamily: "var(--font-jetbrains), monospace" }}>{time} WET</span>;
}

// ── Magnetic social icon ───────────────────────────────────────────────────
function MagneticSocial({ icon: Icon, label }: { icon: React.ComponentType<{ className?: string }>; label: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      const dist = Math.hypot(x, y);
      if (dist < 90) {
        setOffset({ x: x * 0.4, y: y * 0.4 });
        setHover(true);
      } else if (dist > 110) {
        setOffset({ x: 0, y: 0 });
        setHover(false);
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <a
      ref={ref}
      href="#"
      onClick={(e) => e.preventDefault()}
      aria-label={label}
      className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200"
      style={{
        background: hover ? "#203eec" : "#0a0a0a",
        color: "#f4f1ea",
        transform: `translate(${offset.x}px, ${offset.y}px) scale(${hover ? 1.08 : 1})`,
      }}
    >
      <Icon className="w-4 h-4" />
    </a>
  );
}
