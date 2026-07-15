"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
const ACCENT = "#06b6d4";
const AURORA_COLORS = [["#06b6d4", "#3b82f6"], ["#8b5cf6", "#ec4899"], ["#10b981", "#06b6d4"], ["#f59e0b", "#ef4444"], ["#6366f1", "#a855f7"]];
function generateWavePath(width: number, amplitude: number, frequency: number, offset: number, phase: number) { let path = `M 0 ${200 + offset}`; for (let x = 0; x <= width; x += 8) { const y = 200 + offset + Math.sin((x / width) * Math.PI * frequency + phase) * amplitude; path += ` L ${x} ${y.toFixed(1)}`; } path += ` L ${width} 400 L 0 400 Z`; return path; }
export function Hero017Card() {
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [phase, setPhase] = useState(0);
  const scrollParentRef = useRef<Element | null>(null);
  useEffect(() => setMounted(true), []);
  useEffect(() => { const interval = setInterval(() => setPhase((p) => p + 0.02), 50); return () => clearInterval(interval); }, []);
  useEffect(() => { function findScrollParent(el: Element | null): Element | null { if (!el) return null; let node: Element | null = el; while (node && node !== document.body) { const style = getComputedStyle(node); if ((style.overflowY === "auto" || style.overflowY === "scroll") && node.scrollHeight > node.clientHeight) return node; node = node.parentElement; } return null; } function onScroll() { const el = scrollParentRef.current; if (!el) return; setScrollY(el.scrollTop); } let attempts = 0; const tryFind = () => { const el = findScrollParent(document.querySelector("[data-hero017]")); if (el) { scrollParentRef.current = el; el.addEventListener("scroll", onScroll, { passive: true }); onScroll(); } else if (attempts < 10) { attempts++; setTimeout(tryFind, 100); } }; tryFind(); return () => { scrollParentRef.current?.removeEventListener("scroll", onScroll); }; }, []);
  const hueShift = scrollY * 0.5;
  return (
    <div data-hero017 className="relative min-h-[120vh] bg-[#0a0a14] text-white overflow-hidden flex flex-col items-center justify-center pt-20 pb-32 px-6">
      <style>{`@keyframes hero017-twinkle { 0%,100% { opacity: 0.2; } 50% { opacity: 0.6; } } .hero017-star { animation: hero017-twinkle 3s ease-in-out infinite; }`}</style>
      <div className="absolute inset-0 pointer-events-none">{Array.from({ length: 60 }).map((_, i) => (<div key={i} className="absolute rounded-full bg-white hero017-star" style={{ width: `${1 + (i % 3)}px`, height: `${1 + (i % 3)}px`, left: `${(i * 7.3) % 100}%`, top: `${(i * 11.7) % 70}%`, animationDelay: `${i * 0.12}s` }} />))}</div>
      <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 800 400">
        <defs>{AURORA_COLORS.map((colors, i) => (<linearGradient key={i} id={`aurora-grad-${i}`} x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor={colors[0]} stopOpacity="0" /><stop offset="50%" stopColor={colors[0]} stopOpacity={0.15 + (i === 0 ? 0.05 : 0)} /><stop offset="100%" stopColor={colors[1]} stopOpacity="0" /></linearGradient>))}</defs>
        {AURORA_COLORS.map((_, i) => { const ampl = 40 + i * 15; const freq = 2 + i * 0.5; const offset = i * 30 - 60; const ph = phase + i * 0.8; return (<path key={i} d={generateWavePath(800, ampl, freq, offset, ph)} fill={`url(#aurora-grad-${i})`} style={{ filter: `blur(${10 + i * 5}px) hue-rotate(${hueShift}deg)`, transform: `translateY(${scrollY * (0.1 + i * 0.05)}px)` }} />); })}
      </svg>
      <div className="relative z-10 text-center max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 10 }} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-medium text-white/70 mb-8"><Sparkles className="w-3.5 h-3.5" style={{ color: ACCENT }} />The future of data visualization</motion.div>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 30 }} transition={{ duration: 0.8, delay: 0.1 }} className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.02] mb-6">Navigate your<br />data like the<br /><span style={{ background: `linear-gradient(135deg, ${ACCENT}, #8b5cf6, #ec4899)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>northern lights</span></motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }} transition={{ duration: 0.7, delay: 0.3 }} className="text-base md:text-lg text-white/40 max-w-xl mx-auto mb-10">Real-time analytics that flow and adapt. Scroll to watch the aurora shift.</motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }} transition={{ duration: 0.7, delay: 0.4 }} className="flex flex-col sm:flex-row items-center justify-center gap-3"><a href="#" onClick={(e) => e.preventDefault()} className="inline-flex items-center gap-2 h-12 px-6 rounded-xl text-white text-sm font-semibold transition-all hover:scale-105" style={{ background: ACCENT, boxShadow: `0 8px 32px ${ACCENT}40` }}>Start exploring<ArrowRight className="w-4 h-4" /></a><a href="#" onClick={(e) => e.preventDefault()} className="inline-flex items-center gap-2 h-12 px-6 rounded-xl border border-white/15 text-white/80 text-sm font-semibold hover:bg-white/5 transition-colors">Watch demo</a></motion.div>
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: mounted ? 1 : 0 }} transition={{ duration: 0.6, delay: 0.6 }} className="relative z-10 mt-16 flex items-center gap-12 text-center">{[{ value: "99.99%", label: "Uptime" }, { value: "12ms", label: "Latency" }, { value: "2.4M", label: "Events/sec" }].map((stat) => (<div key={stat.label}><p className="text-2xl md:text-3xl font-bold text-white">{stat.value}</p><p className="text-xs text-white/30 mt-1">{stat.label}</p></div>))}</motion.div>
    </div>
  );
}
