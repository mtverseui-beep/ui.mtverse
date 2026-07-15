"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Link2 } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

// SocialShareCard — 4 social share buttons, each with a COMPLETELY DIFFERENT
// modern animation on hover. Uses CSS group-hover for reliable cross-mode
// behavior + framer-motion for tap feedback.
// 1. Twitter/X — 3D flip (icon rotates out, brand icon rotates in)
// 2. LinkedIn — radial expand (circle scales to fill)
// 3. Facebook — slide-up swap (icon slides up, white icon slides in)
// 4. Reddit — elastic bounce + glow

export function SocialShareCard() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText("https://card-showcase.pro").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };

  return (
    <motion.div className="w-[clamp(280px,88vw,380px)] select-none" initial={{ opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.7, ease: EASE }}>
      <div aria-hidden className="pointer-events-none absolute -inset-8 -z-10 rounded-[40px] blur-3xl" style={{ background: "radial-gradient(circle at 30% 20%, rgba(37,99,235,0.08), transparent 55%)" }} />
      <div className="cs-surface overflow-hidden rounded-[22px] border cs-border shadow-[0_30px_70px_-35px_rgba(0,0,0,0.25)]">
        <div className="border-b cs-border px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/10 ring-1 ring-blue-500/20"><ShareIcon /></div>
            <div><h2 className="text-[14px] font-bold tracking-tight cs-text">Social Share</h2><p className="text-[10.5px] cs-muted">4 unique hover animations · copy link</p></div>
          </div>
        </div>
        <div className="space-y-7 p-5">
          <div className="grid grid-cols-4 gap-2.5">
            <TwitterButton />
            <LinkedInButton />
            <FacebookButton />
            <RedditButton />
          </div>

          {/* Copy link */}
          <motion.button type="button" onClick={handleCopy} whileTap={{ scale: 0.97 }} className="flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl py-2.5 text-[12.5px] font-semibold text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/40" style={{ background: copied ? "#059669" : "#2563eb" }}>
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.span key="copied" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="flex items-center gap-2"><Check className="h-4 w-4" strokeWidth={2.6} /> Link Copied!</motion.span>
              ) : (
                <motion.span key="copy" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="flex items-center gap-2"><Link2 className="h-4 w-4" strokeWidth={2.2} /> Copy Link</motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
        <div className="border-t cs-border px-5 py-2.5 text-center"><p className="text-[9.5px] cs-subtle">Hover each button — 4 different animations</p></div>
      </div>
    </motion.div>
  );
}

// ── 1. Twitter/X — 3D flip using CSS group-hover ──
function TwitterButton() {
  return (
    <motion.button type="button" aria-label="Share on Twitter" whileTap={{ scale: 0.92 }} className="group relative flex h-12 items-center justify-center overflow-hidden rounded-xl border cs-border cs-surface [perspective:400px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40">
      {/* Brand bg — rotates in on hover via CSS */}
      <div className="absolute inset-0 rounded-xl bg-black opacity-0 transition-all duration-300 [transform:rotateY(90deg)] group-hover:rotate-y-0 group-hover:opacity-100" style={{ transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)", transform: undefined }} />
      {/* Default icon — visible at rest */}
      <div className="absolute flex items-center justify-center transition-all duration-200 group-hover:[transform:rotateY(-90deg)] group-hover:opacity-0" style={{ transition: "all 0.2s cubic-bezier(0.16,1,0.3,1)" }}>
        <TwitterSvg className="h-4 w-4 text-slate-500 dark:text-slate-400" />
      </div>
      {/* White icon — visible on hover */}
      <div className="absolute flex items-center justify-center opacity-0 transition-all delay-50 duration-300 group-hover:opacity-100" style={{ transitionDelay: "50ms", transition: "opacity 0.3s ease" }}>
        <TwitterSvg className="h-4 w-4 text-white" />
      </div>
    </motion.button>
  );
}

// ── 2. LinkedIn — radial expand via CSS ──
function LinkedInButton() {
  return (
    <motion.button type="button" aria-label="Share on LinkedIn" whileTap={{ scale: 0.92 }} className="group relative flex h-12 items-center justify-center overflow-hidden rounded-xl border cs-border cs-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40">
      {/* Expanding circle → fills button */}
      <div className="absolute inset-0 scale-0 rounded-full bg-[#0a66c2] transition-all duration-300 ease-out group-hover:scale-100 group-hover:rounded-xl" />
      {/* Icon */}
      <div className="relative z-10 transition-colors duration-200 group-hover:text-white">
        <LinkedInSvg className="h-4 w-4 text-slate-500 transition-colors duration-200 group-hover:text-white dark:text-slate-400 dark:group-hover:text-white" />
      </div>
    </motion.button>
  );
}

// ── 3. Facebook — slide-up swap via CSS ──
function FacebookButton() {
  return (
    <motion.button type="button" aria-label="Share on Facebook" whileTap={{ scale: 0.92 }} className="group relative flex h-12 items-center justify-center overflow-hidden rounded-xl border cs-border cs-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40">
      {/* Background slides up */}
      <div className="absolute inset-0 translate-y-full bg-[#1877f2] transition-transform duration-300 ease-out group-hover:translate-y-0" />
      {/* Icon container — clips overflow */}
      <div className="relative flex h-4 w-4 flex-col items-center" style={{ overflow: "hidden" }}>
        {/* Default icon — slides up on hover */}
        <div className="absolute flex h-4 w-4 items-center justify-center transition-transform duration-300 ease-out group-hover:-translate-y-4">
          <FacebookSvg className="h-4 w-4 text-slate-500 dark:text-slate-400" />
        </div>
        {/* White icon — slides in from below */}
        <div className="absolute flex h-4 w-4 translate-y-4 items-center justify-center transition-transform duration-300 ease-out group-hover:translate-y-0">
          <FacebookSvg className="h-4 w-4 text-white" />
        </div>
      </div>
    </motion.button>
  );
}

// ── 4. Reddit — glow fill + icon scale via CSS ──
function RedditButton() {
  return (
    <motion.button type="button" aria-label="Share on Reddit" whileTap={{ scale: 0.92 }} className="group relative flex h-12 items-center justify-center overflow-hidden rounded-xl border cs-border cs-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40">
      {/* Glow fill */}
      <div className="absolute inset-0 scale-0 bg-[#ff4500] transition-transform duration-300 ease-out group-hover:scale-100" />
      {/* Icon with bounce */}
      <div className="relative z-10 transition-all duration-300 group-hover:scale-125 group-hover:-rotate-8" style={{ transitionTimingFunction: "cubic-bezier(0.34,1.56,0.64,1)" }}>
        <RedditSvg className="h-4 w-4 text-slate-500 transition-colors duration-200 group-hover:text-white dark:text-slate-400 dark:group-hover:text-white" />
      </div>
    </motion.button>
  );
}

// ── SVG Icons ──
function ShareIcon() {
  return <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" strokeWidth={2.2}><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" /></svg>;
}
function TwitterSvg({ className }: { className: string }) {
  return <svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>;
}
function LinkedInSvg({ className }: { className: string }) {
  return <svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" /></svg>;
}
function FacebookSvg({ className }: { className: string }) {
  return <svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z" /></svg>;
}
function RedditSvg({ className }: { className: string }) {
  return <svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M24 11.78c0-1.46-1.19-2.64-2.64-2.64-.71 0-1.35.28-1.83.74-1.81-1.23-4.28-2.02-7.02-2.11l1.2-3.75 3.24.76c.03.99.84 1.78 1.84 1.78a1.85 1.85 0 001.85-1.85A1.85 1.85 0 0018.79 2.9c-.72 0-1.35.41-1.66 1.01l-3.61-.85a.5.5 0 00-.59.34l-1.34 4.2c-2.79.07-5.3.87-7.14 2.12-.48-.46-1.12-.74-1.83-.74C1.19 9.14 0 10.32 0 11.78c0 1.07.64 1.99 1.55 2.4a4.5 4.5 0 00-.06.74c0 3.77 4.39 6.83 9.81 6.83s9.81-3.06 9.81-6.83a4.5 4.5 0 00-.06-.74c.91-.41 1.55-1.33 1.55-2.4z" /></svg>;
}
