"use client";

import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";

// ════════════════════════════════════════════════════════════════════════════
// Hero004Card — extracted from AI Product Portfolio
// ════════════════════════════════════════════════════════════════════════════
// Hero with:
//   • Animated orb image (rotates + hue-shifts)
//   • Word-by-word blur reveal headline ("Designing intelligence with a human touch")
//   • "AI" word gets a multi-color gradient + glow drop-shadow
//   • Paragraph + "Let's Talk" gradient button (glow on hover) + "View Works" link
//   • Designer image at bottom with scroll-driven clip-path mask reveal + opacity fade
//
// All CSS keyframes are inlined. Uses next/image for the orb + designer images
// (served from /public/images/ai-portfolio/).

const TITLE_TEXT = "Designing intelligence with a human touch";

export function Hero004Card() {
  const words = TITLE_TEXT.split(" ");
  const [maskReveal, setMaskReveal] = useState(0);
  const [opacity, setOpacity] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 768);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);

    // Listen to the SCROLL CONTAINER inside the showcase (not window).
    // The hero lives inside a scrollable canvas; find the nearest scrollable ancestor.
    const findScrollParent = (el: Element | null): Element | Window => {
      let node = el;
      while (node && node !== document.body) {
        const style = getComputedStyle(node);
        if ((style.overflowY === "auto" || style.overflowY === "scroll") && node.scrollHeight > node.clientHeight) {
          return node;
        }
        node = node.parentElement;
      }
      return window;
    };
    const scrollTarget = findScrollParent(document.querySelector("[data-hero004-root]"));

    const handleScroll = () => {
      const scrollPosition = scrollTarget === window ? window.scrollY : (scrollTarget as Element).scrollTop;
      const maxScroll = 500;
      const revealPercentage = Math.min(100, (scrollPosition / maxScroll) * 100);
      const calculatedOpacity = Math.min(1, scrollPosition / maxScroll);
      setMaskReveal(revealPercentage);
      setOpacity(calculatedOpacity);
    };

    handleScroll();
    scrollTarget.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("resize", checkDesktop);
      scrollTarget.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes aip-orb-rotate {
          0% { transform: rotate(0deg); filter: hue-rotate(0deg) brightness(1.1); }
          25% { filter: hue-rotate(90deg) brightness(1.2); }
          50% { filter: hue-rotate(180deg) brightness(1.1); }
          75% { filter: hue-rotate(270deg) brightness(1.2); }
          100% { transform: rotate(360deg); filter: hue-rotate(360deg) brightness(1.1); }
        }
        .aip-animate-orb { animation: aip-orb-rotate 20s linear infinite; }

        @keyframes aip-word-reveal {
          0% { filter: blur(60px); opacity: 0; transform: translateY(12px); }
          50% { filter: blur(30px); opacity: 0.5; transform: translateY(6px); }
          100% { filter: blur(0px); opacity: 1; transform: translateY(0px); }
        }
        @keyframes aip-gradient-to-black {
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
        .aip-hero-word {
          display: inline-block;
          animation: aip-word-reveal 1s ease-out forwards, aip-gradient-to-black 1s ease-in-out forwards;
          filter: blur(60px); opacity: 0;
        }
        @media (prefers-reduced-motion: reduce) {
          .aip-hero-word { animation: none; filter: none; opacity: 1; }
          .aip-animate-orb { animation: none; }
        }
      `}</style>

      <section data-hero004-root className="min-h-full flex flex-col justify-center pt-20 relative overflow-hidden bg-white text-zinc-950">
        {/* Animated orb — positioned top-right, visible above the fold */}
        <div className="absolute -right-20 -top-10 w-[450px] h-[450px] pointer-events-none aip-animate-orb z-0">
          { }
          <img src="/images/ai-portfolio/orb.png" alt="" className="w-full h-full" />
        </div>

        <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-12 py-20 md:py-32 md:pb-4 pb-4 pt-4 md:pt-32">
          <div className="max-w-4xl">
            <p className="text-muted-foreground mb-6 text-lg font-normal">I'm Abby, AI Digital Product Designer</p>

            {/* Main Title with animated words */}
            <h1 className="text-5xl sm:text-6xl lg:text-[96px] font-semibold tracking-tight leading-[1] text-balance md:text-9xl">
              {words.map((word, index) => (
                <span
                  key={index}
                  className={`aip-hero-word my-0 py-2 font-mono font-normal text-5xl md:text-7xl ${word === "AI" ? "aip-ai-gradient-word" : ""}`}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    marginRight: index < words.length - 1 ? "0.25em" : "0",
                    ...(word === "AI"
                      ? {
                          background: "linear-gradient(135deg, #ff006e 0%, #8b5cf6 33%, #203eec 66%, #00d4ff 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                          filter: "drop-shadow(0 0 20px rgba(255, 0, 110, 0.3)) drop-shadow(0 0 30px rgba(139, 92, 246, 0.3)) drop-shadow(0 0 40px rgba(0, 212, 255, 0.2))",
                        }
                      : {}),
                  }}
                >
                  {word}
                </span>
              ))}
            </h1>

            <p className="mt-8 max-w-xl leading-relaxed text-left text-lg text-zinc-500 ml-0">
              I craft intelligent, intuitive AI-powered products using vibe coding, generative design tools, and
              cutting-edge AI technologies. Let's build the future of human-AI interaction together.
            </p>

            <div className="flex flex-row items-start gap-4 mt-10">
              <a
                href="#contact"
                onClick={(e) => e.preventDefault()}
                className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white rounded-full transition-all relative overflow-hidden group"
                style={{ background: "linear-gradient(135deg, #203eec 0%, #00d4ff 100%)", boxShadow: "0 4px 20px rgba(32, 62, 236, 0.3)" }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 8px 30px rgba(32, 62, 236, 0.5), 0 0 40px rgba(0, 212, 255, 0.3)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 4px 20px rgba(32, 62, 236, 0.3)"; }}
              >
                Let's Talk
              </a>
              <a
                href="#works"
                onClick={(e) => e.preventDefault()}
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-medium transition-colors"
                style={{ color: "#203eec" }}
              >
                View Works
                <ArrowDown className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Designer image with scroll-driven mask reveal */}
        <div className="w-full mt-8">
          { }
          <img
            src="/images/ai-portfolio/designer.png"
            alt="Designer workspace"
            className="w-full h-auto transition-all duration-100 ease-out"
            style={{
              opacity: opacity,
              clipPath: isDesktop ? `inset(${100 - maskReveal}% 0 0 0)` : "none",
            }}
          />
        </div>
      </section>
    </>
  );
}
