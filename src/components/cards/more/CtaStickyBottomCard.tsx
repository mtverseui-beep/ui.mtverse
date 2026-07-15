"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
export function CtaStickyBottomCard() {
  const [show, setShow] = useState(true);
  return (
    <section className="flex min-h-full flex-col" style={{ background: "#ffffff", fontFamily: "var(--font-inter-tight), system-ui, sans-serif" }}>
      <div className="flex flex-1 items-center justify-center px-6"><div className="text-center"><h2 className="text-2xl font-bold text-slate-900">Your content here.</h2><p className="mt-2 text-sm text-slate-500">Scroll to see the sticky CTA bar appear at the bottom.</p></div></div>
      <AnimatePresence>{show && (<motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }} transition={{ type: "spring", stiffness: 300, damping: 30 }} className="sticky bottom-0 z-50 border-t border-white/10 bg-slate-900 px-4 py-3"><div className="mx-auto flex max-w-3xl items-center justify-between gap-4"><div className="flex-1"><p className="text-sm font-semibold text-white">Ready to get started?</p><p className="text-xs text-white/50">14-day free trial · No credit card</p></div><div className="flex items-center gap-2"><a href="#" onClick={(e) => e.preventDefault()} className="group inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-bold text-slate-900">Start free <ArrowRight className="h-3 w-3" /></a><button onClick={() => setShow(false)} className="text-white/40 hover:text-white" aria-label="Dismiss"><X className="h-4 w-4" /></button></div></div></motion.div>)}</AnimatePresence>
    </section>
  );
}
