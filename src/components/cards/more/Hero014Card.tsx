"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Terminal, ArrowRight, Github, Star } from "lucide-react";
const ACCENT = "#238636";
const TERMINAL_LINES = [
  { type: "command", text: "$ npx create-stacktrace-app my-project" },
  { type: "output", text: "⠋ Installing dependencies..." },
  { type: "output", text: "✓ Created project structure" },
  { type: "output", text: "✓ Installed 247 packages" },
  { type: "output", text: "✓ Setup complete in 8.2s" },
  { type: "command", text: "$ cd my-project && npm run dev" },
  { type: "output", text: "  Stacktrace v3.2.1" },
  { type: "output", text: "  → Local:   http://localhost:3000" },
  { type: "output", text: "  → Ready in 1.4s" },
  { type: "success", text: "✓ Your app is running!" },
];
export function Hero014Card() {
  const [mounted, setMounted] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const terminalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);
  useEffect(() => {
    if (!mounted) return;
    if (visibleLines >= TERMINAL_LINES.length) { const blink = setInterval(() => setShowCursor((v) => !v), 500); return () => clearInterval(blink); }
    const delay = TERMINAL_LINES[visibleLines]?.type === "command" ? 800 : 350;
    const timer = setTimeout(() => setVisibleLines((v) => v + 1), delay);
    return () => clearTimeout(timer);
  }, [visibleLines, mounted]);
  useEffect(() => { if (terminalRef.current) terminalRef.current.scrollTop = terminalRef.current.scrollHeight; }, [visibleLines]);
  return (
    <div className="relative min-h-full bg-[#0d1117] text-white overflow-hidden flex flex-col items-center justify-center py-20 px-6">
      <style>{`@keyframes hero014-fall { 0% { transform: translateY(-100%); opacity: 0; } 10% { opacity: 0.15; } 90% { opacity: 0.15; } 100% { transform: translateY(100vh); opacity: 0; } } .hero014-cursor { animation: hero014-cursor 1s steps(1) infinite; } @keyframes hero014-cursor { 0%,49% { opacity:1; } 50%,100% { opacity:0; } }`}</style>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (<div key={i} className="absolute top-0 font-mono text-[10px] text-green-500/10 whitespace-nowrap" style={{ left: `${(i * 5.2)}%`, animation: `hero014-fall ${15 + (i % 5) * 3}s linear infinite`, animationDelay: `${i * 1.7}s` }}>{Array.from({ length: 15 }).map((_, j) => (<div key={j}>{["01","10","const","npm","{}","=>","git","___","0x","fn"][j % 10]}</div>))}</div>))}
      </div>
      <div className="relative z-10 text-center max-w-3xl mb-10">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 10 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-white/60 mb-6"><Terminal className="w-3.5 h-3.5" style={{ color: ACCENT }} />Open source · MIT licensed</motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }} transition={{ duration: 0.7, delay: 0.1 }} className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] mb-4">Ship code<br /><span style={{ color: ACCENT }}>faster</span> than ever</motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }} transition={{ duration: 0.7, delay: 0.2 }} className="text-base md:text-lg text-white/40 max-w-xl mx-auto mb-8">The developer-first framework with zero config, instant deploys, and edge-rendered by default.</motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }} transition={{ duration: 0.7, delay: 0.3 }} className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href="#" onClick={(e) => e.preventDefault()} className="inline-flex items-center gap-2 h-12 px-6 rounded-xl text-white text-sm font-semibold transition-all hover:scale-105" style={{ background: ACCENT, boxShadow: `0 8px 32px ${ACCENT}40` }}>Get started<ArrowRight className="w-4 h-4" /></a>
          <a href="#" onClick={(e) => e.preventDefault()} className="inline-flex items-center gap-2 h-12 px-6 rounded-xl border border-white/15 text-white/80 text-sm font-semibold hover:bg-white/5 transition-colors"><Github className="w-4 h-4" /><span>Star on GitHub</span><span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10 text-xs"><Star className="w-3 h-3 fill-amber-400 text-amber-400" />24.8k</span></a>
        </motion.div>
      </div>
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 40 }} transition={{ duration: 0.8, delay: 0.4 }} className="relative z-10 w-full max-w-2xl">
        <div className="rounded-xl border border-white/10 bg-[#161b22] overflow-hidden" style={{ boxShadow: "0 24px 80px rgba(0,0,0,0.5)" }}>
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5"><div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#ff5f56]" /><span className="w-3 h-3 rounded-full bg-[#ffbd2e]" /><span className="w-3 h-3 rounded-full bg-[#27c93f]" /></div><span className="text-xs text-white/30 font-mono">bash — stacktrace — 80×24</span><div className="w-12" /></div>
          <div ref={terminalRef} className="p-4 h-64 overflow-y-auto font-mono text-sm leading-relaxed" style={{ scrollbarWidth: "none" }}>
            {TERMINAL_LINES.slice(0, visibleLines).map((line, i) => (<div key={i} className={line.type === "command" ? "text-white" : line.type === "success" ? "text-emerald-400" : "text-white/50"}>{line.text}</div>))}
            {visibleLines >= TERMINAL_LINES.length && (<div className="text-white">$ <span className="hero014-cursor">▋</span></div>)}
            {visibleLines < TERMINAL_LINES.length && (<div className="text-white/30"><span className="hero014-cursor">▋</span></div>)}
          </div>
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: mounted ? 1 : 0 }} transition={{ duration: 0.6, delay: 0.6 }} className="relative z-10 mt-10 flex items-center gap-8 text-center">{[{ value: "24.8K", label: "GitHub stars" }, { value: "1.4s", label: "Avg build time" }, { value: "247", label: "Contributors" }].map((stat) => (<div key={stat.label}><p className="text-2xl font-bold text-white">{stat.value}</p><p className="text-xs text-white/40 mt-0.5">{stat.label}</p></div>))}</motion.div>
    </div>
  );
}
