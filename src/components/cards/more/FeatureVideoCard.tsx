"use client";
import { motion } from "framer-motion";
import { Play, Check } from "lucide-react";
const POINTS = ["Full HD screen recording", "Auto-generated transcripts", "Chapter markers", "Embed anywhere"];
export function FeatureVideoCard() {
  return (
    <section className="px-6 py-20" style={{ background: "#0a0a0f", fontFamily: "var(--font-inter-tight), system-ui, sans-serif" }}>
      <div className="mx-auto max-w-4xl">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div className="order-2 md:order-1"><h2 className="text-4xl font-bold tracking-tight text-white" style={{ letterSpacing: "-0.03em" }}>Show, don't tell.</h2><p className="mt-3 text-base text-white/60">Record your screen, add voiceover, and share with your team — all in one place.</p>
            <ul className="mt-6 space-y-3">{POINTS.map((p, i) => (<motion.li key={p} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-center gap-2.5 text-sm text-white/80"><Check className="h-4 w-4 text-rose-500" strokeWidth={3} />{p}</motion.li>))}</ul>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="order-1 md:order-2">
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10" style={{ background: "linear-gradient(135deg, #1e1b4b, #0f172a)" }}><div className="absolute inset-0 flex items-center justify-center"><button className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur-md transition-transform hover:scale-110"><Play className="h-6 w-6 fill-white text-white" /></button></div><div className="absolute bottom-3 left-3 rounded bg-black/60 px-2 py-0.5 text-[10px] text-white" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>3:42</div></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
