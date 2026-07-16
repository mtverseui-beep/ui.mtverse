"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Ban, Check, CreditCard, Loader2, RotateCcw, Sparkles, UploadCloud, X, AlertCircle } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

type OperationState = "idle" | "loading" | "success" | "error" | "cancelled";

export type OperationContext = {
  signal: AbortSignal;
  onProgress: (progress: number) => void;
};

export type LoadingOperation = (context: OperationContext) => Promise<void>;

export interface LoadingStateButtonsCardProps {
  onUpload?: LoadingOperation;
  onActivate?: LoadingOperation;
  onPayment?: LoadingOperation;
  onSync?: LoadingOperation;
}

type OperationRowProps = {
  eyebrow: string;
  idleLabel: string;
  loadingLabel: string;
  successLabel: string;
  icon: ReactNode;
  operation?: LoadingOperation;
  variant: "liquid" | "burst" | "morph" | "ring";
};

function getErrorMessage(error: unknown) {
  return error instanceof Error && error.message ? error.message : "The operation failed. Please retry.";
}

export function LoadingStateButtonsCard({ onUpload, onActivate, onPayment, onSync }: LoadingStateButtonsCardProps = {}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div className="relative w-[clamp(280px,88vw,380px)]" initial={reduceMotion ? false : { opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: reduceMotion ? 0.01 : 0.7, ease: EASE }}>
      <div aria-hidden className="pointer-events-none absolute -inset-8 -z-10 rounded-[40px] blur-3xl" style={{ background: "radial-gradient(circle at 30% 20%, rgba(100,116,139,0.10), transparent 55%)" }} />
      <div className="cs-surface overflow-hidden rounded-[22px] border cs-border shadow-[0_30px_70px_-35px_rgba(0,0,0,0.25)]">
        <header className="border-b cs-border px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-500/10 ring-1 ring-slate-500/20"><Loader2 className="h-3.5 w-3.5 text-slate-600 dark:text-slate-300" strokeWidth={2.2} /></div>
            <div><h2 className="text-[14px] font-bold tracking-tight cs-text">Async Operations</h2><p className="text-[10.5px] cs-muted">Promise-driven · cancellable · retryable</p></div>
          </div>
        </header>

        <div className="space-y-5 p-5">
          <OperationRow eyebrow="1 · Liquid Progress" idleLabel="Upload" loadingLabel="Uploading…" successLabel="Uploaded" icon={<UploadCloud className="h-4 w-4" />} operation={onUpload} variant="liquid" />
          <OperationRow eyebrow="2 · Success Burst" idleLabel="Activate" loadingLabel="Activating…" successLabel="Activated" icon={<Sparkles className="h-4 w-4" />} operation={onActivate} variant="burst" />
          <OperationRow eyebrow="3 · Icon Morph" idleLabel="Pay $129.00" loadingLabel="Processing…" successLabel="Complete" icon={<CreditCard className="h-4 w-4" />} operation={onPayment} variant="morph" />
          <OperationRow eyebrow="4 · Progress Ring" idleLabel="Sync Data" loadingLabel="Syncing…" successLabel="Synced" icon={<RotateCcw className="h-4 w-4" />} operation={onSync} variant="ring" />
        </div>

        <footer className="border-t cs-border px-5 py-2.5 text-center"><p className="text-[9.5px] cs-subtle">Progress is shown only when your callback reports it</p></footer>
      </div>
    </motion.div>
  );
}

function OperationRow({ eyebrow, idleLabel, loadingLabel, successLabel, icon, operation, variant }: OperationRowProps) {
  const [state, setState] = useState<OperationState>("idle");
  const [progress, setProgress] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const controllerRef = useRef<AbortController | null>(null);
  const runRef = useRef(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => () => {
    runRef.current += 1;
    controllerRef.current?.abort();
  }, []);

  const run = async () => {
    const runId = ++runRef.current;
    const controller = new AbortController();
    let settled = false;
    controllerRef.current?.abort();
    controllerRef.current = controller;
    setState("loading");
    setProgress(null);
    setMessage(`${loadingLabel.replace("…", "")} in progress.`);

    try {
      if (operation) {
        await operation({
          signal: controller.signal,
          onProgress: (value) => {
            if (!settled && runRef.current === runId && !controller.signal.aborted) setProgress(Math.min(100, Math.max(0, Math.round(value))));
          },
        });
      } else {
        await Promise.resolve();
      }
      if (runRef.current !== runId || controller.signal.aborted) return;
      setProgress(operation ? 100 : null);
      setState("success");
      setMessage(operation ? `${successLabel}.` : "Completed in local mode — no action callback was provided.");
    } catch (error) {
      if (runRef.current !== runId) return;
      if (controller.signal.aborted || (error instanceof DOMException && error.name === "AbortError")) {
        setState("cancelled");
        setMessage("Operation cancelled. You can retry.");
      } else {
        setState("error");
        setMessage(getErrorMessage(error));
      }
    } finally {
      settled = true;
      if (runRef.current === runId) controllerRef.current = null;
    }
  };

  const cancel = () => {
    runRef.current += 1;
    controllerRef.current?.abort();
    controllerRef.current = null;
    setState("cancelled");
    setMessage("Operation cancelled. You can retry.");
  };

  const isLoading = state === "loading";
  const label = isLoading ? loadingLabel : state === "success" ? successLabel : state === "error" || state === "cancelled" ? "Retry" : idleLabel;
  const statusColor = state === "error" ? "text-rose-600 dark:text-rose-400" : state === "success" ? "text-emerald-600 dark:text-emerald-400" : "cs-muted";
  const background = state === "success" ? "bg-emerald-600" : state === "error" ? "bg-rose-600" : state === "cancelled" ? "bg-slate-600" : "bg-slate-900 dark:bg-slate-100 dark:text-slate-900";

  return (
    <section aria-label={eyebrow} aria-busy={isLoading}>
      <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider cs-subtle">{eyebrow}</p>
      <div className="flex gap-2">
        <motion.button
          type="button"
          onClick={run}
          disabled={isLoading}
          whileTap={reduceMotion || isLoading ? undefined : { scale: 0.98 }}
          className={`relative flex min-h-11 flex-1 items-center justify-center gap-2 overflow-hidden rounded-xl px-4 text-[12.5px] font-semibold text-white shadow-sm transition hover:brightness-110 disabled:cursor-wait disabled:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950 ${background}`}
        >
          {variant === "liquid" && isLoading && progress !== null && <motion.span aria-hidden className="absolute inset-x-0 bottom-0 bg-slate-600/80" initial={{ height: 0 }} animate={{ height: `${progress}%` }} transition={{ duration: reduceMotion ? 0 : 0.2 }} />}
          {variant === "burst" && state === "success" && !reduceMotion && <Burst />}
          <span className="relative z-10 flex items-center gap-2">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={state} initial={reduceMotion ? false : { opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={reduceMotion ? undefined : { opacity: 0 }} className="flex items-center gap-2">
                <StateIcon state={state} variant={variant} progress={progress} fallback={icon} />
                <span>{label}{isLoading && progress !== null ? ` ${progress}%` : ""}</span>
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.button>
        {isLoading && (
          <button type="button" onClick={cancel} aria-label={`Cancel ${idleLabel.toLowerCase()}`} className="flex w-11 items-center justify-center rounded-xl border cs-border cs-surface cs-muted transition cs-hover hover:cs-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500/50">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      <p role="status" aria-live="polite" aria-atomic="true" className={`mt-1.5 min-h-4 text-[10px] ${statusColor}`}>{message}</p>
    </section>
  );
}

function StateIcon({ state, variant, progress, fallback }: { state: OperationState; variant: OperationRowProps["variant"]; progress: number | null; fallback: ReactNode }) {
  if (state === "loading") {
    if (variant === "ring" && progress !== null) return <ProgressRing progress={progress} />;
    return <Loader2 className="h-4 w-4 motion-safe:animate-spin" />;
  }
  if (state === "success") return <Check className="h-4 w-4" strokeWidth={3} />;
  if (state === "error") return <AlertCircle className="h-4 w-4" />;
  if (state === "cancelled") return <Ban className="h-4 w-4" />;
  return <>{fallback}</>;
}

function ProgressRing({ progress }: { progress: number }) {
  const radius = 7;
  const circumference = 2 * Math.PI * radius;
  return <svg viewBox="0 0 18 18" className="h-5 w-5 -rotate-90" aria-hidden><circle cx="9" cy="9" r={radius} fill="none" stroke="currentColor" strokeOpacity=".25" strokeWidth="2" /><circle cx="9" cy="9" r={radius} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={circumference - (progress / 100) * circumference} /></svg>;
}

function Burst() {
  const points = [[0, -22], [18, -14], [23, 2], [14, 18], [-14, 18], [-23, 2], [-18, -14]];
  return <span aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">{points.map(([x, y], index) => <motion.span key={index} className="absolute h-1 w-1 rounded-full bg-white" initial={{ x: 0, y: 0, opacity: 1 }} animate={{ x, y, opacity: 0 }} transition={{ duration: 0.55, ease: "easeOut" }} />)}</span>;
}
