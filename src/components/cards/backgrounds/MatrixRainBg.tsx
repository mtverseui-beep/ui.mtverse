"use client";
import { useEffect, useRef, useContext } from "react";
import { BackgroundShell, BgContext } from "./BackgroundShell";

export function MatrixRainBg() {
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
    let raf = 0;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    const chars = "ｱｲｳｴｵｶｷｸｹｺ0123456789ABCDEF".split("");
    const fs = 14;
    const cols = Math.floor(canvas.width / fs);
    const drops = Array(cols).fill(1);
    const draw = () => {
      ctx.fillStyle = dark ? "rgba(10,15,10,0.05)" : "rgba(248,250,252,0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fs}px monospace`;
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillStyle = dark ? `rgba(0,255,65,${0.8})` : `rgba(34,197,94,${0.5})`;
        ctx.fillText(text, i * fs, drops[i] * fs);
        if (drops[i] * fs > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      raf = requestAnimationFrame(draw);
    };
    draw(); window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [dark]);
  return <canvas ref={ref} className="absolute inset-0 h-full w-full" />;
}
