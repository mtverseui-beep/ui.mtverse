"use client";

import { Sparkles, ArrowRight } from "lucide-react";
import { LiquidCtaButton } from "@/components/buttons/liquid-cta-button";

// ════════════════════════════════════════════════════════════════════════════
// Hero002Card — extracted from framer-motion-error project
// ════════════════════════════════════════════════════════════════════════════
// Centered hero with badge, gradient headline, subheadline, CTAs, and social
// proof (avatar stack + star rating). Uses the exact LiquidCtaButton from
// the source project — a liquid-metal shader border (animated shimmer) via
// @paper-design/shaders-react.

export function Hero002Card() {
  return (
    <section className="flex min-h-full flex-col items-center justify-center px-6 pt-24 pb-20 relative">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/5 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 border cs-border mb-8">
          <Sparkles className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Introducing v2.0 — Now with AI</span>
        </div>

        {/* Headline */}
        <h1 className="font-bold text-5xl md:text-7xl tracking-tight mb-6">
          <span className="block">Build faster.</span>
          <span className="bg-gradient-to-r from-muted-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
            Ship smarter.
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed text-balance">
          The all-in-one platform that helps teams build, deploy, and scale their products 10x faster. No complexity,
          just results.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <LiquidCtaButton>Start Free Trial</LiquidCtaButton>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="group flex items-center gap-2 px-6 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <span>See how it works</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </div>

        {/* Social proof */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {[
                "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
                "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200",
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200",
              ].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt="User avatar"
                  className="w-10 h-10 rounded-full border-2 border-background hover:-translate-y-1 transition object-cover"
                  style={{ zIndex: i + 1 }}
                />
              ))}
            </div>
            <div className="h-8 w-px cs-border" />
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="#FACC15"
                    stroke="#FACC15"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
                  </svg>
                ))}
                <span className="font-medium ml-1 text-sm">5.0</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Trusted by <span className="text-foreground font-medium">10,000+</span> developers
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
