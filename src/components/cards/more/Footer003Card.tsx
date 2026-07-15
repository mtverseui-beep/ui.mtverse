"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Cpu, Workflow, Boxes, Github, Twitter, Linkedin } from "lucide-react";

// ════════════════════════════════════════════════════════════════════════════
// Footer 003 — Agentic (AI Platform)
// Pure black + animated neural mesh canvas + violet glow + glassy link cards
// ════════════════════════════════════════════════════════════════════════════

const COLS: { title: string; links: { name: string; meta: string }[] }[] = [
  {
    title: "Platform",
    links: [
      { name: "Agents", meta: "Autonomous" },
      { name: "Memory", meta: "Long-term" },
      { name: "Tools", meta: "200+ MCPs" },
      { name: "Evals", meta: "Continuous" },
      { name: "Observability", meta: "Traces" },
    ],
  },
  {
    title: "Build",
    links: [
      { name: "Documentation", meta: "Quickstart" },
      { name: "API Reference", meta: "v3 stable" },
      { name: "SDKs", meta: "TS · Py · Go" },
      { name: "Cookbook", meta: "120 recipes" },
      { name: "Playground", meta: "Free tier" },
    ],
  },
  {
    title: "Research",
    links: [
      { name: "Papers", meta: "32 published" },
      { name: "Models", meta: "Open weights" },
      { name: "Benchmarks", meta: "Leaderboard" },
      { name: "Safety", meta: "Alignment" },
      { name: "Blog", meta: "Weekly" },
    ],
  },
];

export function Footer003Card() {
  return (
    <footer
      className="relative overflow-hidden text-white"
      style={{ background: "#050507", fontFamily: "var(--font-geist-sans), system-ui, sans-serif" }}
    >
      {/* Neural mesh canvas */}
      <NeuralMesh />

      {/* Violet glow blobs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)" }} />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)" }} />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Hero CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center border-b border-white/10"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs mb-5" style={{ background: "rgba(139,92,246,0.12)", color: "#a78bfa", border: "1px solid rgba(139,92,246,0.3)" }}>
              <Sparkles className="w-3 h-3" /> Agentic v3 — now with persistent memory
            </div>
            <h2 className="text-4xl lg:text-6xl font-medium tracking-tight leading-[1.02]" style={{ letterSpacing: "-0.04em" }}>
              Build agents that<br />
              <span style={{ background: "linear-gradient(135deg, #a78bfa 0%, #60a5fa 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                think for themselves.
              </span>
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 lg:justify-end">
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-medium text-sm transition-all"
              style={{ background: "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)", boxShadow: "0 8px 30px -8px rgba(139,92,246,0.5)" }}
            >
              Start building free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-medium text-sm transition-all hover:bg-white/5"
              style={{ border: "1px solid rgba(255,255,255,0.15)" }}
            >
              Read the docs
            </a>
          </div>
        </motion.div>

        {/* Main grid */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="col-span-2">
            <a href="#" onClick={(e) => e.preventDefault()} className="inline-flex items-center gap-2 mb-5">
              <AgenticLogo />
              <span className="text-xl font-semibold tracking-tight">Agentic</span>
            </a>
            <p className="text-sm text-white/60 mb-6 max-w-xs leading-relaxed">
              The platform for building, deploying, and observing autonomous AI agents at scale.
            </p>
            {/* Stat cards */}
            <div className="grid grid-cols-3 gap-2 max-w-sm">
              {[
                { icon: Cpu, label: "Models", value: "40+" },
                { icon: Workflow, label: "Runs/day", value: "12M" },
                { icon: Boxes, label: "Builders", value: "85K" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="p-3 rounded-lg backdrop-blur-sm"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <s.icon className="w-3.5 h-3.5 mb-1.5" style={{ color: "#a78bfa" }} />
                  <div className="text-lg font-semibold" style={{ fontFamily: "var(--font-geist-sans)" }}>{s.value}</div>
                  <div className="text-[10px] text-white/40 uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>
            {/* Socials */}
            <div className="flex gap-2 mt-6">
              {[Github, Twitter, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-white/60 hover:text-white transition-all hover:scale-110"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(139,92,246,0.15)"; e.currentTarget.style.borderColor = "rgba(139,92,246,0.4)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns as glass cards */}
          {COLS.map((col, ci) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: ci * 0.08 }}
              className="p-5 rounded-2xl backdrop-blur-sm"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40 mb-4" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
                {col.title}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="group block"
                    >
                      <div className="text-sm text-white/80 group-hover:text-violet-300 transition-colors">{link.name}</div>
                      <div className="text-[10px] text-white/30 group-hover:text-white/50 transition-colors">{link.meta}</div>
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
            © {new Date().getFullYear()} Agentic Labs. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-xs text-white/40">
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-violet-300 transition-colors">Privacy</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-violet-300 transition-colors">Terms</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-violet-300 transition-colors">Acceptable Use</a>
            <span className="inline-flex items-center gap-1.5" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#a78bfa" }} />
              api.agentic.dev
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── Neural mesh canvas — animated nodes/edges ──────────────────────────────
function NeuralMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
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

    // Generate nodes
    const NODE_COUNT = 36;
    const nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0004,
      vy: (Math.random() - 0.5) * 0.0004,
      pulse: Math.random() * Math.PI * 2,
    }));

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      // Update positions
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > 1) n.vx *= -1;
        if (n.y < 0 || n.y > 1) n.vy *= -1;
        n.pulse += 0.02;
      });

      // Draw edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = (a.x - b.x) * rect.width;
          const dy = (a.y - b.y) * rect.height;
          const dist = Math.hypot(dx, dy);
          const maxDist = 180;
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.25;
            ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x * rect.width, a.y * rect.height);
            ctx.lineTo(b.x * rect.width, b.y * rect.height);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach((n) => {
        const x = n.x * rect.width;
        const y = n.y * rect.height;
        const r = 1.5 + Math.sin(n.pulse) * 0.5;
        const alpha = 0.4 + Math.sin(n.pulse) * 0.2;
        ctx.fillStyle = `rgba(167, 139, 250, ${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
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

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-60" />;
}

// ── Agentic logo — orbiting glyph ──────────────────────────────────────────
function AgenticLogo() {
  return (
    <svg viewBox="0 0 64 64" className="w-8 h-8" aria-hidden="true">
      <defs>
        <linearGradient id="ag-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="6" fill="url(#ag-grad)" />
      <circle cx="32" cy="32" r="14" fill="none" stroke="url(#ag-grad)" strokeWidth="1.5" strokeDasharray="3 3" />
      <circle cx="32" cy="32" r="22" fill="none" stroke="url(#ag-grad)" strokeWidth="1" strokeDasharray="2 4" opacity="0.5" />
      <circle cx="32" cy="18" r="2.5" fill="#a78bfa" />
      <circle cx="46" cy="32" r="2.5" fill="#6366f1" />
      <circle cx="32" cy="46" r="2.5" fill="#a78bfa" opacity="0.6" />
      <circle cx="18" cy="32" r="2.5" fill="#6366f1" opacity="0.6" />
    </svg>
  );
}
