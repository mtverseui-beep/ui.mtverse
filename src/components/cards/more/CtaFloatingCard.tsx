"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
export function CtaFloatingCard() {
  const [email, setEmail] = useState("");
  return (
    <section className="relative flex min-h-full items-center justify-center overflow-hidden px-6 py-20" style={{ background: "radial-gradient(ellipse at top, #1e1b4b 0%, #0f0a26 50%, #050217 100%)", fontFamily: "var(--font-inter-tight), system-ui, sans-serif" }}>
      <motion.div className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(168,85,247,0.3), transparent 60%)", filter: "blur(50px)" }} animate={{ x: [0, 60, 0], y: [0, -40, 0] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative z-10 w-full max-w-lg rounded-3xl border border-white/10 bg-white/[0.05] p-8 backdrop-blur-2xl" style={{ boxShadow: "0 20px 60px -15px rgba(168,85,247,0.3)" }}>
        <div className="mb-4 flex justify-center"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500"><Sparkles className="h-6 w-6 text-white" /></div></div>
        <h2 className="text-center text-3xl font-bold text-white" style={{ letterSpacing: "-0.03em" }}>Join the early access.</h2>
        <p className="mt-2 text-center text-sm text-white/60">Be the first to try our AI-powered platform. Free during beta.</p>
        <form onSubmit={(e) => e.preventDefault()} className="mt-6 flex flex-col gap-3 sm:flex-row"><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className="flex-1 rounded-xl border border-white/10 bg-white/[0.05] py-3 px-4 text-sm text-white placeholder:text-white/30 outline-none focus:border-violet-400/50" /><button className="group flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 px-5 py-3 text-sm font-semibold text-white transition-transform hover:scale-105">Join <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></button></form>
        <p className="mt-4 text-center text-xs text-white/40">Join 2,847 people already on the waitlist</p>
      </motion.div>
    </section>
  );
}
