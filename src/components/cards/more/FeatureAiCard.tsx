"use client";
import { motion } from "framer-motion";
import { Sparkles, Brain, MessageSquare, Cpu } from "lucide-react";
const ITEMS = [{ icon: Brain, title: "GPT-4 Powered", desc: "State-of-the-art language models for every task." }, { icon: MessageSquare, title: "Natural Chat", desc: "Conversational interface that understands context." }, { icon: Cpu, title: "Custom Models", desc: "Fine-tune on your data for domain-specific results." }, { icon: Sparkles, title: "Auto-insights", desc: "AI proactively surfaces patterns and anomalies." }];
export function FeatureAiCard() {
  return (
    <section className="relative overflow-hidden px-6 py-20" style={{ background: "radial-gradient(ellipse at top, #1e1b4b 0%, #0f0a26 50%, #050217 100%)", fontFamily: "var(--font-inter-tight), system-ui, sans-serif" }}>
      <motion.div className="absolute top-1/4 left-1/3 h-72 w-72 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(168,85,247,0.3), transparent 60%)", filter: "blur(50px)" }} animate={{ x: [0, 60, 0], y: [0, -40, 0] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }} />
      <div className="relative z-10 mx-auto max-w-4xl">
        <div className="mb-10 text-center"><span className="inline-flex items-center gap-1.5 rounded-full border border-violet-400/30 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300"><Sparkles className="h-3 w-3" /> AI Powered</span><h2 className="mt-4 text-4xl font-bold tracking-tight text-white" style={{ letterSpacing: "-0.03em" }}>Intelligence built in.</h2></div>
        <div className="grid gap-4 md:grid-cols-2">{ITEMS.map((item, i) => (<motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur-sm"><div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/15 text-violet-300"><item.icon className="h-4 w-4" /></div><h3 className="mt-3 text-sm font-bold text-white">{item.title}</h3><p className="mt-1 text-xs text-white/50">{item.desc}</p></motion.div>))}</div>
      </div>
    </section>
  );
}
