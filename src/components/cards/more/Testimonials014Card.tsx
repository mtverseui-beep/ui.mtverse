"use client";

import { motion } from "framer-motion";
import { Star, Terminal } from "lucide-react";

// Testimonials014 — Terminal/CLI developer style with green phosphor
const TESTIMONIALS = [
  { quote: "shipped MVP in 2 weeks. 3x faster. unreal.", name: "sarah_chen", role: "// CTO @ techflow", stars: 5 },
  { quote: "deploy time: 4h → 8min. game changer.", name: "marcus_j", role: "// VP eng @ scale", stars: 5 },
  { quote: "best dev tool we've used. period.", name: "emily_r", role: "// lead dev @ nexus", stars: 5 },
  { quote: "onboarding took 30 min. 30!!", name: "david_p", role: "// IT mgr @ apex", stars: 5 },
  { quote: "ROI in 2 weeks. two. weeks.", name: "aisha_p", role: "// CS lead @ quantum", stars: 5 },
  { quote: "can't work without it now.", name: "james_w", role: "// CEO @ quantum", stars: 5 },
];

export function Testimonials014Card() {
  return (
    <section className="px-6 py-24" style={{ background: "#000000", fontFamily: "var(--font-jetbrains), ui-monospace, monospace", color: "#22c55e" }}>
      <div className="pointer-events-none absolute inset-0 opacity-30" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(34,197,94,0.04) 2px, rgba(34,197,94,0.04) 3px)" }} />
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-500/70 flex items-center gap-2"><Terminal className="h-3.5 w-3.5" /> {"// testimonials.log"}</p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl" style={{ color: "#22c55e", textShadow: "0 0 20px rgba(34,197,94,0.4)", letterSpacing: "-0.03em" }}>$ cat feedback.txt</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: (i % 3) * 0.08 }} className="rounded border border-emerald-500/30 bg-black/50 p-5">
              <div className="mb-3 flex text-emerald-500">{Array.from({ length: 5 }).map((_, s) => <Star key={s} className="h-3.5 w-3.5" fill={s < t.stars ? "currentColor" : "none"} strokeWidth={2} />)}</div>
              <p className="text-sm text-emerald-400">{"// "}{t.quote}</p>
              <div className="mt-4 border-t border-emerald-500/20 pt-3">
                <p className="text-xs font-bold text-emerald-400">@{t.name}</p>
                <p className="text-[10px] text-emerald-500/50">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <p className="mt-10 text-center text-[10px] text-emerald-500/40"><span className="text-emerald-400">✓</span> 6 testimonials loaded · <span className="text-emerald-400">✓</span> avg rating: 5.0/5</p>
      </div>
    </section>
  );
}
