"use client";

import { useId, useState } from "react";
import * as Progress from "@radix-ui/react-progress";
import { Check, Download, Minus, Plus, RotateCcw, Upload, Zap } from "lucide-react";

const clamp = (value: number) => Math.min(100, Math.max(0, value));
const button = "flex min-h-9 items-center justify-center gap-1.5 rounded-lg border cs-border cs-input px-2 text-[10px] font-semibold cs-text transition cs-hover disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--card-text-muted)] motion-reduce:transition-none";

export function ProgressBarCard() {
  return <div className="relative w-[min(100%,520px)]"><div aria-hidden className="pointer-events-none absolute -inset-6 -z-10 rounded-[40px] blur-3xl" style={{ background: "radial-gradient(circle at 30% 20%, rgba(16,185,129,.1), transparent 55%)" }} /><div className="cs-surface overflow-hidden rounded-[22px] border cs-border shadow-[0_30px_70px_-35px_rgba(0,0,0,.35)]"><header className="border-b cs-border px-4 py-4 sm:px-5"><div className="flex items-center gap-2.5"><span aria-hidden className="flex h-8 w-8 items-center justify-center rounded-lg border cs-border cs-input"><Zap className="h-4 w-4 cs-muted" /></span><div><h2 className="text-[14px] font-bold cs-text">Progress</h2><p className="text-[10.5px] cs-muted">User-controlled, accessible progress patterns</p></div></div></header><div className="space-y-7 p-4 sm:p-5"><LinearProgress /><CircularProgress /><SegmentedProgress /></div></div></div>;
}

function SectionLabel({ id, children, value }: { id: string; children: React.ReactNode; value: number }) {
  return <div className="mb-2 flex items-center justify-between gap-2"><span id={id} className="text-[10px] font-bold uppercase tracking-wider cs-subtle">{children}</span><span className="text-[10px] font-semibold tabular-nums cs-text">{Math.round(value)}%</span></div>;
}

function LinearProgress() {
  const id = useId();
  const [value, setValue] = useState(45);
  const update = (amount: number) => setValue((current) => clamp(current + amount));
  return <section aria-labelledby={`${id}-label`}><SectionLabel id={`${id}-label`} value={value}>1 · Download</SectionLabel><Progress.Root value={value} max={100} aria-labelledby={`${id}-label`} aria-valuetext={`${value} percent downloaded`} className="relative h-3 overflow-hidden rounded-full bg-[var(--card-border)]"><Progress.Indicator className="h-full rounded-full bg-gradient-to-r from-slate-500 to-slate-700 transition-transform duration-300 motion-reduce:transition-none" style={{ transform: `translateX(-${100 - value}%)` }} /></Progress.Root><div className="mt-2 grid grid-cols-3 gap-2"><button type="button" onClick={() => update(-10)} disabled={value === 0} className={button}><Minus aria-hidden className="h-3 w-3" />10%</button><button type="button" onClick={() => update(10)} disabled={value === 100} className={button}><Plus aria-hidden className="h-3 w-3" />10%</button><button type="button" onClick={() => setValue(0)} disabled={value === 0} className={button}><RotateCcw aria-hidden className="h-3 w-3" />Reset</button></div><p aria-live="polite" className="sr-only">Download progress is {value} percent.</p></section>;
}

function CircularProgress() {
  const id = useId();
  const [value, setValue] = useState(65);
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  return <section aria-labelledby={`${id}-label`}><SectionLabel id={`${id}-label`} value={value}>2 · Upload ring</SectionLabel><div className="flex flex-wrap items-center justify-center gap-4 py-1"><Progress.Root value={value} max={100} aria-labelledby={`${id}-label`} aria-valuetext={`${value} percent uploaded`} className="relative flex h-20 w-20 items-center justify-center"><svg aria-hidden className="absolute inset-0 -rotate-90" viewBox="0 0 72 72"><circle cx="36" cy="36" r={radius} fill="none" stroke="var(--card-border)" strokeWidth="5" /><circle cx="36" cy="36" r={radius} fill="none" stroke="var(--card-text-muted)" strokeWidth="5" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={circumference - (value / 100) * circumference} className="transition-[stroke-dashoffset] duration-300 motion-reduce:transition-none" /></svg><span aria-hidden className="text-[16px] font-bold tabular-nums cs-text">{value}%</span></Progress.Root><div className="grid grid-cols-2 gap-1.5" aria-label="Set upload progress">{[25, 50, 75, 100].map((option) => <button key={option} type="button" onClick={() => setValue(option)} aria-pressed={value === option} className={`${button} aria-pressed:border-[var(--card-text-muted)]`}>{option}%</button>)}</div></div><p aria-live="polite" className="sr-only">Upload progress is {value} percent.</p></section>;
}

function SegmentedProgress() {
  const id = useId();
  const steps = ["Cart", "Address", "Payment", "Review", "Done"];
  const [step, setStep] = useState(2);
  const value = (step / (steps.length - 1)) * 100;
  return <section aria-labelledby={`${id}-label`}><SectionLabel id={`${id}-label`} value={value}>3 · Checkout</SectionLabel><Progress.Root value={value} max={100} aria-labelledby={`${id}-label`} aria-valuetext={`Step ${step + 1} of ${steps.length}: ${steps[step]}`} className="sr-only"><Progress.Indicator /></Progress.Root><ol className="flex items-start" aria-label="Checkout steps">{steps.map((label, index) => { const complete = index < step; const current = index === step; return <li key={label} className="relative flex min-w-0 flex-1 flex-col items-center gap-1">{index > 0 && <span aria-hidden className="absolute right-1/2 top-3 h-1 w-full -translate-y-1/2" style={{ background: index <= step ? "#10b981" : "var(--card-border)" }} />}<button type="button" onClick={() => setStep(index)} aria-current={current ? "step" : undefined} aria-label={`${label}, step ${index + 1} of ${steps.length}${complete ? ", completed" : current ? ", current" : ""}`} className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full border-2 text-[9px] font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--card-text-muted)] motion-reduce:transition-none" style={{ borderColor: index <= step ? "#10b981" : "var(--card-border)", background: index <= step ? "#10b981" : "var(--card-surface)", color: index <= step ? "white" : "var(--card-text-muted)" }}>{complete ? <Check aria-hidden className="h-3 w-3" /> : index + 1}</button><span className="relative z-10 max-w-full truncate text-[7.5px] font-semibold cs-muted">{label}</span></li>; })}</ol><div className="mt-3 grid grid-cols-2 gap-2"><button type="button" onClick={() => setStep((current) => Math.max(0, current - 1))} disabled={step === 0} className={button}>Previous</button><button type="button" onClick={() => setStep((current) => Math.min(steps.length - 1, current + 1))} disabled={step === steps.length - 1} className={button}>{step === steps.length - 1 ? <><Check aria-hidden className="h-3 w-3" />Complete</> : <>Next<Upload aria-hidden className="h-3 w-3" /></>}</button></div><p aria-live="polite" className="sr-only">Current checkout step: {steps[step]}</p></section>;
}
