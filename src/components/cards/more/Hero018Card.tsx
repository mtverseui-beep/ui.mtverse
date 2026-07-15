"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Star } from "lucide-react";
const ACCENT = "#e11d48";
const PRODUCTS = [{ name: "Aura Headphones", price: "$249", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80", tag: "Bestseller" }, { name: "Chrono Watch", price: "$399", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80", tag: "New" }, { name: "Lens Camera", price: "$899", image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=600&q=80", tag: "Pro" }];
export function Hero018Card() {
  const [mounted, setMounted] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);
  useEffect(() => { if (!mounted || !autoRotate) return; const timer = setInterval(() => setActiveIdx((i) => (i + 1) % PRODUCTS.length), 3500); return () => clearInterval(timer); }, [mounted, autoRotate]);
  const goTo = (idx: number) => { setActiveIdx((idx + PRODUCTS.length) % PRODUCTS.length); setAutoRotate(false); };
  return (
    <div className="relative min-h-full bg-white overflow-hidden flex items-center">
      <style>{`@keyframes hero018-float { 0%,100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-20px) rotate(5deg); } } .hero018-float { animation: hero018-float 8s ease-in-out infinite; }`}</style>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">{[{ left: "5%", top: "15%", size: 80, delay: "0s" }, { left: "85%", top: "20%", size: 60, delay: "2s" }, { left: "10%", top: "70%", size: 70, delay: "1s" }].map((float, i) => (<div key={i} className="absolute hero018-float opacity-[0.04]" style={{ left: float.left, top: float.top, width: float.size, height: float.size, animationDelay: float.delay }}><svg viewBox="0 0 100 100" fill="none" stroke={ACCENT} strokeWidth="1.5"><rect x="20" y="25" width="60" height="50" rx="8" /><circle cx="50" cy="50" r="15" /><rect x="35" y="15" width="30" height="12" rx="4" /></svg></div>))}</div>
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 10 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 bg-slate-50 text-xs font-medium text-slate-600 mb-6"><span className="w-1.5 h-1.5 rounded-full" style={{ background: ACCENT }} />Featured collection · Autumn 2026</motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.05] mb-5">Products that<br /><span style={{ color: ACCENT }}>sell themselves</span></motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-base md:text-lg text-slate-500 max-w-md mb-8">Curated tech accessories designed for the modern creator. Swipe through our featured collection.</motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }} transition={{ duration: 0.6, delay: 0.3 }} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-8"><a href="#" onClick={(e) => e.preventDefault()} className="inline-flex items-center gap-2 h-12 px-6 rounded-xl text-white text-sm font-semibold transition-all hover:scale-105" style={{ background: ACCENT, boxShadow: `0 8px 24px ${ACCENT}30` }}>Shop collection<ArrowRight className="w-4 h-4" /></a><a href="#" onClick={(e) => e.preventDefault()} className="inline-flex items-center gap-2 h-12 px-6 rounded-xl border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors">View all products</a></motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: mounted ? 1 : 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="flex items-center gap-4"><div className="flex -space-x-2">{["#e11d48","#f59e0b","#10b981","#3b82f6"].map((c, i) => (<div key={i} className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white text-[10px] font-bold" style={{ background: c }}>{String.fromCharCode(65 + i)}</div>))}</div><div><div className="flex items-center gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}</div><p className="text-xs text-slate-500 mt-0.5">Loved by 50,000+ customers</p></div></motion.div>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: mounted ? 1 : 0, scale: mounted ? 1 : 0.9 }} transition={{ duration: 0.7, delay: 0.3 }} className="relative" style={{ perspective: "1000px" }}>
            <div className="relative h-[420px] flex items-center justify-center">
              {PRODUCTS.map((product, idx) => { const offset = idx - activeIdx; const absOffset = Math.abs(offset); const isActive = offset === 0; const zIndex = 10 - absOffset; return (
                <motion.div key={idx} className="absolute w-64 h-80 rounded-2xl overflow-hidden bg-white border border-slate-200" style={{ boxShadow: isActive ? "0 24px 64px rgba(0,0,0,0.12)" : "0 8px 24px rgba(0,0,0,0.06)" }} animate={{ x: offset * 60, scale: isActive ? 1 : 0.8, rotateY: offset * -25, opacity: absOffset > 1 ? 0 : 1 - absOffset * 0.3, zIndex }} transition={{ type: "spring", stiffness: 300, damping: 30 }}>
                  { }
                  <img src={product.image} alt={product.name} className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  {product.tag && <span className="absolute top-3 left-3 px-2 py-1 rounded-full text-[10px] font-bold text-white" style={{ background: ACCENT }}>{product.tag}</span>}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white"><h3 className="text-lg font-bold">{product.name}</h3><p className="text-sm text-white/70">{product.price}</p></div>
                </motion.div>
              ); })}
              <button onClick={() => goTo(activeIdx - 1)} className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-600 hover:text-slate-900 hover:shadow-lg transition-all" aria-label="Previous"><ChevronLeft className="w-5 h-5" /></button>
              <button onClick={() => goTo(activeIdx + 1)} className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-600 hover:text-slate-900 hover:shadow-lg transition-all" aria-label="Next"><ChevronRight className="w-5 h-5" /></button>
            </div>
            <div className="flex items-center justify-center gap-2 mt-4">{PRODUCTS.map((_, i) => (<button key={i} onClick={() => goTo(i)} className={`h-1.5 rounded-full transition-all ${i === activeIdx ? "w-8" : "w-1.5"}`} style={{ background: i === activeIdx ? ACCENT : "#cbd5e1" }} aria-label={`Go to slide ${i + 1}`} />))}</div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
