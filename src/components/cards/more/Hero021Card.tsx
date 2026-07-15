"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, ChevronDown } from "lucide-react";
const ACCENT = "#ff006e";
const SUN_COLORS = ["#ff006e", "#ff4d00", "#ffaa00"];
export function Hero021Card() {
  const [mounted, setMounted] = useState(false);
  const [gridOffset, setGridOffset] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const scrollParentRef = useRef<Element | null>(null);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);
  useEffect(() => { const interval = setInterval(() => setGridOffset((o) => (o + 2) % 50), 30); return () => clearInterval(interval); }, []);
  useEffect(() => { function findScrollParent(el: Element | null): Element | null { if (!el) return null; let node: Element | null = el; while (node && node !== document.body) { const style = getComputedStyle(node); if ((style.overflowY === "auto" || style.overflowY === "scroll") && node.scrollHeight > node.clientHeight) return node; node = node.parentElement; } return null; } function onScroll() { const el = scrollParentRef.current; if (!el) return; setScrollY(el.scrollTop); } let attempts = 0; const tryFind = () => { const el = findScrollParent(document.querySelector("[data-hero021]")); if (el) { scrollParentRef.current = el; el.addEventListener("scroll", onScroll, { passive: true }); onScroll(); } else if (attempts < 10) { attempts++; setTimeout(tryFind, 100); } }; tryFind(); return () => { scrollParentRef.current?.removeEventListener("scroll", onScroll); }; }, []);
  const sunY = Math.min(scrollY * 0.3, 60);
  return (
    <div data-hero021 className="relative min-h-[120vh] bg-[#0d0221] text-white overflow-hidden flex flex-col items-center justify-center pt-20 pb-32 px-6">
      <style>{`@keyframes hero021-twinkle { 0%,100% { opacity: 0.3; } 50% { opacity: 0.8; } } .hero021-star { animation: hero021-twinkle 2s ease-in-out infinite; } .hero021-neon-text { text-shadow: 0 0 10px ${ACCENT}, 0 0 20px ${ACCENT}, 0 0 40px ${ACCENT}80, 0 0 80px ${ACCENT}40; } .hero021-neon-border { box-shadow: 0 0 10px ${ACCENT}, 0 0 20px ${ACCENT}80, inset 0 0 10px ${ACCENT}40; } @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
      <div className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none overflow-hidden">{Array.from({ length: 50 }).map((_, i) => (<div key={i} className="absolute rounded-full bg-white hero021-star" style={{ width: `${1 + (i % 3)}px`, height: `${1 + (i % 3)}px`, left: `${(i * 7.9) % 100}%`, top: `${(i * 9.3) % 100}%`, animationDelay: `${i * 0.08}s` }} />))}</div>
      <div className="absolute left-1/2 -translate-x-1/2 pointer-events-none" style={{ top: `calc(45% + ${sunY}px)` }}>
        <div className="w-64 h-64 rounded-full" style={{ background: `linear-gradient(180deg, ${SUN_COLORS[0]}, ${SUN_COLORS[1]}, ${SUN_COLORS[2]})`, boxShadow: `0 0 80px ${SUN_COLORS[0]}80, 0 0 160px ${SUN_COLORS[0]}40` }}>{[0,1,2,3,4,5].map((i) => (<div key={i} className="absolute left-0 right-0 bg-[#0d0221]" style={{ height: `${2 + i * 1.5}px`, bottom: `${15 + i * 14}%`, opacity: 0.8 }} />))}</div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1/2 overflow-hidden pointer-events-none">
        <svg className="absolute bottom-0 left-1/2 -translate-x-1/2" width="200%" height="100%" viewBox="0 0 800 400" preserveAspectRatio="none" style={{ minWidth: "100%" }}>
          {Array.from({ length: 21 }).map((_, i) => { const xPct = (i / 20) * 800; const cx = 400; const topX = cx + (xPct - cx) * 0.05; return (<line key={`v-${i}`} x1={topX} y1={0} x2={xPct} y2={400} stroke={ACCENT} strokeWidth="1" opacity="0.4" />); })}
          {Array.from({ length: 12 }).map((_, i) => { const baseY = (i / 12) * 400; const y = (baseY + gridOffset * (1 + i * 0.3)) % 400; const opacity = y / 400; return (<line key={`h-${i}`} x1={0} y1={y} x2={800} y2={y} stroke={ACCENT} strokeWidth="1" opacity={opacity * 0.5} />); })}
        </svg>
      </div>
      <svg className="absolute bottom-1/2 left-4 md:left-12 w-24 h-32 pointer-events-none opacity-60" viewBox="0 0 60 80" fill={ACCENT}><rect x="28" y="40" width="4" height="40" /><path d="M30 42 Q15 30 5 35 Q12 25 30 38 Q48 25 55 35 Q45 30 30 42 Z" /><path d="M30 40 Q20 20 10 18 Q20 15 30 35 Z" /><path d="M30 40 Q40 20 50 18 Q40 15 30 35 Z" /></svg>
      <svg className="absolute bottom-1/2 right-4 md:right-12 w-24 h-32 pointer-events-none opacity-60" viewBox="0 0 60 80" fill={ACCENT}><rect x="28" y="40" width="4" height="40" /><path d="M30 42 Q15 30 5 35 Q12 25 30 38 Q48 25 55 35 Q45 30 30 42 Z" /><path d="M30 40 Q20 20 10 18 Q20 15 30 35 Z" /><path d="M30 40 Q40 20 50 18 Q40 15 30 35 Z" /></svg>
      <div className="relative z-10 text-center max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 10 }} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-8 hero021-neon-border" style={{ borderColor: ACCENT, background: `${ACCENT}10` }}><span className="text-xs font-mono uppercase tracking-widest" style={{ color: ACCENT }}>▶ Now Playing: Synthwave Hero</span></motion.div>
        <motion.h1 initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: mounted ? 1 : 0, scale: mounted ? 1 : 0.9 }} transition={{ duration: 0.8, delay: 0.1 }} className="hero021-neon-text text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.02] mb-6" style={{ color: "#ffffff" }}>DRIVE INTO<br />THE FUTURE</motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }} transition={{ duration: 0.7, delay: 0.3 }} className="text-base md:text-lg text-white/50 max-w-xl mx-auto mb-10 font-mono">{"// A retro-futuristic hero with neon glow, perspective grid, and synthwave aesthetic"}</motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }} transition={{ duration: 0.7, delay: 0.4 }} className="flex flex-col sm:flex-row items-center justify-center gap-3"><a href="#" onClick={(e) => e.preventDefault()} className="inline-flex items-center gap-2 h-12 px-7 rounded-xl text-sm font-bold transition-all hover:scale-105 hero021-neon-border" style={{ background: ACCENT, color: "#0d0221" }}><Play className="w-4 h-4 fill-current" />Press play</a><a href="#" onClick={(e) => e.preventDefault()} className="inline-flex items-center gap-2 h-12 px-7 rounded-xl border-2 text-sm font-bold transition-all hover:bg-white/5" style={{ borderColor: ACCENT, color: ACCENT }}>View source<ArrowRight className="w-4 h-4" /></a></motion.div>
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: mounted ? 1 : 0 }} transition={{ duration: 0.6, delay: 0.6 }} className="absolute bottom-8 left-0 right-0 overflow-hidden pointer-events-none"><div className="flex items-center gap-8 whitespace-nowrap" style={{ animation: "marquee 20s linear infinite" }}>{Array.from({ length: 4 }).map((_, i) => (<span key={i} className="text-2xl md:text-4xl font-bold font-mono opacity-20" style={{ color: ACCENT }}>NEON · GRID · RETRO · 1985 · SYNTHWAVE · </span>))}</div></motion.div>
    </div>
  );
}
