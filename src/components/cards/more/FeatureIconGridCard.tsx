"use client";
import { motion } from "framer-motion";
import { Zap, Shield, Sparkles, BarChart3, Code2, Globe, Cloud, Lock } from "lucide-react";
const FEATURES = [
  { icon: Zap, title: "Lightning Fast", desc: "Sub-50ms response times globally.", color: "#f59e0b" },
  { icon: Shield, title: "Secure by Default", desc: "SOC 2 Type II + end-to-end encryption.", color: "#10b981" },
  { icon: Sparkles, title: "AI-Powered", desc: "Smart suggestions and auto-optimization.", color: "#8b5cf6" },
  { icon: BarChart3, title: "Real-time Analytics", desc: "Live dashboards and custom reports.", color: "#06b6d4" },
  { icon: Code2, title: "Developer First", desc: "Full API, SDKs, and webhooks.", color: "#6366f1" },
  { icon: Globe, title: "Global CDN", desc: "200+ edge locations worldwide.", color: "#ec4899" },
  { icon: Cloud, title: "Cloud Native", desc: "Auto-scaling with zero config.", color: "#0ea5e9" },
  { icon: Lock, title: "Compliance Ready", desc: "GDPR, HIPAA, and FedRAMP.", color: "#f43f5e" },
];
export function FeatureIconGridCard() {
  return (
    <section className="px-6 py-20" style={{ background: "#ffffff", fontFamily: "var(--font-inter-tight), system-ui, sans-serif" }}>
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center"><h2 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl" style={{ letterSpacing: "-0.03em" }}>Built for scale.</h2><p className="mt-3 text-base text-slate-500">Powerful features that grow with your team.</p></div>
        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
          {FEATURES.map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: (i % 4) * 0.08 }} whileHover={{ y: -6 }} className="rounded-2xl border border-slate-200 bg-white p-5 transition-shadow hover:shadow-lg">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: `${f.color}15`, color: f.color }}><f.icon className="h-5 w-5" /></div>
              <h3 className="mt-3 text-base font-bold text-slate-900">{f.title}</h3>
              <p className="mt-1 text-xs text-slate-500">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
