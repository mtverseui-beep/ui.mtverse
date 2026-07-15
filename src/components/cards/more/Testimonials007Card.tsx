"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

// Testimonials007 — Brutalist black/yellow offset shadow grid
const TESTIMONIALS = [
  { quote: "Shipped our MVP in 2 weeks. Insane.", name: "Sarah C.", role: "CTO, TechFlow", stars: 5 },
  { quote: "Best tool we've used all year. Period.", name: "Marcus J.", role: "VP Eng, Scale", stars: 5 },
  { quote: "Deploy time: hours → minutes. Wild.", name: "Emily R.", role: "Lead Dev, Nexus", stars: 5 },
  { quote: "Onboarding was effortless. 10/10.", name: "David P.", role: "IT Manager, Apex", stars: 5 },
  { quote: "Productivity up 40%. No joke.", name: "Aisha P.", role: "CS Lead, Quantum", stars: 5 },
  { quote: "Seamless. Powerful. Essential.", name: "James W.", role: "CEO, Quantum", stars: 5 },
];

export function Testimonials007Card() {
  return (
    <section className="px-6 py-24" style={{ background: "#fefce8", fontFamily: "var(--font-archivo), system-ui, sans-serif" }}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <span className="inline-block border-2 border-black bg-yellow-300 px-3 py-1 text-xs font-bold uppercase tracking-widest" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>{"// testimonials"}</span>
          <h2 className="mt-5 text-5xl font-black uppercase leading-[0.9] md:text-7xl" style={{ letterSpacing: "-0.05em" }}>
            What people<br /><span className="bg-yellow-300 px-2">actually say.</span>
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: (i % 3) * 0.08 }}
              whileHover={{ y: -4 }}
              className="border-2 border-black bg-white p-5 transition-all"
              style={{ boxShadow: "6px 6px 0 0 #000" }}
            >
              <div className="mb-3 flex text-amber-500">
                {Array.from({ length: 5 }).map((_, s) => <Star key={s} className="h-3.5 w-3.5" fill={s < t.stars ? "currentColor" : "none"} strokeWidth={2.5} />)}
              </div>
              <p className="text-base font-bold leading-snug text-black">"{t.quote}"</p>
              <div className="mt-4 border-t-2 border-dashed border-black pt-3">
                <p className="text-sm font-black uppercase">{t.name}</p>
                <p className="text-[10px] uppercase tracking-widest text-black/60" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
