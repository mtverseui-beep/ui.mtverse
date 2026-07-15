#!/usr/bin/env python3
"""Upgrade remaining background components batch 2."""
import os

BG_DIR = "/home/z/my-project/src/components/cards/backgrounds"

templates = {
"BokehLightsBg": '''"use client";
import { BackgroundShell, BgContext, useIntensityOpacity, useReducedMotion } from "./BackgroundShell";
import { useContext } from "react";

export function BokehLightsBg() {
  const { dark, intensity, reduced } = useContext(BgContext);
  const op = { subtle: 0.4, normal: 0.7, vivid: 1 }[intensity];
  const playState = useReducedMotion();
  const orbs = [
    { color: "#ec4899", size: 200, top: "10%", left: "15%", dur: 18, delay: 0 },
    { color: "#8b5cf6", size: 300, top: "50%", left: "70%", dur: 22, delay: 2 },
    { color: "#06b6d4", size: 150, top: "70%", left: "25%", dur: 15, delay: 4 },
    { color: "#f59e0b", size: 250, top: "20%", left: "80%", dur: 20, delay: 1 },
    { color: "#10b981", size: 180, top: "75%", left: "65%", dur: 16, delay: 3 },
    { color: "#f43f5e", size: 120, top: "35%", left: "40%", dur: 14, delay: 5 },
    { color: "#3b82f6", size: 220, top: "55%", left: "10%", dur: 19, delay: 2.5 },
  ];
  return (
    <BackgroundShell title="Soft and dreamy" subtitle="Blurred bokeh lights floating gently. Creates a warm, premium atmosphere for lifestyle and beauty brands." accentColor="#ec4899">
      <div className="absolute inset-0" style={{ background: dark ? "linear-gradient(135deg, #1a0820, #0d1117)" : "linear-gradient(135deg, #fdf2f8, #f0f9ff)" }}>
        {orbs.map((orb, i) => (
          <div key={i} className="absolute rounded-full" style={{
            width: orb.size, height: orb.size, top: orb.top, left: orb.left,
            background: `radial-gradient(circle, ${orb.color}80, ${orb.color}20, transparent)`,
            filter: "blur(20px)", opacity: op,
            animation: `bokeh-drift-${i % 3} ${orb.dur}s ease-in-out infinite`,
            animationPlayState: playState, animationDelay: `${orb.delay}s`,
          }} />
        ))}
      </div>
      <style jsx>{`
        @keyframes bokeh-drift-0 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(60px,-40px); } }
        @keyframes bokeh-drift-1 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-50px,50px); } }
        @keyframes bokeh-drift-2 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(40px,60px); } }
      `}</style>
    </BackgroundShell>
  );
}
''',

"TopographicBg": '''"use client";
import { BackgroundShell, BgContext, useIntensityOpacity, useReducedMotion } from "./BackgroundShell";
import { useContext } from "react";

export function TopographicBg() {
  const { dark, intensity, reduced } = useContext(BgContext);
  const op = useIntensityOpacity();
  const playState = useReducedMotion();
  const paths = Array.from({ length: 15 }, (_, i) => {
    const y = 50 + i * 40;
    const variance = 30 + Math.sin(i * 0.5) * 20;
    return `M0,${y} Q200,${y - variance} 400,${y} T800,${y} T1200,${y}`;
  });
  return (
    <BackgroundShell title="Map your journey" subtitle="Topographic contour lines with subtle animation. Ideal for outdoor, mapping, and adventure brands." accentColor="#10b981">
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1200 800" style={{ background: dark ? "#0a1a0f" : "#f0fdf4" }}>
        <defs>
          <linearGradient id="topo-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity={0.6 * op} />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.2 * op} />
          </linearGradient>
        </defs>
        {paths.map((d, i) => (
          <path key={i} d={d} fill="none" stroke="url(#topo-grad)" strokeWidth="1" opacity={0.4 + (i / 30)}>
            {!reduced && <animate attributeName="d" values={`${d};${d.replace(/Q200,([^ ]+)/, (m, p) => `Q200,${parseInt(p) + 20}`)};${d}`} dur={`${10 + i * 0.5}s`} repeatCount="indefinite" playState={playState} />}
          </path>
        ))}
      </svg>
    </BackgroundShell>
  );
}
''',

"HolographicBg": '''"use client";
import { BackgroundShell, BgContext, useIntensityOpacity, useReducedMotion } from "./BackgroundShell";
import { useContext } from "react";

export function HolographicBg() {
  const { dark, intensity, reduced } = useContext(BgContext);
  const op = useIntensityOpacity();
  const playState = useReducedMotion();
  return (
    <BackgroundShell title="Iridescent and alive" subtitle="A holographic gradient that shifts through the rainbow. Eye-catching for creative and fashion brands." accentColor="#ff00ff">
      <div className="absolute inset-0" style={{ background: dark ? "#0a0a0f" : "#f0f0f0" }}>
        <div className="absolute inset-0" style={{
          background: `linear-gradient(135deg, #ff006e, #8338ec, #3a86ff, #06ffa5, #ffbe0b, #fb5607, #ff006e)`,
          backgroundSize: "400% 400%", animation: "holo-shift 8s ease infinite",
          animationPlayState: playState, filter: "blur(40px)", opacity: 0.5 * op,
        }} />
        <div className="absolute inset-0" style={{
          background: `linear-gradient(45deg, #00f5ff, #ff00ff, #ffff00, #00ff00, #00f5ff)`,
          backgroundSize: "300% 300%", animation: "holo-shift2 6s ease infinite reverse",
          animationPlayState: playState, filter: "blur(60px)", opacity: 0.4 * op, mixBlendMode: "screen",
        }} />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)",
          backgroundSize: "200% 100%", animation: "holo-sweep 5s ease-in-out infinite",
          animationPlayState: playState,
        }} />
      </div>
      <style jsx>{`
        @keyframes holo-shift { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        @keyframes holo-shift2 { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        @keyframes holo-sweep { 0%,100% { background-position: 200% 0; } 50% { background-position: 0% 0; } }
      `}</style>
    </BackgroundShell>
  );
}
''',

"VortexSpiralBg": '''"use client";
import { useEffect, useRef, useContext } from "react";
import { BackgroundShell, BgContext } from "./BackgroundShell";

export function VortexSpiralBg() {
  return (
    <BackgroundShell title="Pull them in" subtitle="A hypnotic spiral of colored particles. Creates a mesmerizing focal point for creative and entertainment sites." accentColor="#8b5cf6" darkDefault={true}>
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
    let raf = 0;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    const count = { subtle: 100, normal: 200, vivid: 300 }[intensity];
    const particles = Array.from({ length: count }, (_, i) => ({
      angle: (i / count) * Math.PI * 2 * 5, radius: 20 + (i / count) * 350,
      speed: 0.005 + (i / count) * 0.01, size: 1 + Math.random() * 3, hue: (i / count) * 360,
    }));
    const draw = () => {
      ctx.fillStyle = "rgba(10,10,15,0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2, cy = canvas.height / 2;
      for (const p of particles) {
        if (!reduced) p.angle += p.speed;
        const x = cx + Math.cos(p.angle) * p.radius;
        const y = cy + Math.sin(p.angle) * p.radius;
        ctx.beginPath(); ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 80%, 60%, 0.8)`; ctx.fill();
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

"CrystalShardsBg": '''"use client";
import { BackgroundShell, BgContext, useIntensityOpacity, useReducedMotion } from "./BackgroundShell";
import { useContext } from "react";

export function CrystalShardsBg() {
  const { dark, intensity, reduced } = useContext(BgContext);
  const op = useIntensityOpacity();
  const playState = useReducedMotion();
  const shards = Array.from({ length: 8 }, (_, i) => ({
    x: 10 + (i * 12) + Math.random() * 5, y: 15 + Math.random() * 60,
    size: 60 + Math.random() * 80, rotate: Math.random() * 360,
    dur: 15 + Math.random() * 15, delay: Math.random() * 5, hue: 180 + i * 20,
  }));
  return (
    <BackgroundShell title="Sharp and brilliant" subtitle="Rotating crystal shards with gradient fills. Adds a premium, gemstone-like quality to luxury brands." accentColor="#06b6d4">
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1200 800" style={{ background: dark ? "linear-gradient(135deg, #0a0a1a, #1a0a2a)" : "linear-gradient(135deg, #f0f4ff, #e0e7ff)" }}>
        <defs>
          {shards.map((s, i) => (
            <linearGradient key={i} id={`shard-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={`hsla(${s.hue}, 80%, 60%, ${0.4 * op})`} />
              <stop offset="100%" stopColor={`hsla(${s.hue + 60}, 80%, 40%, ${0.05 * op})`} />
            </linearGradient>
          ))}
          <filter id="shard-glow"><feGaussianBlur stdDeviation="3" /></filter>
        </defs>
        {shards.map((s, i) => (
          <polygon key={i} points={`${s.x},${s.y - s.size / 2} ${s.x + s.size / 3},${s.y} ${s.x},${s.y + s.size / 2} ${s.x - s.size / 3},${s.y}`} fill={`url(#shard-${i})`} stroke={`hsla(${s.hue}, 80%, 70%, ${0.5 * op})`} strokeWidth="1" filter="url(#shard-glow)" style={{ transformOrigin: `${s.x}px ${s.y}px`, animation: `shard-rot-${i % 2} ${s.dur}s linear infinite`, animationPlayState: playState, animationDelay: `${s.delay}s` }} />
        ))}
      </svg>
      <style jsx>{`
        @keyframes shard-rot-0 { 0% { transform: rotate(0deg) scale(1); } 50% { transform: rotate(180deg) scale(1.2); } 100% { transform: rotate(360deg) scale(1); } }
        @keyframes shard-rot-1 { 0% { transform: rotate(0deg) scale(1); } 50% { transform: rotate(-180deg) scale(0.8); } 100% { transform: rotate(-360deg) scale(1); } }
      `}</style>
    </BackgroundShell>
  );
}
''',

"LavaLampBg": '''"use client";
import { BackgroundShell, BgContext, useIntensityOpacity, useReducedMotion } from "./BackgroundShell";
import { useContext } from "react";

export function LavaLampBg() {
  const { dark, intensity, reduced } = useContext(BgContext);
  const op = useIntensityOpacity();
  const playState = useReducedMotion();
  const blobs = [
    { color: "#ff00ff", size: 180, left: "15%", dur: 8, delay: 0 },
    { color: "#ff00aa", size: 140, left: "40%", dur: 10, delay: 2 },
    { color: "#aa00ff", size: 160, left: "65%", dur: 9, delay: 1 },
    { color: "#ff0066", size: 120, left: "85%", dur: 11, delay: 3 },
  ];
  return (
    <BackgroundShell title="Groovy and smooth" subtitle="Rising lava lamp blobs with a retro feel. Playful and warm for creative and lifestyle brands." accentColor="#ff00ff">
      <div className="absolute inset-0" style={{ background: dark ? "linear-gradient(180deg, #1a0033, #330066, #1a0033)" : "linear-gradient(180deg, #fdf4ff, #fae8ff, #fdf4ff)" }}>
        {blobs.map((blob, i) => (
          <div key={i} className="absolute rounded-full" style={{
            width: blob.size, height: blob.size, left: blob.left, bottom: -100,
            background: `radial-gradient(circle at 40% 40%, ${blob.color}, ${blob.color}80, transparent)`,
            filter: "blur(8px)", opacity: op,
            animation: `lava-rise-${i} ${blob.dur}s ease-in-out infinite`,
            animationPlayState: playState, animationDelay: `${blob.delay}s`,
          }} />
        ))}
      </div>
      <style jsx>{`
        @keyframes lava-rise-0 { 0% { bottom: -20%; transform: scale(1) translateX(0); } 50% { bottom: 60%; transform: scale(1.3) translateX(30px); } 100% { bottom: -20%; transform: scale(1) translateX(0); } }
        @keyframes lava-rise-1 { 0% { bottom: -20%; transform: scale(1) translateX(0); } 50% { bottom: 70%; transform: scale(0.8) translateX(-40px); } 100% { bottom: -20%; transform: scale(1) translateX(0); } }
        @keyframes lava-rise-2 { 0% { bottom: -20%; transform: scale(1) translateX(0); } 50% { bottom: 55%; transform: scale(1.2) translateX(20px); } 100% { bottom: -20%; transform: scale(1) translateX(0); } }
        @keyframes lava-rise-3 { 0% { bottom: -20%; transform: scale(1) translateX(0); } 50% { bottom: 65%; transform: scale(1.1) translateX(-25px); } 100% { bottom: -20%; transform: scale(1) translateX(0); } }
      `}</style>
    </BackgroundShell>
  );
}
''',

"CyberGridBg": '''"use client";
import { BackgroundShell, BgContext, useIntensityOpacity, useReducedMotion } from "./BackgroundShell";
import { useContext } from "react";

export function CyberGridBg() {
  const { dark, intensity, reduced } = useContext(BgContext);
  const op = useIntensityOpacity();
  const playState = useReducedMotion();
  return (
    <BackgroundShell title="Welcome to the grid" subtitle="A retro-futuristic perspective grid with scanlines. Synthwave aesthetic for gaming and tech brands." accentColor="#00ffff" darkDefault={true}>
      <div className="absolute inset-0" style={{ background: dark ? "#0a0a0f" : "#1a1a2e" }}>
        <div className="absolute inset-0" style={{ perspective: "400px" }}>
          <div className="absolute inset-x-0 bottom-0 h-1/2" style={{
            backgroundImage: `linear-gradient(rgba(0,255,255,${0.3 * op}) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,${0.3 * op}) 1px, transparent 1px)`,
            backgroundSize: "40px 40px", transform: "rotateX(60deg)", transformOrigin: "bottom",
            animation: "cyber-scroll 3s linear infinite", animationPlayState: playState,
          }} />
        </div>
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2" style={{ width: 300, height: 300, background: "radial-gradient(circle, rgba(255,0,128,0.4), rgba(255,0,255,0.2), transparent)", borderRadius: "50%", filter: "blur(30px)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,255,0.03) 2px, rgba(0,255,255,0.03) 4px)" }} />
      </div>
      <style jsx>{`@keyframes cyber-scroll { 0% { background-position: 0 0; } 100% { background-position: 0 40px; } }`}</style>
    </BackgroundShell>
  );
}
''',

"OrigamiFoldsBg": '''"use client";
import { BackgroundShell, BgContext, useIntensityOpacity, useReducedMotion } from "./BackgroundShell";
import { useContext } from "react";

export function OrigamiFoldsBg() {
  const { dark, intensity, reduced } = useContext(BgContext);
  const op = useIntensityOpacity();
  const playState = useReducedMotion();
  const planes = Array.from({ length: 12 }, (_, i) => ({
    x: Math.random() * 100, y: Math.random() * 100, size: 30 + Math.random() * 40,
    rotate: Math.random() * 360, dur: 15 + Math.random() * 20, delay: Math.random() * 5,
    color: ["#8b5cf6", "#ec4899", "#06b6d4", "#f59e0b", "#10b981"][i % 5],
  }));
  return (
    <BackgroundShell title="Folded with care" subtitle="Floating origami paper planes in 3D space. Light, airy, and creative for design and education brands." accentColor="#8b5cf6" darkDefault={false}>
      <div className="absolute inset-0" style={{ background: dark ? "linear-gradient(135deg, #1e1b4b, #0f172a)" : "linear-gradient(135deg, #f0f4ff, #e0e7ff, #f0fdfa)" }}>
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1200 800">
          <defs>
            {planes.map((p, i) => (
              <linearGradient key={i} id={`origami-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={p.color} stopOpacity={0.8 * op} />
                <stop offset="100%" stopColor={p.color} stopOpacity={0.2 * op} />
              </linearGradient>
            ))}
          </defs>
          {planes.map((p, i) => (
            <g key={i} style={{ transform: `translate(${p.x * 12}px, ${p.y * 8}px)`, animation: `origami-float-${i % 3} ${p.dur}s ease-in-out infinite`, animationPlayState: playState, animationDelay: `${p.delay}s` }}>
              <g style={{ transform: `rotate(${p.rotate}deg)`, transformOrigin: "center" }}>
                <polygon points={`0,0 ${p.size},${p.size / 3} 0,${p.size / 2} ${p.size / 4},${p.size / 4}`} fill={`url(#origami-${i})`} stroke={p.color} strokeWidth="0.5" opacity={0.7 * op} />
              </g>
            </g>
          ))}
        </svg>
        <style jsx>{`
          @keyframes origami-float-0 { 0%,100% { transform: translate(0,0) rotate(0deg); } 50% { transform: translate(40px,-30px) rotate(10deg); } }
          @keyframes origami-float-1 { 0%,100% { transform: translate(0,0) rotate(0deg); } 50% { transform: translate(-30px,40px) rotate(-8deg); } }
          @keyframes origami-float-2 { 0%,100% { transform: translate(0,0) rotate(0deg); } 50% { transform: translate(20px,30px) rotate(5deg); } }
        `}</style>
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
