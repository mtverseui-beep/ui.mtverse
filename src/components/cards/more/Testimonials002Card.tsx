"use client";

import { useState, useEffect, useRef } from "react";

// ════════════════════════════════════════════════════════════════════════════
// Testimonials002Card — extracted from AI Product Portfolio
// ════════════════════════════════════════════════════════════════════════════
// Dual-row infinite scroll testimonials:
//   • Row 1 scrolls left, Row 2 scrolls right (reverse)
//   • Pause on hover/touch
//   • Each card: avatar + author + role + quote + colored blur glow
//   • Section title with blur-reveal + gradient-to-black animation (IntersectionObserver)
//   • Desktop: 2 rows of horizontal scrollers. Mobile: sticky stacked cards.
//
// CSS animations (scroll-left, scroll-right, section-title-reveal,
// section-gradient-to-black) are inlined. Avatar images served from
// /public/images/ai-portfolio/.

const TESTIMONIALS = [
  { id: 1, quote: "Their AI design expertise transformed our product. The vibe coding approach allowed us to iterate rapidly and ship features 3x faster than traditional methods.", author: "Sarah Chen", role: "CEO at AI Startup", avatar: "/images/ai-portfolio/imgi_97_user77.webp", company: "Neural Labs", blurColor: "bg-blue-500" },
  { id: 2, quote: "Incredible work integrating GPT-4 into our interface. They understand both the technical AI capabilities and how to make them feel natural to users.", author: "Marcus Johnson", role: "Product Lead at OpenAI Partner", avatar: "/images/ai-portfolio/imgi_106_user86.webp", company: "Synthetics", blurColor: "bg-purple-500" },
  { id: 3, quote: "The prompt engineering skills are world-class. They built our entire design system using AI tools and it's production-ready and beautiful.", author: "Emily Rodriguez", role: "Founder at AI Design Tool", avatar: "/images/ai-portfolio/imgi_105_user85.webp", company: "DesignAI", blurColor: "bg-pink-500" },
  { id: 4, quote: "Working with an AI-native designer was eye-opening. They leveraged Midjourney and v0 to create concepts we never would have imagined.", author: "David Park", role: "CTO at ML Platform", avatar: "/images/ai-portfolio/imgi_102_user82.webp", company: "Tensor", blurColor: "bg-emerald-500" },
  { id: 5, quote: "Their mastery of generative design tools allowed us to explore 100+ variations in days, not months. Game-changing for our design process.", author: "Lisa Wang", role: "VP Design at Enterprise AI", avatar: "/images/ai-portfolio/imgi_100_user80.webp", company: "Cognition", blurColor: "bg-orange-500" },
  { id: 6, quote: "They don't just use AI tools—they think in AI. The conversational interfaces they designed feel genuinely intelligent and human.", author: "James Mitchell", role: "Director at Voice AI", avatar: "/images/ai-portfolio/imgi_107_user87.webp", company: "VoiceTech", blurColor: "bg-cyan-500" },
  { id: 7, quote: "The combination of design skills and AI engineering knowledge is rare. They built our AI assistant from concept to production in record time.", author: "Nina Patel", role: "CEO at Automation Platform", avatar: "/images/ai-portfolio/imgi_108_user88.webp", company: "AutoFlow", blurColor: "bg-rose-500" },
];

// ── SectionTitle with IntersectionObserver blur reveal ──
function SectionTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) setIsVisible(true);
        });
      },
      { threshold: 0.3 }
    );
    if (titleRef.current) observer.observe(titleRef.current);
    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <h2 ref={titleRef} className={`overflow-visible text-4xl ${className} ${isVisible ? "aip-section-title-animate" : "opacity-0"}`}>
      {children}
    </h2>
  );
}

export function Testimonials002Card() {
  const [isPaused, setIsPaused] = useState(false);
  const duplicated = [...TESTIMONIALS, ...TESTIMONIALS];
  const duplicatedReverse = [...TESTIMONIALS.slice().reverse(), ...TESTIMONIALS.slice().reverse()];
  const mobileTestimonials = TESTIMONIALS.slice(0, 6);

  return (
    <>
      <style>{`
        @keyframes aip-scroll-left { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes aip-scroll-right { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
        .aip-animate-scroll-left { animation: aip-scroll-left 25s linear infinite; }
        .aip-animate-scroll-right { animation: aip-scroll-right 25s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .aip-animate-scroll-left, .aip-animate-scroll-right { animation: none; }
        }

        @keyframes aip-section-title-reveal {
          0% { filter: blur(60px); opacity: 0; transform: translateY(20px); }
          100% { filter: blur(0px); opacity: 1; transform: translateY(0); }
        }
        @keyframes aip-section-gradient-to-black {
          0% {
            background: linear-gradient(45deg, rgba(59,130,246,1) 0%, rgba(139,92,246,1) 25%, rgba(6,182,212,1) 50%, rgba(245,158,11,1) 75%, rgba(59,130,246,1) 100%);
            background-size: 300% 300%; background-position: 0% 50%;
            background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          }
          40% {
            background: linear-gradient(45deg, rgba(59,130,246,1) 0%, rgba(139,92,246,1) 25%, rgba(6,182,212,1) 50%, rgba(245,158,11,1) 75%, rgba(59,130,246,1) 100%);
            background-size: 300% 300%; background-position: 100% 50%;
            background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          }
          50% { background: oklch(0.03 0 0); background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
          100% { background: oklch(0.03 0 0); background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        }
        .aip-section-title-animate {
          animation: aip-section-title-reveal 1s ease-out forwards, aip-section-gradient-to-black 1s ease-in-out forwards;
          overflow: visible; padding-top: 0.25rem; padding-bottom: 0.25rem;
        }
        @media (prefers-reduced-motion: reduce) {
          .aip-section-title-animate { animation: none; filter: none; opacity: 1; transform: none; }
        }
      `}</style>

      <section id="testimonials" className="py-12 overflow-hidden relative bg-background">
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent pointer-events-none z-20 hidden lg:block" />

        {/* Desktop: 2-row horizontal scroller */}
        <div className="hidden lg:block pl-6 md:pl-12">
          <div className="mb-8 max-w-[1280px]">
            <SectionTitle className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
              What clients say
            </SectionTitle>
          </div>

          {/* Row 1 — scroll left */}
          <div className="relative mb-6">
            <div
              className="flex gap-6 aip-animate-scroll-left"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setIsPaused(false)}
              style={{ animationPlayState: isPaused ? "paused" : "running" }}
            >
              {duplicated.map((t, index) => (
                <article
                  key={`${t.id}-${index}`}
                  className="relative flex-shrink-0 w-[300px] md:w-[340px] p-6 border bg-card hover:shadow-lg transition-shadow overflow-hidden border-zinc-100 rounded-3xl"
                >
                  <div className="flex items-center gap-3 mb-4">
                    { }
                    <img src={t.avatar} alt={t.author} width={48} height={48} className="rounded-full" />
                    <div>
                      <div className="font-semibold">{t.author}</div>
                      <div className="text-sm text-muted-foreground">{t.role}</div>
                    </div>
                  </div>
                  <blockquote className="text-base leading-relaxed font-semibold text-zinc-950 relative z-10 dark:text-zinc-100">
                    "{t.quote}"
                  </blockquote>
                  <div className={`absolute -bottom-12 -right-12 w-48 h-48 ${t.blurColor} rounded-full opacity-10`} style={{ filter: "blur(72px)" }} />
                </article>
              ))}
            </div>
          </div>

          {/* Row 2 — scroll right (reverse) */}
          <div className="relative">
            <div
              className="flex gap-6 aip-animate-scroll-right"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setIsPaused(false)}
              style={{ animationPlayState: isPaused ? "paused" : "running" }}
            >
              {duplicatedReverse.map((t, index) => (
                <article
                  key={`reverse-${t.id}-${index}`}
                  className="relative flex-shrink-0 w-[300px] md:w-[340px] p-6 border bg-card hover:shadow-lg transition-shadow overflow-hidden border-zinc-100 rounded-3xl"
                >
                  <div className="flex items-center gap-3 mb-4">
                    { }
                    <img src={t.avatar} alt={t.author} width={48} height={48} className="rounded-full" />
                    <div>
                      <div className="font-semibold">{t.author}</div>
                      <div className="text-sm text-muted-foreground">{t.role}</div>
                    </div>
                  </div>
                  <blockquote className="text-base leading-relaxed font-semibold text-zinc-950 relative z-10 dark:text-zinc-100">
                    "{t.quote}"
                  </blockquote>
                  <div className={`absolute -bottom-12 -right-12 w-48 h-48 ${t.blurColor} rounded-full opacity-10`} style={{ filter: "blur(72px)" }} />
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: sticky stacked cards */}
        <div className="lg:hidden max-w-[1280px] mx-auto px-6 md:px-12">
          <div className="mb-8">
            <SectionTitle className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
              What clients say
            </SectionTitle>
          </div>
          <div className="relative">
            {mobileTestimonials.map((t, index) => (
              <div key={t.id} className="sticky pt-10" style={{ top: `${70 + index * 0}px`, zIndex: index + 1 }}>
                <article className="relative p-6 md:p-8 border bg-card transition-shadow overflow-hidden border-zinc-100 rounded-3xl">
                  <div className="flex items-center gap-3 mb-4">
                    { }
                    <img src={t.avatar} alt={t.author} width={48} height={48} className="rounded-full" />
                    <div>
                      <div className="font-semibold">{t.author}</div>
                      <div className="text-sm text-muted-foreground">{t.role}</div>
                    </div>
                  </div>
                  <blockquote className="text-base leading-relaxed font-semibold text-zinc-950 relative z-10 dark:text-zinc-100">
                    "{t.quote}"
                  </blockquote>
                  <div className={`absolute -bottom-12 -right-12 w-48 h-48 ${t.blurColor} rounded-full opacity-10`} style={{ filter: "blur(72px)" }} />
                </article>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent pointer-events-none z-10 lg:hidden" />
      </section>
    </>
  );
}
