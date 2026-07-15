"use client";
import { motion } from "framer-motion";
import { MessageCircle, Users } from "lucide-react";
export function CtaCommunityJoinCard() {
  return (
    <section className="relative overflow-hidden px-6 py-20" style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%)", fontFamily: "var(--font-inter-tight), system-ui, sans-serif" }}>
      <motion.div className="absolute top-1/4 left-1/3 h-72 w-72 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(88,101,242,0.25), transparent 60%)", filter: "blur(50px)" }} animate={{ x: [0, 50, 0], y: [0, -30, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} />
      <div className="relative z-10 mx-auto max-w-lg text-center">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: "#5865F2" }}><MessageCircle className="h-7 w-7 text-white" /></motion.div>
        <h2 className="text-3xl font-bold tracking-tight text-white" style={{ letterSpacing: "-0.03em" }}>Join our community.</h2>
        <p className="mt-2 text-sm text-white/60">Connect with 12,400+ developers, designers, and founders in our Discord.</p>
        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-white/50"><Users className="h-3.5 w-3.5" /><span style={{ fontFamily: "var(--font-jetbrains), monospace" }}>4,287 online now</span><span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" /><span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" /></span></div>
        <a href="#" onClick={(e) => e.preventDefault()} className="mt-6 inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold text-white transition-transform hover:scale-105" style={{ background: "#5865F2", boxShadow: "0 10px 30px -10px rgba(88,101,242,0.6)" }}>Join Discord</a>
      </div>
    </section>
  );
}
