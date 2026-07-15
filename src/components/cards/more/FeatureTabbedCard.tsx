"use client";
import { useState } from "react";
import { motion, LayoutGroup } from "framer-motion";
import { Zap, Shield, BarChart3 } from "lucide-react";
const TABS = [{ id: "speed", label: "Speed", icon: Zap, color: "#f59e0b", title: "Lightning-fast performance", desc: "Sub-50ms response times with our global edge network. Your users never wait.", points: ["50ms avg response", "200+ edge locations", "Auto-scaling", "Zero cold starts"] }, { id: "security", label: "Security", icon: Shield, color: "#10b981", title: "Bank-grade security", desc: "End-to-end encryption, SOC 2 Type II, and granular access controls built in.", points: ["SOC 2 Type II", "End-to-end encryption", "GDPR compliant", "Audit logs"] }, { id: "analytics", label: "Analytics", icon: BarChart3, color: "#06b6d4", title: "Real-time insights", desc: "Live dashboards with custom metrics, automated reports, and predictive analytics.", points: ["Live dashboards", "Custom metrics", "Automated reports", "Predictive AI"] }];
export function FeatureTabbedCard() {
  const [tab, setTab] = useState("speed");
  const active = TABS.find(t => t.id === tab)!;
  return (
    <section className="px-6 py-20" style={{ background: "#0a0a0f", fontFamily: "var(--font-inter-tight), system-ui, sans-serif" }}>
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-8 text-center text-4xl font-bold tracking-tight text-white" style={{ letterSpacing: "-0.03em" }}>Why teams choose us.</h2>
        <LayoutGroup id="feature-tabs"><div className="mb-8 flex justify-center gap-1 rounded-xl border border-white/10 bg-white/[0.03] p-1">{TABS.map(t => (<button key={t.id} onClick={() => setTab(t.id)} className="relative flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-colors" style={{ color: tab === t.id ? "#fff" : "rgba(255,255,255,0.5)" }}>{tab === t.id && <motion.div layoutId="feature-tab-active" className="absolute inset-0 rounded-lg" style={{ background: `${t.color}20`, border: `1px solid ${t.color}40` }} />}<span className="relative z-10 flex items-center gap-1.5"><t.icon className="h-3.5 w-3.5" />{t.label}</span></button>))}</div></LayoutGroup>
        <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="rounded-2xl border border-white/10 bg-white/[0.02] p-8"><h3 className="text-2xl font-bold text-white">{active.title}</h3><p className="mt-2 text-sm text-white/60">{active.desc}</p><div className="mt-6 grid grid-cols-2 gap-3">{active.points.map(p => (<div key={p} className="flex items-center gap-2 text-sm text-white/80"><span className="h-1.5 w-1.5 rounded-full" style={{ background: active.color }} />{p}</div>))}</div></motion.div>
      </div>
    </section>
  );
}
