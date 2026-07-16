"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { AlertCircle, Check, Eye, EyeOff, Lock, Mail, User } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;
const fieldFocus = "focus-within:border-[var(--card-text-muted)] focus-within:ring-2 focus-within:ring-[var(--card-border)]";
const buttonFocus = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--card-text-muted)]";

export function AnimatedFloatingInputCard() {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div className="relative w-[min(100%,420px)]" initial={reduceMotion ? false : { opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: reduceMotion ? 0 : 0.55, ease: EASE }}>
      <div aria-hidden className="pointer-events-none absolute -inset-6 -z-10 rounded-[40px] blur-3xl" style={{ background: "radial-gradient(circle at 30% 20%, rgba(99,102,241,.08), transparent 55%)" }} />
      <div className="cs-surface overflow-hidden rounded-[22px] border cs-border shadow-[0_30px_70px_-35px_rgba(0,0,0,.25)]">
        <header className="border-b cs-border px-4 py-4 sm:px-5"><div className="flex items-center gap-2.5"><span aria-hidden className="flex h-8 w-8 items-center justify-center rounded-lg border cs-border cs-input"><Mail className="h-4 w-4 cs-muted" /></span><div><h2 className="text-[14px] font-bold cs-text">Floating Inputs</h2><p className="text-[10.5px] cs-muted">Associated labels, validation, and controls</p></div></div></header>
        <form className="space-y-7 p-4 sm:p-5" onSubmit={(event) => event.preventDefault()} noValidate>
          <section aria-labelledby="floating-email-title"><h3 id="floating-email-title" className="mb-2 text-[10px] font-bold uppercase tracking-wider cs-subtle">1 · Email validation</h3><EmailField /></section>
          <section aria-labelledby="floating-user-title"><h3 id="floating-user-title" className="mb-2 text-[10px] font-bold uppercase tracking-wider cs-subtle">2 · Username</h3><UsernameField /></section>
          <section aria-labelledby="floating-password-title"><h3 id="floating-password-title" className="mb-2 text-[10px] font-bold uppercase tracking-wider cs-subtle">3 · Password</h3><PasswordField /></section>
        </form>
      </div>
    </motion.div>
  );
}

function EmailField() {
  const id = useId();
  const helpId = `${id}-help`;
  const errorId = `${id}-error`;
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const [touched, setTouched] = useState(false);
  const reduceMotion = useReducedMotion();
  const trimmed = value.trim();
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
  const error = touched && (!trimmed ? "Email is required." : !valid ? "Enter a complete email address." : "");
  const floated = focused || value.length > 0;
  return (
    <div>
      <div className={`relative flex items-center rounded-xl border cs-input transition-[border-color,box-shadow] motion-reduce:transition-none ${fieldFocus} ${error ? "border-rose-500" : valid ? "border-emerald-500" : "cs-border"}`}>
        <Mail aria-hidden className={`ml-3.5 h-4 w-4 shrink-0 ${error ? "text-rose-500" : valid ? "text-emerald-500" : "cs-subtle"}`} />
        <div className="relative min-w-0 flex-1 px-3">
          <label htmlFor={id} className={`pointer-events-none absolute left-3 origin-left font-medium cs-muted transition-all motion-reduce:transition-none ${floated ? "top-1 text-[9px]" : "top-1/2 -translate-y-1/2 text-[13px]"}`}>Email address</label>
          <input id={id} name="email" type="email" inputMode="email" autoComplete="email" required value={value} onChange={(event) => setValue(event.target.value)} onFocus={() => setFocused(true)} onBlur={() => { setFocused(false); setTouched(true); }} aria-invalid={Boolean(error)} aria-describedby={`${helpId}${error ? ` ${errorId}` : ""}`} className={`w-full bg-transparent text-[13px] cs-text outline-none ${floated ? "pb-1 pt-[18px]" : "py-3"}`} />
        </div>
        <span aria-hidden className="mr-3 h-4 w-4 shrink-0">{valid && <motion.span initial={reduceMotion ? false : { scale: 0 }} animate={{ scale: 1 }}><Check className="h-4 w-4 text-emerald-500" /></motion.span>}{error && <AlertCircle className="h-4 w-4 text-rose-500" />}</span>
      </div>
      <p id={helpId} className="mt-1.5 text-[10px] cs-subtle">We’ll use this for account notifications.</p>
      <AnimatePresence initial={false}>{error && <motion.p id={errorId} role="alert" initial={reduceMotion ? false : { opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-1 flex items-center gap-1.5 text-[10.5px] text-rose-500"><AlertCircle aria-hidden className="h-3 w-3" />{error}</motion.p>}</AnimatePresence>
    </div>
  );
}

function UsernameField() {
  const id = useId();
  const errorId = `${id}-error`;
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const [touched, setTouched] = useState(false);
  const clean = value.trim();
  const error = touched && clean && (!/^[a-zA-Z0-9_]+$/.test(clean) ? "Use letters, numbers, or underscores only." : clean.length < 3 ? "Username must contain at least 3 characters." : "");
  const floated = focused || value.length > 0;
  return (
    <div>
      <div className="relative flex items-center"><User aria-hidden className="absolute left-0 h-4 w-4 cs-subtle" /><label htmlFor={id} className={`pointer-events-none absolute left-6 origin-left font-medium cs-muted transition-all motion-reduce:transition-none ${floated ? "-top-2 scale-[.85]" : "top-1/2 -translate-y-1/2 text-[13px]"}`}>Username</label><input id={id} name="username" type="text" autoComplete="username" minLength={3} maxLength={24} pattern="[A-Za-z0-9_]+" value={value} onChange={(event) => setValue(event.target.value)} onFocus={() => setFocused(true)} onBlur={() => { setFocused(false); setTouched(true); }} aria-invalid={Boolean(error)} aria-describedby={error ? errorId : undefined} className="w-full border-0 border-b-2 border-[var(--card-border)] bg-transparent py-2.5 pl-6 text-[13px] cs-text outline-none transition-colors focus:border-[var(--card-text-muted)] motion-reduce:transition-none" /></div>
      {error && <p id={errorId} role="alert" className="mt-1.5 text-[10.5px] text-rose-500">{error}</p>}
    </div>
  );
}

function PasswordField() {
  const id = useId();
  const helpId = `${id}-help`;
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const floated = focused || value.length > 0;
  const valid = value.length >= 8;
  return (
    <div><div className={`flex items-center rounded-xl border cs-input transition-[border-color,box-shadow] motion-reduce:transition-none ${fieldFocus}`}><Lock aria-hidden className="ml-3.5 h-4 w-4 shrink-0 cs-subtle" /><div className="relative min-w-0 flex-1 px-3"><label htmlFor={id} className={`pointer-events-none absolute left-3 font-medium cs-muted transition-all motion-reduce:transition-none ${floated ? "top-1 text-[9px]" : "top-1/2 -translate-y-1/2 text-[13px]"}`}>Password</label><input id={id} name="password" type={visible ? "text" : "password"} autoComplete="current-password" minLength={8} required value={value} onChange={(event) => setValue(event.target.value)} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} aria-describedby={helpId} className={`w-full bg-transparent text-[13px] cs-text outline-none ${floated ? "pb-1 pt-[18px]" : "py-3"}`} /></div><button type="button" onClick={() => setVisible((current) => !current)} aria-label={visible ? "Hide password" : "Show password"} aria-pressed={visible} className={`mr-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg cs-muted transition-colors cs-hover motion-reduce:transition-none ${buttonFocus}`}>{visible ? <EyeOff aria-hidden className="h-4 w-4" /> : <Eye aria-hidden className="h-4 w-4" />}</button></div><p id={helpId} className={`mt-1.5 text-[10px] ${value && !valid ? "text-amber-600 dark:text-amber-400" : "cs-subtle"}`}>{valid ? "Password meets the 8-character minimum." : "Use at least 8 characters."}</p></div>
  );
}
