"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Users, Star, Code2, Shield, Zap } from "lucide-react";
const ACCENT = "#7c3aed";
export function Hero016Card() {
  const [mounted, setMounted] = useState(false);
  const [count, setCount] = useState(0);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);
  useEffect(() => { if (!mounted) return; const timer = setInterval(() => { setCount((c) => { if (c >= 84213) { clearInterval(timer); return 84213; } return c + 1247; }); }, 30); return () => clearInterval(timer); }, [mounted]);
  return (
    <div className="relative min-h-full bg-[#f8fafc] overflow-hidden flex items-center justify-center py-16 px-6">
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(124,58,237,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.03) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      <div className="relative z-10 w-full max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[180px]">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }} transition={{ duration: 0.6 }} className="md:col-span-2 md:row-span-2 rounded-2xl border border-slate-200 bg-white p-8 flex flex-col justify-between hover:shadow-lg transition-shadow">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-violet-50 text-xs font-medium mb-4" style={{ color: ACCENT }}><span className="w-1.5 h-1.5 rounded-full" style={{ background: ACCENT }} />New: Mosaic 2.0</div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 leading-[1.05] mb-3">Build beautiful<br /><span style={{ color: ACCENT }}>interfaces</span>, faster</h1>
              <p className="text-sm md:text-base text-slate-500 max-w-md">The component library that adapts to your design system. 200+ components, zero dependencies, infinite possibilities.</p>
            </div>
            <div className="flex items-center gap-3 mt-6"><a href="#" onClick={(e) => e.preventDefault()} className="inline-flex items-center gap-2 h-11 px-5 rounded-xl text-white text-sm font-semibold transition-all hover:scale-105" style={{ background: ACCENT, boxShadow: `0 8px 24px ${ACCENT}30` }}>Browse components<ArrowRight className="w-4 h-4" /></a><a href="#" onClick={(e) => e.preventDefault()} className="inline-flex items-center gap-2 h-11 px-5 rounded-xl border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors">Documentation</a></div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }} transition={{ duration: 0.6, delay: 0.1 }} className="rounded-2xl border border-slate-200 bg-white p-5 flex flex-col justify-between hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-2"><div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-emerald-600" /></div><span className="text-xs text-slate-400 uppercase tracking-wider font-medium">Active installs</span></div>
            <div><p className="text-2xl font-bold text-slate-900 tabular-nums">{count.toLocaleString()}</p><p className="text-xs text-emerald-600 mt-1">+12.4% this month</p></div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }} transition={{ duration: 0.6, delay: 0.15 }} className="rounded-2xl border border-slate-700 bg-[#0d1117] p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-1.5 mb-2"><span className="w-2 h-2 rounded-full bg-red-400" /><span className="w-2 h-2 rounded-full bg-amber-400" /><span className="w-2 h-2 rounded-full bg-emerald-400" /></div>
            <pre className="text-[10px] font-mono leading-relaxed text-slate-300"><span className="text-purple-400">import</span> {"{ Button }"} <span className="text-purple-400">from</span> <span className="text-emerald-400">'@mosaic/ui'</span>{"\n\n"}<span className="text-purple-400">export default</span> <span className="text-blue-400">function</span> <span className="text-yellow-400">App</span>() {"{"}{"\n"}{"  "}<span className="text-purple-400">return</span> <span className="text-emerald-400">{"<Button>Click me</Button>"}</span>{"\n"}{"}"}</pre>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }} transition={{ duration: 0.6, delay: 0.2 }} className="md:col-span-2 rounded-2xl border border-slate-200 bg-white p-5 flex items-center gap-4 hover:shadow-lg transition-shadow">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">SC</div>
            <div className="flex-1 min-w-0"><p className="text-sm text-slate-700 italic">&ldquo;Mosaic cut our development time in half. The components are beautiful, accessible, and just work.&rdquo;</p><div className="flex items-center gap-1 mt-1"><span className="text-xs font-medium text-slate-900">Sarah Chen</span><span className="text-xs text-slate-400">· Staff Engineer @ Vercel</span></div></div>
            <div className="flex gap-0.5 flex-shrink-0">{[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />)}</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }} transition={{ duration: 0.6, delay: 0.25 }} className="rounded-2xl border border-slate-200 bg-white p-5 hover:shadow-lg transition-shadow">
            <p className="text-xs text-slate-400 uppercase tracking-wider font-medium mb-3">Why Mosaic</p>
            <div className="grid grid-cols-3 gap-2">{[{ icon: Zap, label: "Fast", color: "#f59e0b" }, { icon: Shield, label: "Secure", color: "#10b981" }, { icon: Code2, label: "OSS", color: "#3b82f6" }].map((feat) => (<div key={feat.label} className="flex flex-col items-center gap-1"><div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${feat.color}15` }}><feat.icon className="w-4 h-4" style={{ color: feat.color }} /></div><span className="text-[9px] text-slate-500 font-medium">{feat.label}</span></div>))}</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }} transition={{ duration: 0.6, delay: 0.3 }} className="rounded-2xl border border-slate-200 bg-white p-5 flex flex-col justify-between hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-2 mb-2"><Users className="w-4 h-4 text-slate-400" /><span className="text-xs text-slate-400 uppercase tracking-wider font-medium">Trusted by</span></div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">{["Vercel", "Linear", "Stripe", "Notion"].map((brand) => (<span key={brand} className="text-sm font-bold text-slate-300 hover:text-slate-500 transition-colors">{brand}</span>))}</div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
