"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Star, GitFork, Terminal, Book, Code2, Bug, ChevronRight, Github, Twitter, MessageSquare, Zap } from "lucide-react";

// ════════════════════════════════════════════════════════════════════════════
// Footer 009 — devkit (Developer Tools)
// True black + terminal/ASCII aesthetic + CRT scanlines + animated typing
// ════════════════════════════════════════════════════════════════════════════

const LINKS: { title: string; links: { name: string; cmd?: string }[] }[] = [
  {
    title: "CLI",
    links: [
      { name: "Installation", cmd: "brew install devkit" },
      { name: "Quick Start", cmd: "dk init" },
      { name: "Reference", cmd: "dk --help" },
      { name: "Plugins", cmd: "dk plugin add" },
      { name: "Recipes", cmd: "dk run" },
    ],
  },
  {
    title: "SDKs",
    links: [
      { name: "TypeScript", cmd: "npm i @devkit" },
      { name: "Python", cmd: "pip install devkit" },
      { name: "Go", cmd: "go get devkit" },
      { name: "Rust", cmd: "cargo add devkit" },
      { name: "Ruby", cmd: "gem install devkit" },
    ],
  },
  {
    title: "Community",
    links: [
      { name: "GitHub Issues" },
      { name: "Discussions" },
      { name: "Discord", cmd: "12k online" },
      { name: "Stack Overflow" },
      { name: "Contributing" },
    ],
  },
];

const ASCII_LOGO = [
  "  ____  _  _        _  _  _    _  _  _ ",
  " |  _ \\| || |   ___| || || |  | || || |",
  " | | | | || |_ / __| || || |  | || || |",
  " |_| |_| ||___|\\__ \\_   _| |  |_   _|",
  " |____/|_||_|  |___/ |_| |_|    |_|   ",
];

export function Footer009Card() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: "#000000",
        color: "#e2e8f0",
        fontFamily: "var(--font-jetbrains), ui-monospace, monospace",
      }}
    >
      {/* CRT scanlines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,0,0.03) 2px, rgba(0,255,0,0.03) 3px)",
        }}
      />
      {/* Green phosphor glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at top, rgba(34,197,94,0.08) 0%, transparent 60%)" }} />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-12">
        {/* ASCII art logo + terminal prompt */}
        <div className="py-16 border-b border-white/10">
          <pre className="text-[10px] md:text-xs leading-tight mb-6 hidden md:block" style={{ color: "#22c55e", textShadow: "0 0 8px rgba(34,197,94,0.5)" }}>
{ASCII_LOGO.join("\n")}
          </pre>
          <TerminalPrompt />
        </div>

        {/* Stats bar */}
        <div className="py-8 grid grid-cols-2 md:grid-cols-4 gap-4 border-b border-white/10">
          {[
            { icon: Star, label: "GitHub stars", value: "48.2k" },
            { icon: GitFork, label: "Forks", value: "3.1k" },
            { icon: Code2, label: "Contributors", value: "287" },
            { icon: Zap, label: "Latest release", value: "v4.1.0" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="p-4 rounded-lg"
              style={{ background: "rgba(34,197,94,0.04)", border: "1px solid rgba(34,197,94,0.15)" }}
            >
              <s.icon className="w-4 h-4 mb-2" style={{ color: "#22c55e" }} />
              <div className="text-2xl font-bold text-white">{s.value}</div>
              <div className="text-xs text-white/40 uppercase tracking-wider">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Main grid */}
        <div className="py-14 grid grid-cols-2 md:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold text-white">devkit</span>
              <span className="px-2 py-0.5 rounded text-[10px]" style={{ background: "rgba(34,197,94,0.15)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.3)" }}>v4.1.0</span>
            </div>
            <p className="text-sm text-white/60 mb-6 max-w-xs leading-relaxed">
              The unified toolkit for building, testing, and shipping software faster. Open source. Self-hosted. Yours.
            </p>
            {/* Install command */}
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-xs mb-6 w-full max-w-xs" style={{ background: "#0a0a0a", border: "1px solid rgba(34,197,94,0.25)" }}>
              <Terminal className="w-3.5 h-3.5" style={{ color: "#22c55e" }} />
              <code className="flex-1 text-white/80">$ curl -fsSL devkit.sh | sh</code>
              <button className="text-white/40 hover:text-white transition-colors text-[10px] uppercase tracking-wider">copy</button>
            </div>
            {/* Socials */}
            <div className="flex gap-2">
              {[
                { icon: Github, label: "GitHub" },
                { icon: Twitter, label: "Twitter" },
                { icon: MessageSquare, label: "Discord" },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  aria-label={s.label}
                  className="w-10 h-10 rounded-md flex items-center justify-center text-white/60 transition-all hover:scale-110"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(34,197,94,0.1)"; e.currentTarget.style.color = "#22c55e"; e.currentTarget.style.borderColor = "rgba(34,197,94,0.4)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns as terminal-style lists */}
          {LINKS.map((col, ci) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: ci * 0.08 }}
            >
              <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/40 mb-4 flex items-center gap-1.5">
                <ChevronRight className="w-3 h-3" style={{ color: "#22c55e" }} />
                {col.title}/
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="group flex flex-col"
                    >
                      <span className="text-sm text-white/80 group-hover:text-emerald-400 transition-colors inline-flex items-center gap-1.5">
                        <span className="opacity-50 group-hover:opacity-100 transition-opacity">›</span>
                        {link.name}
                      </span>
                      {link.cmd && (
                        <code className="text-[10px] text-white/30 group-hover:text-white/50 transition-colors pl-3">{link.cmd}</code>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="py-7 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40 flex items-center gap-3 flex-wrap justify-center">
            <span>$ <span style={{ color: "#22c55e" }}>devkit</span> --license</span>
            <span className="text-white/60">MIT © 2024 devkit org</span>
            <span className="inline-flex items-center gap-1" style={{ color: "#22c55e" }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#22c55e" }} />
              build: passing
            </span>
          </p>
          <div className="flex items-center gap-5 text-xs text-white/40">
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1"><Bug className="w-3 h-3" /> Report Bug</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1"><Book className="w-3 h-3" /> Docs</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-emerald-400 transition-colors">Changelog</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── Animated terminal prompt ───────────────────────────────────────────────
function TerminalPrompt() {
  const [typed, setTyped] = useState("");
  const full = "devkit init --template next --ts --tailwind --deploy";
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      if (i <= full.length) {
        setTyped(full.slice(0, i));
        i++;
      } else {
        clearInterval(t);
      }
    }, 50);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="rounded-lg p-4 max-w-2xl" style={{ background: "#0a0a0a", border: "1px solid rgba(34,197,94,0.2)", boxShadow: "0 0 40px -10px rgba(34,197,94,0.15)" }}>
      <div className="flex items-center gap-1.5 mb-3 pb-3 border-b border-white/5">
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#ef4444" }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#eab308" }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#22c55e" }} />
        <span className="ml-2 text-[10px] text-white/40">~/projects/my-app — zsh</span>
      </div>
      <div className="text-sm">
        <span style={{ color: "#22c55e" }}>$</span> <span className="text-white/80">{typed}</span>
        <span className="inline-block w-2 h-4 ml-1 align-middle animate-pulse" style={{ background: "#22c55e" }} />
      </div>
      {typed === full && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="mt-2 text-xs text-white/40"
        >
          <span style={{ color: "#22c55e" }}>✓</span> Project initialized. Run <code className="text-emerald-400">cd my-app && devkit dev</code>
        </motion.div>
      )}
    </div>
  );
}
