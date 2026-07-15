"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

// ════════════════════════════════════════════════════════════════════════════
// Hero001Card — Animated Typography Split Hero (PagePulse extraction)
// ════════════════════════════════════════════════════════════════════════════
// Split hero with staggered text reveal: eyebrow fades up, headline fades up
// with char-by-char blur reveal on the cycling word (measure/optimize/ship/
// scale), paragraph + trust labels + CTAs follow with delay. Right side is a
// static isometric bar-grid SVG (no 3D/canvas). Subtle background grid lines.
// Self-contained (includes font import + keyframes).

const WORDS = ["measure", "optimize", "ship", "scale"];

const TRUST_LABELS = [
  "No credit card required",
  "Install in 2 minutes",
  "Built for frontend teams",
];

export function Hero001Card() {
  const [isVisible, setIsVisible] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsVisible(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % WORDS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap');

        .hero001-font-display {
          font-family: 'Instrument Serif', Georgia, 'Times New Roman', serif;
        }

        .hero001-char-in {
          animation: hero001-char-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          opacity: 0;
          filter: blur(40px);
          transform: translateY(100%);
        }

        @keyframes hero001-char-in {
          0% {
            opacity: 0;
            filter: blur(40px);
            transform: translateY(100%);
          }
          100% {
            opacity: 1;
            filter: blur(0);
            transform: translateY(0);
          }
        }
      `}</style>

      <section className="relative flex min-h-full flex-col justify-center overflow-hidden bg-background">
        {/* ── Right-side static visual (replaces the 3D canvas) ── */}
        <div className="pointer-events-none absolute right-0 top-1/2 hidden h-[500px] w-[500px] -translate-y-1/2 opacity-40 lg:block xl:h-[650px] xl:w-[650px]">
          <StaticPerfGridSVG />
        </div>

        {/* ── Background grid lines ── */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30">
          {[...Array(8)].map((_, i) => (
            <div key={`h-${i}`} className="absolute h-px bg-foreground/10" style={{ top: `${12.5 * (i + 1)}%`, left: 0, right: 0 }} />
          ))}
          {[...Array(12)].map((_, i) => (
            <div key={`v-${i}`} className="absolute w-px bg-foreground/10" style={{ left: `${8.33 * (i + 1)}%`, top: 0, bottom: 0 }} />
          ))}
        </div>

        {/* ── Content ── */}
        <div className="relative z-10 mx-auto max-w-[1400px] px-6 py-24 lg:px-12 lg:py-32">
          {/* Eyebrow */}
          <div className={`mb-8 transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
            <span className="inline-flex items-center gap-3 font-mono text-sm text-muted-foreground">
              <span className="h-px w-8 bg-foreground/30" />
              The platform for frontend performance
            </span>
          </div>

          {/* Headline with cycling word + char-by-char reveal */}
          <div className="mb-12">
            <h1 className={`hero001-font-display text-[clamp(2.5rem,10vw,8rem)] leading-[0.9] tracking-tight transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
              <span className="block">The platform</span>
              <span className="block">
                to{" "}
                <span className="relative inline-block">
                  <span key={wordIndex} className="inline-flex">
                    {WORDS[wordIndex].split("").map((char, i) => (
                      <span key={`${wordIndex}-${i}`} className="hero001-char-in inline-block" style={{ animationDelay: `${i * 50}ms` }}>
                        {char}
                      </span>
                    ))}
                  </span>
                  <span className="absolute -bottom-2 left-0 right-0 h-3 bg-foreground/10" />
                </span>
              </span>
            </h1>
          </div>

          {/* Paragraph + trust labels + CTAs */}
          <div className="grid items-end gap-12 lg:grid-cols-2 lg:gap-24">
            <div>
              <p className={`max-w-xl text-xl leading-relaxed text-muted-foreground transition-all delay-200 duration-700 lg:text-2xl ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
                Track Core Web Vitals, page speed, JavaScript performance, and deployment impact from one beautiful frontend monitoring platform.
              </p>
              <div className={`mt-8 flex flex-wrap gap-x-6 gap-y-2 transition-all delay-300 duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
                {TRUST_LABELS.map((label) => (
                  <span key={label} className="inline-flex items-center gap-2 font-mono text-sm text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-foreground/40" />
                    {label}
                  </span>
                ))}
              </div>
            </div>

            <div className={`flex flex-col items-start gap-4 transition-all delay-300 duration-700 sm:flex-row ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
              <a href="#start" onClick={(e) => e.preventDefault()} className="inline-flex h-14 items-center justify-center rounded-full bg-foreground px-8 text-base font-medium text-background transition hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background group">
                Start monitoring
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a href="#demo" onClick={(e) => e.preventDefault()} className="inline-flex h-14 items-center justify-center rounded-full border border-foreground/20 px-8 text-base font-medium text-foreground transition hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40">
                View live demo
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// StaticPerfGridSVG — lightweight static replacement for the 3D canvas
// ════════════════════════════════════════════════════════════════════════════
function StaticPerfGridSVG() {
  const gridSize = 7;
  const barSize = 16;
  const barGap = 8;
  const cellSize = barSize + barGap;
  const totalSize = gridSize * cellSize;

  const heights: number[] = [];
  const cx = (gridSize - 1) / 2;
  const cy = (gridSize - 1) / 2;
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const dist = Math.sqrt((i - cx) ** 2 + (j - cy) ** 2);
      const h = 12 + Math.sin(dist * 0.8) * 28 + Math.cos(dist * 0.5) * 16;
      heights.push(Math.max(8, h));
    }
  }

  const isoAngle = Math.PI / 6;
  const cosA = Math.cos(isoAngle);
  const sinA = Math.sin(isoAngle);
  const project = (x: number, y: number, z: number) => ({
    x: (x - z) * cosA,
    y: (x + z) * sinA - y,
  });

  const offset = -totalSize / 2;
  const centerX = 300;
  const centerY = 320;

  const bars: { gx: number; gy: number; h: number; depth: number }[] = [];
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      bars.push({ gx: i, gy: j, h: heights[i * gridSize + j], depth: i + j });
    }
  }
  bars.sort((a, b) => a.depth - b.depth);

  return (
    <svg viewBox="0 0 600 600" className="h-full w-full" style={{ display: "block" }} aria-hidden="true">
      {bars.map((bar, idx) => {
        const baseX = bar.gx * cellSize + offset;
        const baseZ = bar.gy * cellSize + offset;
        const h = bar.h;
        const c = [
          project(baseX, 0, baseZ),
          project(baseX + barSize, 0, baseZ),
          project(baseX + barSize, 0, baseZ + barSize),
          project(baseX, 0, baseZ + barSize),
          project(baseX, h, baseZ),
          project(baseX + barSize, h, baseZ),
          project(baseX + barSize, h, baseZ + barSize),
          project(baseX, h, baseZ + barSize),
        ].map((p) => ({ x: centerX + p.x, y: centerY + p.y }));
        const depthFactor = 1 - (bar.gx + bar.gy) / (2 * (gridSize - 1)) * 0.45;
        const alpha = 0.35 * depthFactor;
        return (
          <g key={idx}>
            <polygon points={`${c[4].x},${c[4].y} ${c[5].x},${c[5].y} ${c[6].x},${c[6].y} ${c[7].x},${c[7].y}`} fill={`rgba(128,128,128,${alpha * 1.0})`} />
            <polygon points={`${c[1].x},${c[1].y} ${c[5].x},${c[5].y} ${c[6].x},${c[6].y} ${c[2].x},${c[2].y}`} fill={`rgba(128,128,128,${alpha * 0.55})`} />
            <polygon points={`${c[0].x},${c[0].y} ${c[1].x},${c[1].y} ${c[5].x},${c[5].y} ${c[4].x},${c[4].y}`} fill={`rgba(128,128,128,${alpha * 0.32})`} />
            <polygon points={`${c[4].x},${c[4].y} ${c[5].x},${c[5].y} ${c[6].x},${c[6].y} ${c[7].x},${c[7].y}`} fill="none" stroke={`rgba(128,128,128,${alpha * 1.4})`} strokeWidth="0.6" />
          </g>
        );
      })}
      {Array.from({ length: gridSize + 1 }).map((_, i) => {
        const a = project(offset + i * cellSize - barGap / 2, 0, offset - barGap / 2);
        const b = project(offset + i * cellSize - barGap / 2, 0, offset + totalSize - barGap / 2);
        const c = project(offset - barGap / 2, 0, offset + i * cellSize - barGap / 2);
        const d = project(offset + totalSize - barGap / 2, 0, offset + i * cellSize - barGap / 2);
        return (
          <g key={`grid-${i}`}>
            <line x1={centerX + a.x} y1={centerY + a.y} x2={centerX + b.x} y2={centerY + b.y} stroke="rgba(128,128,128,0.06)" strokeWidth="0.5" />
            <line x1={centerX + c.x} y1={centerY + c.y} x2={centerX + d.x} y2={centerY + d.y} stroke="rgba(128,128,128,0.06)" strokeWidth="0.5" />
          </g>
        );
      })}
    </svg>
  );
}
