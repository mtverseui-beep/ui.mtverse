"use client";

import { motion } from "framer-motion";
import { Check, ChevronDown, X } from "lucide-react";
import { type KeyboardEvent, type ReactNode, useEffect, useRef, useState } from "react";

export const EASE = [0.16, 1, 0.3, 1] as const;
export const SPRING = { type: "spring" as const, stiffness: 380, damping: 32 };
export const SPRING_SOFT = { type: "spring" as const, stiffness: 300, damping: 28 };

export function DemoButton({ children, onClick, color = "#6366f1", variant = "solid", className = "" }: {
  children: ReactNode; onClick: () => void; color?: string; variant?: "solid" | "outline" | "ghost"; className?: string;
}) {
  const base = `inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-[12.5px] font-semibold transition-all active:scale-[0.97] ${className}`;
  const styles = variant === "solid"
    ? { background: color, color: "#fff", boxShadow: `0 8px 24px ${color}30` }
    : variant === "outline"
      ? { background: "var(--overlay-control)", color, border: `1.5px solid ${color}40` }
      : { background: "var(--overlay-control)", color: "var(--overlay-muted)", border: "1px solid var(--overlay-border)" };
  return <motion.button type="button" onClick={onClick} whileHover={{ y: -1 }} whileTap={{ scale: 0.97 }} className={base} style={styles}>{children}</motion.button>;
}

export function Backdrop({ onClick, opacity = 0.5 }: { onClick?: () => void; opacity?: number }) {
  return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} onClick={onClick} className="absolute inset-0 z-40" style={{ background: `rgba(2,6,23,${opacity})`, backdropFilter: "blur(10px)" }} />;
}

export function CloseButton({ onClick, color }: { onClick: () => void; color?: string }) {
  return <button type="button" onClick={onClick} aria-label="Close" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition hover:bg-black/5 dark:hover:bg-white/10" style={{ color: color ?? "var(--overlay-muted)" }}><X className="h-4 w-4" strokeWidth={2.2} /></button>;
}

export function OverlayStage({ children, gradient = "radial-gradient(circle at 15% 25%, rgba(99,102,241,.18), transparent 45%), radial-gradient(circle at 85% 15%, rgba(34,211,238,.14), transparent 45%), radial-gradient(circle at 50% 85%, rgba(236,72,153,.10), transparent 45%)" }: { children: ReactNode; gradient?: string; bg?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const stage = ref.current;
    if (!stage || stage.dataset.autoOpened) return;
    stage.dataset.autoOpened = "true";
    const frame = requestAnimationFrame(() => stage.querySelector<HTMLButtonElement>("[data-overlay-trigger] button")?.click());
    return () => cancelAnimationFrame(frame);
  }, []);
  return <div ref={ref} data-overlay-stage className="overlay-demo relative h-full min-h-full w-full rounded-2xl" style={{ background: "var(--overlay-stage)", backgroundImage: gradient }}>{children}</div>;
}

export function TriggerCenter({ children }: { children: ReactNode }) {
  return <div data-overlay-trigger className="absolute inset-0 flex items-center justify-center p-4">{children}</div>;
}

export function ModalOverlay({ children, onClose, size = "default" }: { children: ReactNode; onClose: () => void; size?: "default" | "wide" }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  useEffect(() => {
    previousFocus.current = document.activeElement as HTMLElement | null;
    const frame = requestAnimationFrame(() => contentRef.current?.querySelector<HTMLElement>("button, input, textarea, [tabindex]:not([tabindex='-1'])")?.focus());
    return () => { cancelAnimationFrame(frame); previousFocus.current?.focus(); };
  }, []);
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") { event.stopPropagation(); onClose(); return; }
    if (event.key !== "Tab") return;
    const focusable = Array.from(contentRef.current?.querySelectorAll<HTMLElement>("button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])") ?? []);
    if (!focusable.length) return;
    const first = focusable[0]; const last = focusable.at(-1)!;
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  };
  return (
    <motion.div role="dialog" aria-modal="true" aria-label="Interactive component preview" onKeyDown={onKeyDown} className="absolute inset-x-0 top-0 z-50 flex min-h-full items-start justify-center p-3 sm:p-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
      <div className="absolute inset-0 bg-slate-950/55 backdrop-blur-md" onClick={onClose} />
      <div ref={contentRef} data-modal-content className={`relative z-10 my-auto w-full ${size === "wide" ? "max-w-3xl" : "max-w-md"}`} onClick={(event) => event.stopPropagation()}>{children}</div>
    </motion.div>
  );
}

export function PremiumSelect({ value, options, onChange, label = "Select option" }: { value: string; options: string[]; onChange: (value: string) => void; label?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-w-[112px] rounded-xl border" style={{ borderColor: "var(--overlay-border)", background: "var(--overlay-input)" }}>
      <button type="button" aria-haspopup="listbox" aria-expanded={open} aria-label={label} onClick={() => setOpen((current) => !current)} className="flex w-full items-center justify-between gap-2 px-3 py-2 text-[11.5px] font-semibold" style={{ color: "var(--overlay-text)" }}>
        {value}<ChevronDown className={`h-3.5 w-3.5 transition ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div role="listbox" aria-label={label} className="border-t p-1" style={{ borderColor: "var(--overlay-border)" }}>{options.map((option) => <button key={option} type="button" role="option" aria-selected={value === option} onClick={() => { onChange(option); setOpen(false); }} className="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left text-[11px] transition hover:bg-black/5 dark:hover:bg-white/10" style={{ color: "var(--overlay-text)" }}>{option}{value === option && <Check className="h-3 w-3 text-blue-500" />}</button>)}</div>}
    </div>
  );
}
