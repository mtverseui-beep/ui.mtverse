"use client";
import { motion } from "framer-motion";
import { ArrowRight, Bell, Lock, Zap } from "lucide-react";
export function CtaMobileAppCard() {
  return (
    <section className="px-6 py-20" style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)", fontFamily: "var(--font-manrope), system-ui, sans-serif" }}>
      <div className="mx-auto max-w-4xl">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div className="text-white"><h2 className="text-3xl font-bold tracking-tight" style={{ letterSpacing: "-0.03em" }}>Take it everywhere.</h2><p className="mt-2 text-sm text-blue-100">Your workspace, now in your pocket. Full features, offline mode, push notifications.</p><div className="mt-5 space-y-3">{[{icon:Zap,t:"Lightning fast"},{icon:Lock,t:"Biometric secure"},{icon:Bell,t:"Real-time alerts"}].map((f,i) => <motion.div key={i} initial={{opacity:0,x:-10}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:i*0.08}} className="flex items-center gap-2.5 text-sm text-blue-50"><f.icon className="h-4 w-4" />{f.t}</motion.div>)}</div><a href="#" onClick={(e)=>e.preventDefault()} className="group mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-blue-700 transition-transform hover:scale-105">Download app <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></a></div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex justify-center"><div className="h-[340px] w-[170px] rounded-[2.5rem] border-4 border-blue-950 bg-blue-950 p-1.5 shadow-2xl"><div className="h-full w-full rounded-[2rem] bg-white overflow-hidden"><div className="flex h-16 items-center justify-center bg-blue-600 text-white text-sm font-bold">App</div><div className="space-y-2 p-3">{[1,2,3,4].map(i => <div key={i} className="h-14 rounded-lg bg-blue-50" />)}</div></div></div></motion.div>
        </div>
      </div>
    </section>
  );
}
