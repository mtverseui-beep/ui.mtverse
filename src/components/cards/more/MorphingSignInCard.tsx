"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, ShieldCheck } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

// MorphingSignInCard — a "Sign In" button that MORPHS into a full sign-in
// card using Framer Motion's shared layout animation (layoutId).
//
// The mechanic: the button and the card share the same `layoutId="signin-morph"`.
// When you click the button, it disappears and the card appears at the exact
// same position/size, then springs outward to full size. The "Sign In" text
// and the card header share a layoutId too, so the text smoothly grows from
// button-size to header-size. Click outside or X to reverse — the card
// shrinks back into the button.

export function MorphingSignInCard() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1600);
  };

  return (
    <div className="flex w-[clamp(280px,90vw,380px)] flex-col items-center justify-center">
      {/* Single AnimatePresence — the button and the card share this context
          so Framer Motion can animate the layoutId morph between them. */}
      <AnimatePresence initial={false}>
        {!isOpen ? (
          <motion.button
            ref={buttonRef}
            key="signin-btn"
            type="button"
            onClick={() => setIsOpen(true)}
            layoutId="signin-morph"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="group relative flex items-center gap-2 rounded-xl bg-slate-900 px-7 py-3.5 text-[14px] font-semibold text-white shadow-lg shadow-slate-900/25 transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/40 dark:bg-white dark:text-slate-900 dark:shadow-white/10 dark:hover:bg-slate-100"
          >
            <Lock className="h-4 w-4" strokeWidth={2.2} />
            <motion.span layoutId="signin-title" className="inline-block">
              Sign In
            </motion.span>
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" strokeWidth={2.2} />
          </motion.button>
        ) : (
          <motion.div
            key="overlay"
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ backgroundColor: "rgba(0, 0, 0, 0)", backdropFilter: "blur(0px)" }}
            animate={{ backgroundColor: "rgba(0, 0, 0, 0.4)", backdropFilter: "blur(6px)" }}
            exit={{ backgroundColor: "rgba(0, 0, 0, 0)", backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsOpen(false);
            }}
          >
            {/* This div shares layoutId="signin-morph" with the button —
                Framer Motion animates it FROM the button's position/size
                TO the centered card position/size. This is the morph. */}
            <motion.div
              layoutId="signin-morph"
              className="cs-surface relative w-full max-w-[380px] overflow-hidden rounded-2xl border cs-border shadow-2xl"
              transition={{ type: "spring", damping: 30, stiffness: 350 }}
            >
              {/* Header — the "Sign In" text shares layoutId with the button's
                  text, so it grows smoothly from button-size to header-size. */}
              <div className="flex items-center justify-between border-b cs-border px-6 py-4">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 shadow-md shadow-indigo-500/25">
                    <Lock className="h-4 w-4 text-white" strokeWidth={2.2} />
                  </div>
                  <div>
                    <motion.h2
                      layoutId="signin-title"
                      className="text-[16px] font-bold leading-tight cs-text"
                    >
                      Sign In
                    </motion.h2>
                    <p className="text-[11px] cs-muted">Sign in to your account</p>
                  </div>
                </div>
                <button
                  type="button"
                  aria-label="Close"
                  onClick={() => setIsOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg cs-muted transition cs-hover hover:cs-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/40"
                >
                  <X className="h-4 w-4" strokeWidth={2} />
                </button>
              </div>

              {/* Form content — fades in after the morph completes,
                  fades out immediately on close so it doesn't show during shrink. */}
              <motion.div
                className="p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.2, duration: 0.15 }}
              >
                <form className="space-y-4" onSubmit={handleSubmit}>
                  {/* Email */}
                  <div>
                    <label htmlFor="morph-email" className="mb-1.5 block text-[12px] font-semibold cs-text">
                      Email
                    </label>
                    <div className="relative group">
                      <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 cs-subtle transition group-focus-within:text-violet-500" strokeWidth={2} />
                      <input
                        id="morph-email"
                        type="email"
                        placeholder="you@example.com"
                        required
                        autoComplete="email"
                        className="cs-input w-full rounded-xl border cs-border py-2.5 pl-9 pr-3 text-[13px] cs-text placeholder:cs-subtle transition focus:border-violet-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/30"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <div className="mb-1.5 flex items-center justify-between">
                      <label htmlFor="morph-pw" className="text-[12px] font-semibold cs-text">
                        Password
                      </label>
                      <button
                        type="button"
                        className="text-[11px] font-medium text-violet-600 transition hover:text-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/40 dark:text-violet-400"
                      >
                        Forgot?
                      </button>
                    </div>
                    <div className="relative group">
                      <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 cs-subtle transition group-focus-within:text-violet-500" strokeWidth={2} />
                      <input
                        id="morph-pw"
                        type={showPw ? "text" : "password"}
                        placeholder="••••••••"
                        required
                        autoComplete="current-password"
                        className="cs-input w-full rounded-xl border cs-border py-2.5 pl-9 pr-10 text-[13px] cs-text placeholder:cs-subtle transition focus:border-violet-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/30"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPw((v) => !v)}
                        aria-label={showPw ? "Hide password" : "Show password"}
                        className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg cs-muted transition cs-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/40"
                      >
                        {showPw ? <EyeOff className="h-4 w-4" strokeWidth={2} /> : <Eye className="h-4 w-4" strokeWidth={2} />}
                      </button>
                    </div>
                  </div>

                  {/* Remember */}
                  <label className="flex cursor-pointer items-center gap-2 text-[12px] cs-muted">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="h-3.5 w-3.5 rounded border-slate-300 accent-violet-500 dark:border-white/20"
                    />
                    Keep me signed in
                  </label>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileTap={{ scale: 0.98 }}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-2.5 text-[13px] font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:bg-slate-800 disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/40 dark:bg-white dark:text-slate-900 dark:shadow-white/10 dark:hover:bg-slate-100"
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
                          Sign In
                          <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.4} />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>

                  {/* Divider */}
                  <div className="flex items-center gap-3 pt-1">
                    <span className="h-px flex-1" style={{ background: "var(--card-border)" }} />
                    <span className="text-[10.5px] font-medium uppercase tracking-wider cs-subtle">
                      or continue with
                    </span>
                    <span className="h-px flex-1" style={{ background: "var(--card-border)" }} />
                  </div>

                  {/* OAuth buttons */}
                  <div className="grid grid-cols-3 gap-2">
                    <OAuthButton label="Sign in with Google">
                      <GoogleIcon />
                    </OAuthButton>
                    <OAuthButton label="Sign in with GitHub">
                      <GitHubIcon />
                    </OAuthButton>
                    <OAuthButton label="Sign in with Apple">
                      <AppleIcon />
                    </OAuthButton>
                  </div>

                  {/* Footer */}
                  <p className="pt-1 text-center text-[11.5px] cs-muted">
                    New here?{" "}
                    <button
                      type="button"
                      className="font-semibold text-violet-600 transition hover:text-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/40 dark:text-violet-400"
                    >
                      Create an account
                    </button>
                  </p>

                  {/* Trust badge */}
                  <div className="flex items-center justify-center gap-1.5 pt-1 text-[10px] cs-subtle">
                    <ShieldCheck className="h-3 w-3" strokeWidth={2} />
                    256-bit encryption · SOC 2 Type II
                  </div>
                </form>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hint text below the button */}
      {!isOpen && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 text-[11px] cs-subtle"
        >
          Click the button — it morphs into a sign-in card
        </motion.p>
      )}
    </div>
  );
}

function OAuthButton({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <motion.button
      type="button"
      aria-label={label}
      whileTap={{ scale: 0.95 }}
      className="flex h-10 items-center justify-center rounded-xl border cs-border cs-surface transition hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/40"
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
