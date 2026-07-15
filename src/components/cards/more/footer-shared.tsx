"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Twitter, Linkedin, Youtube, Instagram, Facebook, Dribbble, Twitch, Check, Loader2, AlertCircle, ArrowRight } from "lucide-react";
import { useDismissable } from "./navbar-shared";

// ════════════════════════════════════════════════════════════════════════════
// footer-shared.tsx — Shared footer components
// ════════════════════════════════════════════════════════════════════════════

const SOCIAL_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  github: Github, twitter: Twitter, linkedin: Linkedin, youtube: Youtube,
  instagram: Instagram, facebook: Facebook, dribbble: Dribbble, twitch: Twitch,
};

interface SocialLinksProps { dark?: boolean; accent?: string; platforms?: string[]; }

export function SocialLinks({ dark = false, accent = "#3b82f6", platforms = ["twitter", "github", "linkedin", "youtube"] }: SocialLinksProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  const color = dark ? "#94a3b8" : "#64748b";
  const hoverColor = dark ? "#ffffff" : "#0f172a";
  const hoverBg = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)";
  return (
    <div className="flex items-center gap-2">
      {platforms.map((platform) => {
        const Icon = SOCIAL_ICONS[platform];
        if (!Icon) return null;
        return (
          <a key={platform} href="#" onClick={(e) => e.preventDefault()} onMouseEnter={() => setHovered(platform)} onMouseLeave={() => setHovered(null)} className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200" style={{ color: hovered === platform ? hoverColor : color, background: hovered === platform ? hoverBg : "transparent" }} aria-label={platform}>
            <Icon className="w-4 h-4" />
          </a>
        );
      })}
    </div>
  );
}

interface NewsletterFormProps { dark?: boolean; accent?: string; placeholder?: string; buttonLabel?: string; compact?: boolean; }

export function NewsletterForm({ dark = false, accent = "#3b82f6", placeholder = "Enter your email", buttonLabel = "Subscribe", compact = false }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }, []);

  const validate = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) { setError("Email is required"); setStatus("error"); return; }
    if (!validate(email)) { setError("Please enter a valid email"); setStatus("error"); return; }
    setError(""); setStatus("loading");
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("success"); setEmail("");
    timeoutRef.current = setTimeout(() => setStatus("idle"), 3000);
  };

  const bg = dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)";
  const border = dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
  const text = dark ? "#f1f5f9" : "#0f172a";
  const subText = dark ? "#94a3b8" : "#64748b";

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-center gap-2" style={{ flexDirection: compact ? "row" : "column" }}>
          <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); if (status === "error") setStatus("idle"); }} placeholder={placeholder} disabled={status === "loading" || status === "success"} className="flex-1 h-11 px-4 rounded-lg border bg-transparent text-sm outline-none transition-colors disabled:opacity-50" style={{ borderColor: status === "error" ? "#ef4444" : border, color: text }} aria-label="Email address" aria-invalid={status === "error"} />
          <button type="submit" disabled={status === "loading" || status === "success"} className="inline-flex items-center justify-center gap-1.5 h-11 px-5 rounded-lg text-sm font-medium text-white transition-all disabled:opacity-70 whitespace-nowrap" style={{ background: accent }}>
            {status === "loading" ? <><Loader2 className="w-4 h-4 animate-spin" /> Subscribing...</> : status === "success" ? <><Check className="w-4 h-4" /> Subscribed!</> : <>{buttonLabel} <ArrowRight className="w-3.5 h-3.5" /></>}
          </button>
        </div>
      </form>
      <AnimatePresence>
        {status === "error" && error && (<motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="mt-1.5 text-xs text-red-400 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {error}</motion.p>)}
        {status === "success" && (<motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="mt-1.5 text-xs flex items-center gap-1" style={{ color: "#10b981" }}><Check className="w-3 h-3" /> Thanks for subscribing! Check your inbox.</motion.p>)}
      </AnimatePresence>
    </div>
  );
}

export function StatusIndicator({ dark = false, label = "All systems operational" }: { dark?: boolean; label?: string }) {
  return (
    <a href="#" onClick={(e) => e.preventDefault()} className="inline-flex items-center gap-2">
      <span className="relative flex w-2 h-2"><span className="absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-75 animate-ping" /><span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-500" /></span>
      <span className="text-xs font-medium" style={{ color: dark ? "#94a3b8" : "#64748b" }}>{label}</span>
    </a>
  );
}

interface SelectorProps { dark?: boolean; options: string[]; defaultOption?: string; label?: string; }

export function Selector({ dark = false, options, defaultOption, label }: SelectorProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(defaultOption || options[0]);
  const ref = useRef<HTMLDivElement>(null);
  useDismissable(open, () => setOpen(false), ref);

  const bg = dark ? "#1e293b" : "#ffffff";
  const border = dark ? "#334155" : "#e2e8f0";
  const text = dark ? "#e2e8f0" : "#334155";
  const hoverBg = dark ? "#334155" : "#f8fafc";

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen((v) => !v)} className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg border text-xs font-medium transition-colors" style={{ borderColor: border, color: text, background: bg }} aria-label={label} aria-expanded={open}>
        {label && <span className="opacity-50">{label}:</span>}{selected}
        <svg className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} viewBox="0 0 12 12" fill="none"><path d="M3 5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.15 }} className="absolute top-full mt-1 left-0 w-32 rounded-lg border shadow-lg py-1 z-10" style={{ background: bg, borderColor: border }}>
            {options.map((opt) => (<button key={opt} onClick={() => { setSelected(opt); setOpen(false); }} className="w-full text-left px-3 py-1.5 text-xs transition-colors" style={{ color: text, background: opt === selected ? hoverBg : "transparent" }} onMouseEnter={(e) => { if (opt !== selected) e.currentTarget.style.background = hoverBg; }} onMouseLeave={(e) => { if (opt !== selected) e.currentTarget.style.background = "transparent"; }}>{opt}</button>))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function AppStoreBadges({ dark = false }: { dark?: boolean }) {
  const bg = dark ? "#000000" : "#0f172a";
  return (
    <div className="flex flex-wrap gap-3">
      <a href="#" onClick={(e) => e.preventDefault()} className="inline-flex items-center gap-2.5 h-11 px-4 rounded-xl transition-opacity hover:opacity-80" style={{ background: bg }}>
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="white"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" /></svg>
        <div className="text-left"><p className="text-[9px] text-white/60 leading-none">Download on the</p><p className="text-sm text-white font-semibold leading-tight">App Store</p></div>
      </a>
      <a href="#" onClick={(e) => e.preventDefault()} className="inline-flex items-center gap-2.5 h-11 px-4 rounded-xl transition-opacity hover:opacity-80" style={{ background: bg }}>
        <svg viewBox="0 0 24 24" className="w-6 h-6"><path fill="#34A853" d="M16.61 15.15l-2.79-1.62L12 15.25l2.39 1.39z" /><path fill="#FBBC04" d="M3.61 21.39c.27.15.6.13.86-.05l8.53-5.09-2.23-2.23z" /><path fill="#EA4335" d="M3 12l8 4-2.23-2.23L3.61 8.61c-.37.22-.61.62-.61 1.07v4.64c0 .45.24.85.61 1.07z" /><path fill="#4285F4" d="M21 12.93c0-.45-.24-.85-.61-1.07l-8.39-5.07L12 8.93l7.61 4.46c.37.22.61.62.61 1.07z" /></svg>
        <div className="text-left"><p className="text-[9px] text-white/60 leading-none">GET IT ON</p><p className="text-sm text-white font-semibold leading-tight">Google Play</p></div>
      </a>
    </div>
  );
}

export function FooterLink({ label, href = "#", dark = false, accent }: { label: string; href?: string; dark?: boolean; accent?: string }) {
  const [hovered, setHovered] = useState(false);
  const color = dark ? "#94a3b8" : "#64748b";
  const hoverColor = dark ? "#ffffff" : "#0f172a";
  return (
    <a href={href} onClick={(e) => e.preventDefault()} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className="inline-flex items-center gap-1 text-sm transition-colors" style={{ color: hovered ? hoverColor : color }}>
      {label}
      <span className="w-0 overflow-hidden transition-all duration-300" style={{ width: hovered ? "12px" : "0px" }}><ArrowRight className="w-3 h-3" style={{ color: accent || hoverColor }} /></span>
    </a>
  );
}
