#!/usr/bin/env python3
"""Regenerate all 28 backgrounds with simplified BackgroundShell — clean, professional, no over-animation."""
import os

BG_DIR = "/home/z/my-project/src/components/cards/backgrounds"

# All 28 backgrounds — clean, professional, production-ready
# Each uses BackgroundShell with just dark/light toggle
# Animations are subtle, not flashy

backgrounds = {

"AuroraMeshBg": '''"use client";
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
''',

"ParticleConstellationBg": '''"use client";
import { useEffect, useRef, useContext } from "react";
import { BackgroundShell, BgContext } from "./BackgroundShell";

export function ParticleConstellationBg() {
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
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3, r: Math.random() * 2 + 1,
    }));
    const accent = dark ? "139,92,246" : "99,102,241";
    const bg = dark ? "#0a0a0f" : "#ffffff";
    const draw = () => {
      ctx.fillStyle = bg; ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      }
      for (let i = 0; i < particles.length; i++)
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 130) { ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y); ctx.strokeStyle = `rgba(${accent},${0.2 * (1 - d / 130)})`; ctx.lineWidth = 1; ctx.stroke(); }
        }
      for (const p of particles) { ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fillStyle = `rgba(${accent},0.6)`; ctx.fill(); }
      raf = requestAnimationFrame(draw);
    };
    draw(); window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [dark]);
  return <canvas ref={ref} className="absolute inset-0 h-full w-full" />;
}
''',

"LiquidMetalBg": '''"use client";
import { BackgroundShell, BgContext } from "./BackgroundShell";
import { useContext } from "react";

export function LiquidMetalBg() {
  const { dark } = useContext(BgContext);
  return (
    <BackgroundShell>
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 800 600" style={{ background: dark ? "#121214" : "#f4f4f5" }}>
        <defs>
          <linearGradient id="lm" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={dark ? "#6366f1" : "#818cf8"} />
            <stop offset="50%" stopColor={dark ? "#8b5cf6" : "#a78bfa"} />
            <stop offset="100%" stopColor={dark ? "#ec4899" : "#f472b6"} />
          </linearGradient>
          <filter id="lmb"><feGaussianBlur stdDeviation="50" /></filter>
        </defs>
        <g filter="url(#lmb)" opacity={dark ? 0.5 : 0.3}>
          <ellipse cx="200" cy="300" rx="180" ry="120" fill="url(#lm)"><animateTransform attributeName="transform" type="rotate" from="0 200 300" to="360 200 300" dur="25s" repeatCount="indefinite" /></ellipse>
          <ellipse cx="600" cy="200" rx="150" ry="180" fill="url(#lm)" opacity="0.7"><animateTransform attributeName="transform" type="rotate" from="360 600 200" to="0 600 200" dur="20s" repeatCount="indefinite" /></ellipse>
          <ellipse cx="400" cy="450" rx="200" ry="100" fill="url(#lm)" opacity="0.6"><animateTransform attributeName="transform" type="rotate" from="0 400 450" to="-360 400 450" dur="30s" repeatCount="indefinite" /></ellipse>
        </g>
      </svg>
    </BackgroundShell>
  );
}
''',

"GeometricGridBg": '''"use client";
import { BackgroundShell, BgContext } from "./BackgroundShell";
import { useContext } from "react";

export function GeometricGridBg() {
  const { dark } = useContext(BgContext);
  return (
    <BackgroundShell>
      <div className="absolute inset-0" style={{ background: dark ? "#0d1117" : "#f8fafc" }}>
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(30deg, rgba(99,102,241,${dark ? 0.06 : 0.04}) 12%, transparent 12.5%, transparent 87%, rgba(99,102,241,${dark ? 0.06 : 0.04}) 87.5%), linear-gradient(150deg, rgba(99,102,241,${dark ? 0.06 : 0.04}) 12%, transparent 12.5%, transparent 87%, rgba(99,102,241,${dark ? 0.06 : 0.04}) 87.5%)`,
          backgroundSize: "80px 140px",
        }} />
      </div>
    </BackgroundShell>
  );
}
''',

"NeonWaveBg": '''"use client";
import { BackgroundShell, BgContext } from "./BackgroundShell";
import { useContext } from "react";

export function NeonWaveBg() {
  const { dark } = useContext(BgContext);
  return (
    <BackgroundShell>
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 1200 800" style={{ background: dark ? "#0a0a0a" : "#f8fafc" }}>
        <defs><filter id="nw"><feGaussianBlur stdDeviation="3" /></filter></defs>
        {[
          { c: dark ? "#6366f1" : "#818cf8", o: 0.4, y: 300, dur: 10 },
          { c: dark ? "#8b5cf6" : "#a78bfa", o: 0.3, y: 400, dur: 12 },
          { c: dark ? "#ec4899" : "#f472b6", o: 0.25, y: 500, dur: 8 },
        ].map((w, i) => (
          <path key={i} d={`M0,${w.y} Q300,${w.y - 60} 600,${w.y} T1200,${w.y}`} fill="none" stroke={w.c} strokeWidth="2" filter="url(#nw)" opacity={w.o}>
            <animate attributeName="d" values={`M0,${w.y} Q300,${w.y - 60} 600,${w.y} T1200,${w.y};M0,${w.y} Q300,${w.y + 60} 600,${w.y} T1200,${w.y};M0,${w.y} Q300,${w.y - 60} 600,${w.y} T1200,${w.y}`} dur={`${w.dur}s`} repeatCount="indefinite" />
          </path>
        ))}
      </svg>
    </BackgroundShell>
  );
}
''',

"FloatingOrbsBg": '''"use client";
import { BackgroundShell, BgContext } from "./BackgroundShell";
import { useContext } from "react";

export function FloatingOrbsBg() {
  const { dark } = useContext(BgContext);
  const orbs = [
    { c: "#8b5cf6", s: 120, t: "15%", l: "10%", d: 15 },
    { c: "#ec4899", s: 80, t: "60%", l: "80%", d: 18 },
    { c: "#06b6d4", s: 100, t: "70%", l: "15%", d: 20 },
    { c: "#f59e0b", s: 60, t: "25%", l: "70%", d: 12 },
    { c: "#10b981", s: 90, t: "45%", l: "45%", d: 16 },
  ];
  return (
    <BackgroundShell>
      <div className="absolute inset-0" style={{ background: dark ? "linear-gradient(135deg, #1e1b4b, #0f172a)" : "linear-gradient(135deg, #f0f4ff, #e0e7ff)", perspective: "800px" }}>
        {orbs.map((o, i) => (
          <div key={i} className="absolute rounded-full" style={{
            width: o.s, height: o.s, top: o.t, left: o.l,
            background: `radial-gradient(circle at 30% 30%, ${o.c}, transparent)`,
            opacity: dark ? 0.6 : 0.3,
            animation: `orb-${i % 3} ${o.d}s ease-in-out infinite`,
          }} />
        ))}
        <style jsx>{`
          @keyframes orb-0 { 0%,100% { transform: translate3d(0,0,0); } 50% { transform: translate3d(40px,-20px,30px); } }
          @keyframes orb-1 { 0%,100% { transform: translate3d(0,0,0); } 50% { transform: translate3d(-30px,30px,-20px); } }
          @keyframes orb-2 { 0%,100% { transform: translate3d(0,0,0); } 50% { transform: translate3d(20px,40px,20px); } }
        `}</style>
      </div>
    </BackgroundShell>
  );
}
''',

"MatrixRainBg": '''"use client";
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
''',

"GradientMeshBg": '''"use client";
import { BackgroundShell, BgContext } from "./BackgroundShell";
import { useContext } from "react";

export function GradientMeshBg() {
  const { dark } = useContext(BgContext);
  return (
    <BackgroundShell>
      <div className="absolute inset-0" style={{ background: dark ? "#000" : "#f8fafc" }}>
        <div className="absolute inset-0" style={{
          background: `conic-gradient(from 0deg at 50% 50%, #8b5cf6, #ec4899, #f59e0b, #10b981, #06b6d4, #3b82f6, #8b5cf6)`,
          animation: "gm-rot 30s linear infinite", filter: "blur(80px)", opacity: dark ? 0.4 : 0.15,
        }} />
      </div>
      <style jsx>{`@keyframes gm-rot { 0% { transform: rotate(0deg) scale(1.5); } 100% { transform: rotate(360deg) scale(1.5); } }`}</style>
    </BackgroundShell>
  );
}
''',

"DotMatrixBg": '''"use client";
import { BackgroundShell, BgContext } from "./BackgroundShell";
import { useContext, useEffect, useRef, useState } from "react";

export function DotMatrixBg() {
  return (
    <BackgroundShell>
      <Dots />
    </BackgroundShell>
  );
}

function Dots() {
  const { dark } = useContext(BgContext);
  const ref = useRef<HTMLDivElement>(null);
  const [ripples, setRipples] = useState<{x:number;y:number;id:number}[]>([]);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const h = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      setRipples(p => [...p, { x: e.clientX - r.left, y: e.clientY - r.top, id: Date.now() }].slice(-4));
    };
    el.addEventListener("click", h);
    return () => el.removeEventListener("click", h);
  }, []);
  useEffect(() => { if (!ripples.length) return; const t = setTimeout(() => setRipples(p => p.slice(0, -1)), 2000); return () => clearTimeout(t); }, [ripples]);
  return (
    <div ref={ref} className="absolute inset-0 cursor-pointer" style={{ background: dark ? "#0f172a" : "#f8fafc" }}>
      <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle, rgba(99,102,241,${dark ? 0.3 : 0.15}) 1.5px, transparent 1.5px)`, backgroundSize: "24px 24px" }} />
      {ripples.map(r => (
        <div key={r.id} className="absolute rounded-full pointer-events-none" style={{ left: r.x, top: r.y, width: 10, height: 10, marginLeft: -5, marginTop: -5, border: "2px solid #8b5cf6", animation: "dm-rip 2s ease-out forwards" }} />
      ))}
      <style jsx>{`@keyframes dm-rip { 0% { width:10px; height:10px; margin-left:-5px; margin-top:-5px; opacity:1; } 100% { width:300px; height:300px; margin-left:-150px; margin-top:-150px; opacity:0; } }`}</style>
    </div>
  );
}
''',

"StarfieldBg": '''"use client";
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
''',

"BokehLightsBg": '''"use client";
import { BackgroundShell, BgContext } from "./BackgroundShell";
import { useContext } from "react";

export function BokehLightsBg() {
  const { dark } = useContext(BgContext);
  const orbs = [
    { c: "#ec4899", s: 200, t: "10%", l: "15%", d: 18 },
    { c: "#8b5cf6", s: 300, t: "50%", l: "70%", d: 22 },
    { c: "#06b6d4", s: 150, t: "70%", l: "25%", d: 15 },
    { c: "#f59e0b", s: 250, t: "20%", l: "80%", d: 20 },
    { c: "#10b981", s: 180, t: "75%", l: "65%", d: 16 },
  ];
  return (
    <BackgroundShell>
      <div className="absolute inset-0" style={{ background: dark ? "linear-gradient(135deg, #1a0820, #0d1117)" : "linear-gradient(135deg, #fdf2f8, #f0f9ff)" }}>
        {orbs.map((o, i) => (
          <div key={i} className="absolute rounded-full" style={{
            width: o.s, height: o.s, top: o.t, left: o.l,
            background: `radial-gradient(circle, ${o.c}80, transparent)`,
            filter: "blur(20px)", opacity: dark ? 0.6 : 0.25,
            animation: `bk-${i % 3} ${o.d}s ease-in-out infinite`,
          }} />
        ))}
        <style jsx>{`
          @keyframes bk-0 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(40px,-30px); } }
          @keyframes bk-1 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-30px,40px); } }
          @keyframes bk-2 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(20px,30px); } }
        `}</style>
      </div>
    </BackgroundShell>
  );
}
''',

"TopographicBg": '''"use client";
import { BackgroundShell, BgContext } from "./BackgroundShell";
import { useContext } from "react";

export function TopographicBg() {
  const { dark } = useContext(BgContext);
  const paths = Array.from({ length: 12 }, (_, i) => {
    const y = 60 + i * 50;
    const v = 30 + Math.sin(i * 0.5) * 20;
    return `M0,${y} Q200,${y - v} 400,${y} T800,${y} T1200,${y}`;
  });
  return (
    <BackgroundShell>
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1200 800" style={{ background: dark ? "#0a1a0f" : "#f0fdf4" }}>
        <defs>
          <linearGradient id="tg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity={dark ? 0.4 : 0.2} />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity={dark ? 0.15 : 0.08} />
          </linearGradient>
        </defs>
        {paths.map((d, i) => (
          <path key={i} d={d} fill="none" stroke="url(#tg)" strokeWidth="1" opacity={0.4 + i / 30} />
        ))}
      </svg>
    </BackgroundShell>
  );
}
''',

"HolographicBg": '''"use client";
import { BackgroundShell, BgContext } from "./BackgroundShell";
import { useContext } from "react";

export function HolographicBg() {
  const { dark } = useContext(BgContext);
  return (
    <BackgroundShell>
      <div className="absolute inset-0" style={{ background: dark ? "#0a0a0f" : "#f8fafc" }}>
        <div className="absolute inset-0" style={{
          background: `linear-gradient(135deg, #ff006e, #8338ec, #3a86ff, #06ffa5, #ffbe0b, #fb5607, #ff006e)`,
          backgroundSize: "400% 400%", animation: "hg 12s ease infinite",
          filter: "blur(50px)", opacity: dark ? 0.3 : 0.1,
        }} />
      </div>
      <style jsx>{`@keyframes hg { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }`}</style>
    </BackgroundShell>
  );
}
''',

"VortexSpiralBg": '''"use client";
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
''',

"CrystalShardsBg": '''"use client";
import { BackgroundShell, BgContext } from "./BackgroundShell";
import { useContext } from "react";

export function CrystalShardsBg() {
  const { dark } = useContext(BgContext);
  const shards = Array.from({ length: 6 }, (_, i) => ({
    x: 10 + i * 16, y: 15 + (i % 3) * 25, size: 50 + (i % 3) * 30,
    dur: 20 + i * 3, delay: i * 0.8, hue: 200 + i * 30,
  }));
  return (
    <BackgroundShell>
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1200 800" style={{ background: dark ? "linear-gradient(135deg, #0a0a1a, #1a0a2a)" : "linear-gradient(135deg, #f0f4ff, #e0e7ff)" }}>
        <defs>
          {shards.map((s, i) => (
            <linearGradient key={i} id={`cs${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={`hsla(${s.hue},70%,60%,${dark ? 0.3 : 0.15})`} />
              <stop offset="100%" stopColor={`hsla(${s.hue + 60},70%,40%,0)`} />
            </linearGradient>
          ))}
        </defs>
        {shards.map((s, i) => (
          <polygon key={i} points={`${s.x},${s.y - s.size / 2} ${s.x + s.size / 3},${s.y} ${s.x},${s.y + s.size / 2} ${s.x - s.size / 3},${s.y}`} fill={`url(#cs${i})`} stroke={`hsla(${s.hue},70%,70%,${dark ? 0.4 : 0.2})`} strokeWidth="0.5" style={{ transformOrigin: `${s.x}px ${s.y}px`, animation: `cs-${i % 2} ${s.dur}s linear infinite`, animationDelay: `${s.delay}s` }} />
        ))}
        <style jsx>{`
          @keyframes cs-0 { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
          @keyframes cs-1 { 0% { transform: rotate(0deg); } 100% { transform: rotate(-360deg); } }
        `}</style>
      </svg>
    </BackgroundShell>
  );
}
''',

"LavaLampBg": '''"use client";
import { BackgroundShell, BgContext } from "./BackgroundShell";
import { useContext } from "react";

export function LavaLampBg() {
  const { dark } = useContext(BgContext);
  const blobs = [
    { c: "#8b5cf6", s: 160, l: "15%", d: 10 },
    { c: "#ec4899", s: 130, l: "40%", d: 12 },
    { c: "#6366f1", s: 150, l: "65%", d: 9 },
    { c: "#a855f7", s: 110, l: "85%", d: 11 },
  ];
  return (
    <BackgroundShell>
      <div className="absolute inset-0" style={{ background: dark ? "linear-gradient(180deg, #1a0033, #0f0a1e)" : "linear-gradient(180deg, #fdf4ff, #f0f9ff)" }}>
        {blobs.map((b, i) => (
          <div key={i} className="absolute rounded-full" style={{
            width: b.s, height: b.s, left: b.l, bottom: -100,
            background: `radial-gradient(circle at 40% 40%, ${b.c}, transparent)`,
            filter: "blur(10px)", opacity: dark ? 0.5 : 0.2,
            animation: `ll-${i} ${b.d}s ease-in-out infinite`,
          }} />
        ))}
        <style jsx>{`
          @keyframes ll-0 { 0% { bottom: -20%; transform: scale(1); } 50% { bottom: 60%; transform: scale(1.2); } 100% { bottom: -20%; transform: scale(1); } }
          @keyframes ll-1 { 0% { bottom: -20%; transform: scale(1); } 50% { bottom: 70%; transform: scale(0.9); } 100% { bottom: -20%; transform: scale(1); } }
          @keyframes ll-2 { 0% { bottom: -20%; transform: scale(1); } 50% { bottom: 55%; transform: scale(1.1); } 100% { bottom: -20%; transform: scale(1); } }
          @keyframes ll-3 { 0% { bottom: -20%; transform: scale(1); } 50% { bottom: 65%; transform: scale(1.15); } 100% { bottom: -20%; transform: scale(1); } }
        `}</style>
      </div>
    </BackgroundShell>
  );
}
''',

"CyberGridBg": '''"use client";
import { BackgroundShell, BgContext } from "./BackgroundShell";
import { useContext } from "react";

export function CyberGridBg() {
  const { dark } = useContext(BgContext);
  return (
    <BackgroundShell darkDefault={true}>
      <div className="absolute inset-0" style={{ background: dark ? "#0a0a0f" : "#1a1a2e" }}>
        <div className="absolute inset-0" style={{ perspective: "400px" }}>
          <div className="absolute inset-x-0 bottom-0 h-1/2" style={{
            backgroundImage: `linear-gradient(rgba(0,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.2) 1px, transparent 1px)`,
            backgroundSize: "40px 40px", transform: "rotateX(60deg)", transformOrigin: "bottom",
            animation: "cg 4s linear infinite",
          }} />
        </div>
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2" style={{ width: 300, height: 300, background: "radial-gradient(circle, rgba(255,0,128,0.3), transparent)", borderRadius: "50%", filter: "blur(30px)" }} />
        <style jsx>{`@keyframes cg { 0% { background-position: 0 0; } 100% { background-position: 0 40px; } }`}</style>
      </div>
    </BackgroundShell>
  );
}
''',

"OrigamiFoldsBg": '''"use client";
import { BackgroundShell, BgContext } from "./BackgroundShell";
import { useContext } from "react";

export function OrigamiFoldsBg() {
  const { dark } = useContext(BgContext);
  const planes = Array.from({ length: 8 }, (_, i) => ({
    x: 10 + i * 12, y: 15 + (i % 3) * 25, size: 30 + (i % 3) * 20,
    dur: 18 + i * 2, delay: i * 0.5,
    c: ["#8b5cf6", "#ec4899", "#06b6d4", "#f59e0b", "#10b981"][i % 5],
  }));
  return (
    <BackgroundShell darkDefault={false}>
      <div className="absolute inset-0" style={{ background: dark ? "linear-gradient(135deg, #1e1b4b, #0f172a)" : "linear-gradient(135deg, #f0f4ff, #e0e7ff, #f0fdfa)" }}>
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1200 800">
          <defs>
            {planes.map((p, i) => (
              <linearGradient key={i} id={`of${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={p.c} stopOpacity={dark ? 0.5 : 0.25} />
                <stop offset="100%" stopColor={p.c} stopOpacity="0" />
              </linearGradient>
            ))}
          </defs>
          {planes.map((p, i) => (
            <g key={i} style={{ transform: `translate(${p.x * 12}px, ${p.y * 8}px)`, animation: `of-${i % 2} ${p.dur}s ease-in-out infinite`, animationDelay: `${p.delay}s` }}>
              <g style={{ transform: `rotate(${i * 45}deg)`, transformOrigin: "center" }}>
                <polygon points={`0,0 ${p.size},${p.size / 3} 0,${p.size / 2} ${p.size / 4},${p.size / 4}`} fill={`url(#of${i})`} stroke={p.c} strokeWidth="0.5" opacity={dark ? 0.6 : 0.3} />
              </g>
            </g>
          ))}
          <style jsx>{`
            @keyframes of-0 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(30px,-20px); } }
            @keyframes of-1 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-20px,30px); } }
          `}</style>
        </svg>
      </div>
    </BackgroundShell>
  );
}
''',

"MeshGradientBg": '''"use client";
import { BackgroundShell, BgContext } from "./BackgroundShell";
import { useContext } from "react";

export function MeshGradientBg() {
  const { dark } = useContext(BgContext);
  return (
    <BackgroundShell>
      <div className="absolute inset-0" style={{ background: dark ? "#000" : "#f8fafc" }}>
        <div className="absolute inset-0" style={{
          background: `radial-gradient(at 20% 20%, rgba(139,92,246,${dark ? 0.6 : 0.2}) 0px, transparent 50%), radial-gradient(at 80% 10%, rgba(236,72,153,${dark ? 0.5 : 0.15}) 0px, transparent 50%), radial-gradient(at 60% 80%, rgba(6,182,212,${dark ? 0.5 : 0.15}) 0px, transparent 50%), radial-gradient(at 10% 90%, rgba(245,158,11,${dark ? 0.4 : 0.1}) 0px, transparent 50%)`,
          backgroundSize: "150% 150%", animation: "mg 15s ease-in-out infinite",
        }} />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
      </div>
      <style jsx>{`@keyframes mg { 0%,100% { background-position: 0% 0%; } 50% { background-position: 100% 100%; } }`}</style>
    </BackgroundShell>
  );
}
''',

"AuroraBorealisBg": '''"use client";
import { BackgroundShell, BgContext } from "./BackgroundShell";
import { useContext } from "react";

export function AuroraBorealisBg() {
  const { dark } = useContext(BgContext);
  return (
    <BackgroundShell darkDefault={true}>
      <div className="absolute inset-0" style={{ background: dark ? "linear-gradient(180deg, #020617, #0f172a, #1e1b4b)" : "linear-gradient(180deg, #f0f9ff, #e0f2fe, #ddd6fe)" }}>
        {Array.from({ length: 40 }).map((_, i) => (
          <div key={i} className="absolute rounded-full bg-white" style={{
            width: Math.random() * 2 + 1, height: Math.random() * 2 + 1,
            top: `${Math.random() * 60}%`, left: `${Math.random() * 100}%`,
            opacity: dark ? Math.random() * 0.6 + 0.2 : Math.random() * 0.3 + 0.1,
          }} />
        ))}
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1200 800">
          <defs>
            <filter id="ab"><feGaussianBlur stdDeviation="30" /></filter>
            <linearGradient id="abg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
              <stop offset="30%" stopColor="#10b981" stopOpacity={dark ? 0.5 : 0.2} />
              <stop offset="70%" stopColor="#06b6d4" stopOpacity={dark ? 0.4 : 0.15} />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
          </defs>
          <g filter="url(#ab)">
            <path d="M0,200 Q300,100 600,250 T1200,200 L1200,500 Q900,400 600,450 T0,500 Z" fill="url(#abg)">
              <animate attributeName="d" values="M0,200 Q300,100 600,250 T1200,200 L1200,500 Q900,400 600,450 T0,500 Z;M0,250 Q300,350 600,200 T1200,300 L1200,450 Q900,550 600,400 T0,550 Z;M0,200 Q300,100 600,250 T1200,200 L1200,500 Q900,400 600,450 T0,500 Z" dur="15s" repeatCount="indefinite" />
            </path>
          </g>
        </svg>
      </div>
    </BackgroundShell>
  );
}
''',

"NoiseTextureBg": '''"use client";
import { BackgroundShell, BgContext } from "./BackgroundShell";
import { useContext } from "react";

export function NoiseTextureBg() {
  const { dark } = useContext(BgContext);
  return (
    <BackgroundShell darkDefault={true}>
      <div className="absolute inset-0" style={{ background: dark ? "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)" : "linear-gradient(135deg, #f8fafc, #e2e8f0, #cbd5e1)" }}>
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          opacity: dark ? 0.06 : 0.04, mixBlendMode: "overlay",
        }} />
        <div className="absolute inset-0" style={{ background: dark ? "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.5) 100%)" : "none" }} />
      </div>
    </BackgroundShell>
  );
}
''',

"AnimatedGridGlowBg": '''"use client";
import { BackgroundShell, BgContext } from "./BackgroundShell";
import { useContext, useEffect, useRef, useState } from "react";

export function AnimatedGridGlowBg() {
  return (
    <BackgroundShell darkDefault={true}>
      <Grid />
    </BackgroundShell>
  );
}

function Grid() {
  const { dark } = useContext(BgContext);
  const ref = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 50, y: 50 });
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const h = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      setMouse({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
    };
    el.addEventListener("mousemove", h);
    return () => el.removeEventListener("mousemove", h);
  }, []);
  return (
    <div ref={ref} className="absolute inset-0 cursor-crosshair" style={{ background: dark ? "#0a0a0f" : "#f8fafc" }}>
      <div className="absolute inset-0" style={{
        backgroundImage: `linear-gradient(rgba(99,102,241,${dark ? 0.08 : 0.04}) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,${dark ? 0.08 : 0.04}) 1px, transparent 1px)`,
        backgroundSize: "32px 32px",
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(circle 300px at ${mouse.x}% ${mouse.y}%, rgba(139,92,246,${dark ? 0.2 : 0.1}), transparent 70%)` }} />
    </div>
  );
}
''',

"FloatingCodeBg": '''"use client";
import { BackgroundShell, BgContext } from "./BackgroundShell";
import { useContext } from "react";

export function FloatingCodeBg() {
  const { dark } = useContext(BgContext);
  const snippets = [
    { code: "const app = createApp()", t: "15%", l: "10%", d: 20, c: "#3b82f6" },
    { code: "await fetch('/api')", t: "25%", l: "70%", d: 25, c: "#10b981" },
    { code: "useEffect(() => {})", t: "60%", l: "15%", d: 22, c: "#f59e0b" },
    { code: "<Component />", t: "70%", l: "65%", d: 18, c: "#ec4899" },
    { code: "npm install", t: "40%", l: "45%", d: 24, c: "#8b5cf6" },
    { code: "git push origin", t: "85%", l: "35%", d: 19, c: "#06b6d4" },
  ];
  return (
    <BackgroundShell darkDefault={true}>
      <div className="absolute inset-0" style={{ background: dark ? "linear-gradient(135deg, #0d1117, #161b22)" : "linear-gradient(135deg, #f8fafc, #e2e8f0)" }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, rgba(139,148,158,0.3) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
        {snippets.map((s, i) => (
          <div key={i} className="absolute rounded-lg border px-3 py-1.5 font-mono text-[12px] font-medium" style={{
            top: s.t, left: s.l, background: dark ? "rgba(22,27,34,0.7)" : "rgba(255,255,255,0.7)",
            borderColor: `${s.c}40`, color: s.c, backdropFilter: "blur(8px)",
            opacity: dark ? 0.7 : 0.4, animation: `fc-${i % 3} ${s.d}s ease-in-out infinite`,
          }}><span style={{ opacity: 0.5 }}>›</span> {s.code}</div>
        ))}
        <style jsx>{`
          @keyframes fc-0 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(15px,-20px); } }
          @keyframes fc-1 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-20px,15px); } }
          @keyframes fc-2 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(10px,20px); } }
        `}</style>
      </div>
    </BackgroundShell>
  );
}
''',

"NetworkGraphBg": '''"use client";
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
''',

"ColorAudioBarsBg": '''"use client";
import { BackgroundShell, BgContext } from "./BackgroundShell";
import { useContext } from "react";

export function ColorAudioBarsBg() {
  const { dark } = useContext(BgContext);
  const bars = Array.from({ length: 40 }, (_, i) => ({ h: 20 + Math.random() * 60, delay: i * 0.04, dur: 0.8 + Math.random() * 0.6, hue: 280 + (i / 40) * 80 }));
  return (
    <BackgroundShell darkDefault={true}>
      <div className="absolute inset-0" style={{ background: dark ? "linear-gradient(180deg, #0f0a1e, #1a0b2e)" : "linear-gradient(180deg, #faf5ff, #f3e8ff)" }}>
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-center gap-1 px-4" style={{ height: "60%" }}>
          {bars.map((b, i) => (
            <div key={i} className="flex-1 rounded-t-sm" style={{
              background: `linear-gradient(180deg, hsl(${b.hue},70%,${dark ? 60 : 50}%), hsl(${b.hue + 40},70%,${dark ? 40 : 30}%))`,
              height: `${b.h}%`, opacity: dark ? 0.7 : 0.3,
              animation: `ab ${b.dur}s ease-in-out infinite alternate`, animationDelay: `${b.delay}s`, maxWidth: "6px",
            }} />
          ))}
        </div>
        <style jsx>{`@keyframes ab { 0% { height: 15%; } 100% { height: 75%; } }`}</style>
      </div>
    </BackgroundShell>
  );
}
''',

"GlassmorphismBlurBg": '''"use client";
import { BackgroundShell, BgContext } from "./BackgroundShell";
import { useContext } from "react";

export function GlassmorphismBlurBg() {
  const { dark } = useContext(BgContext);
  const blobs = [
    { c: "#8b5cf6", s: 250, t: "10%", l: "15%", d: 18 },
    { c: "#ec4899", s: 200, t: "60%", l: "70%", d: 20 },
    { c: "#06b6d4", s: 180, t: "70%", l: "25%", d: 16 },
    { c: "#f59e0b", s: 220, t: "30%", l: "75%", d: 22 },
  ];
  return (
    <BackgroundShell darkDefault={false}>
      <div className="absolute inset-0" style={{ background: dark ? "linear-gradient(135deg, #1e1b4b, #0f172a)" : "linear-gradient(135deg, #f0f4ff, #e0e7ff, #f0fdfa)" }}>
        {blobs.map((b, i) => (
          <div key={i} className="absolute rounded-full" style={{
            width: b.s, height: b.s, top: b.t, left: b.l,
            background: b.c, filter: "blur(40px)", opacity: dark ? 0.4 : 0.15,
            animation: `gb-${i % 2} ${b.d}s ease-in-out infinite`,
          }} />
        ))}
        <div className="absolute inset-0 grid grid-cols-3 gap-4 p-8">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="rounded-2xl" style={{
              background: dark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.15)",
              backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
              border: `1px solid ${dark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.2)"}`,
            }} />
          ))}
        </div>
        <style jsx>{`
          @keyframes gb-0 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(30px,-20px); } }
          @keyframes gb-1 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-25px,30px); } }
        `}</style>
      </div>
    </BackgroundShell>
  );
}
''',

"ParticleVortexBg": '''"use client";
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
''',

"GradientWavesBg": '''"use client";
import { BackgroundShell, BgContext } from "./BackgroundShell";
import { useContext } from "react";

export function GradientWavesBg() {
  const { dark } = useContext(BgContext);
  const waves = [
    { c: "#6366f1", o: 0.4, y: 350, dur: 10 },
    { c: "#8b5cf6", o: 0.3, y: 400, dur: 12 },
    { c: "#a855f7", o: 0.25, y: 450, dur: 14 },
    { c: "#ec4899", o: 0.2, y: 500, dur: 11 },
  ];
  return (
    <BackgroundShell darkDefault={true}>
      <div className="absolute inset-0" style={{ background: dark ? "linear-gradient(180deg, #0f0a1e, #1a0b2e)" : "linear-gradient(180deg, #f8fafc, #e0e7ff)" }}>
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 1200 800">
          <defs>
            {waves.map((w, i) => (
              <linearGradient key={i} id={`gw${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={w.c} stopOpacity="0" />
                <stop offset="50%" stopColor={w.c} stopOpacity={dark ? w.o : w.o * 0.4} />
                <stop offset="100%" stopColor={w.c} stopOpacity="0" />
              </linearGradient>
            ))}
          </defs>
          {waves.map((w, i) => (
            <path key={i} fill="none" stroke={`url(#gw${i})`} strokeWidth="2" d={`M0,${w.y} Q300,${w.y - 80} 600,${w.y} T1200,${w.y}`}>
              <animate attributeName="d" values={`M0,${w.y} Q300,${w.y - 80} 600,${w.y} T1200,${w.y};M0,${w.y} Q300,${w.y + 80} 600,${w.y} T1200,${w.y};M0,${w.y} Q300,${w.y - 80} 600,${w.y} T1200,${w.y}`} dur={`${w.dur}s`} repeatCount="indefinite" />
            </path>
          ))}
        </svg>
      </div>
    </BackgroundShell>
  );
}
''',
}

for name, content in backgrounds.items():
    path = os.path.join(BG_DIR, f"{name}.tsx")
    with open(path, "w") as f:
        f.write(content)
    print(f"✓ {name}")

print(f"\\nRegenerated {len(backgrounds)} backgrounds — clean, professional, no playState")
