"use client";

import { useId, useState } from "react";
import * as Slider from "@radix-ui/react-slider";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;
const rootClass = "relative flex h-11 w-full touch-none select-none items-center";
const trackClass = "relative h-2 w-full grow overflow-hidden rounded-full bg-[var(--card-input-bg)] ring-1 ring-inset ring-[var(--card-border)]";
const thumbClass = "block h-6 w-6 cursor-grab touch-none rounded-full border-2 border-violet-500 bg-[var(--card-surface)] shadow-md outline-none transition-shadow active:cursor-grabbing focus-visible:shadow-[0_0_0_4px_var(--card-border)] motion-reduce:transition-none";

export function SliderRangeCard() {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div className="relative w-[clamp(300px,92vw,420px)]" initial={reduceMotion ? false : { opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: reduceMotion ? 0 : 0.55, ease: EASE }}>
      <div aria-hidden className="pointer-events-none absolute -inset-8 -z-10 rounded-[40px] blur-3xl" style={{ background: "radial-gradient(circle at 30% 20%, rgba(168,85,247,0.08), transparent 55%)" }} />
      <div className="cs-surface overflow-hidden rounded-[22px] border cs-border shadow-[0_30px_70px_-35px_rgba(0,0,0,0.25)]">
        <header className="border-b cs-border px-4 py-4 sm:px-5"><div className="flex items-center gap-2.5"><div aria-hidden className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-500/10 ring-1 ring-violet-500/20"><span className="text-[10px] font-bold text-violet-600 dark:text-violet-400">↔</span></div><div><h2 className="text-[14px] font-bold tracking-tight cs-text">Range Slider</h2><p className="text-[10.5px] cs-muted">Touch, pointer, and keyboard ready</p></div></div></header>
        <div className="space-y-7 p-4 sm:p-5"><DualRangeSlider /><SingleValueSlider /><SteppedSlider /></div>
        <footer className="border-t cs-border px-4 py-2.5 text-center"><p className="text-[9.5px] cs-subtle">Arrow keys adjust · Home/End jump · Page keys move faster</p></footer>
      </div>
    </motion.div>
  );
}

function Heading({ id, title, value }: { id: string; title: string; value: string }) {
  return <div className="mb-1 flex items-center justify-between gap-3"><h3 id={id} className="text-[10px] font-bold uppercase tracking-wider cs-subtle">{title}</h3><output className="text-[11px] font-semibold tabular-nums cs-text">{value}</output></div>;
}

function DualRangeSlider() {
  const labelId = useId();
  const [value, setValue] = useState([250, 750]);
  return <section aria-labelledby={labelId}>
    <Heading id={labelId} title="1 · Budget Range" value={`$${value[0]} — $${value[1]}`} />
    <Slider.Root className={rootClass} value={value} onValueChange={setValue} min={0} max={1000} step={10} minStepsBetweenThumbs={5} name="budget-range" aria-labelledby={labelId}>
      <Slider.Track className={trackClass}><Slider.Range className="absolute h-full bg-gradient-to-r from-violet-500 to-indigo-500" /></Slider.Track>
      <Slider.Thumb className={thumbClass} aria-label="Minimum budget" aria-valuetext={`$${value[0]}`} />
      <Slider.Thumb className={thumbClass} aria-label="Maximum budget" aria-valuetext={`$${value[1]}`} />
    </Slider.Root>
    <div className="flex justify-between text-[9px] tabular-nums cs-subtle" aria-hidden><span>$0</span><span>Minimum gap $50</span><span>$1,000</span></div>
  </section>;
}

function SingleValueSlider() {
  const labelId = useId();
  const [value, setValue] = useState([60]);
  return <section aria-labelledby={labelId}>
    <Heading id={labelId} title="2 · Completion" value={`${value[0]}%`} />
    <Slider.Root className={rootClass} value={value} onValueChange={setValue} min={0} max={100} step={1} name="completion" aria-labelledby={labelId}>
      <Slider.Track className={trackClass}><Slider.Range className="absolute h-full bg-gradient-to-r from-cyan-500 to-emerald-500" /></Slider.Track>
      <Slider.Thumb className={`${thumbClass} border-emerald-500`} aria-label="Completion percentage" aria-valuetext={`${value[0]} percent`} />
    </Slider.Root>
    <div className="flex justify-between text-[9px] cs-subtle" aria-hidden><span>Not started</span><span>Complete</span></div>
  </section>;
}

function SteppedSlider() {
  const labelId = useId();
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const [value, setValue] = useState([3]);
  return <section aria-labelledby={labelId}>
    <Heading id={labelId} title="3 · Discrete Size" value={sizes[value[0]]} />
    <Slider.Root className={rootClass} value={value} onValueChange={setValue} min={0} max={sizes.length - 1} step={1} name="size" aria-labelledby={labelId}>
      <Slider.Track className={trackClass}><Slider.Range className="absolute h-full bg-emerald-500" /></Slider.Track>
      <Slider.Thumb className={`${thumbClass} border-emerald-500`} aria-label="Size" aria-valuetext={sizes[value[0]]} />
    </Slider.Root>
    <div className="grid grid-cols-6 gap-1" aria-label="Choose a size">
      {sizes.map((size, index) => <button key={size} type="button" onClick={() => setValue([index])} aria-label={`Set size to ${size}`} aria-pressed={index === value[0]} className={`rounded-md py-1.5 text-[9px] font-bold outline-none transition-colors focus-visible:shadow-[0_0_0_3px_var(--card-border)] motion-reduce:transition-none ${index === value[0] ? "bg-emerald-500 text-white" : "cs-input cs-muted cs-hover"}`}>{size}</button>)}
    </div>
  </section>;
}
