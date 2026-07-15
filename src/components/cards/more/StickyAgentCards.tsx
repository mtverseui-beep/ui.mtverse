"use client";

import { useEffect, useRef, useState } from "react";

// ════════════════════════════════════════════════════════════════════════════
// Premium001Card — exact copy of StackingAgentCards from Agentic template
// ════════════════════════════════════════════════════════════════════════════
// 4 cards that sticky-stack as you scroll. Each card sticks at a progressively
// lower offset, and cards beneath scale down + translate slightly when covered.
//
// The only adaptation from the source: the scroll listener uses the scroll
// container (showcase canvas) instead of window, and rect.top is adjusted
// relative to the container.

const AGENTS = [
  {
    label: "RESEARCHER",
    title: "Web & data research",
    desc: "Autonomously browses the web, extracts structured data, synthesizes reports from multiple sources with citations.",
    stats: [{ v: "2.4M", l: "tasks run" }, { v: "98.2%", l: "accuracy" }],
    img: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/researcher-CvhqOuV6irGwBOnJoTGFlXdbyYBRjb.png",
  },
  {
    label: "CODER",
    title: "Code generation & review",
    desc: "Writes, refactors, and reviews code across 40+ languages. Runs tests, fixes bugs, opens pull requests automatically.",
    stats: [{ v: "1.1M", l: "PRs merged" }, { v: "3.2s", l: "avg response" }],
    img: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/coder-9bItvCegU6TXUqbX3tUXGBAtvkBkXp.png",
  },
  {
    label: "ANALYST",
    title: "Data analysis & insights",
    desc: "Connects to your databases, runs queries, visualizes trends, and surfaces anomalies before they become problems.",
    stats: [{ v: "880K", l: "reports" }, { v: "12x", l: "faster" }],
    img: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/analyst-Ysxnqg7Fpy2cfA56PiIttv1KximMhT.png",
  },
  {
    label: "EXECUTOR",
    title: "Workflow automation",
    desc: "Takes actions across APIs: sends messages, creates calendar events, triggers webhooks, and manages third-party apps.",
    stats: [{ v: "5.6M", l: "executions" }, { v: "99.9%", l: "uptime" }],
    img: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/executor-o1q6509qMLXMtpBIGo49vcgOu34sI1.png",
  },
];

const STICKY_TOP = 80;
const STICKY_STEP = 16;
const SCALE_STEP = 0.04;
const OFFSET_STEP = 8;

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] tracking-widest font-sans text-black/40 bg-black/[0.04]">
      {children}
    </span>
  );
}

export function StickyAgentCards() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollParentRef = useRef<Element | null>(null);
  const [depth, setDepth] = useState<number[]>(AGENTS.map(() => 0));

  useEffect(() => {
    function findScrollParent(el: Element | null): Element | null {
      if (!el) return null;
      let node: Element | null = el;
      while (node && node !== document.body) {
        const style = getComputedStyle(node);
        if ((style.overflowY === "auto" || style.overflowY === "scroll") && node.scrollHeight > node.clientHeight) {
          return node;
        }
        node = node.parentElement;
      }
      return null;
    }

    function onScroll() {
      const scrollEl = scrollParentRef.current;
      // Get the scroll container's position so we can compute rect.top relative to it
      const containerTop = scrollEl ? scrollEl.getBoundingClientRect().top : 0;

      const nextDepth = AGENTS.map((_, i) => {
        let count = 0;
        for (let j = i + 1; j < AGENTS.length; j++) {
          const el = cardRefs.current[j];
          if (!el) continue;
          const rect = el.getBoundingClientRect();
          // rect.top is viewport-relative. Subtract containerTop to get container-relative.
          const topRelativeToContainer = rect.top - containerTop;
          const stickyTopJ = STICKY_TOP + j * STICKY_STEP;
          if (topRelativeToContainer <= stickyTopJ + 2) count++;
        }
        return count;
      });
      setDepth(nextDepth);
    }

    // Find scroll parent with retry
    let attempts = 0;
    const tryFind = () => {
      const el = findScrollParent(cardRefs.current[0]);
      if (el) {
        scrollParentRef.current = el;
        el.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
      } else if (attempts < 10) {
        attempts++;
        setTimeout(tryFind, 100);
      }
    };
    tryFind();

    return () => {
      if (scrollParentRef.current) {
        scrollParentRef.current.removeEventListener("scroll", onScroll);
      }
    };
  }, []);

  return (
    <div className="bg-[#F5F4F0] pt-48 px-4 pb-96">
      <div className="flex flex-col" style={{ perspective: "1400px", perspectiveOrigin: "50% 0%" }}>
        {AGENTS.map((agent, i) => {
          const d = depth[i];
          const scale = 1 - d * SCALE_STEP;
          const translateY = d * OFFSET_STEP;

          return (
            <div
              key={agent.label}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="sticky mb-4"
              style={{ top: `${STICKY_TOP + i * STICKY_STEP}px`, zIndex: 10 + i }}
            >
              <div
                style={{
                  transform: `scale(${scale}) translateY(${translateY}px)`,
                  transformOrigin: "top center",
                  transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1)",
                  willChange: "transform",
                }}
              >
                <div className="group relative bg-[#faf9f7] rounded-2xl border border-black/[0.07] overflow-hidden cursor-pointer">
                  {/* Mobile: image top */}
                  {agent.img && (
                    <div className="relative w-full h-52 pointer-events-none md:hidden">
                      { }
                      <img
                        src={agent.img}
                        alt={agent.label}
                        className="absolute inset-0 w-full h-full object-cover object-center"
                        style={{
                          maskImage: "linear-gradient(to bottom, black 0%, black 35%, transparent 85%)",
                          WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 35%, transparent 85%)",
                        }}
                      />
                    </div>
                  )}

                  {/* Desktop: image right */}
                  {agent.img && (
                    <div className="hidden md:block absolute inset-y-0 right-0 w-1/2 pointer-events-none">
                      { }
                      <img src={agent.img} alt={agent.label} className="w-full h-full object-cover object-center" />
                      <div className="absolute inset-0" style={{ background: "linear-gradient(to right, #faf9f7 0%, transparent 55%)" }} />
                    </div>
                  )}

                  {/* Text content */}
                  <div className="relative z-10 p-8">
                    <div className="md:max-w-[60%]">
                      <div className="flex items-start justify-between mb-6">
                        <Tag>{agent.label}</Tag>
                      </div>
                      <h3 className="text-xl font-light mb-3 text-black">{agent.title}</h3>
                      <p className="text-sm text-black/45 leading-relaxed mb-8">{agent.desc}</p>
                    </div>
                    <div className="flex gap-8 pt-6 border-t border-black/[0.06]">
                      {agent.stats.map((s) => (
                        <div key={s.l}>
                          <div className="text-2xl font-light text-black">{s.v}</div>
                          <div className="text-[11px] text-black/35 tracking-widest mt-0.5">{s.l}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
