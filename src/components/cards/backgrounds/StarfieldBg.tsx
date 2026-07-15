"use client";
import { useEffect, useRef, useContext } from "react";
import { BackgroundShell, BgContext } from "./BackgroundShell";

export function StarfieldBg() {
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
    const stars = Array.from({ length: 300 }, () => ({ x: (Math.random() - 0.5) * canvas.width, y: (Math.random() - 0.5) * canvas.height, z: Math.random() * canvas.width, pz: 0 }));
    const draw = () => {
      ctx.fillStyle = dark ? "rgba(10,10,15,0.2)" : "rgba(248,250,252,0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2, cy = canvas.height / 2;
      for (const s of stars) {
        s.pz = s.z; s.z -= 3;
        if (s.z < 1) { s.z = canvas.width; s.x = (Math.random() - 0.5) * canvas.width; s.y = (Math.random() - 0.5) * canvas.height; s.pz = s.z; }
        const sx = (s.x / s.z) * canvas.width + cx, sy = (s.y / s.z) * canvas.height + cy;
        const px = (s.x / s.pz) * canvas.width + cx, py = (s.y / s.pz) * canvas.height + cy;
        ctx.strokeStyle = dark ? `rgba(255,255,255,${(1 - s.z / canvas.width) * 0.6})` : `rgba(99,102,241,${(1 - s.z / canvas.width) * 0.4})`;
        ctx.lineWidth = Math.max(0.5, (1 - s.z / canvas.width) * 2);
        ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(sx, sy); ctx.stroke();
      }
      raf = requestAnimationFrame(draw);
    };
    draw(); window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [dark]);
  return <canvas ref={ref} className="absolute inset-0 h-full w-full" />;
}
