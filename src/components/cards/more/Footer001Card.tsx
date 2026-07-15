"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Activity, ShieldCheck, Compass, Github, Twitter, Linkedin, Mail } from "lucide-react";

// ════════════════════════════════════════════════════════════════════════════
// Footer 001 — Northwind (DevOps SaaS)
// Dark navy canvas + animated topographic contour SVG + cyan accent
// Magnetic CTA button + scroll-reveal link columns
// ════════════════════════════════════════════════════════════════════════════

const FOOTER_NAV: Record<string, { name: string; href: string; desc: string }[]> = {
  Platform: [
    { name: "Observability", href: "#", desc: "Traces, logs, metrics" },
    { name: "Incident Response", href: "#", desc: "On-call & runbooks" },
    { name: "Release Intelligence", href: "#", desc: "Deploy analytics" },
    { name: "Integrations", href: "#", desc: "200+ services" },
    { name: "Pricing", href: "#", desc: "Per-seat & usage" },
  ],
  Developers: [
    { name: "Documentation", href: "#", desc: "Guides & tutorials" },
    { name: "API Reference", href: "#", desc: "REST & GraphQL" },
    { name: "Webhooks", href: "#", desc: "Real-time events" },
    { name: "Status", href: "#", desc: "99.99% uptime" },
    { name: "Changelog", href: "#", desc: "Weekly releases" },
  ],
  Company: [
    { name: "Customers", href: "#", desc: "Case studies" },
    { name: "Security", href: "#", desc: "SOC 2 Type II" },
    { name: "Blog", href: "#", desc: "Engineering notes" },
    { name: "Careers", href: "#", desc: "12 open roles" },
    { name: "Contact", href: "#", desc: "Sales & support" },
  ],
};

const SOCIALS = [
  { icon: Github, label: "GitHub", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Mail, label: "Email", href: "#" },
];

export function Footer001Card() {
  return (
    <footer
      className="relative overflow-hidden text-white"
      style={{ background: "radial-gradient(ellipse at top, #0c1a2e 0%, #060b16 60%, #03060d 100%)", fontFamily: "var(--font-inter-tight), system-ui, sans-serif" }}
    >
      {/* Topographic contour SVG background */}
      <TopographicContours />

      {/* Top hairline */}
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(34,211,238,0.5), transparent)" }} />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* CTA band */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="py-16 lg:py-20 border-b border-white/10 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-5" style={{ background: "rgba(34,211,238,0.1)", color: "#22d3ee", border: "1px solid rgba(34,211,238,0.25)" }}>
              <Activity className="w-3 h-3" /> v4.2 — Release Radar now live
            </div>
            <h2 className="text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.05]" style={{ letterSpacing: "-0.03em" }}>
              Ship reliable software<br />
              <span style={{ color: "#22d3ee" }}>with engineering confidence.</span>
            </h2>
            <p className="mt-5 text-base text-slate-400 max-w-lg leading-relaxed">
              Northwind gives teams the observability, incident response, and release intelligence to move fast without breaking things.
            </p>
          </div>
          <MagneticButton />
        </motion.div>

        {/* Main grid */}
        <div className="py-16 lg:py-20 grid grid-cols-2 md:grid-cols-6 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <a href="#" onClick={(e) => e.preventDefault()} className="inline-flex items-center gap-2.5 mb-6 group">
              <NorthwindLogo />
              <span className="text-2xl font-semibold tracking-tight">Northwind</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded text-slate-400" style={{ background: "rgba(255,255,255,0.05)", fontFamily: "var(--font-jetbrains), monospace" }}>TM</span>
            </a>
            <p className="text-sm text-slate-400 mb-6 max-w-xs leading-relaxed">
              Observability, incident response, and release intelligence for high-velocity engineering teams.
            </p>
            <div className="flex gap-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  onClick={(e) => e.preventDefault()}
                  aria-label={s.label}
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-400 transition-all duration-300 hover:scale-110 hover:-translate-y-0.5"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(34,211,238,0.12)"; e.currentTarget.style.color = "#22d3ee"; e.currentTarget.style.borderColor = "rgba(34,211,238,0.4)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.color = "#94a3b8"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_NAV).map(([title, links], i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 mb-5" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
                {title}
              </h3>
              <ul className="space-y-3.5">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => e.preventDefault()}
                      className="group inline-flex flex-col"
                    >
                      <span className="inline-flex items-center gap-1 text-sm text-slate-300 transition-colors group-hover:text-cyan-300">
                        {link.name}
                        <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </span>
                      <span className="text-[11px] text-slate-600 group-hover:text-slate-500 transition-colors">{link.desc}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="py-7 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
            © {new Date().getFullYear()} Northwind Labs, Inc. — All systems operational.
          </p>
          <div className="flex items-center gap-5 text-xs text-slate-500">
            <a href="#" onClick={(e) => e.preventDefault()} className="inline-flex items-center gap-1.5 hover:text-cyan-300 transition-colors">
              <span className="relative flex w-1.5 h-1.5">
                <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping" style={{ background: "#10b981" }} />
                <span className="relative inline-flex w-1.5 h-1.5 rounded-full" style={{ background: "#10b981" }} />
              </span>
              99.99% uptime
            </a>
            <span className="text-white/20">|</span>
            <a href="#" onClick={(e) => e.preventDefault()} className="inline-flex items-center gap-1.5 hover:text-cyan-300 transition-colors">
              <ShieldCheck className="w-3 h-3" /> SOC 2 Type II
            </a>
            <span className="text-white/20">|</span>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-cyan-300 transition-colors">Privacy</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-cyan-300 transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── Magnetic CTA button (cursor-tracking) ──────────────────────────────────
function MagneticButton() {
  const ref = useRef<HTMLAnchorElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      const dist = Math.hypot(x, y);
      if (dist < 140) {
        setOffset({ x: x * 0.25, y: y * 0.25 });
      } else {
        setOffset({ x: 0, y: 0 });
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
      className="inline-flex items-center gap-2 px-7 py-4 rounded-xl font-medium text-sm transition-transform duration-200"
      style={{
        background: "linear-gradient(135deg, #22d3ee 0%, #0891b2 100%)",
        color: "#021016",
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        boxShadow: "0 10px 40px -10px rgba(34,211,238,0.5)",
      }}
    >
      Start free trial
      <ArrowUpRight className="w-4 h-4" />
    </a>
  );
}

// ── Topographic contour SVG (animated) ─────────────────────────────────────
function TopographicContours() {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    let raf = 0;
    let t = 0;
    const paths = svg.querySelectorAll<SVGPathElement>("path[data-contour]");
    const tick = () => {
      t += 0.005;
      paths.forEach((p, i) => {
        const offset = (i + 1) * 20 + Math.sin(t + i * 0.3) * 30;
        p.setAttribute("stroke-dashoffset", String(offset));
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const contours = Array.from({ length: 14 }, (_, i) => {
    const y = 80 + i * 36;
    const amp = 18 + i * 1.5;
    return `M -100 ${y} C 200 ${y - amp}, 500 ${y + amp}, 800 ${y - amp * 0.6} S 1200 ${y + amp}, 1500 ${y}`;
  });

  return (
    <div className="absolute inset-0 pointer-events-none opacity-50">
      <svg ref={ref} className="w-full h-full" viewBox="0 0 1500 600" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="nw-contour-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
            <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
          </linearGradient>
        </defs>
        {contours.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke="url(#nw-contour-grad)"
            strokeWidth="1"
            data-contour
            strokeDasharray="4 8"
            opacity={0.3 + (i / 14) * 0.4}
          />
        ))}
      </svg>
      {/* Glow blob */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(34,211,238,0.15) 0%, transparent 70%)" }} />
    </div>
  );
}

// ── Northwind logo — compass glyph ─────────────────────────────────────────
function NorthwindLogo() {
  return (
    <svg viewBox="0 0 64 64" className="w-9 h-9" aria-hidden="true">
      <defs>
        <linearGradient id="nw-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#0891b2" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill="url(#nw-grad)" />
      <circle cx="32" cy="32" r="22" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
      <path d="M32 14 L40 32 L32 28 L24 32 Z" fill="white" />
      <path d="M32 50 L28 38 L32 42 L36 38 Z" fill="white" opacity="0.6" />
      <circle cx="32" cy="32" r="2.5" fill="white" />
    </svg>
  );
}
