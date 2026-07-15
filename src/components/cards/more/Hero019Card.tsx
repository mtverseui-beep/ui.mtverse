"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
const ACCENT = "#8b5cf6";
const PARTICLE_COUNT = 80;
interface Particle { x: number; y: number; vx: number; vy: number; baseX: number; baseY: number; }
export function Hero019Card() {
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const scrollYRef = useRef(0);
  const rafRef = useRef<number>(0);
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    function resize() { if (!canvas) return; const parent = canvas.parentElement; if (!parent) return; canvas.width = parent.offsetWidth; canvas.height = parent.offsetHeight; particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => { const x = Math.random() * canvas.width; const y = Math.random() * canvas.height; return { x, y, vx: 0, vy: 0, baseX: x, baseY: y }; }); }
    resize(); window.addEventListener("resize", resize);
    function animate() { if (!canvas || !ctx) return; ctx.clearRect(0, 0, canvas.width, canvas.height); const scrollFactor = 1 + scrollYRef.current * 0.002; const particles = particlesRef.current;
      particles.forEach((p) => { const dx = mouseRef.current.x - p.x; const dy = mouseRef.current.y - p.y; const dist = Math.sqrt(dx * dx + dy * dy); const maxDist = 200; if (dist < maxDist) { const force = (1 - dist / maxDist) * 0.8; p.vx += (dx / dist) * force; p.vy += (dy / dist) * force; } const bx = (p.baseX - canvas.width / 2) * scrollFactor + canvas.width / 2; const by = (p.baseY - canvas.height / 2) * scrollFactor + canvas.height / 2; p.vx += (bx - p.x) * 0.005; p.vy += (by - p.y) * 0.005; p.vx *= 0.92; p.vy *= 0.92; p.x += p.vx; p.y += p.vy; });
      ctx.strokeStyle = ACCENT;
      for (let i = 0; i < particles.length; i++) { for (let j = i + 1; j < particles.length; j++) { const dx = particles[i].x - particles[j].x; const dy = particles[i].y - particles[j].y; const dist = Math.sqrt(dx * dx + dy * dy); if (dist < 100) { ctx.globalAlpha = (1 - dist / 100) * 0.15; ctx.lineWidth = 0.5; ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y); ctx.stroke(); } } }
      ctx.globalAlpha = 1;
      particles.forEach((p) => { const dx = mouseRef.current.x - p.x; const dy = mouseRef.current.y - p.y; const dist = Math.sqrt(dx * dx + dy * dy); const isNear = dist < 200; ctx.fillStyle = isNear ? ACCENT : `${ACCENT}80`; ctx.beginPath(); ctx.arc(p.x, p.y, isNear ? 2.5 : 1.5, 0, Math.PI * 2); ctx.fill(); });
      rafRef.current = requestAnimationFrame(animate);
    }
    animate();
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(rafRef.current); };
  }, [mounted]);
  const handleMouseMove = (e: React.MouseEvent) => { const canvas = canvasRef.current; if (!canvas) return; const rect = canvas.getBoundingClientRect(); mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }; };
  const handleMouseLeave = () => { mouseRef.current = { x: -1000, y: -1000 }; };
  useEffect(() => { function findScrollParent(el: Element | null): Element | null { if (!el) return null; let node: Element | null = el; while (node && node !== document.body) { const style = getComputedStyle(node); if ((style.overflowY === "auto" || style.overflowY === "scroll") && node.scrollHeight > node.clientHeight) return node; node = node.parentElement; } return null; } function onScroll() { const el = scrollParentRef.current; if (!el) return; scrollYRef.current = el.scrollTop; } const scrollParentRef = { current: null as Element | null }; let attempts = 0; const tryFind = () => { const el = findScrollParent(document.querySelector("[data-hero019]")); if (el) { scrollParentRef.current = el; el.addEventListener("scroll", onScroll, { passive: true }); } else if (attempts < 10) { attempts++; setTimeout(tryFind, 100); } }; tryFind(); return () => { scrollParentRef.current?.removeEventListener("scroll", onScroll); }; }, []);
  return (
    <div data-hero019 className="relative min-h-[120vh] bg-[#0f0a1e] text-white overflow-hidden flex flex-col items-center justify-center py-20 px-6" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none" style={{ background: `radial-gradient(circle, ${ACCENT}08, transparent 70%)` }} />
      <div className="relative z-10 text-center max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 10 }} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-xs font-medium text-white/70 mb-8"><Zap className="w-3.5 h-3.5" style={{ color: ACCENT }} />Move your cursor to interact</motion.div>
        <motion.h1 initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: mounted ? 1 : 0, scale: mounted ? 1 : 0.9 }} transition={{ duration: 0.8, delay: 0.1 }} className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.02] mb-6">The power of<br /><span style={{ background: `linear-gradient(135deg, ${ACCENT}, #ec4899)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>attraction</span></motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }} transition={{ duration: 0.7, delay: 0.3 }} className="text-base md:text-lg text-white/40 max-w-xl mx-auto mb-10">Particles respond to your presence. Every cursor movement creates ripples through the field. This is interactive design at the quantum level.</motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }} transition={{ duration: 0.7, delay: 0.4 }} className="flex flex-col sm:flex-row items-center justify-center gap-3"><a href="#" onClick={(e) => e.preventDefault()} className="inline-flex items-center gap-2 h-12 px-6 rounded-xl text-white text-sm font-semibold transition-all hover:scale-105" style={{ background: ACCENT, boxShadow: `0 8px 32px ${ACCENT}40` }}>Try it yourself<ArrowRight className="w-4 h-4" /></a><a href="#" onClick={(e) => e.preventDefault()} className="inline-flex items-center gap-2 h-12 px-6 rounded-xl border border-white/15 text-white/80 text-sm font-semibold hover:bg-white/5 transition-colors">Learn how it works</a></motion.div>
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: mounted ? 1 : 0 }} transition={{ duration: 0.6, delay: 0.6 }} className="relative z-10 mt-16 flex items-center gap-12 text-center">{[{ value: "80", label: "Particles" }, { value: "60fps", label: "Smooth" }, { value: "0", label: "Dependencies" }].map((stat) => (<div key={stat.label}><p className="text-2xl md:text-3xl font-bold text-white">{stat.value}</p><p className="text-xs text-white/30 mt-1">{stat.label}</p></div>))}</motion.div>
    </div>
  );
}
