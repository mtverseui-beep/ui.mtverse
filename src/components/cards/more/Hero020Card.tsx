"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Layers, Zap, Check } from "lucide-react";
const ACCENT = "#f97316";
export function Hero020Card() {
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const scrollParentRef = useRef<Element | null>(null);
  useEffect(() => setMounted(true), []);
  useEffect(() => { function findScrollParent(el: Element | null): Element | null { if (!el) return null; let node: Element | null = el; while (node && node !== document.body) { const style = getComputedStyle(node); if ((style.overflowY === "auto" || style.overflowY === "scroll") && node.scrollHeight > node.clientHeight) return node; node = node.parentElement; } return null; } function onScroll() { const el = scrollParentRef.current; if (!el) return; setScrollY(el.scrollTop); } let attempts = 0; const tryFind = () => { const el = findScrollParent(document.querySelector("[data-hero020]")); if (el) { scrollParentRef.current = el; el.addEventListener("scroll", onScroll, { passive: true }); onScroll(); } else if (attempts < 10) { attempts++; setTimeout(tryFind, 100); } }; tryFind(); return () => { scrollParentRef.current?.removeEventListener("scroll", onScroll); }; }, []);
  const sectionHeight = 500;
  return (
    <div data-hero020 className="relative bg-[#fafaf9]">
      <style>{`.hero020-dots { background-image: radial-gradient(circle, rgba(249,115,22,0.06) 1px, transparent 1px); background-size: 24px 24px; } .hero020-lines { background-image: repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(249,115,22,0.04) 40px, rgba(249,115,22,0.04) 41px); } .hero020-grid { background-image: linear-gradient(rgba(249,115,22,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.04) 1px, transparent 1px); background-size: 40px 40px; }`}</style>
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-6 overflow-hidden" style={{ background: "#fafaf9", opacity: Math.max(0, 1 - scrollY / sectionHeight) }}>
        <div className="absolute inset-0 hero020-dots" />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 30 }} transition={{ duration: 0.8 }} className="relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 bg-white text-xs font-medium text-slate-600 mb-8"><span className="w-1.5 h-1.5 rounded-full" style={{ background: ACCENT }} />Scroll to explore</div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-slate-900 leading-[1.02] mb-6">Design that<br /><span style={{ color: ACCENT }}>unfolds</span></h1>
          <p className="text-base md:text-lg text-slate-500 max-w-xl mx-auto">Four sections. One scroll. Each reveals a new layer of the story.</p>
        </motion.div>
      </div>
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-6 overflow-hidden" style={{ background: "#fff7ed", opacity: Math.max(0, Math.min(1, (scrollY - sectionHeight * 0.5) / sectionHeight)) }}>
        <div className="absolute inset-0 hero020-lines" />
        <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: false }} transition={{ duration: 0.6 }} className="relative z-10 text-center">
          <BarChart3 className="w-12 h-12 mx-auto mb-6" style={{ color: ACCENT }} />
          <p className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight" style={{ color: ACCENT }}>300%</p>
          <p className="text-xl md:text-2xl text-slate-600 mt-4">average increase in engagement</p>
          <p className="text-sm text-slate-400 mt-2">Across 2,000+ teams who switched to Layered</p>
        </motion.div>
      </div>
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-6 overflow-hidden" style={{ background: "#fafaf9", opacity: Math.max(0, Math.min(1, (scrollY - sectionHeight * 1.5) / sectionHeight)) }}>
        <div className="absolute inset-0 hero020-grid" />
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 0.6 }} className="relative z-10 max-w-4xl w-full">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 text-center mb-10">Built for <span style={{ color: ACCENT }}>every layer</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">{[{ icon: Layers, title: "Layered Design", desc: "Each section builds on the last." }, { icon: Zap, title: "Scroll-Powered", desc: "Pure scroll physics." }, { icon: Check, title: "Accessible", desc: "Works with keyboard nav." }].map((feat, i) => (<motion.div key={feat.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 0.5, delay: i * 0.1 }} className="rounded-2xl border border-slate-200 bg-white p-6"><div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: `${ACCENT}15` }}><feat.icon className="w-5 h-5" style={{ color: ACCENT }} /></div><h3 className="text-base font-semibold text-slate-900 mb-2">{feat.title}</h3><p className="text-sm text-slate-500">{feat.desc}</p></motion.div>))}</div>
        </motion.div>
      </div>
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-6 overflow-hidden" style={{ background: ACCENT, opacity: Math.max(0, Math.min(1, (scrollY - sectionHeight * 2.5) / sectionHeight)) }}>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: false }} transition={{ duration: 0.7 }} className="relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Ready to begin?</h2>
          <p className="text-lg text-white/70 mb-8 max-w-md mx-auto">Start building layered experiences today. Free for 14 days.</p>
          <a href="#" onClick={(e) => e.preventDefault()} className="inline-flex items-center gap-2 h-14 px-8 rounded-xl bg-white text-sm font-bold transition-all hover:scale-105" style={{ color: ACCENT }}>Start free trial<ArrowRight className="w-4 h-4" /></a>
        </motion.div>
      </div>
      <div style={{ height: 100 }} />
    </div>
  );
}
