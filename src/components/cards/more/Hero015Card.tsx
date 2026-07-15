"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
const ACCENT = "#f59e0b";
export function Hero015Card() {
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const scrollParentRef = useRef<Element | null>(null);
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    function findScrollParent(el: Element | null): Element | null { if (!el) return null; let node: Element | null = el; while (node && node !== document.body) { const style = getComputedStyle(node); if ((style.overflowY === "auto" || style.overflowY === "scroll") && node.scrollHeight > node.clientHeight) return node; node = node.parentElement; } return null; }
    function onScroll() { const el = scrollParentRef.current; if (!el) return; setScrollY(el.scrollTop); }
    let attempts = 0;
    const tryFind = () => { const el = findScrollParent(document.querySelector("[data-hero015]")); if (el) { scrollParentRef.current = el; el.addEventListener("scroll", onScroll, { passive: true }); onScroll(); } else if (attempts < 10) { attempts++; setTimeout(tryFind, 100); } };
    tryFind();
    return () => { scrollParentRef.current?.removeEventListener("scroll", onScroll); };
  }, []);
  const progress = Math.min(scrollY / 500, 1);
  const headingScale = 1 - progress * 0.3;
  const headingY = progress * -60;
  const headingOpacity = 1 - progress * 0.8;
  const subtextOpacity = scrollY < 100 ? 1 : Math.max(0, 1 - (scrollY - 100) / 200);
  const ctaSolid = progress > 0.3;
  const bgFarY = scrollY * 0.1;
  const bgMidY = scrollY * 0.25;
  const bgNearY = scrollY * 0.4;
  return (
    <div data-hero015 className="relative min-h-[120vh] bg-[#0f0f1a] text-white overflow-hidden">
      <style>{`@keyframes hero015-twinkle { 0%,100% { opacity: 0.3; } 50% { opacity: 0.8; } } .hero015-star { animation: hero015-twinkle 3s ease-in-out infinite; }`}</style>
      <div className="absolute inset-0 pointer-events-none" style={{ transform: `translateY(${bgFarY}px)` }}>{Array.from({ length: 40 }).map((_, i) => (<div key={i} className="absolute rounded-full bg-white hero015-star" style={{ width: `${1 + (i % 3)}px`, height: `${1 + (i % 3)}px`, left: `${(i * 7.3) % 100}%`, top: `${(i * 13.7) % 80}%`, animationDelay: `${i * 0.15}s`, opacity: 0.3 + (i % 4) * 0.15 }} />))}</div>
      <div className="absolute inset-0 pointer-events-none" style={{ transform: `translateY(${bgMidY}px)` }}>
        <div className="absolute top-[20%] left-[15%] w-64 h-64 rounded-full blur-3xl" style={{ background: `${ACCENT}08` }} />
        <div className="absolute top-[60%] right-[10%] w-80 h-80 rounded-full blur-3xl" style={{ background: `${ACCENT}06` }} />
        <svg className="absolute top-[15%] right-[20%] w-32 h-32 opacity-10" viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="45" stroke={ACCENT} strokeWidth="1" /><circle cx="50" cy="50" r="30" stroke={ACCENT} strokeWidth="1" /><circle cx="50" cy="50" r="15" stroke={ACCENT} strokeWidth="1" /></svg>
      </div>
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6" style={{ transform: `translateY(${bgNearY}px)` }}>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 10 }} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-xs font-medium text-white/60 mb-8" style={{ opacity: headingOpacity }}><span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: ACCENT }} />Cinematic scrolling experience</motion.div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-center leading-[1.02] mb-6" style={{ transform: `scale(${headingScale}) translateY(${headingY}px)`, opacity: headingOpacity, transition: "transform 0.1s linear, opacity 0.1s linear" }}>Scroll to<br /><span style={{ color: ACCENT }}>explore</span></h1>
        <p className="text-base md:text-xl text-white/40 max-w-xl text-center mb-10" style={{ opacity: subtextOpacity, transition: "opacity 0.2s ease" }}>A hero section that transforms as you scroll. Layers move independently, text scales, and the experience unfolds.</p>
        <div style={{ opacity: headingOpacity, transition: "opacity 0.2s ease" }}><a href="#" onClick={(e) => e.preventDefault()} className="inline-flex items-center gap-2 h-12 px-7 rounded-xl text-sm font-semibold transition-all" style={{ background: ctaSolid ? ACCENT : "transparent", color: ctaSolid ? "#0f0f1a" : ACCENT, border: `1.5px solid ${ACCENT}`, boxShadow: ctaSolid ? `0 8px 32px ${ACCENT}40` : "none" }}>Begin the journey<ArrowRight className="w-4 h-4" /></a></div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: scrollY < 50 ? 1 : 0 }} transition={{ duration: 0.3 }} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"><span className="text-[10px] text-white/30 uppercase tracking-widest">Scroll</span><motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}><ChevronDown className="w-4 h-4 text-white/30" /></motion.div></motion.div>
      </div>
      <div className="relative z-10 px-6 py-20 max-w-3xl mx-auto" style={{ opacity: progress, transition: "opacity 0.3s ease" }}><div className="grid grid-cols-1 md:grid-cols-3 gap-6">{[{ title: "Parallax layers", desc: "Background, midground, and foreground each move at different speeds." }, { title: "Scale on scroll", desc: "The heading smoothly scales down as the user scrolls past the hero." }, { title: "Morphing CTAs", desc: "Buttons transition from outline to filled as the user engages." }].map((item) => (<div key={item.title} className="rounded-xl border border-white/10 bg-white/[0.02] p-5"><h3 className="text-sm font-semibold text-white mb-2">{item.title}</h3><p className="text-xs text-white/40 leading-relaxed">{item.desc}</p></div>))}</div></div>
    </div>
  );
}
