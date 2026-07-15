"use client";
import { useEffect, useRef, useContext } from "react";
import { BackgroundShell, BgContext } from "./BackgroundShell";

export function AuroraMeshBg() {
  return (
    <BackgroundShell>
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
    const blobs = [
      { c: [139, 92, 246], x: 0.2, y: 0.3, r: 0.4, sx: 0.3, sy: 0.2 },
      { c: [236, 72, 153], x: 0.7, y: 0.6, r: 0.35, sx: -0.25, sy: 0.3 },
      { c: [6, 182, 212], x: 0.5, y: 0.8, r: 0.3, sx: 0.2, sy: -0.25 },
      { c: [245, 158, 11], x: 0.8, y: 0.2, r: 0.25, sx: -0.3, sy: -0.2 },
    ];
    const op = dark ? 0.5 : 0.25;
    const draw = () => {
      ctx.fillStyle = dark ? "#0a0a0f" : "#f8fafc";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      t += 0.003;
      for (const b of blobs) {
        const x = (b.x + Math.sin(t * b.sx * 10) * 0.15) * canvas.width;
        const y = (b.y + Math.cos(t * b.sy * 10) * 0.15) * canvas.height;
        const r = b.r * Math.min(canvas.width, canvas.height);
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, `rgba(${b.c[0]},${b.c[1]},${b.c[2]},${op})`);
        g.addColorStop(1, `rgba(${b.c[0]},${b.c[1]},${b.c[2]},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [dark]);
  return <canvas ref={ref} className="absolute inset-0 h-full w-full" />;
}
