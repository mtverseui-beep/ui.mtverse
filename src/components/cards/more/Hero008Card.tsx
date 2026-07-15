"use client";

import { Shield } from "lucide-react";
import { motion } from "framer-motion";

// ════════════════════════════════════════════════════════════════════════════
// Hero008Card — exact copy from Skydda AI Sentinel
// ════════════════════════════════════════════════════════════════════════════
// Full-screen hero with:
//   • Background image (hero-bg.jpg)
//   • Dark overlay for text readability
//   • Word-by-word blur reveal headline ("AI Defense That Sees Through the Dark")
//   • Subheadline + 2 CTAs
//   • Logo (Shield + "Skydda")

export function Hero008Card() {
  return (
    <section className="relative h-full min-h-[600px] w-full overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/ai-portfolio/skydda-hero-bg.jpg')" }}
      />

      {/* Subtle overlay for text readability */}
      <div className="absolute inset-0 bg-slate-950/20" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col">
        {/* Logo */}
        <div className="px-6 py-6">
          <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-2 text-white">
            <Shield className="h-5 w-5 text-amber-500" />
            <span className="font-medium">Skydda</span>
          </a>
        </div>

        {/* Hero Content */}
        <div className="flex flex-1 flex-col items-center px-6 pt-16 text-center md:pt-24">
          <h1 className="max-w-3xl text-balance text-5xl font-normal tracking-tight text-white md:text-6xl lg:text-7xl">
            {"AI Defense That Sees Through the Dark".split(" ").map((word, i) => (
              <motion.span
                key={i}
                initial={{ filter: "blur(10px)", opacity: 0 }}
                whileInView={{ filter: "blur(0px)", opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="inline-block mr-[0.25em]"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <p className="mt-6 max-w-xl text-balance text-center text-sm leading-relaxed text-white/70 md:text-base">
            Our autonomous AI sentinel detects and neutralizes zero-day threats before they reach your gateway.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="inline-flex items-center justify-center bg-white px-6 py-3 text-slate-900 hover:bg-white/90 rounded-md text-sm font-medium transition-colors"
            >
              Deploy the Sentinel
            </a>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="inline-flex items-center justify-center border border-white/30 bg-transparent px-6 py-3 text-white hover:bg-white/10 hover:text-white rounded-md text-sm font-medium transition-colors"
            >
              Read the Whitepaper
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
