"use client";

import { useId, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { OTPInput, REGEXP_ONLY_DIGITS, type SlotProps } from "input-otp";
import { Check, Mail, RefreshCw, ShieldCheck, Smartphone, X } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;
const CODE_LENGTH = 6;
const DEMO_CODE = "123456";
type Variant = "box" | "underline" | "circle";
type Status = "idle" | "success" | "error";

const VARIANTS: Array<{ variant: Variant; title: string; label: string; icon: typeof Mail }> = [
  { variant: "box", title: "1 · Box Style", label: "SMS verification code", icon: Smartphone },
  { variant: "underline", title: "2 · Underline Connected", label: "Email verification code", icon: Mail },
  { variant: "circle", title: "3 · Circle Segmented", label: "Authenticator verification code", icon: ShieldCheck },
];

export function OTPInputCard() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div className="relative w-[clamp(300px,92vw,420px)]" initial={reduceMotion ? false : { opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: reduceMotion ? 0 : 0.55, ease: EASE }}>
      <div aria-hidden className="pointer-events-none absolute -inset-8 -z-10 rounded-[40px] blur-3xl" style={{ background: "radial-gradient(circle at 30% 20%, rgba(5,150,105,0.08), transparent 55%)" }} />
      <div className="cs-surface overflow-hidden rounded-[22px] border cs-border shadow-[0_30px_70px_-35px_rgba(0,0,0,0.25)]">
        <header className="border-b cs-border px-4 py-4 sm:px-5">
          <div className="flex items-center gap-2.5">
            <div aria-hidden className="flex h-7 w-7 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/10"><ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" strokeWidth={2.2} /></div>
            <div><h2 className="text-[14px] font-bold tracking-tight cs-text">OTP Input</h2><p className="text-[10.5px] cs-muted">Paste, autofill, or type a six-digit code</p></div>
          </div>
        </header>
        <div className="space-y-7 p-4 sm:p-5">{VARIANTS.map((item) => <OTPVariant key={item.variant} {...item} />)}</div>
        <footer className="border-t cs-border px-4 py-2.5 text-center"><p className="text-[9.5px] cs-subtle">Demo success code: <span className="font-semibold tabular-nums cs-text">123456</span></p></footer>
      </div>
    </motion.div>
  );
}

function OTPVariant({ variant, title, label, icon: Icon }: { variant: Variant; title: string; label: string; icon: typeof Mail }) {
  const inputId = useId();
  const helpId = useId();
  const statusId = useId();
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const verify = (code: string) => setStatus(code === DEMO_CODE ? "success" : "error");
  const reset = () => { setValue(""); setStatus("idle"); };
  const handleChange = (next: string) => {
    setValue(next);
    setStatus(next.length === CODE_LENGTH ? (next === DEMO_CODE ? "success" : "error") : "idle");
  };

  return (
    <form onSubmit={(event) => { event.preventDefault(); verify(value); }} noValidate>
      <div className="mb-2.5 flex items-center justify-between gap-2">
        <label id={inputId} className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider cs-subtle"><Icon aria-hidden className="h-3 w-3" />{title}</label>
        {value && <button type="button" onClick={reset} className="flex items-center gap-1 rounded-md px-1.5 py-1 text-[9.5px] font-semibold cs-muted outline-none transition cs-hover focus-visible:shadow-[0_0_0_3px_var(--card-border)]"><RefreshCw aria-hidden className="h-2.5 w-2.5" />Reset</button>}
      </div>
      <OTPInput
        value={value}
        onChange={handleChange}
        onComplete={verify}
        maxLength={CODE_LENGTH}
        pattern={REGEXP_ONLY_DIGITS}
        inputMode="numeric"
        autoComplete="one-time-code"
        name={`${variant}-verification-code`}
        aria-labelledby={inputId}
        aria-describedby={`${helpId} ${statusId}`}
        aria-invalid={status === "error"}
        containerClassName="flex w-full items-center justify-between gap-1.5 sm:gap-2"
        className="disabled:cursor-not-allowed"
        render={({ slots }) => slots.map((slot, index) => <OTPSlot key={index} slot={slot} variant={variant} invalid={status === "error"} complete={status === "success"} />)}
      />
      <div className="mt-2 flex min-h-5 items-start justify-between gap-3">
        <p id={helpId} className="text-[9.5px] leading-4 cs-subtle">{label}. Paste is supported.</p>
        <div id={statusId} role="status" aria-live="polite" aria-atomic="true" className={`flex shrink-0 items-center gap-1 text-[9.5px] font-semibold ${status === "success" ? "text-emerald-600 dark:text-emerald-400" : status === "error" ? "text-rose-600 dark:text-rose-400" : "cs-subtle"}`}>
          {status === "success" && <><Check aria-hidden className="h-3 w-3" />Verified</>}
          {status === "error" && <><X aria-hidden className="h-3 w-3" />Invalid code</>}
          {status === "idle" && <span>{value.length}/{CODE_LENGTH}</span>}
        </div>
      </div>
      <button type="submit" disabled={value.length !== CODE_LENGTH} className="sr-only">Verify code</button>
    </form>
  );
}

function OTPSlot({ slot, variant, invalid, complete }: { slot: SlotProps; variant: Variant; invalid: boolean; complete: boolean }) {
  const shape = variant === "circle" ? "rounded-full" : variant === "underline" ? "rounded-t-md border-x-0 border-t-0" : "rounded-lg";
  return (
    <div
      aria-hidden="true"
      data-active={slot.isActive}
      className={`relative flex aspect-square min-w-0 flex-1 items-center justify-center border text-[15px] font-bold tabular-nums cs-text transition-[border-color,box-shadow,background-color] motion-reduce:transition-none ${shape}`}
      style={{
        maxWidth: variant === "circle" ? 46 : 52,
        borderColor: invalid ? "rgb(244 63 94 / .75)" : complete ? "rgb(16 185 129 / .75)" : "var(--card-border)",
        background: slot.char ? "var(--card-input-bg)" : "var(--card-surface)",
        boxShadow: slot.isActive ? "0 0 0 3px var(--card-border)" : "none",
      }}
    >
      {slot.char}
      {slot.hasFakeCaret && <span className="pointer-events-none absolute h-5 w-px animate-pulse bg-[var(--card-text)] motion-reduce:animate-none" />}
    </div>
  );
}
