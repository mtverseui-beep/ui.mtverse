"use client";
import { useEffect, useRef, useContext } from "react";
import { BackgroundShell, BgContext } from "./BackgroundShell";

export function NetworkGraphBg() {
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
    const nodes = Array.from({ length: 35 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 3 + 2, pulse: Math.random() * Math.PI * 2,
    }));
    const accent = dark ? "139,92,246" : "99,102,241";
    const bg = dark ? "#0a0a0f" : "#ffffff";
    const draw = () => {
      ctx.fillStyle = bg; ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (const n of nodes) { n.x += n.vx; n.y += n.vy; n.pulse += 0.02; if (n.x < 0 || n.x > canvas.width) n.vx *= -1; if (n.y < 0 || n.y > canvas.height) n.vy *= -1; }
      for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 150) { ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y); ctx.strokeStyle = `rgba(${accent},${(1 - d / 150) * 0.3})`; ctx.lineWidth = 1; ctx.stroke(); }
      }
      for (const n of nodes) {
        const pr = n.r + Math.sin(n.pulse) * 1.5;
        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, pr * 3);
        g.addColorStop(0, `rgba(${accent},${dark ? 0.5 : 0.3})`); g.addColorStop(1, `rgba(${accent},0)`);
        ctx.beginPath(); ctx.arc(n.x, n.y, pr * 3, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill();
        ctx.beginPath(); ctx.arc(n.x, n.y, pr, 0, Math.PI * 2); ctx.fillStyle = `rgba(${accent},${dark ? 0.8 : 0.5})`; ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw(); window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [dark]);
  return <canvas ref={ref} className="absolute inset-0 h-full w-full" />;
}
