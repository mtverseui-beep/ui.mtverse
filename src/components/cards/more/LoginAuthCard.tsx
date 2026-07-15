"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Eye, EyeOff, Loader2, Lock, Mail, ShieldCheck, ArrowRight, Sparkles, Check } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

// LoginAuthCard — fully upgraded premium auth card.
// Split layout: brand visual with testimonial on desktop, form on right.
// Staggered field reveal, focus-within icon color transitions, real OAuth
// SVG icons (Google, GitHub, Apple), loading state, password toggle,
// remember me + forgot password, trust badges. Theme-aware via cs-* tokens.

export function LoginAuthCard() {
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [remember, setRemember] = useState(true);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1600);
  };

  return (
    <motion.div
      className="w-[clamp(320px,95vw,720px)] select-none"
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-8 -z-10 rounded-[40px] blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 20% 15%, rgba(99,102,241,0.14), transparent 55%), radial-gradient(circle at 85% 90%, rgba(14,165,233,0.10), transparent 60%)",
        }}
      />

      <div className="cs-surface overflow-hidden rounded-[20px] border cs-border shadow-[0_30px_80px_-40px_rgba(15,23,42,0.4)]">
        <div className="grid md:grid-cols-[1fr_1fr]">
          {/* ── Visual column — desktop only ── */}
          <div className="relative hidden md:block">
            <Image
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=85"
              alt="Team collaborating in a bright modern office"
              fill
              sizes="360px"
              priority
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.5]"
            />
            {/* Mesh overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-950/80 via-indigo-900/40 to-sky-900/20" />
            {/* Dot pattern */}
            <div
              aria-hidden
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)",
                backgroundSize: "20px 20px",
              }}
            />

            <div className="absolute inset-0 flex flex-col justify-between p-7 text-white">
              {/* Brand */}
              <motion.div
                className="flex items-center gap-2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15 backdrop-blur-md ring-1 ring-white/20">
                  <Sparkles className="h-4 w-4 text-white" strokeWidth={2.4} />
                </div>
                <span className="text-[14px] font-bold tracking-tight">Acme Studio</span>
              </motion.div>

              {/* Testimonial */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4, ease: EASE }}
              >
                <p className="text-[18px] font-semibold leading-snug">
                  &ldquo;The calmest workspace our team has ever used.&rdquo;
                </p>
                <div className="mt-3 flex items-center gap-2.5">
                  <div className="relative h-8 w-8 overflow-hidden rounded-full ring-2 ring-white/30">
                    <Image
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80"
                      alt="Sofia Marchetti"
                      fill
                      sizes="32px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-[12px] font-semibold leading-tight">Sofia Marchetti</p>
                    <p className="text-[10.5px] text-white/70">Head of Design · Linear</p>
                  </div>
                </div>
              </motion.div>

              {/* Trust */}
              <motion.div
                className="flex items-center gap-3 text-[10.5px] text-white/70"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6, ease: EASE }}
              >
                <span className="flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3" strokeWidth={2.2} />
                  256-bit encryption
                </span>
                <span className="h-1 w-1 rounded-full bg-white/40" />
                <span>SOC 2 Type II</span>
                <span className="h-1 w-1 rounded-full bg-white/40" />
                <span>GDPR ready</span>
              </motion.div>
            </div>
          </div>

          {/* ── Form column ── */}
          <div className="flex flex-col justify-center p-6 sm:p-8">
            {/* Mobile brand chip */}
            <motion.div
              className="mb-5 flex items-center gap-2 md:hidden"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-sky-500 shadow-sm">
                <Sparkles className="h-3.5 w-3.5 text-white" strokeWidth={2.4} />
              </div>
              <span className="text-[13px] font-bold cs-text">Acme Studio</span>
            </motion.div>

            {/* Heading */}
            <motion.div
              className="mb-5"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1, ease: EASE }}
            >
              <h1 className="text-[20px] font-bold leading-tight cs-text">Welcome back</h1>
              <p className="mt-1 text-[12.5px] cs-muted">
                Sign in to your workspace to continue.
              </p>
            </motion.div>

            <form className="space-y-3.5" onSubmit={submit}>
              {/* Email — staggered reveal */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2, ease: EASE }}
              >
                <label htmlFor="email" className="mb-1.5 block text-[11.5px] font-semibold cs-text">
                  Email
                </label>
                <div className="relative group">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 cs-subtle transition group-focus-within:text-indigo-500" strokeWidth={2} />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@acme.studio"
                    required
                    autoComplete="email"
                    className="cs-input w-full rounded-xl border cs-border py-2.5 pl-9 pr-3 text-[13px] cs-text placeholder:cs-subtle transition focus:border-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/30"
                  />
                </div>
              </motion.div>

              {/* Password */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3, ease: EASE }}
              >
                <div className="mb-1.5 flex items-center justify-between">
                  <label htmlFor="password" className="text-[11.5px] font-semibold cs-text">
                    Password
                  </label>
                  <button
                    type="button"
                    className="text-[11px] font-medium text-indigo-600 transition hover:text-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/40 dark:text-indigo-400"
                  >
                    Forgot?
                  </button>
                </div>
                <div className="relative group">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 cs-subtle transition group-focus-within:text-indigo-500" strokeWidth={2} />
                  <input
                    id="password"
                    type={showPw ? "text" : "password"}
                    value={pw}
                    onChange={(e) => setPw(e.target.value)}
                    placeholder="••••••••"
                    required
                    autoComplete="current-password"
                    className="cs-input w-full rounded-xl border cs-border py-2.5 pl-9 pr-10 text-[13px] cs-text placeholder:cs-subtle transition focus:border-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/30"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((v) => !v)}
                    aria-label={showPw ? "Hide password" : "Show password"}
                    className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg cs-muted transition cs-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/40"
                  >
                    {showPw ? <EyeOff className="h-4 w-4" strokeWidth={2} /> : <Eye className="h-4 w-4" strokeWidth={2} />}
                  </button>
                </div>
              </motion.div>

              {/* Remember me — custom toggle */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4, ease: EASE }}
              >
                <button
                  type="button"
                  onClick={() => setRemember((v) => !v)}
                  className="flex cursor-pointer items-center gap-2 text-[12px] cs-muted"
                >
                  <span
                    className={`flex h-4 w-4 items-center justify-center rounded border transition ${
                      remember
                        ? "border-indigo-500 bg-indigo-500 text-white"
                        : "border-slate-300 dark:border-white/20"
                    }`}
                  >
                    <AnimatePresence>
                      {remember && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          transition={{ type: "spring", stiffness: 500, damping: 25 }}
                        >
                          <Check className="h-2.5 w-2.5" strokeWidth={3.5} />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </span>
                  Keep me signed in
                </button>
              </motion.div>

              {/* Submit */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5, ease: EASE }}
              >
                <motion.button
                  type="submit"
                  whileTap={{ scale: 0.98 }}
                  disabled={loading}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-2.5 text-[13px] font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:bg-slate-800 disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/40 dark:bg-white dark:text-slate-900 dark:shadow-white/10 dark:hover:bg-slate-100"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {loading ? (
                      <motion.span
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2.4} />
                        Signing in…
                      </motion.span>
                    ) : (
                      <motion.span
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-1.5"
                      >
                        Sign in
                        <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" strokeWidth={2.4} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </motion.div>
            </form>

            {/* Divider */}
            <motion.div
              className="my-4 flex items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.6, ease: EASE }}
            >
              <span className="h-px flex-1" style={{ background: "var(--card-border)" }} />
              <span className="text-[10.5px] font-medium uppercase tracking-wider cs-subtle">
                or continue with
              </span>
              <span className="h-px flex-1" style={{ background: "var(--card-border)" }} />
            </motion.div>

            {/* OAuth buttons */}
            <motion.div
              className="grid grid-cols-3 gap-2"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.7, ease: EASE }}
            >
              <SocialButton label="Sign in with Google" onClick={() => {}}>
                <GoogleIcon />
              </SocialButton>
              <SocialButton label="Sign in with GitHub" onClick={() => {}}>
                <GitHubIcon />
              </SocialButton>
              <SocialButton label="Sign in with Apple" onClick={() => {}}>
                <AppleIcon />
              </SocialButton>
            </motion.div>

            {/* Footer */}
            <motion.p
              className="mt-4 text-center text-[12px] cs-muted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.8, ease: EASE }}
            >
              New to Acme?{" "}
              <button
                type="button"
                className="font-semibold text-indigo-600 transition hover:text-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/40 dark:text-indigo-400"
              >
                Create an account
              </button>
            </motion.p>

            {/* Trust badges */}
            <motion.div
              className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[10px] cs-subtle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.9, ease: EASE }}
            >
              <span className="flex items-center gap-1">
                <ShieldCheck className="h-3 w-3" strokeWidth={2.2} />
                256-bit encryption
              </span>
              <span>·</span>
              <span>SOC 2 Type II</span>
              <span>·</span>
              <span>GDPR ready</span>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SocialButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={label}
      whileTap={{ scale: 0.96 }}
      className="flex h-10 items-center justify-center rounded-xl border cs-border cs-surface transition hover:border-slate-300 hover:shadow-sm dark:hover:border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/40"
    >
      {children}
    </motion.button>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
      <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38Z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 cs-text" fill="currentColor" aria-hidden>
      <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.39 1.24-3.23-.12-.31-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.87.12 3.18.77.84 1.24 1.92 1.24 3.23 0 4.62-2.81 5.64-5.49 5.94.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 24 12.5C24 5.87 18.63.5 12 .5Z" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 cs-text" fill="currentColor" aria-hidden>
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.08l.01-.01ZM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25Z" />
    </svg>
  );
}
