"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap, Layers, BarChart3 } from "lucide-react";
const ACCENT = "#a855f7";
export function Hero012Card() {
  const [mounted, setMounted] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [bgShift, setBgShift] = useState({ x: 0, y: 0 });
  const sceneRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sceneRef.current) return;
    const rect = sceneRef.current.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    setTilt({ x: -dy * 12, y: dx * 12 });
    setBgShift({ x: dx * 15, y: dy * 15 });
  };
  return (
    <div className="relative min-h-full bg-[#0a0a0f] text-white overflow-hidden flex flex-col items-center justify-center py-20 px-6" onMouseMove={handleMouseMove} onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setBgShift({ x: 0, y: 0 }); }}>
      <div className="absolute inset-0 pointer-events-none transition-transform duration-200 ease-out" style={{ transform: `translate(${bgShift.x}px, ${bgShift.y}px)`, backgroundImage: "radial-gradient(circle, rgba(168,85,247,0.12) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none" style={{ background: `radial-gradient(circle, ${ACCENT}15, transparent 70%)` }} />
      <div className="relative z-10 text-center max-w-3xl mb-12">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 10 }} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-xs font-medium text-white/70 mb-6"><Sparkles className="w-3.5 h-3.5" style={{ color: ACCENT }} />Now with AI-powered insights</motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }} transition={{ duration: 0.7, delay: 0.1 }} className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] mb-4">See your data<br />in a new <span style={{ color: ACCENT }}>dimension</span></motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }} transition={{ duration: 0.7, delay: 0.2 }} className="text-base md:text-lg text-white/50 max-w-xl mx-auto mb-8">Interactive 3D dashboards that respond to your every move. Hover the scene below to explore.</motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }} transition={{ duration: 0.7, delay: 0.3 }} className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href="#" onClick={(e) => e.preventDefault()} className="inline-flex items-center gap-2 h-12 px-6 rounded-xl text-white text-sm font-semibold transition-all hover:scale-105" style={{ background: ACCENT, boxShadow: `0 8px 32px ${ACCENT}40` }}>Start free trial<ArrowRight className="w-4 h-4" /></a>
          <a href="#" onClick={(e) => e.preventDefault()} className="inline-flex items-center gap-2 h-12 px-6 rounded-xl border border-white/15 text-white/80 text-sm font-semibold hover:bg-white/5 transition-colors">Watch demo</a>
        </motion.div>
      </div>
      <div ref={sceneRef} className="relative z-10 w-full max-w-2xl" style={{ perspective: "1200px" }}>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 40 }} transition={{ duration: 0.8, delay: 0.4 }} className="relative" style={{ transformStyle: "preserve-3d", transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`, transition: "transform 0.1s ease-out" }}>
          <div className="absolute inset-0 rounded-2xl" style={{ background: `linear-gradient(135deg, ${ACCENT}30, transparent)`, transform: "translateZ(-60px) scale(0.92)", opacity: 0.5 }} />
          <div className="absolute inset-0 rounded-2xl border border-white/10 bg-white/[0.02]" style={{ transform: "translateZ(-30px) scale(0.96)" }}><div className="flex items-center justify-center h-full gap-6 p-8">{[{ icon: Zap, label: "Real-time" }, { icon: Layers, label: "3D Layers" }, { icon: BarChart3, label: "Analytics" }].map((item) => (<div key={item.label} className="flex flex-col items-center gap-2 text-white/30"><item.icon className="w-5 h-5" /><span className="text-[10px] uppercase tracking-wider">{item.label}</span></div>))}</div></div>
          <div className="relative rounded-2xl border border-white/15 bg-[#12121a] overflow-hidden" style={{ transform: "translateZ(0px)", boxShadow: "0 24px 80px rgba(0,0,0,0.5), 0 8px 32px rgba(168,85,247,0.15)" }}>
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5"><div className="flex gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500/60" /><span className="w-2.5 h-2.5 rounded-full bg-amber-500/60" /><span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" /></div><span className="text-xs text-white/30 font-mono ml-2">dimension.dashboard</span></div>
            <div className="p-5">
              <div className="grid grid-cols-3 gap-3 mb-4">{[{ label: "Revenue", value: "$84.2K", change: "+12.4%" }, { label: "Users", value: "12,847", change: "+8.1%" }, { label: "Conversion", value: "3.6%", change: "+0.4%" }].map((stat) => (<div key={stat.label} className="rounded-lg bg-white/[0.03] border border-white/5 p-3"><p className="text-[10px] text-white/40 uppercase tracking-wider">{stat.label}</p><p className="text-lg font-bold text-white mt-1">{stat.value}</p><p className="text-[10px] text-emerald-400 mt-0.5">{stat.change}</p></div>))}</div>
              <div className="rounded-lg bg-white/[0.03] border border-white/5 p-4 h-32 flex items-end gap-1.5">{[40,65,45,80,55,70,90,60,75,85,50,95].map((h, i) => (<div key={i} className="flex-1 rounded-t" style={{ height: `${h}%`, background: i > 8 ? ACCENT : `${ACCENT}40` }} />))}</div>
            </div>
          </div>
        </motion.div>
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: mounted ? 1 : 0 }} transition={{ duration: 0.6, delay: 0.6 }} className="relative z-10 mt-12 flex items-center gap-3">
        <div className="flex -space-x-2">{["#a855f7","#3b82f6","#10b981","#f59e0b"].map((c, i) => (<div key={i} className="w-7 h-7 rounded-full border-2 border-[#0a0a0f] flex items-center justify-center text-white text-[10px] font-bold" style={{ background: c }}>{String.fromCharCode(65 + i)}</div>))}</div>
        <span className="text-xs text-white/40">Trusted by 12,000+ teams worldwide</span>
      </motion.div>
    </div>
  );
}
