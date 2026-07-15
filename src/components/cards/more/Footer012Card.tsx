"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Edit, History, Search, Book, Github, FileText, Terminal, ChevronRight, ArrowUpRight, MessageCircle, GitBranch } from "lucide-react";

// ════════════════════════════════════════════════════════════════════════════
// Footer 012 — Docflow (Documentation)
// Light gray + sidebar-style nav + edit-on-github + version pill + search
// ════════════════════════════════════════════════════════════════════════════

const SECTIONS: { title: string; icon: React.ComponentType<{ className?: string }>; pages: { name: string; meta?: string }[] }[] = [
  {
    title: "Getting Started",
    icon: Book,
    pages: [
      { name: "Introduction", meta: "5 min" },
      { name: "Installation", meta: "10 min" },
      { name: "Quickstart", meta: "15 min" },
      { name: "Conceptual Guide", meta: "20 min" },
    ],
  },
  {
    title: "Guides",
    icon: FileText,
    pages: [
      { name: "Authentication" },
      { name: "Database & Queries" },
      { name: "Realtime Subscriptions" },
      { name: "File Storage" },
      { name: "Edge Functions" },
    ],
  },
  {
    title: "Reference",
    icon: Terminal,
    pages: [
      { name: "CLI Commands", meta: "v3.2" },
      { name: "API Endpoints", meta: "REST" },
      { name: "TypeScript SDK", meta: "v4.1" },
      { name: "Python SDK", meta: "v2.0" },
      { name: "Webhooks" },
    ],
  },
];

export function Footer012Card() {
  return (
    <footer
      className="relative"
      style={{
        background: "#f8fafc",
        color: "#0f172a",
        fontFamily: "var(--font-inter-tight), system-ui, sans-serif",
      }}
    >
      {/* Dotted grid bg */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.4]"
        style={{
          backgroundImage: "radial-gradient(rgba(15,23,42,0.08) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Search band */}
        <div className="py-8 flex items-center justify-between gap-4 border-b" style={{ borderColor: "rgba(15,23,42,0.08)" }}>
          <form onSubmit={(e) => e.preventDefault()} className="relative flex-1 max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="search"
              placeholder="Search documentation..."
              className="w-full h-11 pl-10 pr-20 text-sm rounded-lg border bg-white outline-none transition-colors focus:border-emerald-600"
              style={{ borderColor: "rgba(15,23,42,0.12)" }}
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[10px] rounded border" style={{ background: "#f1f5f9", borderColor: "rgba(15,23,42,0.1)", fontFamily: "var(--font-jetbrains), monospace", color: "#64748b" }}>
              ⌘ K
            </kbd>
          </form>
          <div className="hidden md:flex items-center gap-2">
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="inline-flex items-center gap-2 px-4 h-11 rounded-lg text-sm font-medium transition-all hover:scale-105"
              style={{ background: "#0f172a", color: "#fff" }}
            >
              <Github className="w-4 h-4" /> Edit on GitHub
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Main grid: sidebar-style */}
        <div className="py-14 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Brand / docs home */}
          <div className="lg:col-span-3">
            <a href="#" onClick={(e) => e.preventDefault()} className="inline-flex items-center gap-2 mb-5">
              <DocflowLogo />
              <span className="text-xl font-bold tracking-tight">Docflow</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded text-emerald-700" style={{ background: "#d1fae5", fontFamily: "var(--font-jetbrains), monospace" }}>v3.2</span>
            </a>
            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              The open-source documentation platform. Build beautiful, searchable docs in minutes — Markdown, MDX, and React components.
            </p>
            {/* Edit / History CTAs */}
            <div className="space-y-2">
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="group flex items-center justify-between p-2.5 rounded-md transition-colors text-sm"
                style={{ background: "rgba(15,23,42,0.03)" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(15,23,42,0.06)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(15,23,42,0.03)"; }}
              >
                <span className="inline-flex items-center gap-2"><Edit className="w-3.5 h-3.5 text-slate-500" /> Edit this page</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="group flex items-center justify-between p-2.5 rounded-md transition-colors text-sm"
                style={{ background: "rgba(15,23,42,0.03)" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(15,23,42,0.06)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(15,23,42,0.03)"; }}
              >
                <span className="inline-flex items-center gap-2"><History className="w-3.5 h-3.5 text-slate-500" /> View page history</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="group flex items-center justify-between p-2.5 rounded-md transition-colors text-sm"
                style={{ background: "rgba(15,23,42,0.03)" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(15,23,42,0.06)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(15,23,42,0.03)"; }}
              >
                <span className="inline-flex items-center gap-2"><GitBranch className="w-3.5 h-3.5 text-slate-500" /> Source on GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>

          {/* Section columns (sidebar-style) */}
          {SECTIONS.map((section, si) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: si * 0.08 }}
              className="lg:col-span-3"
            >
              <h4 className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500 mb-4" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
                <section.icon className="w-3.5 h-3.5" /> {section.title}
              </h4>
              <ul className="space-y-1">
                {section.pages.map((p) => (
                  <li key={p.name}>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="group flex items-center justify-between px-2 py-1.5 rounded-md text-sm text-slate-700 hover:text-slate-900 transition-colors"
                      onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(15,23,42,0.04)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                    >
                      <span className="inline-flex items-center gap-1.5">
                        <ChevronRight className="w-3 h-3 text-slate-300 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                        {p.name}
                      </span>
                      {p.meta && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded" style={{ background: "rgba(15,23,42,0.06)", color: "#64748b", fontFamily: "var(--font-jetbrains), monospace" }}>{p.meta}</span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Community band */}
        <div className="py-10 border-t grid grid-cols-1 md:grid-cols-3 gap-4" style={{ borderColor: "rgba(15,23,42,0.08)" }}>
          {[
            { icon: MessageCircle, title: "Discord Community", sub: "4,200 members · Get help from the team", accent: "#5865f2" },
            { icon: Github, title: "GitHub Discussions", sub: "Feature requests & roadmap", accent: "#0f172a" },
            { icon: Book, title: "Blog & Tutorials", sub: "Latest from the engineering team", accent: "#059669" },
          ].map((c, i) => (
            <motion.a
              key={c.title}
              href="#"
              onClick={(e) => e.preventDefault()}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group p-4 rounded-lg flex items-start gap-3 transition-all hover:-translate-y-0.5"
              style={{ background: "#fff", border: "1px solid rgba(15,23,42,0.08)" }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 4px 12px -2px rgba(15,23,42,0.08)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; }}
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${c.accent}15`, color: c.accent }}>
                <c.icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold inline-flex items-center gap-1">
                  {c.title}
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </p>
                <p className="text-xs text-slate-500">{c.sub}</p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderColor: "rgba(15,23,42,0.08)" }}>
          <p className="text-xs text-slate-500" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
            © {new Date().getFullYear()} Docflow. MIT Licensed. Built with Docflow.
          </p>
          <div className="flex items-center gap-3 text-xs">
            <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded" style={{ background: "#d1fae5", color: "#065f46", fontFamily: "var(--font-jetbrains), monospace" }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#10b981" }} /> Docs up-to-date
            </span>
            <span className="text-slate-400" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>Last updated: 2 hrs ago</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── Docflow logo — book stack glyph ────────────────────────────────────────
function DocflowLogo() {
  return (
    <svg viewBox="0 0 32 32" className="w-7 h-7" aria-hidden="true">
      <defs>
        <linearGradient id="df-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>
      <rect x="4" y="6" width="24" height="6" rx="1.5" fill="url(#df-grad)" />
      <rect x="4" y="14" width="24" height="6" rx="1.5" fill="url(#df-grad)" opacity="0.7" />
      <rect x="4" y="22" width="24" height="6" rx="1.5" fill="url(#df-grad)" opacity="0.5" />
    </svg>
  );
}
