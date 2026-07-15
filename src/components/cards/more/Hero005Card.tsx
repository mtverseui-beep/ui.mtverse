"use client";

import { ArrowRight, Command, CornerDownLeft } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useState, useEffect } from "react";

// ════════════════════════════════════════════════════════════════════════════
// Hero005Card — extracted from Electric Landing Page template
// ════════════════════════════════════════════════════════════════════════════
// Hero with:
//   • Gradient headline ("AI customer support that actually resolves issues")
//   • Typewriter animated placeholder in the search input
//   • "Try it" button + Cmd+Enter hint
//   • "1,000 free conversations" highlight
//   • Start Free Trial + View Docs CTAs
//   • Trusted-by logos bar at the bottom
//
// Cyan accent (changed from original lime green). Uses cs-* tokens for
// perfect dark + light theme support.

const EXAMPLE_PROMPTS = [
  "Help me reset my password...",
  "Where is my order #12345...",
  "How do I upgrade my plan...",
  "I need a refund for my purchase...",
  "Can you help me with billing...",
];

const TRUSTED_LOGOS = ["TechCrunch", "Forbes", "WIRED", "The Verge", "Product Hunt"];

// Accent color — cyan (changed from original lime green)
const ACCENT = "#06b6d4";
const ACCENT_RGB = "6, 182, 212";

export function Hero005Card() {
  const shouldReduceMotion = useReducedMotion();
  const [prompt, setPrompt] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [promptIndex, setPromptIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (prompt || isFocused || shouldReduceMotion) {
      setDisplayText("");
      return;
    }
    const currentPrompt = EXAMPLE_PROMPTS[promptIndex];
    let charIndex = 0;
    let timeout: ReturnType<typeof setInterval>;
    if (isTyping) {
      timeout = setInterval(() => {
        if (charIndex <= currentPrompt.length) {
          setDisplayText(currentPrompt.slice(0, charIndex));
          charIndex++;
        } else {
          clearInterval(timeout);
          setTimeout(() => setIsTyping(false), 2000);
        }
      }, 50);
    } else {
      charIndex = currentPrompt.length;
      timeout = setInterval(() => {
        if (charIndex >= 0) {
          setDisplayText(currentPrompt.slice(0, charIndex));
          charIndex--;
        } else {
          clearInterval(timeout);
          setPromptIndex((prev) => (prev + 1) % EXAMPLE_PROMPTS.length);
          setIsTyping(true);
        }
      }, 30);
    }
    return () => clearInterval(timeout);
  }, [promptIndex, isTyping, prompt, isFocused, shouldReduceMotion]);

  const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

  return (
    <section className="relative min-h-full flex flex-col overflow-hidden bg-background">
      <style>{`
        .hero005-gradient-accent {
          background: linear-gradient(135deg, ${ACCENT} 0%, #0891b2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      {/* ── Background glow — exact copy from original page.tsx ──
          1500×1500 accent-colored div at top-right, masked with a radial
          gradient (visible at top-right, fades to transparent), overlaid
          with a grain texture (grade.png). */}
      <div
        className="absolute top-0 right-0 w-[1500px] h-[1500px] pointer-events-none z-0"
        style={{
          background: ACCENT,
          maskImage: "radial-gradient(ellipse 50% 50% at 100% 0%, rgb(0 0 0 / 0.75), transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 50% 50% at 100% 0%, rgb(0 0 0 / 0.75), transparent)",
        }}
      >
        <div
          className="absolute inset-0 bg-cover bg-right-top opacity-30"
          style={{ backgroundImage: "url('/images/ai-portfolio/grade-electric.png')" }}
        />
      </div>

      <div className="flex-1 flex items-center justify-center pt-16 lg:pt-20 pb-20">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Headline */}
          <motion.h1
            initial={shouldReduceMotion ? {} : fadeUp.initial}
            animate={fadeUp.animate}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-balance mb-6 leading-[1.1] cs-text"
          >
            <span className="hero005-gradient-accent">AI customer support</span>
            <br />
            <span className="cs-text">that actually resolves issues</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={shouldReduceMotion ? {} : fadeUp.initial}
            animate={fadeUp.animate}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm sm:text-base lg:text-lg cs-muted max-w-2xl mx-auto mb-8 text-pretty leading-relaxed px-2"
          >
            Electric transforms your customer support with AI agents that understand context, resolve issues instantly,
            and learn from every conversation. 24/7 support that scales with your business.
          </motion.p>

          {/* Search input with typewriter placeholder */}
          <motion.div
            initial={shouldReduceMotion ? {} : fadeUp.initial}
            animate={fadeUp.animate}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-2xl mx-auto mb-6"
          >
            <div
              className="relative cs-surface border cs-border rounded-xl overflow-hidden"
              style={{ boxShadow: `0 0 30px rgba(${ACCENT_RGB}, 0.15), 0 0 60px rgba(${ACCENT_RGB}, 0.08)` }}
            >
              <div className="relative">
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder=""
                  className="w-full bg-transparent px-4 sm:px-5 py-3 sm:py-4 pr-20 sm:pr-28 cs-text focus:outline-none text-sm sm:text-base"
                />
                {!prompt && !isFocused && (
                  <div className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 pointer-events-none text-sm sm:text-base cs-subtle truncate max-w-[60%] sm:max-w-none">
                    {displayText}
                    <span className="inline-block w-[2px] h-[1em] ml-0.5 animate-pulse align-middle" style={{ background: ACCENT }} />
                  </div>
                )}
                {!prompt && isFocused && (
                  <div className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 pointer-events-none text-sm sm:text-base cs-subtle opacity-50">
                    Ask a support question...
                  </div>
                )}
              </div>
              <div className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-1 cs-subtle opacity-50 text-xs">
                  <Command className="w-3 h-3" />
                  <CornerDownLeft className="w-3 h-3" />
                </div>
                <button
                  type="button"
                  className="text-sm font-medium text-white rounded-lg px-3 py-1.5 transition-opacity hover:opacity-90"
                  style={{ background: ACCENT }}
                >
                  Try it
                </button>
              </div>
            </div>
          </motion.div>

          {/* Decorative separators */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center justify-center gap-2 cs-subtle opacity-40 mb-6 pointer-events-none select-none"
            aria-hidden="true"
          >
            <span>✕</span><span>◇</span><span>✕</span><span>◇</span>
          </motion.div>

          {/* Free conversations highlight */}
          <motion.div
            initial={shouldReduceMotion ? {} : fadeUp.initial}
            animate={fadeUp.animate}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-6"
          >
            <p className="text-2xl sm:text-3xl lg:text-4xl font-bold cs-text mb-2">
              <span className="hero005-gradient-accent">1,000</span> free conversations
            </p>
            <p className="cs-muted text-xs sm:text-sm">deploy AI support agents instantly</p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={shouldReduceMotion ? {} : fadeUp.initial}
            animate={fadeUp.animate}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <button
              type="button"
              className="inline-flex items-center gap-2 h-12 rounded-full px-8 text-base font-medium text-white transition-opacity hover:opacity-90 w-full sm:w-auto"
              style={{ background: ACCENT }}
            >
              Start Free Trial <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 h-12 rounded-full px-8 text-base font-medium cs-text border cs-border bg-transparent hover:bg-[var(--card-hover)] transition-colors w-full sm:w-auto"
            >
              View Docs <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Trusted-by logos */}
      <motion.div
        initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="relative py-6 sm:py-8 border-t cs-border bg-background/80 backdrop-blur-sm"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs sm:text-sm cs-subtle opacity-60 mb-4 sm:mb-6 text-center">
            Trusted by innovative teams worldwide
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-12 gap-y-3 sm:gap-y-4">
            {TRUSTED_LOGOS.map((logo) => (
              <span key={logo} className="text-base sm:text-lg md:text-xl font-semibold cs-subtle opacity-50 hover:opacity-80 transition-opacity">
                {logo}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
