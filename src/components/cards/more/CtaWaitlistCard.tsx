"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Users } from "lucide-react";
export function CtaWaitlistCard() {
  const [email, setEmail] = useState(""); const [count, setCount] = useState(2847); const [spots, setSpots] = useState(153);
  useEffect(() => { const i = setInterval(() => { if (Math.random() > 0.7) { setCount(c => c + 1); setSpots(s => Math.max(0, s - 1)); } }, 3000); return () => clearInterval(i); }, []);
  return (
    <section className="relative overflow-hidden px-6 py-20" style={{ background: "radial-gradient(ellipse at center, #7f1d1d 0%, #450a0a 50%, #0a0a0f 100%)", fontFamily: "var(--font-inter-tight), system-ui, sans-serif" }}>
      <div className="relative z-10 mx-auto max-w-lg text-center">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/20 text-red-400 backdrop-blur"><Users className="h-6 w-6" /></motion.div>
        <h2 className="text-4xl font-bold tracking-tight text-white" style={{ letterSpacing: "-0.03em" }}>Join the waitlist.</h2>
        <p className="mt-3 text-sm text-white/60">Limited to 3,000 spots for early access. Be part of the first wave.</p>
        <div className="mt-4 flex items-center justify-center gap-4 text-xs"><span className="text-white/50" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>{count.toLocaleString()} joined</span><span className="text-red-400 font-bold" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>{spots} spots left</span></div>
        <div className="mt-3 mx-auto h-2 max-w-xs overflow-hidden rounded-full bg-white/10"><motion.div className="h-full rounded-full bg-gradient-to-r from-red-500 to-rose-500" initial={{ width: "5%" }} animate={{ width: `${(count / 3000) * 100}%` }} transition={{ duration: 1 }} /></div>
        <form onSubmit={(e) => e.preventDefault()} className="mt-6 flex flex-col gap-2 sm:flex-row"><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" className="flex-1 rounded-xl border border-white/10 bg-white/[0.05] py-3 px-4 text-sm text-white placeholder:text-white/30 outline-none focus:border-red-400/50" /><button className="group flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-red-500 to-rose-500 px-5 py-3 text-sm font-bold text-white transition-transform hover:scale-105">Join waitlist <ArrowRight className="h-4 w-4" /></button></form>
      </div>
    </section>
  );
}
