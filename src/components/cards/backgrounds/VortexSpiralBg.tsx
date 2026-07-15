"use client";
import { useEffect, useRef, useContext } from "react";
import { BackgroundShell, BgContext } from "./BackgroundShell";

export function VortexSpiralBg() {
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
    let raf = 0;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    const particles = Array.from({ length: 150 }, (_, i) => ({
      angle: (i / 150) * Math.PI * 2 * 5, radius: 20 + (i / 150) * 300,
      speed: 0.003 + (i / 150) * 0.008, size: 1 + Math.random() * 2, hue: (i / 150) * 360,
    }));
    const draw = () => {
      ctx.fillStyle = dark ? "rgba(10,10,15,0.08)" : "rgba(248,250,252,0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2, cy = canvas.height / 2;
      for (const p of particles) {
        p.angle += p.speed;
        const x = cx + Math.cos(p.angle) * p.radius, y = cy + Math.sin(p.angle) * p.radius;
        ctx.beginPath(); ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 70%, 60%, ${dark ? 0.6 : 0.3})`; ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw(); window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [dark]);
  return <canvas ref={ref} className="absolute inset-0 h-full w-full" />;
}
