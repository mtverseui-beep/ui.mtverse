"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, MailCheck, ShieldCheck, Eye, EyeOff, Check } from "lucide-react";

// ════════════════════════════════════════════════════════════════════════════
// auth-screen-set.tsx — Shared 6-screen auth system with tab switcher
// ════════════════════════════════════════════════════════════════════════════
// Each auth component provides:
//   - Shell: renders background + card + logo + title + description + children + footer
//   - styles: CSS classes for inputs, buttons, labels, OTP, divider
//   - brandName, variant (light/dark), accent color
//
// This component renders the sticky tab bar (Sign In / Sign Up / Forgot / Reset
// / OTP / Two-Step) and the 6 screen contents, each using the provided Shell.

export interface AuthShellProps {
  title: string;
  description: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export interface AuthStyles {
  inputClass: string;        // full className for <input>
  labelClass: string;        // full className for <label>
  buttonClass: string;       // full className for primary <button>
  secondaryButtonClass: string; // for secondary/outline buttons
  otpClass: string;          // full className for OTP <input>
  dividerLineColor: string;  // CSS color for divider lines
  dividerTextColor: string;  // CSS color for "or" text
  textColor: string;         // primary text color
  subTextColor: string;      // secondary/muted text color
  linkClass: string;         // className for <a> links
  hintColor: string;         // for hints/labels
  variant: "light" | "dark";
  accent: string;            // accent hex color
}

const SCREENS = [
  { id: "signin", label: "Sign In" },
  { id: "signup", label: "Sign Up" },
  { id: "forgot", label: "Forgot" },
  { id: "reset", label: "Reset" },
  { id: "otp", label: "OTP" },
  { id: "twostep", label: "Two-Step" },
] as const;

export function AuthScreenSet({
  brandName,
  Shell,
  styles,
}: {
  brandName: string;
  Shell: React.ComponentType<AuthShellProps>;
  styles: AuthStyles;
}) {
  const [active, setActive] = useState<string>("signin");

  return (
    <div className="flex min-h-full w-full flex-col" style={{ color: styles.textColor, fontFamily: "inherit" }}>
      {/* Tab switcher */}
      <div
        className="sticky top-0 z-30 flex items-center gap-3 overflow-x-auto border-b px-4 py-2.5 backdrop-blur-md [scrollbar-width:none]"
        style={{
          borderColor: styles.dividerLineColor,
          background: styles.variant === "dark" ? "rgba(10,10,15,0.8)" : "rgba(255,255,255,0.8)",
        }}
      >
        <span
          className="flex shrink-0 items-center gap-1.5 text-[11px] uppercase tracking-widest"
          style={{ fontFamily: "var(--font-jetbrains), monospace", color: styles.subTextColor }}
        >
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: styles.accent }} />
          {brandName}
        </span>
        <span className="h-4 w-px shrink-0" style={{ background: styles.dividerLineColor }} />
        <LayoutGroup id={`auth-tabs-${brandName}`}>
          <div className="flex items-center gap-0.5">
            {SCREENS.map((s) => {
              const isActive = active === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setActive(s.id)}
                  className="relative shrink-0 px-3 py-1.5 text-[11px] uppercase tracking-widest outline-none transition-colors"
                  style={{
                    fontFamily: "var(--font-jetbrains), monospace",
                    color: isActive ? (styles.variant === "dark" ? "#0a0a0f" : "#ffffff") : styles.subTextColor,
                  }}
                >
                  {isActive && (
                    <motion.span
                      layoutId={`auth-active-${brandName}`}
                      className="absolute inset-0"
                      style={{ background: styles.accent }}
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className="relative z-10">{s.label}</span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>
      </div>

      {/* Active screen */}
      <div className="min-h-0 flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="h-full"
          >
            {active === "signin" && <SignInScreen Shell={Shell} styles={styles} />}
            {active === "signup" && <SignUpScreen Shell={Shell} styles={styles} />}
            {active === "forgot" && <ForgotScreen Shell={Shell} styles={styles} />}
            {active === "reset" && <ResetScreen Shell={Shell} styles={styles} />}
            {active === "otp" && <OtpScreen Shell={Shell} styles={styles} />}
            {active === "twostep" && <TwoStepScreen Shell={Shell} styles={styles} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// ── Styled input components ─────────────────────────────────────────────────
function Field({ label, type = "text", placeholder, styles }: { label: string; type?: string; placeholder?: string; styles: AuthStyles }) {
  return (
    <div>
      <label className={styles.labelClass}>{label}</label>
      <input type={type} placeholder={placeholder} className={styles.inputClass} />
    </div>
  );
}

function PasswordField({ label, placeholder, styles, hint }: { label: string; placeholder?: string; styles: AuthStyles; hint?: React.ReactNode }) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <label className={styles.labelClass + " mb-0"}>{label}</label>
        {hint}
      </div>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          placeholder={placeholder}
          className={styles.inputClass + " pr-10"}
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-100 opacity-50"
          style={{ color: styles.subTextColor }}
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}

function OtpInput({ styles }: { styles: AuthStyles }) {
  const [vals, setVals] = useState<string[]>(Array(6).fill(""));
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const setAt = (i: number, v: string) => {
    if (!/^\d?$/.test(v)) return;
    const next = [...vals];
    next[i] = v;
    setVals(next);
    if (v && i < 5) refs.current[i + 1]?.focus();
  };
  return (
    <div className="flex justify-between gap-2">
      {vals.map((v, i) => (
        <input
          key={i}
          ref={(el) => { refs.current[i] = el; }}
          value={v}
          inputMode="numeric"
          maxLength={1}
          onChange={(e) => setAt(i, e.target.value)}
          onKeyDown={(e) => { if (e.key === "Backspace" && !vals[i] && i > 0) refs.current[i - 1]?.focus(); }}
          className={styles.otpClass}
        />
      ))}
    </div>
  );
}

function Divider({ styles }: { styles: AuthStyles }) {
  return (
    <div className="relative my-5">
      <div className="absolute inset-0 flex items-center"><span className="h-px w-full" style={{ background: styles.dividerLineColor }} /></div>
      <div className="relative flex justify-center"><span className="px-3 text-xs" style={{ color: styles.dividerTextColor, background: "transparent" }}>or</span></div>
    </div>
  );
}

function SocialRow({ styles }: { styles: AuthStyles }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {[
        { label: "Google", svg: <svg className="h-4 w-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg> },
        { label: "GitHub", svg: <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" style={{ color: styles.variant === "dark" ? "#fff" : "#181717" }}><path d="M12 2C6.5 2 2 6.6 2 12.3c0 4.5 2.9 8.3 6.8 9.7.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.4-3.4-1.4-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9 9 0 0 1 4.9 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.3 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10.3 10.3 0 0 0 22 12.3C22 6.6 17.5 2 12 2z" /></svg> },
        { label: "Apple", svg: <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" style={{ color: styles.variant === "dark" ? "#fff" : "#181717" }}><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" /></svg> },
      ].map((s) => (
        <button
          key={s.label}
          type="button"
          className={styles.secondaryButtonClass + " flex items-center justify-center py-2.5 transition-colors"}
          aria-label={`Sign in with ${s.label}`}
        >
          {s.svg}
        </button>
      ))}
    </div>
  );
}

function BackLink({ styles, label = "Back to sign in" }: { styles: AuthStyles; label?: string }) {
  return (
    <a href="#" onClick={(e) => e.preventDefault()} className={`inline-flex items-center gap-1.5 text-sm ${styles.linkClass}`}>
      <ArrowLeft className="h-3.5 w-3.5" /> {label}
    </a>
  );
}

// ── 6 Screen Components ─────────────────────────────────────────────────────

function SignInScreen({ Shell, styles }: { Shell: React.ComponentType<AuthShellProps>; styles: AuthStyles }) {
  return (
    <Shell
      title="Welcome back"
      description={`Sign in to your ${brandNameOf(styles)} workspace to continue.`}
      footer={<span style={{ color: styles.subTextColor }}>New here? <a href="#" onClick={(e) => e.preventDefault()} className={styles.linkClass}>Create an account</a></span>}
    >
      <div className="space-y-4">
        <Field label="Email" type="email" placeholder="you@company.com" styles={styles} />
        <PasswordField
          label="Password"
          placeholder="Enter your password"
          styles={styles}
          hint={<a href="#" onClick={(e) => e.preventDefault()} className={`text-xs ${styles.linkClass}`}>Forgot?</a>}
        />
        <button type="button" className={styles.buttonClass + " flex items-center justify-center gap-2"}>
          Sign in <ArrowRight className="h-4 w-4" />
        </button>
      </div>
      <Divider styles={styles} />
      <SocialRow styles={styles} />
    </Shell>
  );
}

function SignUpScreen({ Shell, styles }: { Shell: React.ComponentType<AuthShellProps>; styles: AuthStyles }) {
  return (
    <Shell
      title="Create your account"
      description={`Start your free ${brandNameOf(styles)} trial — no credit card required.`}
      footer={<span style={{ color: styles.subTextColor }}>Already have an account? <a href="#" onClick={(e) => e.preventDefault()} className={styles.linkClass}>Sign in</a></span>}
    >
      <div className="space-y-4">
        <Field label="Full name" placeholder="Jane Cooper" styles={styles} />
        <Field label="Work email" type="email" placeholder="you@company.com" styles={styles} />
        <PasswordField label="Password" placeholder="Create a password" styles={styles} />
        <button type="button" className={styles.buttonClass + " flex items-center justify-center gap-2"}>
          Create account <ArrowRight className="h-4 w-4" />
        </button>
      </div>
      <Divider styles={styles} />
      <SocialRow styles={styles} />
    </Shell>
  );
}

function ForgotScreen({ Shell, styles }: { Shell: React.ComponentType<AuthShellProps>; styles: AuthStyles }) {
  const [sent, setSent] = useState(false);
  return (
    <Shell
      title={sent ? "Check your inbox" : "Forgot password?"}
      description={sent ? "We've sent a password reset link to your email. It expires in 30 minutes." : "Enter the email tied to your account and we'll send a reset link."}
      footer={<BackLink styles={styles} />}
    >
      {sent ? (
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4" style={{ border: `1px solid ${styles.dividerLineColor}` }}>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center" style={{ background: styles.accent, color: styles.variant === "dark" ? "#0a0a0f" : "#fff" }}>
              <MailCheck className="h-5 w-5" />
            </span>
            <p className="text-sm" style={{ color: styles.subTextColor }}>Didn't get it? Check spam, or resend below.</p>
          </div>
          <button type="button" onClick={() => setSent(false)} className={`text-xs uppercase tracking-widest ${styles.linkClass}`} style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
            Use a different email
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <Field label="Email" type="email" placeholder="you@company.com" styles={styles} />
          <button type="button" onClick={() => setSent(true)} className={styles.buttonClass + " flex items-center justify-center gap-2"}>
            Send reset link <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </Shell>
  );
}

function ResetScreen({ Shell, styles }: { Shell: React.ComponentType<AuthShellProps>; styles: AuthStyles }) {
  const [pw, setPw] = useState("");
  const RULES = [
    { label: "8+ characters", test: (v: string) => v.length >= 8 },
    { label: "Uppercase letter", test: (v: string) => /[A-Z]/.test(v) },
    { label: "Number or symbol", test: (v: string) => /[0-9!@#$%^&*]/.test(v) },
  ];
  const passed = RULES.filter((r) => r.test(pw)).length;

  return (
    <Shell
      title="Set a new password"
      description="Choose a strong password you haven't used before."
      footer={<BackLink styles={styles} />}
    >
      <div className="space-y-4">
        <div>
          <label className={styles.labelClass}>New password</label>
          <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="Enter a new password" className={styles.inputClass} />
          <div className="mt-3 flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <span key={i} className="h-1 flex-1" style={{ background: styles.dividerLineColor }}>
                <span className="block h-full transition-all duration-300" style={{ width: passed > i ? "100%" : "0%", background: styles.accent }} />
              </span>
            ))}
          </div>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
            {RULES.map((r) => {
              const ok = r.test(pw);
              return (
                <span key={r.label} className="text-[11px] uppercase tracking-wider" style={{ color: ok ? styles.accent : styles.subTextColor, opacity: ok ? 1 : 0.5, fontFamily: "var(--font-jetbrains), monospace" }}>
                  {ok ? "✓" : "·"} {r.label}
                </span>
              );
            })}
          </div>
        </div>
        <PasswordField label="Confirm password" placeholder="Re-enter your password" styles={styles} />
        <button type="button" className={styles.buttonClass + " flex items-center justify-center gap-2"}>
          Reset password <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </Shell>
  );
}

function OtpScreen({ Shell, styles }: { Shell: React.ComponentType<AuthShellProps>; styles: AuthStyles }) {
  const [s, setS] = useState(30);
  useEffect(() => {
    if (s <= 0) return;
    const t = setTimeout(() => setS((x) => x - 1), 1000);
    return () => clearTimeout(t);
  }, [s]);

  return (
    <Shell
      title="Verify your email"
      description="Enter the 6-digit code we sent to a•••@company.com to continue."
      footer={<BackLink styles={styles} />}
    >
      <div className="space-y-5">
        <OtpInput styles={styles} />
        <button type="button" className={styles.buttonClass + " flex items-center justify-center gap-2"}>
          Verify code <ArrowRight className="h-4 w-4" />
        </button>
        <p className="text-center text-sm" style={{ color: styles.subTextColor }}>
          {s > 0 ? (
            <>Resend code in <span className="font-semibold tabular-nums" style={{ color: styles.textColor, fontFamily: "var(--font-jetbrains), monospace" }}>0:{String(s).padStart(2, "0")}</span></>
          ) : (
            <button type="button" onClick={() => setS(30)} className={`text-xs uppercase tracking-widest ${styles.linkClass}`} style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
              Resend code
            </button>
          )}
        </p>
      </div>
    </Shell>
  );
}

function TwoStepScreen({ Shell, styles }: { Shell: React.ComponentType<AuthShellProps>; styles: AuthStyles }) {
  return (
    <Shell
      title="Two-step verification"
      description="Enter the 6-digit code from your authenticator app to finish signing in."
      footer={<BackLink styles={styles} />}
    >
      <div className="space-y-5">
        <div className="flex items-center gap-3 p-3 text-sm" style={{ border: `1px solid ${styles.dividerLineColor}`, color: styles.subTextColor }}>
          <ShieldCheck className="h-5 w-5 shrink-0" style={{ color: styles.accent }} strokeWidth={1.75} />
          Protected by two-factor authentication.
        </div>
        <OtpInput styles={styles} />
        <label className="flex items-center gap-2 text-sm" style={{ color: styles.subTextColor }}>
          <input type="checkbox" className="h-4 w-4" style={{ accentColor: styles.accent }} />
          Trust this device for 30 days
        </label>
        <button type="button" className={styles.buttonClass + " flex items-center justify-center gap-2"}>
          Verify & continue <ArrowRight className="h-4 w-4" />
        </button>
        <p className="text-center text-sm" style={{ color: styles.subTextColor }}>
          Lost access?{" "}
          <a href="#" onClick={(e) => e.preventDefault()} className={`text-xs uppercase tracking-widest ${styles.linkClass}`} style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
            Use a backup code
          </a>
        </p>
      </div>
    </Shell>
  );
}

function brandNameOf(_styles: AuthStyles): string {
  return ""; // placeholder — each Shell already shows brand. Description uses "" to avoid hardcoding.
}
