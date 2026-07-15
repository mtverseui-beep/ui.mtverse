"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Plus, Minus, Github, Dribbble, Instagram, Figma } from "lucide-react";

// ════════════════════════════════════════════════════════════════════════════
// Footer 010 — Monolith (Creative Agency)
// Off-black + giant scrolling marquee + floating colorful blobs + brutalist
// ════════════════════════════════════════════════════════════════════════════

const SERVICES = ["Branding", "Web Design", "Art Direction", "Motion", "Strategy", "Identity"];
const LOCATIONS = ["New York", "London", "Tokyo", "Berlin"];

export function Footer010Card() {
  return (
    <footer
      className="relative overflow-hidden text-white"
      style={{
        background: "#0a0a0a",
        fontFamily: "var(--font-archivo), system-ui, sans-serif",
      }}
    >
      {/* Floating blobs */}
      <motion.div
        className="absolute top-20 left-1/4 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,234,0,0.25), transparent 60%)", filter: "blur(40px)" }}
        animate={{ x: [0, 80, 0], y: [0, -40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(236,72,153,0.22), transparent 60%)", filter: "blur(50px)" }}
        animate={{ x: [0, -60, 0], y: [0, 40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10">
        {/* Marquee strip */}
        <div className="py-6 border-b border-white/10 overflow-hidden">
          <motion.div
            className="flex items-center gap-8 whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          >
            {[...SERVICES, ...SERVICES, ...SERVICES, ...SERVICES].map((s, i) => (
              <span key={i} className="text-5xl md:text-7xl font-black uppercase tracking-tight inline-flex items-center gap-8" style={{ letterSpacing: "-0.04em" }}>
                {s}
                <span className="w-3 h-3 rounded-full" style={{ background: i % 2 === 0 ? "#ffea00" : "#ec4899" }} />
              </span>
            ))}
          </motion.div>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          {/* Top: huge CTA */}
          <div className="py-20 grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7">
              <p className="text-xs uppercase tracking-[0.25em] text-white/40 mb-6" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
                Available for select projects · 2026
              </p>
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.9]" style={{ letterSpacing: "-0.05em" }}>
                Let's make<br />
                something<br />
                <span style={{ color: "#ffea00" }}>monumental</span>.
              </h2>
              <div className="mt-10">
                <BrutalistButton />
              </div>
            </div>

            <div className="lg:col-span-5 lg:pl-10 lg:border-l lg:border-white/10 space-y-10">
              {/* Studios */}
              <div>
                <h3 className="text-xs uppercase tracking-[0.25em] text-white/40 mb-4" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>Studios</h3>
                <ul className="space-y-2">
                  {LOCATIONS.map((l) => (
                    <li key={l} className="group flex items-center justify-between py-2 border-b border-white/10">
                      <span className="text-2xl font-bold uppercase">{l}</span>
                      <span className="text-xs text-white/40" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
                        {l === "New York" ? "40.7128 N" : l === "London" ? "51.5074 N" : l === "Tokyo" ? "35.6762 N" : "52.5200 N"}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h3 className="text-xs uppercase tracking-[0.25em] text-white/40 mb-4" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>New Business</h3>
                <a
                  href="mailto:hello@monolith.studio"
                  className="text-2xl md:text-3xl font-bold tracking-tight hover:text-yellow-300 transition-colors block"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  hello@monolith.studio
                </a>
                <p className="text-sm text-white/50 mt-2" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>+1 (212) 555-0147</p>
              </div>
            </div>
          </div>

          {/* Services grid (interactive expand) */}
          <ServiceGrid />

          {/* Bottom bar */}
          <div className="py-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
            <a href="#" onClick={(e) => e.preventDefault()} className="inline-flex items-center gap-2">
              <MonolithLogo />
              <span className="text-2xl font-black uppercase tracking-tight">Monolith</span>
            </a>
            <div className="flex items-center gap-2">
              {[Figma, Dribbble, Instagram, Github].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="w-12 h-12 rounded-none flex items-center justify-center text-white transition-all hover:scale-110"
                  style={{ background: "transparent", border: "1.5px solid rgba(255,255,255,0.2)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#ffea00"; e.currentTarget.style.color = "#0a0a0a"; e.currentTarget.style.borderColor = "#ffea00"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; }}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <p className="text-xs text-white/40" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
              © {new Date().getFullYear()} Monolith Studio. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── Brutalist button with hover fill ───────────────────────────────────────
function BrutalistButton() {
  return (
    <a
      href="#"
      onClick={(e) => e.preventDefault()}
      className="group relative inline-flex items-center gap-3 px-8 py-5 overflow-hidden"
      style={{ background: "#ffea00", color: "#0a0a0a", border: "2px solid #0a0a0a", boxShadow: "8px 8px 0 0 #0a0a0a" }}
    >
      <span className="text-lg font-black uppercase tracking-tight">Start a project</span>
      <ArrowUpRight className="w-5 h-5" />
      <span
        className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-300"
        style={{ background: "#0a0a0a" }}
      />
      <span className="absolute inset-0 flex items-center justify-center gap-3 px-8 text-lg font-black uppercase tracking-tight translate-x-full group-hover:translate-x-0 transition-transform duration-300" style={{ color: "#ffea00" }}>
        Start a project <ArrowUpRight className="w-5 h-5" />
      </span>
    </a>
  );
}

// ── Service grid (interactive expand) ──────────────────────────────────────
function ServiceGrid() {
  const [open, setOpen] = useState<number | null>(0);
  const services = [
    { name: "Brand Identity", desc: "Logo systems, visual language, brand guidelines, naming." },
    { name: "Web Design", desc: "Marketing sites, product UI, design systems, prototypes." },
    { name: "Art Direction", desc: "Photography, illustration, campaign concepts, social." },
    { name: "Motion", desc: "Title sequences, brand films, UI motion, 3D animation." },
  ];

  return (
    <div className="py-10 border-t border-white/10">
      <p className="text-xs uppercase tracking-[0.25em] text-white/40 mb-6" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>What we do</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
        {services.map((s, i) => (
          <div key={s.name} className="border-b border-white/10">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between py-5 group"
            >
              <span className="text-2xl md:text-3xl font-bold uppercase tracking-tight group-hover:text-yellow-300 transition-colors" style={{ letterSpacing: "-0.02em" }}>
                {s.name}
              </span>
              <span className="w-8 h-8 flex items-center justify-center">
                {open === i ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
              </span>
            </button>
            <motion.div
              initial={false}
              animate={{ height: open === i ? "auto" : 0, opacity: open === i ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <p className="pb-5 text-base text-white/60 max-w-md leading-relaxed">{s.desc}</p>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Monolith logo — solid block glyph ──────────────────────────────────────
function MonolithLogo() {
  return (
    <svg viewBox="0 0 64 64" className="w-9 h-9" aria-hidden="true">
      <rect x="10" y="10" width="44" height="44" fill="#ffea00" />
      <rect x="22" y="22" width="20" height="20" fill="#0a0a0a" />
    </svg>
  );
}
