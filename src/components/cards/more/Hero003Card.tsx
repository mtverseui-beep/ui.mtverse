"use client";

import { useEffect, useRef, useState } from "react";

// ════════════════════════════════════════════════════════════════════════════
// Hero003Card — extracted from SKAL Ventures template
// ════════════════════════════════════════════════════════════════════════════
// Hero with:
//   • BETA RELEASE pill badge (clipped polygon shape + glowing dot)
//   • "Unlock your future growth" headline (serif, italic accent)
//   • Mono paragraph
//   • [Contact Us] button (clipped polygon + inset glow shadow)
//
// The original used a heavy WebGL particle system (react-three-fiber + custom
// GLSL shaders + leva controls). Replaced here with a professional
// canvas-based animated particle constellation — clean, subtle, monochrome,
// performant. Particles drift slowly, connect with thin lines when nearby,
// and brighten on hover. No WebGL/Three.js/shader deps.

export function Hero003Card() {
  const [hovering, setHovering] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef(0);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let time = 0;
    let width = 0;
    let height = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    // Particle field — professional constellation
    const PARTICLE_COUNT = 80;
    const particles: { x: number; y: number; vx: number; vy: number; r: number; baseAlpha: number }[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.5 + 0.5,
        baseAlpha: Math.random() * 0.4 + 0.2,
      });
    }

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);

    const render = () => {
      const isDark = document.documentElement.classList.contains("dark");
      const fgRgb = isDark ? "255, 255, 255" : "15, 14, 12";

      ctx.clearRect(0, 0, width, height);

      // Subtle radial gradient background (vignette)
      const grad = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, Math.max(width, height) / 1.2);
      grad.addColorStop(0, `rgba(${fgRgb}, 0.03)`);
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      const mouse = mouseRef.current;
      const hoverBoost = hovering ? 1.5 : 1;

      // Update + draw particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Mouse repulsion (subtle)
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let mouseGlow = 0;
        if (dist < 120) {
          mouseGlow = (1 - dist / 120) * 0.6;
        }

        const alpha = (p.baseAlpha + mouseGlow) * hoverBoost;
        ctx.fillStyle = `rgba(${fgRgb}, ${Math.min(alpha, 1)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r + mouseGlow * 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw connection lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            const alpha = (1 - dist / 140) * 0.15 * hoverBoost;
            ctx.strokeStyle = `rgba(${fgRgb}, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      time += 0.016;
      frameRef.current = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(frameRef.current);
    };
  }, [hovering]);

  return (
    <div className="relative flex h-full min-h-[600px] flex-col justify-between overflow-hidden bg-background">
      {/* ── Professional animated particle constellation ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        style={{ display: "block" }}
        aria-hidden="true"
      />

      {/* ── Content ── */}
      <div className="relative z-10 pb-16 mt-auto text-center">
        {/* BETA RELEASE pill */}
        <div className="mb-6 inline-flex items-center justify-center bg-foreground/5 backdrop-blur-sm font-mono text-sm h-8 px-3 border border-border [clip-path:polygon(6px_0,calc(100%_-_6px)_0,100%_6px,100%_calc(100%_-_6px),calc(100%_-_6px)_100%,6px_100%,0_calc(100%_-_6px),0_6px)]">
          <span className="inline-block size-2.5 rounded-full bg-primary mr-2 shadow-[0_0_8px_2px] shadow-primary/50" />
          <span className="font-medium text-foreground/50">BETA RELEASE</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight">
          Unlock your <br />
          <i className="font-light">future</i> growth
        </h1>

        {/* Paragraph */}
        <p className="font-mono text-sm sm:text-base text-foreground/60 text-balance mt-8 max-w-[440px] mx-auto">
          Through perpetual investment strategies that outperform the market
        </p>

        {/* CTA button */}
        <button
          type="button"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          className="group relative mt-14 inline-flex h-16 items-center justify-center px-6 text-base font-mono uppercase border border-primary text-primary [clip-path:polygon(16px_0,calc(100%_-_16px)_0,100%_0,100%_calc(100%_-_16px),calc(100%_-_16px)_100%,0_100%,0_16px)] [box-shadow:inset_0_0_54px_0px_var(--tw-shadow-color)] shadow-[#EBB800] hover:shadow-[#EBB800]/80 transition-all duration-300 cursor-pointer"
        >
          [Contact Us]
        </button>
      </div>
    </div>
  );
}
