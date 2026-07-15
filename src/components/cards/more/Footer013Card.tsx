"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Activity, Cpu, HardDrive, Zap, Globe, ArrowUpRight, Github, Twitter, AlertCircle } from "lucide-react";

// ════════════════════════════════════════════════════════════════════════════
// Footer 013 — Pinpoint (Dashboard Product)
// Dark slate + animated uptime grid + live system metrics + emerald accent
// ════════════════════════════════════════════════════════════════════════════

const NAV: { title: string; links: string[] }[] = [
  { title: "Product", links: ["Dashboards", "Alerts", "Traces", "Logs", "Synthetics", "Pricing"] },
  { title: "Integrations", links: ["AWS", "GCP", "Azure", "Kubernetes", "Slack", "PagerDuty"] },
  { title: "Resources", links: ["Docs", "API", "Status", "Changelog", "Blog", "Community"] },
  { title: "Company", links: ["About", "Customers", "Careers", "Contact", "Security", "Legal"] },
];

export function Footer013Card() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0b0f1a 0%, #0a0e17 50%, #050811 100%)",
        color: "#e2e8f0",
        fontFamily: "var(--font-inter-tight), system-ui, sans-serif",
      }}
    >
      {/* Animated grid bg */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.15]"
        style={{
          backgroundImage: "linear-gradient(rgba(16,185,129,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.15) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(ellipse at center top, black, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Live system status band */}
        <SystemStatusBand />

        {/* Main grid */}
        <div className="py-14 grid grid-cols-2 md:grid-cols-6 gap-10">
          {/* Brand + live metrics */}
          <div className="col-span-2">
            <a href="#" onClick={(e) => e.preventDefault()} className="inline-flex items-center gap-2 mb-5">
              <PinpointLogo />
              <span className="text-2xl font-bold tracking-tight text-white">Pinpoint</span>
            </a>
            <p className="text-sm text-slate-400 mb-6 max-w-xs leading-relaxed">
              Full-stack observability for modern engineering teams. Metrics, traces, logs, and synthetics — unified.
            </p>
            {/* Live metrics tiles */}
            <div className="grid grid-cols-2 gap-2 max-w-sm">
              <MetricTile icon={Cpu} label="p95 latency" value="42ms" trend="-3%" />
              <MetricTile icon={Activity} label="Requests/s" value="12.4k" trend="+8%" />
              <MetricTile icon={HardDrive} label="Error rate" value="0.02%" trend="-12%" />
              <MetricTile icon={Zap} label="Uptime" value="99.99%" trend="stable" />
            </div>
          </div>

          {/* Link columns */}
          {NAV.map((col, ci) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: ci * 0.06 }}
            >
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-4" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="group inline-flex items-center gap-1 text-sm text-slate-300 hover:text-emerald-400 transition-colors"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-emerald-500 transition-all duration-300 mr-0 group-hover:mr-1.5" />
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
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <p style={{ fontFamily: "var(--font-jetbrains), monospace" }}>© {new Date().getFullYear()} Pinpoint, Inc.</p>
            <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded" style={{ background: "rgba(16,185,129,0.1)", color: "#10b981", fontFamily: "var(--font-jetbrains), monospace" }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#10b981" }} /> All systems operational
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" onClick={(e) => e.preventDefault()} className="text-xs text-slate-500 hover:text-emerald-400 transition-colors inline-flex items-center gap-1" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
              <Globe className="w-3 h-3" /> status.pinpoint.io
            </a>
            <div className="flex gap-2">
              {[Twitter, Github].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="w-8 h-8 rounded-md flex items-center justify-center text-slate-400 hover:text-emerald-400 transition-all hover:scale-110"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── System status band (uptime grid) ───────────────────────────────────────
function SystemStatusBand() {
  const [bars, setBars] = useState<boolean[]>(Array(90).fill(true));
  const ref = useRef<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBars((prev) => {
        const next = [...prev.slice(1), Math.random() > 0.04];
        return next;
      });
      ref.current++;
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-10 border-b border-white/10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="relative flex w-2.5 h-2.5">
            <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping" style={{ background: "#10b981" }} />
            <span className="relative inline-flex w-2.5 h-2.5 rounded-full" style={{ background: "#10b981" }} />
          </span>
          <p className="text-sm font-medium text-white">All systems operational</p>
          <span className="text-xs text-slate-500" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>Updated 8s ago</span>
        </div>
        <a href="#" onClick={(e) => e.preventDefault()} className="text-xs text-slate-500 hover:text-emerald-400 transition-colors inline-flex items-center gap-1">
          View status page <ArrowUpRight className="w-3 h-3" />
        </a>
      </div>
      {/* Uptime grid */}
      <div className="flex gap-0.5 h-12">
        {bars.map((ok, i) => (
          <motion.div
            key={i}
            initial={false}
            animate={{ opacity: i === bars.length - 1 ? [0.4, 1] : 1 }}
            transition={{ duration: 0.4 }}
            className="flex-1 rounded-sm"
            style={{
              background: ok ? "#10b981" : "#ef4444",
              opacity: 0.3 + (i / bars.length) * 0.7,
            }}
            title={ok ? "OK" : "Incident"}
          />
        ))}
      </div>
      <div className="flex items-center justify-between mt-2 text-xs text-slate-500" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
        <span>90 days ago</span>
        <span className="inline-flex items-center gap-3">
          <span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-sm" style={{ background: "#10b981" }} /> OK</span>
          <span className="inline-flex items-center gap-1"><span className="w-2 h-2 rounded-sm" style={{ background: "#ef4444" }} /> Incident</span>
        </span>
        <span>Today</span>
      </div>
    </div>
  );
}

// ── Metric tile ────────────────────────────────────────────────────────────
function MetricTile({ icon: Icon, label, value, trend }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string; trend: string }) {
  const isPositive = trend.startsWith("+") || trend === "stable";
  return (
    <div className="p-2.5 rounded-lg" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="flex items-center justify-between mb-1">
        <Icon className="w-3.5 h-3.5 text-emerald-400" />
        <span className={`text-[9px] ${isPositive ? "text-emerald-400" : "text-rose-400"}`} style={{ fontFamily: "var(--font-jetbrains), monospace" }}>{trend}</span>
      </div>
      <div className="text-lg font-bold text-white" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>{value}</div>
      <div className="text-[10px] text-slate-500 uppercase tracking-wider">{label}</div>
    </div>
  );
}

// ── Pinpoint logo — pin location glyph ─────────────────────────────────────
function PinpointLogo() {
  return (
    <svg viewBox="0 0 64 64" className="w-9 h-9" aria-hidden="true">
      <defs>
        <linearGradient id="pp-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>
      <path d="M32 4 C20 4 12 12 12 24 c0 14 20 36 20 36 s20-22 20-36 c0-12-8-20-20-20 z" fill="url(#pp-grad)" />
      <circle cx="32" cy="24" r="7" fill="#0b0f1a" />
      <circle cx="32" cy="24" r="3" fill="#34d399" />
    </svg>
  );
}
