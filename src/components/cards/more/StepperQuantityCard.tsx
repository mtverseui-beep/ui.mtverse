"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Minus, Plus } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

export interface StepperQuantityCardProps {
  min?: number;
  max?: number;
  classicValue?: number;
  defaultClassicValue?: number;
  onClassicValueChange?: (value: number) => void;
  longPressValue?: number;
  defaultLongPressValue?: number;
  onLongPressValueChange?: (value: number) => void;
  compactValue?: number;
  defaultCompactValue?: number;
  onCompactValueChange?: (value: number) => void;
}

function finiteOr(value: number, fallback: number) {
  return Number.isFinite(value) ? value : fallback;
}

function normalizeBounds(min: number, max: number) {
  const safeMin = finiteOr(min, 0);
  const safeMax = finiteOr(max, 10);
  return { min: Math.min(safeMin, safeMax), max: Math.max(safeMin, safeMax) };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, finiteOr(value, min)));
}

function useControllableNumber(value: number | undefined, defaultValue: number, min: number, max: number, onChange?: (value: number) => void) {
  const [internalValue, setInternalValue] = useState(() => clamp(defaultValue, min, max));
  const current = clamp(value ?? internalValue, min, max);
  const currentRef = useRef(current);
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    currentRef.current = current;
    onChangeRef.current = onChange;
  }, [current, onChange]);

  const setValue = useCallback((requested: number) => {
    const next = clamp(requested, min, max);
    if (Object.is(next, currentRef.current)) return false;
    currentRef.current = next;
    if (value === undefined) setInternalValue(next);
    onChangeRef.current?.(next);
    return true;
  }, [max, min, value]);

  const change = useCallback((delta: number) => setValue(currentRef.current + finiteOr(delta, 0)), [setValue]);
  return [current, change, setValue] as const;
}

export function StepperQuantityCard({
  min: minProp = 0,
  max: maxProp = 10,
  classicValue,
  defaultClassicValue = 5,
  onClassicValueChange,
  longPressValue,
  defaultLongPressValue = 1,
  onLongPressValueChange,
  compactValue,
  defaultCompactValue = 3,
  onCompactValueChange,
}: StepperQuantityCardProps = {}) {
  const bounds = normalizeBounds(minProp, maxProp);
  const reduceMotion = Boolean(useReducedMotion());
  const [classic, changeClassic, setClassic] = useControllableNumber(classicValue, defaultClassicValue, bounds.min, bounds.max, onClassicValueChange);
  const [longPress, changeLongPress, setLongPress] = useControllableNumber(longPressValue, defaultLongPressValue, bounds.min, bounds.max, onLongPressValueChange);
  const [compact, changeCompact, setCompact] = useControllableNumber(compactValue, defaultCompactValue, bounds.min, bounds.max, onCompactValueChange);

  return (
    <motion.div className="relative w-[min(380px,calc(100vw-2rem))] select-none" initial={reduceMotion ? false : { opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: reduceMotion ? 0 : 0.7, ease: EASE }}>
      <div aria-hidden className="pointer-events-none absolute -inset-8 -z-10 rounded-[40px] blur-3xl" style={{ background: "radial-gradient(circle at 30% 20%, rgba(37,99,235,0.08), transparent 55%)" }} />
      <div className="cs-surface overflow-hidden rounded-[22px] border cs-border shadow-[0_30px_70px_-35px_rgba(0,0,0,0.25)]">
        <div className="border-b cs-border px-4 py-4 sm:px-5">
          <div className="flex items-center gap-2.5">
            <div aria-hidden className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/10 ring-1 ring-blue-500/20"><Plus className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" strokeWidth={2.2} /></div>
            <div><h2 className="text-[14px] font-bold tracking-tight cs-text">Stepper & Quantity</h2><p className="text-[10.5px] cs-muted">Number flip · long-press accelerate · pill style</p></div>
          </div>
        </div>
        <div className="space-y-7 p-4 sm:p-5">
          <ClassicStepper value={classic} change={changeClassic} setValue={setClassic} min={bounds.min} max={bounds.max} reduceMotion={reduceMotion} />
          <LongPressStepper value={longPress} change={changeLongPress} setValue={setLongPress} min={bounds.min} max={bounds.max} reduceMotion={reduceMotion} />
          <CompactPillStepper value={compact} change={changeCompact} setValue={setCompact} min={bounds.min} max={bounds.max} reduceMotion={reduceMotion} />
        </div>
        <div className="border-t cs-border px-4 py-2.5 text-center sm:px-5"><p className="text-[9.5px] cs-subtle">Click + / − · hold to accelerate · keyboard ready</p></div>
      </div>
    </motion.div>
  );
}

type StepperProps = {
  value: number;
  change: (delta: number) => boolean;
  setValue: (value: number) => boolean;
  min: number;
  max: number;
  reduceMotion: boolean;
};

const neutralFocus = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-slate-300 dark:focus-visible:ring-offset-slate-950";

function ValueDisplay({ value, setValue, min, max, label, reduceMotion, className = "" }: { value: number; setValue: (value: number) => boolean; min: number; max: number; label: string; reduceMotion: boolean; className?: string }) {
  const pageStep = Math.max(1, Math.ceil((max - min) / 10));
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    let next: number | undefined;
    switch (event.key) {
      case "ArrowUp": next = value + 1; break;
      case "ArrowDown": next = value - 1; break;
      case "PageUp": next = value + pageStep; break;
      case "PageDown": next = value - pageStep; break;
      case "Home": next = min; break;
      case "End": next = max; break;
      default: return;
    }
    event.preventDefault();
    setValue(next);
  };

  return (
    <div role="spinbutton" tabIndex={0} aria-label={label} aria-valuemin={min} aria-valuemax={max} aria-valuenow={value} aria-valuetext={`${value}`} onKeyDown={handleKeyDown} className={`${neutralFocus} ${className}`}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span key={value} aria-hidden className="block" initial={reduceMotion ? false : { y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={reduceMotion ? undefined : { y: 8, opacity: 0 }} transition={{ duration: reduceMotion ? 0 : 0.16 }}>{value}</motion.span>
      </AnimatePresence>
    </div>
  );
}

function ClassicStepper({ value, change, setValue, min, max, reduceMotion }: StepperProps) {
  return (
    <section aria-labelledby="classic-stepper-label">
      <h3 id="classic-stepper-label" className="mb-2 text-[10px] font-bold uppercase tracking-wider cs-subtle">1 · Classic Stepper ({min}–{max})</h3>
      <div className="flex items-center justify-center gap-3" role="group" aria-labelledby="classic-stepper-label">
        <motion.button type="button" aria-label="Decrease classic quantity" onClick={() => change(-1)} whileTap={reduceMotion ? undefined : { scale: 0.9 }} disabled={value <= min} className={`cs-surface flex h-9 w-9 items-center justify-center rounded-lg border cs-border cs-text transition-colors motion-reduce:transition-none cs-hover disabled:cursor-not-allowed disabled:opacity-40 ${neutralFocus}`}><Minus aria-hidden className="h-4 w-4" strokeWidth={2.4} /></motion.button>
        <ValueDisplay value={value} setValue={setValue} min={min} max={max} label="Classic quantity" reduceMotion={reduceMotion} className="flex h-9 w-12 items-center justify-center overflow-hidden rounded-md text-[18px] font-bold tabular-nums cs-text" />
        <motion.button type="button" aria-label="Increase classic quantity" onClick={() => change(1)} whileTap={reduceMotion ? undefined : { scale: 0.9 }} disabled={value >= max} className={`cs-surface flex h-9 w-9 items-center justify-center rounded-lg border cs-border cs-text transition-colors motion-reduce:transition-none cs-hover disabled:cursor-not-allowed disabled:opacity-40 ${neutralFocus}`}><Plus aria-hidden className="h-4 w-4" strokeWidth={2.4} /></motion.button>
      </div>
    </section>
  );
}

function LongPressStepper({ value, change, setValue, min, max, reduceMotion }: StepperProps) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeRef = useRef(false);
  const suppressClickUntilRef = useRef(0);
  const changeRef = useRef(change);
  changeRef.current = change;

  const stopHold = useCallback(() => {
    activeRef.current = false;
    if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
  }, []);

  const scheduleNext = useCallback(function schedule(delta: number, delay: number) {
    timeoutRef.current = setTimeout(() => {
      if (!activeRef.current) return;
      if (!changeRef.current(delta)) {
        stopHold();
        return;
      }
      schedule(delta, Math.max(45, delay * 0.82));
    }, delay);
  }, [stopHold]);

  const startHold = useCallback((delta: number) => {
    if (activeRef.current) return;
    activeRef.current = true;
    suppressClickUntilRef.current = Date.now() + 900;
    if (!changeRef.current(delta)) {
      stopHold();
      return;
    }
    scheduleNext(delta, 420);
  }, [scheduleNext, stopHold]);

  useEffect(() => {
    const stopOnVisibilityChange = () => { if (document.visibilityState !== "visible") stopHold(); };
    const stopOnKeyUp = (event: KeyboardEvent) => { if (event.key === " " || event.key === "Enter") stopHold(); };
    window.addEventListener("pointerup", stopHold);
    window.addEventListener("pointercancel", stopHold);
    window.addEventListener("blur", stopHold);
    window.addEventListener("keyup", stopOnKeyUp);
    document.addEventListener("visibilitychange", stopOnVisibilityChange);
    return () => {
      stopHold();
      window.removeEventListener("pointerup", stopHold);
      window.removeEventListener("pointercancel", stopHold);
      window.removeEventListener("blur", stopHold);
      window.removeEventListener("keyup", stopOnKeyUp);
      document.removeEventListener("visibilitychange", stopOnVisibilityChange);
    };
  }, [stopHold]);

  const longPressButtonProps = (delta: number) => ({
    onPointerDown: (event: React.PointerEvent<HTMLButtonElement>) => {
      if (event.button !== 0) return;
      event.preventDefault();
      try { event.currentTarget.setPointerCapture(event.pointerId); } catch { /* Pointer may already be released. */ }
      startHold(delta);
    },
    onPointerUp: (event: React.PointerEvent<HTMLButtonElement>) => {
      suppressClickUntilRef.current = Date.now() + 900;
      if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
      stopHold();
    },
    onPointerCancel: stopHold,
    onLostPointerCapture: stopHold,
    onKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key !== " " && event.key !== "Enter") return;
      event.preventDefault();
      if (!event.repeat) startHold(delta);
    },
    onKeyUp: (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key !== " " && event.key !== "Enter") return;
      event.preventDefault();
      suppressClickUntilRef.current = Date.now() + 900;
      stopHold();
    },
    onBlur: stopHold,
    onClick: () => {
      if (Date.now() <= suppressClickUntilRef.current) return;
      change(delta);
    },
  });

  return (
    <section aria-labelledby="long-press-stepper-label">
      <h3 id="long-press-stepper-label" className="mb-2 text-[10px] font-bold uppercase tracking-wider cs-subtle">2 · Long-Press Accelerate (hold +/−)</h3>
      <div className="flex items-center justify-center gap-3" role="group" aria-labelledby="long-press-stepper-label">
        <motion.button type="button" aria-label="Decrease quantity; hold to accelerate" disabled={value <= min} {...longPressButtonProps(-1)} whileTap={reduceMotion ? undefined : { scale: 0.9 }} className={`flex h-9 w-9 touch-none items-center justify-center rounded-lg bg-rose-600 text-white transition-opacity motion-reduce:transition-none disabled:cursor-not-allowed disabled:opacity-40 ${neutralFocus}`}><Minus aria-hidden className="h-4 w-4" strokeWidth={2.4} /></motion.button>
        <ValueDisplay value={value} setValue={setValue} min={min} max={max} label="Accelerating quantity" reduceMotion={reduceMotion} className="cs-input flex h-9 min-w-[3rem] items-center justify-center overflow-hidden rounded-lg border cs-border px-2 text-[16px] font-bold tabular-nums cs-text" />
        <motion.button type="button" aria-label="Increase quantity; hold to accelerate" disabled={value >= max} {...longPressButtonProps(1)} whileTap={reduceMotion ? undefined : { scale: 0.9 }} className={`flex h-9 w-9 touch-none items-center justify-center rounded-lg bg-emerald-600 text-white transition-opacity motion-reduce:transition-none disabled:cursor-not-allowed disabled:opacity-40 ${neutralFocus}`}><Plus aria-hidden className="h-4 w-4" strokeWidth={2.4} /></motion.button>
      </div>
    </section>
  );
}

function CompactPillStepper({ value, change, setValue, min, max, reduceMotion }: StepperProps) {
  return (
    <section aria-labelledby="compact-stepper-label">
      <h3 id="compact-stepper-label" className="mb-2 text-[10px] font-bold uppercase tracking-wider cs-subtle">3 · Compact Pill</h3>
      <div className="flex items-center justify-center py-1">
        <div className="cs-surface flex items-center gap-1 rounded-full border cs-border p-1" role="group" aria-labelledby="compact-stepper-label">
          <motion.button type="button" aria-label="Decrease compact quantity" onClick={() => change(-1)} disabled={value <= min} whileTap={reduceMotion ? undefined : { scale: 0.85 }} className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors motion-reduce:transition-none cs-hover disabled:cursor-not-allowed disabled:opacity-40 ${neutralFocus}`}><Minus aria-hidden className="h-3.5 w-3.5 cs-text" strokeWidth={2.4} /></motion.button>
          <ValueDisplay value={value} setValue={setValue} min={min} max={max} label="Compact quantity" reduceMotion={reduceMotion} className="flex h-8 w-9 items-center justify-center overflow-hidden rounded-full text-center text-[15px] font-bold tabular-nums cs-text" />
          <motion.button type="button" aria-label="Increase compact quantity" onClick={() => change(1)} disabled={value >= max} whileTap={reduceMotion ? undefined : { scale: 0.85 }} className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors motion-reduce:transition-none cs-hover disabled:cursor-not-allowed disabled:opacity-40 ${neutralFocus}`}><Plus aria-hidden className="h-3.5 w-3.5 cs-text" strokeWidth={2.4} /></motion.button>
        </div>
      </div>
    </section>
  );
}
