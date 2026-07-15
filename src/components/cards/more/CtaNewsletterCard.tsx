"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Check } from "lucide-react";
export function CtaNewsletterCard() {
  const [email, setEmail] = useState(""); const [done, setDone] = useState(false);
  return (
    <section className="px-6 py-20" style={{ background: "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)", fontFamily: "var(--font-manrope), system-ui, sans-serif" }}>
      <div className="mx-auto max-w-lg text-center">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 text-white"><Mail className="h-6 w-6" /></motion.div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900" style={{ letterSpacing: "-0.03em" }}>Get the weekly digest.</h2>
        <p className="mt-2 text-sm text-slate-600">Product updates, engineering tips, and exclusive offers. Every Wednesday.</p>
        <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="mt-6 flex flex-col gap-2 sm:flex-row"><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" className="flex-1 rounded-lg border border-slate-300 bg-white py-2.5 px-4 text-sm outline-none focus:border-emerald-500" /><button className="flex items-center justify-center gap-1.5 rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-105">{done ? <><Check className="h-4 w-4" /> Subscribed!</> : "Subscribe"}</button></form>
        <p className="mt-3 text-xs text-slate-500">Join 12,400 readers · Unsubscribe anytime</p>
      </div>
    </section>
  );
}
