"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
export function FeatureBeforeAfterCard() {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const handleMove = (e: React.MouseEvent) => { if (!ref.current) return; const r = ref.current.getBoundingClientRect(); setPos(Math.max(0, Math.min(100, ((e.clientX - r.left) / r.width) * 100))); };
  return (
    <section className="px-6 py-20" style={{ background: "#ffffff", fontFamily: "var(--font-inter-tight), system-ui, sans-serif" }}>
      <div className="mx-auto max-w-3xl"><h2 className="mb-8 text-center text-4xl font-bold tracking-tight text-slate-900" style={{ letterSpacing: "-0.03em" }}>Before vs After.</h2>
        <div ref={ref} onMouseMove={handleMove} className="relative aspect-video overflow-hidden rounded-2xl border border-slate-200 cursor-ew-resize select-none">
          <div className="absolute inset-0 bg-slate-100 flex items-center justify-center"><span className="text-6xl">📊</span><span className="absolute bottom-4 left-4 rounded bg-slate-900/80 px-2 py-1 text-xs text-white" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>Before</span></div>
          <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}><div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-500 to-violet-600" style={{ width: "100vw" }}><span className="text-6xl">✨</span><span className="absolute bottom-4 left-4 rounded bg-white/20 px-2 py-1 text-xs text-white backdrop-blur" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>After</span></div></div>
          <div className="absolute top-0 bottom-0 w-0.5 bg-white" style={{ left: `${pos}%` }}><div className="absolute top-1/2 left-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg"><svg className="h-3 w-3 text-slate-900" viewBox="0 0 12 12" fill="currentColor"><path d="M3 6 L7 2 L7 10 Z M9 6 L5 2 L5 10 Z" /></svg></div></div>
        </div>
        <p className="mt-4 text-center text-xs text-slate-400">Drag to compare</p>
      </div>
    </section>
  );
}
