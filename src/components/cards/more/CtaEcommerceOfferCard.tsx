"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Tag } from "lucide-react";
export function CtaEcommerceOfferCard() {
  const [time, setTime] = useState({ h: 5, m: 42, s: 18 });
  useEffect(() => { const i = setInterval(() => { setTime(t => { let { h, m, s } = t; s--; if (s < 0) { s = 59; m--; } if (m < 0) { m = 59; h--; } if (h < 0) { h = 23; } return { h, m, s }; }); }, 1000); return () => clearInterval(i); }, []);
  return (
    <section className="relative overflow-hidden px-6 py-20" style={{ background: "linear-gradient(135deg, #be123c 0%, #881337 100%)", fontFamily: "var(--font-inter-tight), system-ui, sans-serif" }}>
      <div className="relative z-10 mx-auto max-w-lg text-center text-white">
        <motion.div initial={{ opacity: 0, scale: 0.8, rotate: -5 }} whileInView={{ opacity: 1, scale: 1, rotate: 0 }} viewport={{ once: true }} className="mx-auto mb-4 w-fit"><span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-4 py-1.5 text-sm font-bold backdrop-blur"><Tag className="h-4 w-4" /> FLASH SALE</span></motion.div>
        <h2 className="text-5xl font-black tracking-tight" style={{ letterSpacing: "-0.04em" }}>40% OFF</h2>
        <p className="mt-2 text-lg text-rose-100">Everything in the store. Today only.</p>
        <div className="mt-5 flex justify-center gap-3">{(["h","m","s"] as const).map(k => { const v = time[k]; return (<div key={k} className="rounded-xl bg-white/10 px-4 py-2 backdrop-blur"><p className="text-2xl font-bold tabular-nums" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>{String(v).padStart(2,"0")}</p><p className="text-[9px] uppercase text-rose-200">{k === "h" ? "Hours" : k === "m" ? "Mins" : "Secs"}</p></div>); })}</div>
        <a href="#" onClick={(e) => e.preventDefault()} className="group mt-6 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-rose-700 transition-transform hover:scale-105">Shop now <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></a>
        <p className="mt-3 text-xs text-rose-200/70">Use code FLASH40 at checkout</p>
      </div>
    </section>
  );
}
