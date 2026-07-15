"use client";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Users, Activity } from "lucide-react";
const STATS = [{ icon: TrendingUp, label: "Revenue", value: "$84.2K", trend: "+12%", color: "#10b981" }, { icon: Users, label: "Active Users", value: "12,847", trend: "+3.2%", color: "#06b6d4" }, { icon: Activity, label: "Sessions", value: "48.2K", trend: "+8.1%", color: "#8b5cf6" }, { icon: BarChart3, label: "Conversion", value: "3.4%", trend: "-0.8%", color: "#f59e0b" }];
export function FeatureDashboardPreviewCard() {
  return (
    <section className="px-6 py-20" style={{ background: "#0f172a", fontFamily: "var(--font-inter-tight), system-ui, sans-serif" }}>
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center"><h2 className="text-4xl font-bold tracking-tight text-white" style={{ letterSpacing: "-0.03em" }}>See your business at a glance.</h2></div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">{STATS.map((s, i) => (<motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="rounded-xl border border-white/5 bg-white/[0.02] p-3"><s.icon className="h-3.5 w-3.5" style={{ color: s.color }} /><p className="mt-1.5 text-lg font-bold text-white" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>{s.value}</p><p className="text-[10px] text-white/40">{s.label}</p><p className="text-[10px] font-bold" style={{ color: s.color }}>{s.trend}</p></motion.div>))}</div>
          <div className="mt-3 grid grid-cols-3 gap-3"><div className="col-span-2 h-40 rounded-xl bg-white/[0.02] p-3"><div className="flex h-full items-end gap-1">{[40,60,45,80,55,70,90,65,85,75,95,60].map((h, i) => (<motion.div key={i} initial={{ height: 0 }} whileInView={{ height: `${h}%` }} viewport={{ once: true }} transition={{ delay: i * 0.03, duration: 0.4 }} className="flex-1 rounded-t" style={{ background: `linear-gradient(to top, #6366f1, #818cf8)`, opacity: 0.7 + (h / 200) }} />))}</div></div><div className="h-40 rounded-xl bg-white/[0.02] p-3"><div className="flex h-full items-center justify-center"><div className="relative h-24 w-24"><svg viewBox="0 0 100 100" className="h-full w-full -rotate-90"><circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" /><motion.circle cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="8" strokeLinecap="round" strokeDasharray="251" initial={{ strokeDashoffset: 251 }} whileInView={{ strokeDashoffset: 75 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.3 }} /></svg><div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-white">70%</div></div></div></div></div>
        </motion.div>
      </div>
    </section>
  );
}
