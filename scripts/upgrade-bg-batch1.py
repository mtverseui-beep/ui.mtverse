#!/usr/bin/env python3
"""Upgrade all remaining background components to production-ready with BackgroundShell."""
import os

BG_DIR = "/home/z/my-project/src/components/cards/backgrounds"

# Already upgraded: AuroraMesh, ParticleConstellation, LiquidMetal, GeometricGrid, NeonWave
# Need to upgrade the rest:

templates = {
"FloatingOrbsBg": '''"use client";
import { BackgroundShell, BgContext, useIntensityOpacity, useReducedMotion } from "./BackgroundShell";
import { useContext } from "react";

export function FloatingOrbsBg() {
  return (
    <BackgroundShell title="Float above" subtitle="Soft 3D orbs drifting in perspective. Adds depth and calm to product and wellness pages." accentColor="#8b5cf6">
      <FloatingOrbsCanvas />
    </BackgroundShell>
  );
}

function FloatingOrbsCanvas() {
  const { dark, intensity, reduced } = useContext(BgContext);
  const op = { subtle: 0.4, normal: 0.7, vivid: 1 }[intensity];
  const playState = useReducedMotion();
  const orbs = [
    { color: "#8b5cf6", size: 120, top: "15%", left: "10%", dur: 15 },
    { color: "#ec4899", size: 80, top: "60%", left: "80%", dur: 18 },
    { color: "#06b6d4", size: 100, top: "70%", left: "15%", dur: 20 },
    { color: "#f59e0b", size: 60, top: "25%", left: "70%", dur: 12 },
    { color: "#10b981", size: 90, top: "45%", left: "45%", dur: 16 },
    { color: "#a855f7", size: 70, top: "80%", left: "55%", dur: 14 },
  ];
  return (
    <div className="absolute inset-0" style={{ background: dark ? "linear-gradient(135deg, #1e1b4b, #0f172a)" : "linear-gradient(135deg, #f0f4ff, #e0e7ff)", perspective: "1000px" }}>
      {orbs.map((orb, i) => (
        <div key={i} className="absolute rounded-full" style={{
          width: orb.size, height: orb.size, top: orb.top, left: orb.left,
          background: `radial-gradient(circle at 30% 30%, ${orb.color}, ${orb.color}40, transparent)`,
          boxShadow: `0 0 60px ${orb.color}60, inset 0 0 30px ${orb.color}40`,
          opacity: op,
          animation: `orb-float-${i % 3} ${orb.dur}s ease-in-out infinite`,
          animationPlayState: playState,
        }} />
      ))}
      <style jsx>{`
        @keyframes orb-float-0 { 0%,100% { transform: translate3d(0,0,0); } 50% { transform: translate3d(50px,-30px,50px); } }
        @keyframes orb-float-1 { 0%,100% { transform: translate3d(0,0,0); } 50% { transform: translate3d(-40px,40px,-30px); } }
        @keyframes orb-float-2 { 0%,100% { transform: translate3d(0,0,0); } 50% { transform: translate3d(30px,50px,40px); } }
      `}</style>
    </div>
  );
}
''',

"MatrixRainBg": '''"use client";
import { useEffect, useRef, useContext } from "react";
import { BackgroundShell, BgContext } from "./BackgroundShell";

export function MatrixRainBg() {
  return (
    <BackgroundShell title="Enter the matrix" subtitle="Classic digital rain effect. Perfect for hacker aesthetics, cybersecurity, and developer tools." accentColor="#00ff41" darkDefault={true}>
      <MatrixCanvas />
    </BackgroundShell>
  );
}

function MatrixCanvas() {
  const { intensity, reduced, dark } = useContext(BgContext);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    let raf = 0;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    const chars = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿ0123456789ABCDEF".split("");
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const speedMult = { subtle: 0.5, normal: 1, vivid: 2 }[intensity];
    const drops = Array(columns).fill(1);
    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#00ff41";
      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const y = drops[i] * fontSize;
        ctx.fillStyle = drops[i] * fontSize > canvas.height * 0.7 && Math.random() > 0.975 ? "#fff" : "#00ff41";
        ctx.fillText(text, i * fontSize, y);
        if (!reduced && y > canvas.height && Math.random() > 0.975) drops[i] = 0;
        if (!reduced) drops[i] += speedMult;
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [intensity, reduced, dark]);
  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}
''',

"GradientMeshBg": '''"use client";
import { BackgroundShell, BgContext, useIntensityOpacity, useReducedMotion } from "./BackgroundShell";
import { useContext } from "react";

export function GradientMeshBg() {
  const { dark } = useContext(BgContext);
  const op = useIntensityOpacity();
  const playState = useReducedMotion();
  return (
    <BackgroundShell title="Color in motion" subtitle="A dynamic conic gradient mesh that rotates and blends. Apple-style premium backgrounds for any product." accentColor="#ec4899">
      <div className="absolute inset-0" style={{ background: dark ? "#000" : "#f0f0f0" }}>
        <div className="absolute inset-0" style={{
          background: `conic-gradient(from 0deg at 50% 50%, #8b5cf6, #ec4899, #f59e0b, #10b981, #06b6d4, #3b82f6, #8b5cf6)`,
          animation: "mesh-rotate 20s linear infinite",
          animationPlayState: playState,
          filter: "blur(60px)",
          opacity: 0.6 * op,
        }} />
        <div className="absolute inset-0" style={{
          background: `conic-gradient(from 180deg at 30% 70%, #f43f5e, #a855f7, #3b82f6, #06b6d4, #10b981, #f43f5e)`,
          animation: "mesh-rotate-rev 25s linear infinite",
          animationPlayState: playState,
          filter: "blur(80px)",
          opacity: 0.5 * op,
        }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 50% 50%, transparent 0%, rgba(0,0,0,0.4) 100%)" }} />
      </div>
      <style jsx>{`
        @keyframes mesh-rotate { 0% { transform: rotate(0deg) scale(1.5); } 100% { transform: rotate(360deg) scale(1.5); } }
        @keyframes mesh-rotate-rev { 0% { transform: rotate(360deg) scale(1.3); } 100% { transform: rotate(0deg) scale(1.3); } }
      `}</style>
    </BackgroundShell>
  );
}
''',

"DotMatrixBg": '''"use client";
import { BackgroundShell, BgContext, useIntensityOpacity } from "./BackgroundShell";
import { useContext, useEffect, useRef, useState } from "react";

export function DotMatrixBg() {
  return (
    <BackgroundShell title="Click to explore" subtitle="An interactive dot grid with ripple effects on click. Engaging and subtle for product showcases." accentColor="#8b5cf6">
      <DotMatrixCanvas />
    </BackgroundShell>
  );
}

function DotMatrixCanvas() {
  const { dark, intensity } = useContext(BgContext);
  const op = useIntensityOpacity();
  const containerRef = useRef<HTMLDivElement>(null);
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect(); if (!rect) return;
      setRipples(prev => [...prev, { x: e.clientX - rect.left, y: e.clientY - rect.top, id: Date.now() }].slice(-5));
    };
    const el = containerRef.current; if (!el) return;
    el.addEventListener("click", handle);
    return () => el.removeEventListener("click", handle);
  }, []);
  useEffect(() => {
    if (ripples.length === 0) return;
    const t = setTimeout(() => setRipples(prev => prev.slice(0, -1)), 2000);
    return () => clearTimeout(t);
  }, [ripples]);
  return (
    <div ref={containerRef} className="absolute inset-0 cursor-pointer" style={{ background: dark ? "#0f172a" : "#f8fafc" }}>
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle, rgba(99,102,241,${0.4 * op}) 1.5px, transparent 1.5px)`,
        backgroundSize: "24px 24px",
      }} />
      {ripples.map(r => (
        <div key={r.id} className="absolute rounded-full pointer-events-none" style={{
          left: r.x, top: r.y, width: 10, height: 10, marginLeft: -5, marginTop: -5,
          border: "2px solid #8b5cf6",
          animation: "dot-ripple 2s ease-out forwards",
        }} />
      ))}
      <style jsx>{`
        @keyframes dot-ripple { 0% { width:10px; height:10px; margin-left:-5px; margin-top:-5px; opacity:1; } 100% { width:400px; height:400px; margin-left:-200px; margin-top:-200px; opacity:0; } }
      `}</style>
    </div>
  );
}
''',

"StarfieldBg": '''"use client";
import { useEffect, useRef, useContext } from "react";
import { BackgroundShell, BgContext } from "./BackgroundShell";

export function StarfieldBg() {
  return (
    <BackgroundShell title="Beyond the stars" subtitle="A warp-speed starfield that creates depth and motion. Perfect for space, sci-fi, and future-tech themes." accentColor="#ffffff" darkDefault={true}>
      <StarfieldCanvas />
    </BackgroundShell>
  );
}

function StarfieldCanvas() {
  const { intensity, reduced, dark } = useContext(BgContext);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    let raf = 0;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    const count = { subtle: 200, normal: 400, vivid: 600 }[intensity];
    const stars = Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * canvas.width, y: (Math.random() - 0.5) * canvas.height,
      z: Math.random() * canvas.width, pz: 0,
    }));
    const speed = reduced ? 0 : 4;
    const draw = () => {
      ctx.fillStyle = "rgba(10,10,15,0.3)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2, cy = canvas.height / 2;
      for (const s of stars) {
        s.pz = s.z; s.z -= speed;
        if (s.z < 1) { s.z = canvas.width; s.x = (Math.random() - 0.5) * canvas.width; s.y = (Math.random() - 0.5) * canvas.height; s.pz = s.z; }
        const sx = (s.x / s.z) * canvas.width + cx;
        const sy = (s.y / s.z) * canvas.height + cy;
        const px = (s.x / s.pz) * canvas.width + cx;
        const py = (s.y / s.pz) * canvas.height + cy;
        const r = Math.max(0.5, (1 - s.z / canvas.width) * 2);
        ctx.strokeStyle = `rgba(255,255,255,${(1 - s.z / canvas.width) * 0.8})`;
        ctx.lineWidth = r;
        ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(sx, sy); ctx.stroke();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [intensity, reduced, dark]);
  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}
''',
}

for name, content in templates.items():
    path = os.path.join(BG_DIR, f"{name}.tsx")
    with open(path, "w") as f:
        f.write(content)
    print(f"✓ {name}")

print(f"\\nUpgraded {len(templates)} backgrounds")
