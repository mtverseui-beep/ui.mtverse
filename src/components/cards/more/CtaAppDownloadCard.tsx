"use client";
import { motion } from "framer-motion";
import { Star, Smartphone } from "lucide-react";
export function CtaAppDownloadCard() {
  return (
    <section className="px-6 py-20" style={{ background: "linear-gradient(180deg, #eff6ff 0%, #ffffff 100%)", fontFamily: "var(--font-manrope), system-ui, sans-serif" }}>
      <div className="mx-auto max-w-4xl">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div><span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600"><Smartphone className="h-3 w-3" /> Mobile App</span><h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900" style={{ letterSpacing: "-0.03em" }}>Your work, in your pocket.</h2><p className="mt-2 text-sm text-slate-600">Download the app for iOS and Android. Full feature parity, offline mode, and push notifications.</p><div className="mt-4 flex items-center gap-2"><div className="flex text-amber-400">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4" fill="currentColor" />)}</div><span className="text-xs text-slate-500">4.9 · 28K ratings</span></div><div className="mt-5 flex gap-3">{[{ label: "App Store", sub: "Download on the" }, { label: "Google Play", sub: "GET IT ON" }].map(s => (<a key={s.label} href="#" onClick={(e) => e.preventDefault()} className="inline-flex items-center gap-2.5 rounded-xl bg-slate-900 px-4 py-2.5 text-white transition-transform hover:scale-105"><div className="text-left"><p className="text-[9px] text-white/60 leading-none">{s.sub}</p><p className="text-sm font-semibold leading-tight">{s.label}</p></div></a>))}</div></div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex justify-center"><div className="h-[320px] w-[160px] rounded-[2rem] border-4 border-slate-900 bg-slate-900 p-1.5 shadow-2xl"><div className="h-full w-full rounded-[1.5rem] bg-gradient-to-br from-blue-500 to-indigo-600"><div className="flex h-20 items-center justify-center"><Smartphone className="h-8 w-8 text-white" /></div><div className="space-y-2 p-3">{[1,2,3].map(i => <div key={i} className="h-14 rounded-lg bg-white/10" />)}</div></div></div></motion.div>
        </div>
      </div>
    </section>
  );
}
