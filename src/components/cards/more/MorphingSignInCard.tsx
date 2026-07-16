"use client";

import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Eye, EyeOff, Loader2, Lock, Mail, ShieldCheck, X } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

export type SignInCredentials = { email: string; password: string; remember: boolean };
export type OAuthProvider = "google" | "github" | "apple";

export interface MorphingSignInCardProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSignIn?: (credentials: SignInCredentials) => Promise<void>;
  onOAuth?: (provider: OAuthProvider) => void | Promise<void>;
  onForgotPassword?: () => void;
  onCreateAccount?: () => void;
}

type FieldErrors = { email?: string; password?: string };
type Status = "idle" | "loading" | "success" | "error";

function getErrorMessage(error: unknown) {
  return error instanceof Error && error.message ? error.message : "Something went wrong. Please try again.";
}

export function MorphingSignInCard({ open, defaultOpen = false, onOpenChange, onSignIn, onOAuth, onForgotPassword, onCreateAccount }: MorphingSignInCardProps = {}) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("Enter your account details to continue.");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [oauthBusy, setOauthBusy] = useState<OAuthProvider | null>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const mountedRef = useRef(true);
  const baseId = useId();
  const reduceMotion = useReducedMotion();
  const isOpen = open ?? internalOpen;
  const busy = status === "loading";
  const ids = {
    description: `${baseId}-description`, email: `${baseId}-email`, emailError: `${baseId}-email-error`,
    password: `${baseId}-password`, passwordError: `${baseId}-password-error`, status: `${baseId}-status`,
  };

  useEffect(() => () => { mountedRef.current = false; }, []);

  const setOpen = (next: boolean) => {
    if (open === undefined) setInternalOpen(next);
    onOpenChange?.(next);
    if (!next) {
      setErrors({});
      setShowPassword(false);
      setStatus("idle");
      setMessage("Enter your account details to continue.");
    }
  };

  const validate = (credentials: SignInCredentials) => {
    const nextErrors: FieldErrors = {};
    if (!credentials.email.trim()) nextErrors.email = "Enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credentials.email)) nextErrors.email = "Enter a valid email address.";
    if (!credentials.password) nextErrors.password = "Enter your password.";
    else if (credentials.password.length < 8) nextErrors.password = "Password must be at least 8 characters.";
    return nextErrors;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const credentials: SignInCredentials = { email: String(form.get("email") ?? "").trim(), password: String(form.get("password") ?? ""), remember: form.get("remember") === "on" };
    const nextErrors = validate(credentials);
    setErrors(nextErrors);
    if (nextErrors.email || nextErrors.password) {
      setStatus("error");
      setMessage("Review the highlighted fields.");
      event.currentTarget.querySelector<HTMLInputElement>(nextErrors.email ? '[name="email"]' : '[name="password"]')?.focus();
      return;
    }

    setStatus("loading");
    setMessage("Signing in…");
    try {
      await onSignIn?.(credentials);
      if (!mountedRef.current) return;
      setStatus("success");
      setMessage(onSignIn ? "Signed in successfully." : "Credentials validated locally; no sign-in request was sent.");
    } catch (error) {
      if (!mountedRef.current) return;
      setStatus("error");
      setMessage(getErrorMessage(error));
    }
  };

  const handleOAuth = async (provider: OAuthProvider) => {
    setOauthBusy(provider);
    setStatus("loading");
    setMessage(`Continuing with ${provider}…`);
    try {
      await onOAuth?.(provider);
      if (!mountedRef.current) return;
      setStatus("success");
      setMessage(onOAuth ? `Continued with ${provider}.` : `${provider} selected locally; no OAuth request was sent.`);
    } catch (error) {
      if (!mountedRef.current) return;
      setStatus("error");
      setMessage(getErrorMessage(error));
    } finally {
      if (mountedRef.current) setOauthBusy(null);
    }
  };

  const runSecondaryAction = (kind: "forgot" | "create") => {
    if (kind === "forgot") onForgotPassword?.();
    else onCreateAccount?.();
    setStatus("success");
    setMessage(kind === "forgot"
      ? (onForgotPassword ? "Password recovery opened." : "Password recovery selected in local mode.")
      : (onCreateAccount ? "Account creation opened." : "Account creation selected in local mode."));
  };

  const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950";

  return (
    <Dialog.Root open={isOpen} onOpenChange={setOpen}>
      <div className="flex w-[clamp(280px,90vw,380px)] flex-col items-center justify-center">
        <Dialog.Trigger asChild>
          <motion.button
            type="button"
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
            transition={{ duration: reduceMotion ? 0 : 0.3, ease: EASE }}
            className={`group flex items-center gap-2 rounded-xl bg-slate-900 px-7 py-3.5 text-[14px] font-semibold text-white shadow-lg shadow-slate-900/20 transition-colors hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 ${focusRing}`}
          >
            <Lock aria-hidden className="h-4 w-4" />
            <span>Sign in</span>
            <ArrowRight aria-hidden className="h-4 w-4 motion-safe:transition-transform group-hover:translate-x-0.5" />
          </motion.button>
        </Dialog.Trigger>
        <p className="mt-4 text-[11px] cs-subtle">Opens a keyboard-trapped sign-in dialog</p>
      </div>

      <Dialog.Portal>
        <Dialog.Overlay asChild>
          <motion.div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0 : 0.2 }} />
        </Dialog.Overlay>
        <Dialog.Content
          aria-describedby={ids.description}
          onOpenAutoFocus={(event) => { event.preventDefault(); emailRef.current?.focus(); }}
          className="cs-surface fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-[400px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border cs-border shadow-2xl focus:outline-none"
        >
          <header className="flex items-center justify-between border-b cs-border px-6 py-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white shadow-sm dark:bg-white dark:text-slate-900"><Lock aria-hidden className="h-4 w-4" /></div>
              <div>
                <Dialog.Title className="text-[16px] font-bold leading-tight cs-text">Sign in</Dialog.Title>
                <Dialog.Description id={ids.description} className="text-[11px] cs-muted">Use your account details or an identity provider.</Dialog.Description>
              </div>
            </div>
            <Dialog.Close asChild><button type="button" aria-label="Close sign-in dialog" className={`flex h-9 w-9 items-center justify-center rounded-lg cs-muted transition-colors cs-hover hover:cs-text ${focusRing}`}><X aria-hidden className="h-4 w-4" /></button></Dialog.Close>
          </header>

          <form noValidate aria-busy={busy} aria-describedby={ids.status} className="space-y-4 p-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor={ids.email} className="mb-1.5 block text-[12px] font-semibold cs-text">Email address</label>
              <div className="group relative">
                <Mail aria-hidden className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 cs-subtle group-focus-within:text-slate-600 dark:group-focus-within:text-slate-300" />
                <input ref={emailRef} id={ids.email} name="email" type="email" inputMode="email" autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? ids.emailError : undefined} disabled={busy} placeholder="you@example.com" className="cs-input w-full rounded-xl border cs-border py-2.5 pl-9 pr-3 text-[13px] cs-text placeholder:cs-subtle transition-colors focus:border-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500/35 disabled:opacity-60" onChange={() => errors.email && setErrors((current) => ({ ...current, email: undefined }))} />
              </div>
              <p id={ids.emailError} className="mt-1 min-h-4 text-[10px] text-rose-600 dark:text-rose-400">{errors.email}</p>
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label htmlFor={ids.password} className="text-[12px] font-semibold cs-text">Password</label>
                <button type="button" disabled={busy} onClick={() => runSecondaryAction("forgot")} className={`rounded text-[11px] font-medium cs-muted hover:cs-text disabled:opacity-50 ${focusRing}`}>Forgot password?</button>
              </div>
              <div className="group relative">
                <Lock aria-hidden className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 cs-subtle group-focus-within:text-slate-600 dark:group-focus-within:text-slate-300" />
                <input id={ids.password} name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" aria-invalid={Boolean(errors.password)} aria-describedby={errors.password ? ids.passwordError : undefined} disabled={busy} placeholder="At least 8 characters" className="cs-input w-full rounded-xl border cs-border py-2.5 pl-9 pr-11 text-[13px] cs-text placeholder:cs-subtle transition-colors focus:border-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500/35 disabled:opacity-60" onChange={() => errors.password && setErrors((current) => ({ ...current, password: undefined }))} />
                <button type="button" disabled={busy} onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? "Hide password" : "Show password"} aria-pressed={showPassword} className={`absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg cs-muted cs-hover disabled:opacity-50 ${focusRing}`}>{showPassword ? <EyeOff aria-hidden className="h-4 w-4" /> : <Eye aria-hidden className="h-4 w-4" />}</button>
              </div>
              <p id={ids.passwordError} className="mt-1 min-h-4 text-[10px] text-rose-600 dark:text-rose-400">{errors.password}</p>
            </div>

            <label className="flex cursor-pointer items-center gap-2 text-[12px] cs-muted">
              <input name="remember" type="checkbox" defaultChecked disabled={busy} className="h-4 w-4 rounded border-slate-300 accent-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 dark:border-white/20 dark:accent-slate-200" />
              Keep me signed in on this device
            </label>

            <motion.button type="submit" disabled={busy} whileTap={reduceMotion ? undefined : { scale: 0.98 }} className={`flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 text-[13px] font-semibold text-white shadow-sm transition-colors hover:bg-slate-800 disabled:cursor-wait disabled:opacity-70 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 ${focusRing}`}>
              {busy && oauthBusy === null ? <><Loader2 aria-hidden className="h-4 w-4 motion-safe:animate-spin" />Signing in…</> : <>Sign in<ArrowRight aria-hidden className="h-3.5 w-3.5" /></>}
            </motion.button>

            <p id={ids.status} role="status" aria-live="polite" aria-atomic="true" className={`min-h-4 text-center text-[11px] ${status === "error" ? "text-rose-600 dark:text-rose-400" : status === "success" ? "text-emerald-700 dark:text-emerald-400" : "cs-muted"}`}>{message}</p>

            <div className="flex items-center gap-3"><span className="h-px flex-1 bg-slate-200 dark:bg-white/10" /><span className="text-[10px] font-medium uppercase tracking-wider cs-subtle">or continue with</span><span className="h-px flex-1 bg-slate-200 dark:bg-white/10" /></div>
            <div className="grid grid-cols-3 gap-2">
              <OAuthButton label="Continue with Google" busy={oauthBusy === "google"} disabled={busy} onClick={() => handleOAuth("google")} focusRing={focusRing} reduceMotion={Boolean(reduceMotion)}><GoogleIcon /></OAuthButton>
              <OAuthButton label="Continue with GitHub" busy={oauthBusy === "github"} disabled={busy} onClick={() => handleOAuth("github")} focusRing={focusRing} reduceMotion={Boolean(reduceMotion)}><GitHubIcon /></OAuthButton>
              <OAuthButton label="Continue with Apple" busy={oauthBusy === "apple"} disabled={busy} onClick={() => handleOAuth("apple")} focusRing={focusRing} reduceMotion={Boolean(reduceMotion)}><AppleIcon /></OAuthButton>
            </div>

            <p className="text-center text-[11.5px] cs-muted">New here? <button type="button" disabled={busy} onClick={() => runSecondaryAction("create")} className={`rounded font-semibold cs-text underline-offset-2 hover:underline disabled:opacity-50 ${focusRing}`}>Create an account</button></p>
            <div className="flex items-center justify-center gap-1.5 text-[10px] cs-subtle"><ShieldCheck aria-hidden className="h-3 w-3" />Authentication runs only through supplied callbacks.</div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function OAuthButton({ label, busy, disabled, onClick, focusRing, reduceMotion, children }: { label: string; busy: boolean; disabled: boolean; onClick: () => void; focusRing: string; reduceMotion: boolean; children: ReactNode }) {
  return <motion.button type="button" aria-label={label} aria-busy={busy} disabled={disabled} onClick={onClick} whileTap={reduceMotion ? undefined : { scale: 0.96 }} className={`flex h-11 items-center justify-center rounded-xl border cs-border cs-surface transition-shadow hover:shadow-sm disabled:cursor-wait disabled:opacity-50 ${focusRing}`}>{busy ? <Loader2 aria-hidden className="h-4 w-4 motion-safe:animate-spin" /> : children}</motion.button>;
}

function GoogleIcon() { return <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" /><path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38Z" /></svg>; }
function GitHubIcon() { return <svg viewBox="0 0 24 24" className="h-4 w-4 cs-text" fill="currentColor" aria-hidden><path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.39 1.24-3.23-.12-.31-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.87.12 3.18.77.84 1.24 1.92 1.24 3.23 0 4.62-2.81 5.64-5.49 5.94.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 24 12.5C24 5.87 18.63.5 12 .5Z" /></svg>; }
function AppleIcon() { return <svg viewBox="0 0 24 24" className="h-4 w-4 cs-text" fill="currentColor" aria-hidden><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.08ZM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25Z" /></svg>; }