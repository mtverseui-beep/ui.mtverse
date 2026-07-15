"use client";
import { motion } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";
export function CtaTestimonialCard() {
  return (
    <section className="px-6 py-20" style={{ background: "#0a0a0f", fontFamily: "var(--font-inter-tight), system-ui, sans-serif" }}>
      <div className="mx-auto max-w-2xl text-center">
        <div className="mb-4 flex justify-center gap-1 text-amber-400">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4" fill="currentColor" />)}</div>
        <motion.blockquote initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-2xl font-medium leading-tight text-white" style={{ letterSpacing: "-0.02em" }}>"This is the best tool we've ever used. Our team ships 3x faster and everyone is happier."</motion.blockquote>
        <div className="mt-6 flex items-center justify-center gap-3"><img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face" alt="" className="h-10 w-10 rounded-full object-cover" /><div className="text-left"><p className="text-sm font-semibold text-white">Sarah Chen</p><p className="text-xs text-white/50">CTO, TechFlow</p></div></div>
        <a href="#" onClick={(e) => e.preventDefault()} className="group mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 px-6 py-3 text-sm font-bold text-white transition-transform hover:scale-105">Try it yourself <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></a>
      </div>
    </section>
  );
}
