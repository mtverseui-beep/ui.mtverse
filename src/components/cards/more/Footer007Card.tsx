"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Globe2, Server, Award, Building2, Github, Twitter, Linkedin, Youtube } from "lucide-react";

// ════════════════════════════════════════════════════════════════════════════
// Footer 007 — Nexcorp (Enterprise)
// Slate gray + 5-col mega grid + compliance badges + animated trust ticker
// ════════════════════════════════════════════════════════════════════════════

const NAV: { title: string; links: { name: string; tag?: string }[] }[] = [
  {
    title: "Platform",
    links: [
      { name: "Cloud Infrastructure", tag: "Core" },
      { name: "AI & Machine Learning" },
      { name: "Data Warehouse" },
      { name: "Networking" },
      { name: "Security Center" },
      { name: "Cost Management" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { name: "Financial Services" },
      { name: "Healthcare" },
      { name: "Public Sector" },
      { name: "Manufacturing" },
      { name: "Retail" },
      { name: "Telecommunications" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Documentation" },
      { name: "Architecture Center" },
      { name: "Training & Certification" },
      { name: "Marketplace" },
      { name: "Migration Tools" },
      { name: "Whitepapers" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Nexcorp" },
      { name: "Investor Relations" },
      { name: "Newsroom" },
      { name: "Careers", tag: "1.2K open" },
      { name: "Partners" },
      { name: "Contact Sales" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy" },
      { name: "Terms of Service" },
      { name: "Compliance" },
      { name: "Trust Center" },
      { name: "DPA" },
      { name: "SLA" },
    ],
  },
];

const COMPLIANCE = ["SOC 2 Type II", "ISO 27001", "HIPAA", "GDPR", "PCI DSS", "FedRAMP", "ISO 9001", "CSA STAR"];

export function Footer007Card() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0f172a 0%, #1e293b 100%)",
        color: "#e2e8f0",
        fontFamily: "var(--font-inter-tight), system-ui, sans-serif",
      }}
    >
      {/* Dot grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.15]"
        style={{
          backgroundImage: "radial-gradient(rgba(99,102,241,0.3) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Trust ticker */}
      <TrustTicker />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Top: brand + sales CTA */}
        <div className="py-14 grid grid-cols-1 lg:grid-cols-12 gap-10 border-b border-white/10">
          <div className="lg:col-span-6">
            <a href="#" onClick={(e) => e.preventDefault()} className="inline-flex items-center gap-3 mb-5">
              <NexcorpLogo />
              <span className="text-2xl font-bold tracking-tight text-white">Nexcorp</span>
              <span className="text-[10px] px-2 py-0.5 rounded text-indigo-300" style={{ background: "rgba(99,102,241,0.15)", fontFamily: "var(--font-jetbrains), monospace" }}>Enterprise</span>
            </a>
            <p className="text-base text-slate-400 max-w-md leading-relaxed">
              The enterprise cloud platform trusted by 87% of the Fortune 500. Build, deploy, and scale mission-critical workloads with confidence.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-4 max-w-md">
              {[
                { icon: Server, label: "Regions", value: "120+" },
                { icon: Globe2, label: "Countries", value: "200+" },
                { icon: Award, label: "Uptime SLA", value: "99.99%" },
              ].map((s) => (
                <div key={s.label} className="p-3 rounded-lg" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <s.icon className="w-4 h-4 mb-1.5 text-indigo-400" />
                  <div className="text-lg font-bold text-white">{s.value}</div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 lg:pl-10 lg:border-l lg:border-white/10">
            <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Talk to our sales team</h3>
            <p className="text-sm text-slate-400 mb-5">Get a personalized demo, pricing estimate, and migration plan in 24 hours.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all"
                style={{ background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)", color: "#fff", boxShadow: "0 8px 30px -8px rgba(99,102,241,0.5)" }}
              >
                Contact Sales
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm text-white transition-all hover:bg-white/5"
                style={{ border: "1px solid rgba(255,255,255,0.15)" }}
              >
                <Building2 className="w-4 h-4" /> Become a Partner
              </a>
            </div>
            <div className="mt-5 flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5" style={{ color: "#10b981" }} />
              Enterprise-grade security · 24/7 support · Dedicated CSM
            </div>
          </div>
        </div>

        {/* Mega grid */}
        <div className="py-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
          {NAV.map((col, ci) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: ci * 0.06 }}
              className={ci === 0 ? "col-span-2 md:col-span-1 lg:col-span-1" : ""}
            >
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-5">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="group inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors"
                    >
                      {link.name}
                      {link.tag && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded" style={{ background: "rgba(99,102,241,0.15)", color: "#a5b4fc", fontFamily: "var(--font-jetbrains), monospace" }}>
                          {link.tag}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Regions / contact extra column */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-5">Regions</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>Americas (4)</li>
              <li>EMEA (5)</li>
              <li>APAC (4)</li>
              <li>Middle East (2)</li>
              <li>Africa (1)</li>
            </ul>
          </motion.div>
        </div>

        {/* Compliance badges */}
        <div className="py-7 border-t border-white/10">
          <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500 mb-4" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>Compliance & Certifications</p>
          <div className="flex flex-wrap gap-2">
            {COMPLIANCE.map((c) => (
              <span
                key={c}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs text-slate-300 transition-colors hover:text-white"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(99,102,241,0.12)"; e.currentTarget.style.borderColor = "rgba(99,102,241,0.4)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
              >
                <ShieldCheck className="w-3 h-3 text-indigo-400" /> {c}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-7 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
            © {new Date().getFullYear()} Nexcorp Technologies, Inc. NASDAQ: NEXA
          </p>
          <div className="flex items-center gap-3">
            {[Twitter, Linkedin, Youtube, Github].map((Icon, i) => (
              <a
                key={i}
                href="#"
                onClick={(e) => e.preventDefault()}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-all hover:scale-110"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(99,102,241,0.12)"; e.currentTarget.style.color = "#a5b4fc"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.color = "#94a3b8"; }}
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

// ── Trust ticker (marquee of customer logos / stats) ───────────────────────
function TrustTicker() {
  const items = [
    "TRUSTED BY 87% OF FORTUNE 500",
    "★ 4.8 ON GARTNER PEER INSIGHTS",
    "12M+ ACTIVE ENTERPRISE USERS",
    "$48B ANNUAL CLOUD REVENUE",
    "120+ GLOBAL REGIONS",
    "99.99% UPTIME SLA",
  ];
  const doubled = [...items, ...items];
  return (
    <div className="relative z-10 overflow-hidden border-b border-white/10 py-4" style={{ background: "rgba(99,102,241,0.05)" }}>
      <motion.div
        className="flex items-center gap-12 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="text-xs font-semibold tracking-[0.2em] text-slate-400 inline-flex items-center gap-3" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
            <span className="w-1 h-1 rounded-full" style={{ background: "#6366f1" }} />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ── Nexcorp logo — geometric grid glyph ────────────────────────────────────
function NexcorpLogo() {
  return (
    <svg viewBox="0 0 64 64" className="w-9 h-9" aria-hidden="true">
      <defs>
        <linearGradient id="nx-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#4f46e5" />
        </linearGradient>
      </defs>
      <rect x="8" y="8" width="20" height="20" rx="3" fill="url(#nx-grad)" />
      <rect x="36" y="8" width="20" height="20" rx="3" fill="url(#nx-grad)" opacity="0.6" />
      <rect x="8" y="36" width="20" height="20" rx="3" fill="url(#nx-grad)" opacity="0.6" />
      <rect x="36" y="36" width="20" height="20" rx="3" fill="url(#nx-grad)" />
      <rect x="26" y="26" width="12" height="12" rx="2" fill="#fff" />
    </svg>
  );
}
