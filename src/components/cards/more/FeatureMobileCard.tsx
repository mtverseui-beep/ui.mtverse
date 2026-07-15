"use client";
import { motion } from "framer-motion";
import { Bell, Lock, Zap, Star } from "lucide-react";
const FEATURES = [{ icon: Bell, title: "Push notifications", desc: "Real-time alerts on iOS and Android." }, { icon: Lock, title: "Biometric auth", desc: "Face ID and fingerprint support." }, { icon: Zap, title: "Offline mode", desc: "Work without internet, sync later." }, { icon: Star, title: "4.9 rating", desc: "Loved by 250K+ users worldwide." }];
export function FeatureMobileCard() {
  return (
    <section className="px-6 py-20" style={{ background: "linear-gradient(180deg, #eff6ff 0%, #ffffff 100%)", fontFamily: "var(--font-manrope), system-ui, sans-serif" }}>
      <div className="mx-auto max-w-4xl">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div><h2 className="text-4xl font-bold tracking-tight text-slate-900" style={{ letterSpacing: "-0.03em" }}>Your work, in your pocket.</h2><p className="mt-3 text-base text-slate-600">Native iOS and Android apps with full feature parity.</p><div className="mt-6 space-y-4">{FEATURES.map((f, i) => (<motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex items-start gap-3"><div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600"><f.icon className="h-4 w-4" /></div><div><h3 className="text-sm font-bold text-slate-900">{f.title}</h3><p className="text-xs text-slate-500">{f.desc}</p></div></motion.div>))}</div></div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex justify-center"><div className="relative h-[400px] w-[200px] rounded-[2.5rem] border-4 border-slate-900 bg-slate-900 p-1.5 shadow-2xl"><div className="h-full w-full rounded-[2rem] bg-white overflow-hidden"><div className="flex h-20 items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 text-white"><Star className="h-8 w-8" fill="white" /></div><div className="space-y-2 p-3">{[1,2,3,4].map(i => (<div key={i} className="h-16 rounded-lg bg-slate-100" />))}</div></div></div></motion.div>
        </div>
      </div>
    </section>
  );
}
