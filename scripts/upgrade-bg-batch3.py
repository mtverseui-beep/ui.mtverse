#!/usr/bin/env python3
"""Upgrade remaining background components batch 3 - developer most wanted."""
import os

BG_DIR = "/home/z/my-project/src/components/cards/backgrounds"

templates = {
"MeshGradientBg": '''"use client";
import { BackgroundShell, BgContext, useIntensityOpacity, useReducedMotion } from "./BackgroundShell";
import { useContext } from "react";

export function MeshGradientBg() {
  const { dark, intensity, reduced } = useContext(BgContext);
  const op = useIntensityOpacity();
  const playState = useReducedMotion();
  return (
    <BackgroundShell title="Premium mesh" subtitle="Apple-style dynamic mesh gradient with subtle noise. The gold standard for modern SaaS landing pages." accentColor="#8b5cf6">
      <div className="absolute inset-0" style={{ background: dark ? "#000" : "#f8fafc" }}>
        <div className="absolute inset-0" style={{
          background: `radial-gradient(at 20% 20%, rgba(139,92,246,${0.8 * op}) 0px, transparent 50%), radial-gradient(at 80% 10%, rgba(236,72,153,${0.7 * op}) 0px, transparent 50%), radial-gradient(at 60% 80%, rgba(6,182,212,${0.7 * op}) 0px, transparent 50%), radial-gradient(at 10% 90%, rgba(245,158,11,${0.6 * op}) 0px, transparent 50%), radial-gradient(at 90% 50%, rgba(59,130,246,${0.6 * op}) 0px, transparent 50%)`,
          backgroundSize: "150% 150%",
          animation: "mesh-shift 15s ease-in-out infinite",
          animationPlayState: playState,
        }} />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
      </div>
      <style jsx>{`
        @keyframes mesh-shift { 0%,100% { background-position: 0% 0%; } 25% { background-position: 50% 100%; } 50% { background-position: 100% 50%; } 75% { background-position: 50% 0%; } }
      `}</style>
    </BackgroundShell>
  );
}
''',

"AuroraBorealisBg": '''"use client";
import { BackgroundShell, BgContext, useIntensityOpacity, useReducedMotion } from "./BackgroundShell";
import { useContext } from "react";

export function AuroraBorealisBg() {
  const { dark, intensity, reduced } = useContext(BgContext);
  const op = useIntensityOpacity();
  const playState = useReducedMotion();
  return (
    <BackgroundShell title="Northern lights" subtitle="Animated aurora ribbons over a starry sky. Breathtaking for travel, nature, and premium lifestyle brands." accentColor="#10b981" darkDefault={true}>
      <div className="absolute inset-0" style={{ background: dark ? "linear-gradient(180deg, #020617, #0f172a, #1e1b4b)" : "linear-gradient(180deg, #f0f9ff, #e0f2fe, #ddd6fe)" }}>
        {Array.from({ length: 60 }).map((_, i) => (
          <div key={i} className="absolute rounded-full bg-white" style={{
            width: Math.random() * 2 + 1, height: Math.random() * 2 + 1,
            top: `${Math.random() * 60}%`, left: `${Math.random() * 100}%`,
            opacity: (Math.random() * 0.8 + 0.2) * op,
            animation: `star-twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
            animationPlayState: playState, animationDelay: `${Math.random() * 3}s`,
          }} />
        ))}
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1200 800">
          <defs>
            <filter id="ab-blur"><feGaussianBlur stdDeviation="30" /></filter>
            <linearGradient id="ab1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
              <stop offset="30%" stopColor="#10b981" stopOpacity={0.8 * op} />
              <stop offset="70%" stopColor="#06b6d4" stopOpacity={0.6 * op} />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
          </defs>
          <g filter="url(#ab-blur)">
            <path d="M0,200 Q300,100 600,250 T1200,200 L1200,500 Q900,400 600,450 T0,500 Z" fill="url(#ab1)">
              {!reduced && <animate attributeName="d" values="M0,200 Q300,100 600,250 T1200,200 L1200,500 Q900,400 600,450 T0,500 Z;M0,250 Q300,350 600,200 T1200,300 L1200,450 Q900,550 600,400 T0,550 Z;M0,200 Q300,100 600,250 T1200,200 L1200,500 Q900,400 600,450 T0,500 Z" dur="12s" repeatCount="indefinite" playState={playState} />}
            </path>
          </g>
        </svg>
      </div>
      <style jsx>{`@keyframes star-twinkle { 0%, 100% { opacity: 0.2; } 50% { opacity: 1; } }`}</style>
    </BackgroundShell>
  );
}
''',

"NoiseTextureBg": '''"use client";
import { BackgroundShell, BgContext, useIntensityOpacity, useReducedMotion } from "./BackgroundShell";
import { useContext } from "react";

export function NoiseTextureBg() {
  const { dark, intensity, reduced } = useContext(BgContext);
  const op = useIntensityOpacity();
  const playState = useReducedMotion();
  return (
    <BackgroundShell title="Organic depth" subtitle="Subtle film grain noise overlay. Every premium site uses this to add texture and reduce banding." accentColor="#64748b" darkDefault={true}>
      <div className="absolute inset-0" style={{ background: dark ? "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)" : "linear-gradient(135deg, #f8fafc, #e2e8f0, #cbd5e1)" }}>
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          opacity: 0.08 * op, mixBlendMode: "overlay",
        }} />
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise2'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.15' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise2)'/%3E%3C/svg%3E")`,
          opacity: 0.05 * op, mixBlendMode: "soft-light",
          animation: "noise-shift 0.5s steps(5) infinite", animationPlayState: playState,
        }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.6) 100%)" }} />
      </div>
      <style jsx>{`@keyframes noise-shift { 0% { transform: translate(0,0); } 25% { transform: translate(-2px,1px); } 50% { transform: translate(1px,-2px); } 75% { transform: translate(-1px,-1px); } 100% { transform: translate(2px,2px); } }`}</style>
    </BackgroundShell>
  );
}
''',

"AnimatedGridGlowBg": '''"use client";
import { BackgroundShell, BgContext, useIntensityOpacity } from "./BackgroundShell";
import { useContext, useEffect, useRef, useState } from "react";

export function AnimatedGridGlowBg() {
  return (
    <BackgroundShell title="Follow the light" subtitle="An interactive grid with a mouse-following spotlight. Engaging and modern for developer and design tools." accentColor="#8b5cf6" darkDefault={true}>
      <GridGlowCanvas />
    </BackgroundShell>
  );
}

function GridGlowCanvas() {
  const { dark, intensity } = useContext(BgContext);
  const op = useIntensityOpacity();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 50, y: 50 });
  useEffect(() => {
    const el = containerRef.current; if (!el) return;
    const handle = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      setMouse({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
    };
    el.addEventListener("mousemove", handle);
    return () => el.removeEventListener("mousemove", handle);
  }, []);
  return (
    <div ref={containerRef} className="absolute inset-0 cursor-none" style={{ background: dark ? "#0a0a0f" : "#f8fafc" }}>
      <div className="absolute inset-0" style={{
        backgroundImage: `linear-gradient(rgba(99,102,241,${0.1 * op}) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,${0.1 * op}) 1px, transparent 1px)`,
        backgroundSize: "32px 32px",
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(circle 300px at ${mouse.x}% ${mouse.y}%, rgba(139,92,246,${0.25 * op}), transparent 70%)` }} />
      <div className="absolute pointer-events-none h-4 w-4 rounded-full -translate-x-1/2 -translate-y-1/2" style={{ left: `${mouse.x}%`, top: `${mouse.y}%`, background: "rgba(139,92,246,0.8)", boxShadow: "0 0 20px rgba(139,92,246,0.8)" }} />
    </div>
  );
}
''',

"FloatingCodeBg": '''"use client";
import { BackgroundShell, BgContext, useIntensityOpacity, useReducedMotion } from "./BackgroundShell";
import { useContext } from "react";

export function FloatingCodeBg() {
  const { dark, intensity, reduced } = useContext(BgContext);
  const op = useIntensityOpacity();
  const playState = useReducedMotion();
  const snippets = [
    { code: "const app = createApp()", top: "15%", left: "10%", dur: 20, delay: 0, color: "#3b82f6" },
    { code: "await fetch('/api')", top: "25%", left: "70%", dur: 25, delay: 2, color: "#10b981" },
    { code: "useEffect(() => {})", top: "60%", left: "15%", dur: 22, delay: 1, color: "#f59e0b" },
    { code: "<Component />", top: "70%", left: "65%", dur: 18, delay: 3, color: "#ec4899" },
    { code: "npm install", top: "40%", left: "45%", dur: 24, delay: 1.5, color: "#8b5cf6" },
    { code: "git push origin", top: "85%", left: "35%", dur: 19, delay: 2.5, color: "#06b6d4" },
    { code: "export default", top: "10%", left: "50%", dur: 21, delay: 0.5, color: "#a855f7" },
    { code: "type T = string", top: "50%", left: "80%", dur: 23, delay: 4, color: "#f43f5e" },
  ];
  return (
    <BackgroundShell title="<DevReady />" subtitle="Floating code snippets in 3D space. Perfect for developer portfolios, tools, and coding bootcamps." accentColor="#3b82f6" darkDefault={true}>
      <div className="absolute inset-0" style={{ background: dark ? "linear-gradient(135deg, #0d1117, #161b22)" : "linear-gradient(135deg, #f8fafc, #e2e8f0)" }}>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle, rgba(139,148,158,0.3) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
        {snippets.map((s, i) => (
          <div key={i} className="absolute rounded-lg border px-3 py-1.5 font-mono text-[12px] font-medium" style={{
            top: s.top, left: s.left, background: dark ? "rgba(22,27,34,0.8)" : "rgba(255,255,255,0.8)",
            borderColor: `${s.color}40`, color: s.color, boxShadow: `0 4px 20px ${s.color}20`,
            backdropFilter: "blur(8px)", opacity: op,
            animation: `code-float-${i % 3} ${s.dur}s ease-in-out infinite`,
            animationPlayState: playState, animationDelay: `${s.delay}s`,
          }}><span className="text-white/30">›</span> {s.code}</div>
        ))}
      </div>
      <style jsx>{`
        @keyframes code-float-0 { 0%,100% { transform: translate(0,0) rotate(-1deg); } 50% { transform: translate(20px,-30px) rotate(1deg); } }
        @keyframes code-float-1 { 0%,100% { transform: translate(0,0) rotate(1deg); } 50% { transform: translate(-25px,20px) rotate(-1deg); } }
        @keyframes code-float-2 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(15px,25px) rotate(0.5deg); } }
      `}</style>
    </BackgroundShell>
  );
}
''',

"NetworkGraphBg": '''"use client";
import { useEffect, useRef, useContext } from "react";
import { BackgroundShell, BgContext } from "./BackgroundShell";

export function NetworkGraphBg() {
  return (
    <BackgroundShell title="Connected systems" subtitle="A force-directed network graph with pulsing nodes. Ideal for data, blockchain, and connectivity platforms." accentColor="#3b82f6" darkDefault={true}>
      <NetworkCanvas />
    </BackgroundShell>
  );
}

function NetworkCanvas() {
  const { intensity, reduced, dark } = useContext(BgContext);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    let raf = 0;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    const count = { subtle: 25, normal: 40, vivid: 60 }[intensity];
    const nodes = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 4 + 2, pulse: Math.random() * Math.PI * 2,
    }));
    const accent = dark ? "139, 92, 246" : "99, 102, 241";
    const bg = dark ? "#0a0a0f" : "#ffffff";
    const draw = () => {
      ctx.fillStyle = bg; ctx.fillRect(0, 0, canvas.width, canvas.height);
      if (!reduced) for (const n of nodes) { n.x += n.vx; n.y += n.vy; n.pulse += 0.02; if (n.x < 0 || n.x > canvas.width) n.vx *= -1; if (n.y < 0 || n.y > canvas.height) n.vy *= -1; }
      for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) { ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y); ctx.strokeStyle = `rgba(${accent},${(1 - dist / 150) * 0.4})`; ctx.lineWidth = 1; ctx.stroke(); }
      }
      for (const n of nodes) {
        const pulseR = n.r + Math.sin(n.pulse) * 2;
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, pulseR * 3);
        grad.addColorStop(0, `rgba(${accent},0.6)`); grad.addColorStop(1, `rgba(${accent},0)`);
        ctx.beginPath(); ctx.arc(n.x, n.y, pulseR * 3, 0, Math.PI * 2); ctx.fillStyle = grad; ctx.fill();
        ctx.beginPath(); ctx.arc(n.x, n.y, pulseR, 0, Math.PI * 2); ctx.fillStyle = `rgba(${accent},1)`; ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw(); window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [intensity, reduced, dark]);
  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}
''',

"ColorAudioBarsBg": '''"use client";
import { BackgroundShell, BgContext, useIntensityOpacity, useReducedMotion } from "./BackgroundShell";
import { useContext } from "react";

export function ColorAudioBarsBg() {
  const { dark, intensity, reduced } = useContext(BgContext);
  const op = useIntensityOpacity();
  const playState = useReducedMotion();
  const bars = Array.from({ length: 48 }, (_, i) => ({ height: 20 + Math.random() * 60, delay: i * 0.04, dur: 0.8 + Math.random() * 0.6, hue: 280 + (i / 48) * 80 }));
  return (
    <BackgroundShell title="Feel the beat" subtitle="An animated audio equalizer waveform. Perfect for music apps, podcasts, and entertainment platforms." accentColor="#a855f7" darkDefault={true}>
      <div className="absolute inset-0" style={{ background: dark ? "linear-gradient(180deg, #0f0a1e, #1a0b2e)" : "linear-gradient(180deg, #faf5ff, #f3e8ff)" }}>
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-center gap-1 px-4" style={{ height: "70%" }}>
          {bars.map((bar, i) => (
            <div key={i} className="flex-1 rounded-t-sm" style={{
              background: `linear-gradient(180deg, hsl(${bar.hue}, 80%, 60%), hsl(${bar.hue + 40}, 80%, 40%))`,
              height: `${bar.height * op}%`,
              animation: `audio-bar ${bar.dur}s ease-in-out infinite alternate`,
              animationPlayState: playState, animationDelay: `${bar.delay}s`,
              boxShadow: `0 0 10px hsla(${bar.hue}, 80%, 60%, 0.5)`, maxWidth: "8px",
            }} />
          ))}
        </div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ width: 400, height: 200, background: "radial-gradient(ellipse, rgba(168,85,247,0.3), transparent)", filter: "blur(40px)" }} />
      </div>
      <style jsx>{`@keyframes audio-bar { 0% { height: 15%; } 100% { height: 85%; } }`}</style>
    </BackgroundShell>
  );
}
''',

"GlassmorphismBlurBg": '''"use client";
import { BackgroundShell, BgContext, useIntensityOpacity, useReducedMotion } from "./BackgroundShell";
import { useContext } from "react";

export function GlassmorphismBlurBg() {
  const { dark, intensity, reduced } = useContext(BgContext);
  const op = useIntensityOpacity();
  const playState = useReducedMotion();
  const blobs = [
    { color: "#f093fb", size: 300, top: "10%", left: "10%", dur: 15 },
    { color: "#4facfe", size: 250, top: "60%", left: "70%", dur: 18 },
    { color: "#43e97b", size: 200, top: "70%", left: "20%", dur: 20 },
    { color: "#fa709a", size: 280, top: "20%", left: "75%", dur: 16 },
    { color: "#30cfd0", size: 220, top: "40%", left: "40%", dur: 22 },
  ];
  return (
    <BackgroundShell title="Crystal clear" subtitle="Frosted glass tiles over moving colored blobs. The glassmorphism trend for modern UI showcases." accentColor="#f093fb" darkDefault={false}>
      <div className="absolute inset-0" style={{ background: dark ? "linear-gradient(135deg, #1a1a2e, #16213e)" : "linear-gradient(135deg, #667eea, #764ba2, #f093fb)" }}>
        <div className="absolute inset-0">
          {blobs.map((blob, i) => (
            <div key={i} className="absolute rounded-full" style={{
              width: blob.size, height: blob.size, top: blob.top, left: blob.left,
              background: blob.color, filter: "blur(30px)", opacity: 0.7 * op,
              animation: `glass-drift-${i % 3} ${blob.dur}s ease-in-out infinite`,
              animationPlayState: playState,
            }} />
          ))}
        </div>
        <div className="absolute inset-0 grid grid-cols-4 gap-4 p-8">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="rounded-2xl" style={{
              background: dark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.1)",
              backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
              border: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.2)"}`,
              boxShadow: "0 8px 32px rgba(31,38,135,0.1)",
              animation: `glass-shimmer ${3 + (i % 3)}s ease-in-out infinite`,
              animationPlayState: playState, animationDelay: `${i * 0.2}s`,
            }} />
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes glass-drift-0 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(40px,-30px); } }
        @keyframes glass-drift-1 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-30px,40px); } }
        @keyframes glass-drift-2 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(20px,30px); } }
        @keyframes glass-shimmer { 0%,100% { opacity: 0.3; } 50% { opacity: 0.7; } }
      `}</style>
    </BackgroundShell>
  );
}
''',

"ParticleVortexBg": '''"use client";
import { useEffect, useRef, useContext } from "react";
import { BackgroundShell, BgContext } from "./BackgroundShell";

export function ParticleVortexBg() {
  return (
    <BackgroundShell title="Drawn in" subtitle="A 3D particle tornado with oscillating radius. Mesmerizing for creative agencies and immersive experiences." accentColor="#06b6d4" darkDefault={true}>
      <VortexCanvas />
    </BackgroundShell>
  );
}

function VortexCanvas() {
  const { intensity, reduced, dark } = useContext(BgContext);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    let raf = 0, t = 0;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    const count = { subtle: 150, normal: 300, vivid: 500 }[intensity];
    const particles = Array.from({ length: count }, (_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 300 + 50;
      return { angle, radius, baseRadius: radius, speed: 0.005 + Math.random() * 0.02, size: 1 + Math.random() * 3, hue: 180 + Math.random() * 120, yScale: 0.3 + Math.random() * 0.4 };
    });
    const draw = () => {
      ctx.fillStyle = "rgba(10,10,20,0.1)"; ctx.fillRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2, cy = canvas.height / 2;
      if (!reduced) t += 0.01;
      for (const p of particles) {
        if (!reduced) p.angle += p.speed;
        p.radius = p.baseRadius + Math.sin(t + p.angle * 2) * 30;
        const x = cx + Math.cos(p.angle) * p.radius;
        const y = cy + Math.sin(p.angle) * p.radius * p.yScale;
        ctx.beginPath(); ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 80%, 60%, 0.9)`; ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw(); window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [intensity, reduced, dark]);
  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}
''',

"GradientWavesBg": '''"use client";
import { BackgroundShell, BgContext, useIntensityOpacity, useReducedMotion } from "./BackgroundShell";
import { useContext } from "react";

export function GradientWavesBg() {
  const { dark, intensity, reduced } = useContext(BgContext);
  const op = useIntensityOpacity();
  const playState = useReducedMotion();
  const waves = [
    { color: "#6366f1", opacity: 0.5, offset: 0, dur: 10, height: 60 },
    { color: "#8b5cf6", opacity: 0.4, offset: 40, dur: 12, height: 55 },
    { color: "#a855f7", opacity: 0.35, offset: 80, dur: 14, height: 65 },
    { color: "#ec4899", opacity: 0.3, offset: 120, dur: 11, height: 50 },
    { color: "#f43f5e", opacity: 0.25, offset: 160, dur: 13, height: 60 },
  ];
  return (
    <BackgroundShell title="In motion" subtitle="Stripe-style layered SVG waves. The go-to background for SaaS, fintech, and modern web apps." accentColor="#8b5cf6" darkDefault={true}>
      <div className="absolute inset-0" style={{ background: dark ? "linear-gradient(180deg, #0f0a1e, #1a0b2e)" : "linear-gradient(180deg, #f8fafc, #e0e7ff)" }}>
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 1200 800">
          <defs>
            {waves.map((w, i) => (
              <linearGradient key={i} id={`gw-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={w.color} stopOpacity="0" />
                <stop offset="20%" stopColor={w.color} stopOpacity={w.opacity * op} />
                <stop offset="80%" stopColor={w.color} stopOpacity={w.opacity * op} />
                <stop offset="100%" stopColor={w.color} stopOpacity="0" />
              </linearGradient>
            ))}
          </defs>
          {waves.map((w, i) => (
            <path key={i} fill="none" stroke={`url(#gw-${i})`} strokeWidth="2" d={`M0,${400 + w.offset} Q300,${400 + w.offset - w.height * 2} 600,${400 + w.offset} T1200,${400 + w.offset}`}>
              {!reduced && <animate attributeName="d" values={`M0,${400 + w.offset} Q300,${400 + w.offset - w.height * 2} 600,${400 + w.offset} T1200,${400 + w.offset};M0,${400 + w.offset} Q300,${400 + w.offset + w.height * 2} 600,${400 + w.offset} T1200,${400 + w.offset};M0,${400 + w.offset} Q300,${400 + w.offset - w.height * 2} 600,${400 + w.offset} T1200,${400 + w.offset}`} dur={`${w.dur}s`} repeatCount="indefinite" playState={playState} />}
            </path>
          ))}
        </svg>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ width: 500, height: 300, background: "radial-gradient(ellipse, rgba(139,92,246,0.2), transparent)", filter: "blur(60px)" }} />
      </div>
    </BackgroundShell>
  );
}
''',
}

for name, content in templates.items():
    path = os.path.join(BG_DIR, f"{name}.tsx")
    with open(path, "w") as f:
        f.write(content)
    print(f"✓ {name}")
print(f"\\nUpgraded {len(templates)} backgrounds")
