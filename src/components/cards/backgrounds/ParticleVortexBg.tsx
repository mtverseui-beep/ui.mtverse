"use client";
import { useEffect, useRef, useContext } from "react";
import { BackgroundShell, BgContext } from "./BackgroundShell";

export function ParticleVortexBg() {
  return (
    <BackgroundShell darkDefault={true}>
      <Canvas />
    </BackgroundShell>
  );
}

function Canvas() {
  const { dark } = useContext(BgContext);
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    let raf = 0, t = 0;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    const particles = Array.from({ length: 200 }, (_, i) => {
      const a = Math.random() * Math.PI * 2, r = Math.random() * 250 + 50;
      return { a, r, br: r, sp: 0.005 + Math.random() * 0.01, sz: 1 + Math.random() * 2, h: 180 + Math.random() * 120, ys: 0.3 + Math.random() * 0.4 };
    });
    const draw = () => {
      ctx.fillStyle = dark ? "rgba(10,10,20,0.08)" : "rgba(248,250,252,0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2, cy = canvas.height / 2;
      t += 0.008;
      for (const p of particles) {
        p.a += p.sp; p.r = p.br + Math.sin(t + p.a * 2) * 25;
        const x = cx + Math.cos(p.a) * p.r, y = cy + Math.sin(p.a) * p.r * p.ys;
        ctx.beginPath(); ctx.arc(x, y, p.sz, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.h},70%,60%,${dark ? 0.6 : 0.3})`; ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw(); window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [dark]);
  return <canvas ref={ref} className="absolute inset-0 h-full w-full" />;
}
