"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Users, Calendar, Star, ArrowUpRight, Twitter, Github, Youtube, Send } from "lucide-react";

// ════════════════════════════════════════════════════════════════════════════
// Footer 018 — Gather (Community Platform)
// Discord blurple + floating particle canvas + stats grid + Discord CTA
// ════════════════════════════════════════════════════════════════════════════

const NAV: { title: string; links: string[] }[] = [
  { title: "Community", links: ["Server Directory", "Start a Server", "Events", "Members", "Guidelines"] },
  { title: "Product", links: ["Features", "Pricing", "Integrations", "Mobile App", "Changelog"] },
  { title: "Resources", links: ["Documentation", "API Reference", "Blog", "Tutorials", "Status"] },
  { title: "Company", links: ["About", "Careers", "Press", "Brand Kit", "Contact"] },
];

export function Footer018Card() {
  return (
    <footer
      className="relative overflow-hidden text-white"
      style={{
        background: "linear-gradient(180deg, #1e1b4b 0%, #0f0a26 50%, #050217 100%)",
        fontFamily: "var(--font-inter-tight), system-ui, sans-serif",
      }}
    >
      {/* Floating particles */}
      <ParticleField />

      {/* Blurple glow */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[400px] pointer-events-none" style={{ background: "radial-gradient(circle, rgba(88,101,242,0.25), transparent 70%)" }} />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Top: Discord CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="py-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center border-b border-white/10"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs mb-5" style={{ background: "rgba(88,101,242,0.15)", color: "#aab2ff", border: "1px solid rgba(88,101,242,0.3)" }}>
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping" style={{ background: "#5865f2" }} />
                <span className="relative inline-flex w-2 h-2 rounded-full" style={{ background: "#aab2ff" }} />
              </span>
              4,287 online now
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] mb-4" style={{ letterSpacing: "-0.03em" }}>
              Find your<br />
              <span style={{ background: "linear-gradient(135deg, #aab2ff 0%, #5865f2 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                people.
              </span>
            </h2>
            <p className="text-base text-white/60 max-w-md mb-6">
              Join 1.2M+ members across 8,400 active communities. From indie hackers to plant parents, there's a server for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all hover:scale-105"
                style={{ background: "#5865f2", color: "#fff", boxShadow: "0 10px 30px -8px rgba(88,101,242,0.5)" }}
              >
                <MessageCircle className="w-4 h-4" />
                Join the community
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all hover:bg-white/5"
                style={{ border: "1px solid rgba(255,255,255,0.15)" }}
              >
                Browse servers
              </a>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Users, label: "Members", value: "1.2M", trend: "+12% this quarter" },
              { icon: MessageCircle, label: "Messages/day", value: "84M", trend: "Across 8.4K servers" },
              { icon: Calendar, label: "Events/month", value: "2,400", trend: "Member-hosted" },
              { icon: Star, label: "Avg rating", value: "4.8", trend: "From 48k reviews" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="p-5 rounded-2xl backdrop-blur-sm"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <s.icon className="w-4 h-4 mb-2" style={{ color: "#aab2ff" }} />
                <div className="text-2xl font-bold" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>{s.value}</div>
                <div className="text-xs text-white/40 uppercase tracking-wider mb-1">{s.label}</div>
                <div className="text-[10px] text-white/50">{s.trend}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Main grid */}
        <div className="py-14 grid grid-cols-2 md:grid-cols-6 gap-10">
          <div className="col-span-2">
            <a href="#" onClick={(e) => e.preventDefault()} className="inline-flex items-center gap-2 mb-5">
              <GatherLogo />
              <span className="text-2xl font-bold tracking-tight">Gather</span>
            </a>
            <p className="text-sm text-white/60 mb-6 max-w-xs leading-relaxed">
              The community platform for people who care about belonging. Voice, video, chat, and events — all in one place.
            </p>
            <div className="flex gap-2">
              {[
                { icon: MessageCircle, label: "Discord", color: "#5865f2" },
                { icon: Twitter, label: "Twitter", color: "#1d9bf0" },
                { icon: Youtube, label: "YouTube", color: "#ff0000" },
                { icon: Github, label: "GitHub", color: "#ffffff" },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  aria-label={s.label}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white/60 transition-all hover:scale-110"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = `${s.color}25`; e.currentTarget.style.color = s.color; e.currentTarget.style.borderColor = `${s.color}50`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
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
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40 mb-4" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="group inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-indigo-300 transition-colors"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-indigo-400 transition-all duration-300 mr-0 group-hover:mr-1.5" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="py-7 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
            © {new Date().getFullYear()} Gather Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-xs text-white/40">
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-indigo-300 transition-colors">Privacy</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-indigo-300 transition-colors">Terms</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-indigo-300 transition-colors">Community Guidelines</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="inline-flex items-center gap-1.5 hover:text-indigo-300 transition-colors" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
              <Send className="w-3 h-3" /> status.gather.community
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── Particle field canvas ──────────────────────────────────────────────────
function ParticleField() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const COUNT = 50;
    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0002,
      vy: -Math.random() * 0.0003 - 0.0001,
      r: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.5 + 0.1,
      hue: Math.random() > 0.5 ? "88,101,242" : "170,178,255",
    }));

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -0.05) p.y = 1.05;
        if (p.x < -0.05) p.x = 1.05;
        if (p.x > 1.05) p.x = -0.05;

        ctx.fillStyle = `rgba(${p.hue}, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x * rect.width, p.y * rect.height, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      raf = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none opacity-70" />;
}

// ── Gather logo — chat bubble glyph ────────────────────────────────────────
function GatherLogo() {
  return (
    <svg viewBox="0 0 64 64" className="w-9 h-9" aria-hidden="true">
      <defs>
        <linearGradient id="gt-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#aab2ff" />
          <stop offset="100%" stopColor="#5865f2" />
        </linearGradient>
      </defs>
      <path d="M32 6 C18 6 8 16 8 28 c0 8 4 14 10 18 L16 56 L26 46 c2 0 4 0.5 6 0.5 c14 0 24-10 24-22.5 S46 6 32 6 z" fill="url(#gt-grad)" />
      <circle cx="22" cy="28" r="3" fill="#fff" />
      <circle cx="32" cy="28" r="3" fill="#fff" />
      <circle cx="42" cy="28" r="3" fill="#fff" />
    </svg>
  );
}
