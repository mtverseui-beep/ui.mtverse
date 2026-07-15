"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight, Mail, MapPin, Phone, Twitter, Linkedin, Github, MessageCircle, Zap, ShieldCheck, Headphones } from "lucide-react";

// ════════════════════════════════════════════════════════════════════════════
// Footer 023 — Cascader (Multi-level mega)
// Light + expandable accordion categories + newsletter + sticky CTA
// ════════════════════════════════════════════════════════════════════════════

const SECTIONS: {
  title: string;
  subcategories: { name: string; links: string[] }[];
}[] = [
  {
    title: "Platform",
    subcategories: [
      { name: "Build", links: ["Workflows", "Triggers", "Actions", "Webhooks", "API Keys"] },
      { name: "Connect", links: ["Integrations", "Connectors", "Custom SDK", "OAuth"] },
      { name: "Deploy", links: ["Environments", "Versioning", "Rollbacks", "CI/CD"] },
    ],
  },
  {
    title: "Solutions",
    subcategories: [
      { name: "By Industry", links: ["Fintech", "Healthcare", "E-commerce", "SaaS", "Education"] },
      { name: "By Use Case", links: ["Automation", "Data Sync", "Notifications", "Reporting"] },
      { name: "By Role", links: ["Engineering", "Operations", "Marketing", "Product"] },
    ],
  },
  {
    title: "Resources",
    subcategories: [
      { name: "Learn", links: ["Documentation", "Tutorials", "Blog", "Newsletter"] },
      { name: "Community", links: ["Forum", "Discord", "Events", "Showcase"] },
      { name: "Support", links: ["Help Center", "Status", "Contact Support", "Feature Requests"] },
    ],
  },
  {
    title: "Company",
    subcategories: [
      { name: "About", links: ["Our Story", "Team", "Investors", "Press Kit"] },
      { name: "Careers", links: ["Open Roles", "Culture", "Benefits", "Internships"] },
      { name: "Legal", links: ["Privacy", "Terms", "Security", "Compliance"] },
    ],
  },
];

export function Footer023Card() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: "#fbfbfd",
        color: "#0a0a0a",
        fontFamily: "var(--font-manrope), system-ui, sans-serif",
      }}
    >
      {/* Subtle pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.4]"
        style={{
          backgroundImage: "radial-gradient(rgba(99,102,241,0.05) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Top: brand + newsletter + features */}
        <div className="py-14 grid grid-cols-1 lg:grid-cols-12 gap-10 border-b" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
          <div className="lg:col-span-5">
            <a href="#" onClick={(e) => e.preventDefault()} className="inline-flex items-center gap-2 mb-5">
              <CascaderLogo />
              <span className="text-2xl font-bold tracking-tight">Cascader</span>
            </a>
            <p className="text-base text-black/60 mb-6 max-w-md leading-relaxed">
              The workflow automation platform for ambitious teams. Connect anything. Automate everything. No code required.
            </p>
            {/* Feature pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {[
                { icon: Zap, label: "No-code builder" },
                { icon: ShieldCheck, label: "SOC 2 Type II" },
                { icon: Headphones, label: "24/7 support" },
              ].map((f) => (
                <span key={f.label} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs" style={{ background: "rgba(99,102,241,0.08)", color: "#4f46e5" }}>
                  <f.icon className="w-3 h-3" /> {f.label}
                </span>
              ))}
            </div>
            {/* Contact info */}
            <div className="space-y-1.5 text-sm text-black/60">
              <p className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-indigo-600" /> 548 Market St, San Francisco</p>
              <p className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-indigo-600" /> <a href="mailto:hello@cascader.io" className="hover:text-indigo-700 transition-colors">hello@cascader.io</a></p>
              <p className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-indigo-600" /> +1 (415) 555-0192</p>
            </div>
          </div>

          {/* Newsletter signup */}
          <div className="lg:col-span-7 lg:pl-10 lg:border-l" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
            <h3 className="text-2xl font-bold tracking-tight mb-2" style={{ letterSpacing: "-0.02em" }}>
              Get the weekly automation brief
            </h3>
            <p className="text-sm text-black/60 mb-5">
              Join 24,000+ builders. Real workflows, real outcomes. Every Wednesday. 5-minute read.
            </p>
            <NewsletterForm />

            {/* Stats */}
            <div className="mt-8 grid grid-cols-3 gap-4 max-w-md">
              {[
                { label: "Workflows run", value: "2.4B" },
                { label: "Teams", value: "18K" },
                { label: "Integrations", value: "340+" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-bold" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>{s.value}</p>
                  <p className="text-[10px] uppercase tracking-wider text-black/50">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Accordion mega grid */}
        <div className="py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {SECTIONS.map((section, si) => (
              <AccordionSection key={section.title} section={section} defaultOpen={true} />
            ))}
          </div>
        </div>

        {/* CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="my-6 p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          style={{ background: "linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)", color: "#fff" }}
        >
          <div>
            <p className="text-xl md:text-2xl font-bold tracking-tight" style={{ letterSpacing: "-0.02em" }}>
              Ready to automate your first workflow?
            </p>
            <p className="text-sm text-white/80 mt-1">Free 14-day trial. No credit card. Cancel anytime.</p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="group inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-semibold text-sm transition-all hover:scale-105 whitespace-nowrap"
              style={{ background: "#fff", color: "#4f46e5" }}
            >
              Start free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-semibold text-sm transition-all hover:bg-white/10"
              style={{ border: "1px solid rgba(255,255,255,0.3)" }}
            >
              Talk to sales
            </a>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div className="py-7 border-t flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
          <p className="text-xs text-black/50" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
            © {new Date().getFullYear()} Cascader Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            {[
              { icon: Twitter, label: "Twitter", color: "#1d9bf0" },
              { icon: Linkedin, label: "LinkedIn", color: "#0a66c2" },
              { icon: Github, label: "GitHub", color: "#0a0a0a" },
              { icon: MessageCircle, label: "Discord", color: "#5865f2" },
            ].map((s) => (
              <a
                key={s.label}
                href="#"
                onClick={(e) => e.preventDefault()}
                aria-label={s.label}
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                style={{ background: "rgba(0,0,0,0.04)", color: "rgba(0,0,0,0.6)" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = s.color; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(0,0,0,0.04)"; e.currentTarget.style.color = "rgba(0,0,0,0.6)"; }}
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

// ── Accordion section (mobile expandable, desktop always-open) ─────────────
function AccordionSection({ section, defaultOpen = false }: { section: { title: string; subcategories: { name: string; links: string[] }[] }; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border rounded-xl overflow-hidden" style={{ borderColor: "rgba(0,0,0,0.08)", background: "#fff" }}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 text-left transition-colors hover:bg-black/[0.02] md:cursor-default"
      >
        <span className="text-sm font-bold uppercase tracking-[0.18em]" style={{ fontFamily: "var(--font-jetbrains), monospace", color: "#4f46e5" }}>
          {section.title}
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform md:hidden ${open ? "rotate-180" : ""}`} style={{ color: "#4f46e5" }} />
      </button>
      {/* Always render content; use CSS to control visibility on mobile */}
      <div className={`${open ? "block" : "hidden"} md:block`}>
        <div className="px-4 pb-4 space-y-4">
          {section.subcategories.map((sub) => (
            <div key={sub.name}>
              <p className="text-[10px] uppercase tracking-[0.2em] text-black/40 mb-2" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
                {sub.name}
              </p>
              <ul className="space-y-1.5">
                {sub.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="group inline-flex items-center gap-1.5 text-sm text-black/70 hover:text-indigo-600 transition-colors"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-indigo-600 transition-all duration-300 mr-0 group-hover:mr-1" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Newsletter form ────────────────────────────────────────────────────────
function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 1000));
    setStatus("success");
    setTimeout(() => { setStatus("idle"); setEmail(""); }, 3500);
  };

  return (
    <form onSubmit={submit} className="flex flex-col sm:flex-row gap-2 max-w-md">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        disabled={status !== "idle"}
        className="flex-1 h-11 px-4 text-sm bg-white border rounded-lg outline-none transition-colors focus:border-indigo-600 disabled:opacity-50"
        style={{ borderColor: "rgba(0,0,0,0.15)" }}
      />
      <button
        type="submit"
        disabled={status !== "idle"}
        className="h-11 px-5 rounded-lg font-semibold text-sm transition-all hover:scale-105 disabled:opacity-70 inline-flex items-center justify-center gap-1.5 whitespace-nowrap"
        style={{ background: "#4f46e5", color: "#fff" }}
      >
        {status === "loading" ? "Subscribing..." : status === "success" ? "Subscribed!" : <>Subscribe <ArrowRight className="w-4 h-4" /></>}
      </button>
    </form>
  );
}

// ── Cascader logo — connected nodes glyph ──────────────────────────────────
function CascaderLogo() {
  return (
    <svg viewBox="0 0 64 64" className="w-9 h-9" aria-hidden="true">
      <defs>
        <linearGradient id="cc-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#4f46e5" />
        </linearGradient>
      </defs>
      <circle cx="14" cy="14" r="6" fill="url(#cc-grad)" />
      <circle cx="50" cy="14" r="6" fill="url(#cc-grad)" opacity="0.7" />
      <circle cx="14" cy="50" r="6" fill="url(#cc-grad)" opacity="0.7" />
      <circle cx="50" cy="50" r="6" fill="url(#cc-grad)" />
      <circle cx="32" cy="32" r="8" fill="url(#cc-grad)" />
      <line x1="14" y1="14" x2="32" y2="32" stroke="url(#cc-grad)" strokeWidth="2" />
      <line x1="50" y1="14" x2="32" y2="32" stroke="url(#cc-grad)" strokeWidth="2" />
      <line x1="14" y1="50" x2="32" y2="32" stroke="url(#cc-grad)" strokeWidth="2" />
      <line x1="50" y1="50" x2="32" y2="32" stroke="url(#cc-grad)" strokeWidth="2" />
    </svg>
  );
}
