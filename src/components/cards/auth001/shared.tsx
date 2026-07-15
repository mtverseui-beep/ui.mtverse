"use client";

import { useRef, useState } from "react";
import { Eye, EyeOff, Github } from "lucide-react";

// ════════════════════════════════════════════════════════════════════════════
// auth001 — "Meridian" · shared kit (monochrome technical split-panel)
// ════════════════════════════════════════════════════════════════════════════
// Theme-aware (foreground/background). Left = form; right = brand panel with an
// animated vertical light-beam + orbiting dots + stat tiles. Sharp corners,
// mono uppercase labels. Shared across all six screens so the set is cohesive.

export const BRAND = { name: "Meridian", tagline: "Navigate your data with precision." };

function Keyframes() {
  return (
    <style>{`
      @keyframes meridian-fade-up { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
      @keyframes meridian-beam { 0%,100% { opacity:0.15; transform:scaleY(0.8); } 50% { opacity:0.5; transform:scaleY(1.1); } }
      @keyframes meridian-dot { 0%,100% { opacity:0.2; } 50% { opacity:0.8; } }
      @keyframes meridian-icon { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-3px); } }
      .m-fade-up { animation: meridian-fade-up 0.6s cubic-bezier(0.16,1,0.3,1) forwards; opacity:0; }
      .m-beam { animation: meridian-beam 3s ease-in-out infinite; }
      .m-dot { animation: meridian-dot 2s ease-in-out infinite; }
      .m-icon { animation: meridian-icon 2.5s ease-in-out infinite; }
    `}</style>
  );
}

function BrandLogo() {
  return (
    <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="currentColor" />
      <circle cx="16" cy="16" r="10" fill="none" stroke="var(--background)" strokeWidth="1.5" opacity="0.4" />
      <line x1="16" y1="4" x2="16" y2="28" stroke="var(--background)" strokeWidth="1.5" />
      <circle cx="16" cy="16" r="2.5" fill="var(--background)" />
    </svg>
  );
}

function MeridianVisual() {
  return (
    <div className="relative h-80 w-80">
      <div className="m-beam absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-foreground" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="m-dot absolute left-1/2 top-1/2 h-2 w-2 rounded-full bg-foreground"
          style={{ transform: `rotate(${i * 60}deg) translateY(-100px)`, animationDelay: `${i * 0.3}s` }}
        />
      ))}
      <div className="m-dot absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground" />
    </div>
  );
}

export function AuthShell({
  title,
  description,
  children,
  footer,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full bg-background text-foreground">
      <Keyframes />
      {/* Form */}
      <div className="flex flex-1 items-center justify-center px-6 py-12 lg:px-12">
        <div className="w-full max-w-sm">
          <div className="m-fade-up mb-8 flex items-center gap-2">
            <BrandLogo />
            <span className="text-xl font-bold tracking-tight">{BRAND.name}</span>
          </div>
          <h1 className="m-fade-up mb-3 text-3xl font-bold tracking-tight lg:text-4xl" style={{ animationDelay: "0.05s" }}>
            {title}
          </h1>
          <p className="m-fade-up mb-8 leading-relaxed text-muted-foreground" style={{ animationDelay: "0.1s" }}>
            {description}
          </p>
          {children}
          {footer && (
            <div className="m-fade-up mt-8 text-sm text-muted-foreground" style={{ animationDelay: "0.6s" }}>
              {footer}
            </div>
          )}
        </div>
      </div>
      {/* Brand panel */}
      <div className="relative hidden overflow-hidden border-l border-foreground/10 bg-foreground/[0.02] lg:block">
        <div className="relative flex h-full flex-col justify-between p-12">
          <div className="max-w-md space-y-4">
            <span className="inline-flex items-center gap-3 font-mono text-sm text-muted-foreground">
              <span className="h-px w-8 bg-foreground/30" />
              {BRAND.name}
            </span>
            <p className="text-3xl font-bold leading-tight tracking-tight">{BRAND.tagline}</p>
          </div>
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <MeridianVisual />
          </div>
          <div className="relative z-10 grid max-w-md grid-cols-3 gap-4">
            {[{ v: "99.9%", l: "Uptime" }, { v: "12ms", l: "Latency" }, { v: "24/7", l: "Monitor" }].map((s) => (
              <div key={s.l} className="border border-foreground/10 bg-background/80 p-4 backdrop-blur-sm">
                <div className="text-3xl font-bold">{s.v}</div>
                <div className="mt-1 text-xs text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const INPUT = "w-full border border-foreground/15 bg-transparent px-3 py-2.5 text-sm transition-colors focus:border-foreground/40 focus:outline-none";
const LABEL = "mb-2 block font-mono text-xs uppercase tracking-widest text-muted-foreground";

export function MField({
  label,
  type = "text",
  placeholder,
  autoComplete,
  delay = 0.1,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  delay?: number;
}) {
  return (
    <div className="m-fade-up" style={{ animationDelay: `${delay}s` }}>
      <label className={LABEL}>{label}</label>
      <input type={type} placeholder={placeholder} autoComplete={autoComplete} className={INPUT} />
    </div>
  );
}

export function MPassword({
  label = "Password",
  placeholder = "Enter your password",
  autoComplete,
  hint,
  delay = 0.2,
}: {
  label?: string;
  placeholder?: string;
  autoComplete?: string;
  hint?: React.ReactNode;
  delay?: number;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="m-fade-up" style={{ animationDelay: `${delay}s` }}>
      <div className="mb-2 flex items-center justify-between">
        <label className={LABEL + " mb-0"}>{label}</label>
        {hint}
      </div>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={INPUT + " pr-10"}
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}

export function MButton({ children, delay = 0.3 }: { children: React.ReactNode; delay?: number }) {
  return (
    <button
      type="button"
      className="m-fade-up flex h-11 w-full items-center justify-center gap-2 bg-foreground text-sm font-medium text-background transition-colors hover:bg-foreground/90"
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </button>
  );
}

export function MDivider({ delay = 0.4, text = "or" }: { delay?: number; text?: string }) {
  return (
    <div className="m-fade-up relative my-6" style={{ animationDelay: `${delay}s` }}>
      <div className="absolute inset-0 flex items-center">
        <span className="h-px w-full bg-foreground/10" />
      </div>
      <div className="relative flex justify-center">
        <span className="bg-background px-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">{text}</span>
      </div>
    </div>
  );
}

export function MSocial({ delay = 0.5 }: { delay?: number }) {
  return (
    <div className="m-fade-up grid grid-cols-2 gap-3" style={{ animationDelay: `${delay}s` }}>
      <button type="button" className="flex h-11 items-center justify-center gap-2 border border-foreground/15 text-sm transition-colors hover:border-foreground/40 hover:bg-foreground/5">
        <Github className="m-icon h-4 w-4" />
        GitHub
      </button>
      <button type="button" className="flex h-11 items-center justify-center gap-2 border border-foreground/15 text-sm transition-colors hover:border-foreground/40 hover:bg-foreground/5">
        <svg className="m-icon h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
        </svg>
        Google
      </button>
    </div>
  );
}

export function MOtp({ length = 6, delay = 0.15 }: { length?: number; delay?: number }) {
  const [vals, setVals] = useState<string[]>(Array(length).fill(""));
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const setAt = (i: number, v: string) => {
    if (!/^\d?$/.test(v)) return;
    const next = [...vals];
    next[i] = v;
    setVals(next);
    if (v && i < length - 1) refs.current[i + 1]?.focus();
  };
  return (
    <div className="m-fade-up flex justify-between gap-2" style={{ animationDelay: `${delay}s` }}>
      {vals.map((v, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          value={v}
          inputMode="numeric"
          maxLength={1}
          onChange={(e) => setAt(i, e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Backspace" && !vals[i] && i > 0) refs.current[i - 1]?.focus();
          }}
          className="h-14 w-full border border-foreground/15 bg-transparent text-center text-xl font-bold transition-colors focus:border-foreground/40 focus:outline-none"
        />
      ))}
    </div>
  );
}
