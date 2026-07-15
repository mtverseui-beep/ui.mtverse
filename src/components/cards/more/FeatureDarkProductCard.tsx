"use client";
import { motion } from "framer-motion";
import { Zap, Shield, Code2, Globe } from "lucide-react";
const FEATURES = [{ icon: Zap, title: "Instant", desc: "Deploy in under 60 seconds.", color: "#06b6d4" }, { icon: Shield, title: "Secure", desc: "SOC 2 + encryption built-in.", color: "#10b981" }, { icon: Code2, title: "Open API", desc: "Full REST + GraphQL access.", color: "#8b5cf6" }, { icon: Globe, title: "Global", desc: "200+ edge locations.", color: "#f59e0b" }];
export function FeatureDarkProductCard() {
  return (
    <section className="relative overflow-hidden px-6 py-20" style={{ background: "#050810", fontFamily: "var(--font-inter-tight), system-ui, sans-serif" }}>
      <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: "radial-gradient(rgba(6,182,212,0.08) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      <div className="relative mx-auto max-w-4xl">
        <div className="mb-10 text-center"><span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-1 text-xs font-medium text-cyan-400">Product</span><h2 className="mt-4 text-4xl font-bold tracking-tight text-white" style={{ letterSpacing: "-0.03em" }}>Built different.</h2></div>
        <div className="grid gap-4 sm:grid-cols-2">{FEATURES.map((f, i) => (<motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} whileHover={{ y: -4 }} className="group relative overflow-hidden rounded-xl border p-5 transition-all" style={{ borderColor: `${f.color}20`, background: `${f.color}05` }}><div className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full opacity-0 blur-2xl transition-opacity group-hover:opacity-30" style={{ background: f.color }} /><f.icon className="h-5 w-5" style={{ color: f.color }} /><h3 className="mt-2 text-sm font-bold text-white">{f.title}</h3><p className="text-xs text-white/40">{f.desc}</p></motion.div>))}</div>
      </div>
    </section>
  );
}
