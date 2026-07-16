"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { AlertCircle, Check, Loader2, Phone, RotateCcw } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

export type OtpSendContext = { signal: AbortSignal };
export type OtpVerificationState = "idle" | "sending" | "counting" | "ready" | "error";

export interface OtpVerificationCardProps {
  onSendCode?: (context: OtpSendContext) => Promise<void>;
  duration?: number;
  onStateChange?: (state: OtpVerificationState) => void;
  onCountdownChange?: (secondsRemaining: number) => void;
}

function getErrorMessage(error: unknown) {
  return error instanceof Error && error.message.trim()
    ? error.message
    : "The code request failed. Please retry.";
}

export function OtpVerificationCard({
  onSendCode,
  duration = 60,
  onStateChange,
  onCountdownChange,
}: OtpVerificationCardProps = {}) {
  const safeDuration = Math.max(1, Math.floor(Number.isFinite(duration) ? duration : 60));
  const demoMode = !onSendCode;
  const initialMessage = demoMode
    ? "Demo mode: this starts a local timer only; no code or SMS is sent."
    : "Ready to request a verification code.";
  const [state, setState] = useState<OtpVerificationState>("idle");
  const [seconds, setSeconds] = useState(safeDuration);
  const [message, setMessage] = useState(initialMessage);
  const stateRef = useRef<OtpVerificationState>("idle");
  const mountedRef = useRef(true);
  const controllerRef = useRef<AbortController | null>(null);
  const requestRef = useRef(0);
  const countdownCallbackRef = useRef(onCountdownChange);
  const statusId = useId();
  const titleId = useId();
  const reduceMotion = Boolean(useReducedMotion());
  const radius = 16;
  const circumference = 2 * Math.PI * radius;


  const setCardState = useCallback((nextState: OtpVerificationState) => {
    stateRef.current = nextState;
    if (mountedRef.current) setState(nextState);
  }, []);

  useEffect(() => {
    countdownCallbackRef.current = onCountdownChange;
  }, [onCountdownChange]);

  useEffect(() => {
    onStateChange?.(state);
  }, [onStateChange, state]);

  useEffect(() => {
    if (stateRef.current !== "idle") return;
    setMessage(
      onSendCode
        ? "Ready to request a verification code."
        : "Demo mode: this starts a local timer only; no code or SMS is sent.",
    );
  }, [onSendCode]);

  useEffect(() => {
    if (state !== "counting") return;

    const endsAt = Date.now() + safeDuration * 1000;
    setSeconds(safeDuration);
    countdownCallbackRef.current?.(safeDuration);

    let intervalId: number | undefined;
    const tick = () => {
      if (!mountedRef.current || stateRef.current !== "counting") return;
      const remaining = Math.max(0, Math.ceil((endsAt - Date.now()) / 1000));
      setSeconds((current) => {
        if (current !== remaining) countdownCallbackRef.current?.(remaining);
        return remaining;
      });

      if (remaining === 0) {
        if (intervalId !== undefined) window.clearInterval(intervalId);
        setMessage(
          demoMode
            ? "Demo timer complete. You can restart it; no code was sent."
            : "Resend is available. No new request has been made yet.",
        );
        setCardState("ready");
      }
    };

    intervalId = window.setInterval(tick, 250);
    tick();
    return () => {
      if (intervalId !== undefined) window.clearInterval(intervalId);
    };
  }, [demoMode, safeDuration, setCardState, state]);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      requestRef.current += 1;
      controllerRef.current?.abort();
      controllerRef.current = null;
    };
  }, []);

  const handleSend = () => {
    const currentState = stateRef.current;
    if (currentState === "sending" || currentState === "counting") return;

    if (!onSendCode) {
      controllerRef.current?.abort();
      controllerRef.current = null;
      requestRef.current += 1;
      setMessage("Local demo timer started. No verification code or SMS was sent.");
      setCardState("counting");
      return;
    }

    const requestId = ++requestRef.current;
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    setMessage("Requesting a verification code…");
    setCardState("sending");

    void (async () => {
      try {
        await onSendCode({ signal: controller.signal });
        if (!mountedRef.current || requestRef.current !== requestId || controller.signal.aborted) return;
        setMessage("Code request succeeded. The resend countdown has started.");
        setCardState("counting");
      } catch (error) {
        if (!mountedRef.current || requestRef.current !== requestId || controller.signal.aborted) return;
        setMessage(getErrorMessage(error));
        setCardState("error");
      } finally {
        if (requestRef.current === requestId && controllerRef.current === controller) {
          controllerRef.current = null;
        }
      }
    })();
  };

  const progress = state === "counting"
    ? ((safeDuration - seconds) / safeDuration) * 100
    : state === "ready"
      ? 100
      : 0;
  const canSend = state === "idle" || state === "ready" || state === "error";
  const buttonLabel = state === "sending"
    ? "Requesting…"
    : state === "counting"
      ? `${demoMode ? "Restart demo" : "Resend"} in ${seconds}s`
      : state === "error"
        ? "Retry Request"
        : state === "ready"
          ? demoMode ? "Restart Demo Timer" : "Resend Code"
          : demoMode ? "Start Demo Timer" : "Request Code";

  return (
    <motion.section
      aria-labelledby={titleId}
      className="relative w-[clamp(17.5rem,88vw,23.75rem)]"
      initial={reduceMotion ? false : { opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: reduceMotion ? 0 : 0.7, ease: EASE }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-8 -z-10 rounded-[40px] blur-3xl"
        style={{ background: "radial-gradient(circle at 30% 20%, rgba(5,150,105,0.10), transparent 55%)" }}
      />
      <div className="cs-surface overflow-hidden rounded-[22px] border cs-border shadow-[0_30px_70px_-35px_rgba(0,0,0,0.25)]">
        <header className="border-b cs-border px-4 py-4 sm:px-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 ring-1 ring-emerald-500/20">
              <Phone className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" strokeWidth={2.2} />
            </div>
            <div className="min-w-0">
              <h2 id={titleId} className="text-[14px] font-bold tracking-tight cs-text">OTP Verification</h2>
              <p className="text-[10.5px] cs-muted">
                {demoMode ? "Local countdown demo · no backend connected" : "Callback-backed request · countdown · retry"}
              </p>
            </div>
          </div>
        </header>

        <div className="space-y-5 p-4 sm:p-5">
          <div
            id={statusId}
            role="status"
            aria-live="polite"
            aria-atomic="true"
            className={`flex min-h-11 items-center justify-center gap-2 rounded-xl border px-3 py-2 text-center text-[11px] ${state === "error" ? "border-rose-500/25 bg-rose-500/5 text-rose-700 dark:text-rose-300" : "cs-border cs-muted"}`}
          >
            {state === "error" && <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden />}
            <span>{message}</span>
          </div>

          <motion.button
            type="button"
            aria-describedby={statusId}
            aria-busy={state === "sending"}
            onClick={handleSend}
            disabled={!canSend}
            whileTap={reduceMotion || !canSend ? undefined : { scale: 0.98 }}
            animate={!reduceMotion && state === "ready" ? { scale: [1, 1.02, 1] } : undefined}
            transition={!reduceMotion && state === "ready" ? { duration: 1.6, repeat: Infinity } : { duration: reduceMotion ? 0 : 0.15 }}
            className={`relative flex w-full items-center justify-center gap-3 rounded-xl px-3 py-3 text-[13px] font-semibold text-white shadow-sm transition-[filter,background-color] motion-reduce:transition-none hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:brightness-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950 ${state === "error" ? "bg-rose-600 dark:bg-rose-500" : state === "ready" ? "bg-emerald-600 dark:bg-emerald-500" : "bg-slate-900 dark:bg-slate-100 dark:text-slate-900"}`}
          >
            <span className="relative flex h-9 w-9 shrink-0 items-center justify-center">
              <svg className="absolute inset-0 -rotate-90" viewBox="0 0 40 40" aria-hidden>
                <circle cx="20" cy="20" r={radius} fill="none" stroke="currentColor" strokeOpacity=".2" strokeWidth="2.5" />
                {(state === "counting" || state === "ready") && (
                  <motion.circle
                    cx="20"
                    cy="20"
                    r={radius}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    animate={{ strokeDashoffset: circumference - (progress / 100) * circumference }}
                    transition={{ duration: reduceMotion ? 0 : 0.2 }}
                  />
                )}
              </svg>
              <span className="relative z-10" aria-hidden>
                {state === "sending" && <Loader2 className={`h-4 w-4 ${reduceMotion ? "" : "animate-spin"}`} />}
                {state === "counting" && <span className="text-[9px] font-bold tabular-nums">{seconds}</span>}
                {state === "ready" && <RotateCcw className="h-4 w-4" />}
                {state === "error" && <AlertCircle className="h-4 w-4" />}
                {state === "idle" && <Phone className="h-4 w-4" />}
              </span>
            </span>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={buttonLabel}
                initial={reduceMotion ? false : { opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -3 }}
                transition={{ duration: reduceMotion ? 0 : 0.15 }}
              >
                {buttonLabel}
              </motion.span>
            </AnimatePresence>
          </motion.button>

          {state === "counting" && (
            <div className="flex items-center justify-center gap-1.5 text-center text-[10px] text-emerald-700 dark:text-emerald-300">
              <Check className="h-3 w-3 shrink-0" aria-hidden />
              {demoMode ? "Local demo timer is running" : "Code request succeeded"}
            </div>
          )}
        </div>

        <footer className="border-t cs-border px-4 py-2.5 text-center sm:px-5">
          <p className="text-[9.5px] cs-subtle">
            {demoMode
              ? `Demo restart unlocks after ${safeDuration}s; this card does not send messages.`
              : `Resend unlocks ${safeDuration}s after a successful callback.`}
          </p>
        </footer>
      </div>
    </motion.section>
  );
}
