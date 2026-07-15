"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Loader2, Users, Mail, Twitter, Linkedin, Github, Rss } from "lucide-react";

// ════════════════════════════════════════════════════════════════════════════
// Footer 016 — Pulse (Newsletter-focused)
// Dark + huge email input + subscriber counter + animated waveform bg
// ════════════════════════════════════════════════════════════════════════════

const NAV: { title: string; links: string[] }[] = [
  { title: "Read", links: ["Latest Issue", "Archive", "Categories", "Series", "Tags"] },
  { title: "About", links: ["Our Mission", "Editorial Team", "Press Kit", "Careers", "Contact"] },
  { title: "Subscribe", links: ["Free Plan", "Pro Plan", "Team Plan", "Gift a Subscription", "Student Discount"] },
];

export function Footer016Card() {
  return (
    <footer
      className="relative overflow-hidden text-white"
      style={{
        background: "linear-gradient(180deg, #0a0a0a 0%, #050505 100%)",
        fontFamily: "var(--font-inter-tight), system-ui, sans-serif",
      }}
    >
      <WaveformBg />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-12">
        {/* Hero: subscribe band */}
        <div className="py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            {/* Subscriber counter */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8" style={{ background: "rgba(132,204,22,0.1)", border: "1px solid rgba(132,204,22,0.3)" }}>
              <Users className="w-3.5 h-3.5" style={{ color: "#84cc16" }} />
              <span className="text-xs font-medium" style={{ color: "#84cc16", fontFamily: "var(--font-jetbrains), monospace" }}>
                <SubscriberCounter /> readers and counting
              </span>
            </div>

            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.02] max-w-3xl mx-auto mb-5" style={{ letterSpacing: "-0.04em" }}>
              Get the pulse of<br />
              <span style={{ background: "linear-gradient(135deg, #84cc16 0%, #facc15 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                what matters.
              </span>
            </h2>
            <p className="text-lg text-white/60 max-w-xl mx-auto mb-10">
              One email. Every Tuesday. The week's most important ideas in tech, design, and culture — distilled into a 7-minute read.
            </p>

            <BigSubscribeForm />
          </motion.div>
        </div>

        {/* Main grid */}
        <div className="py-14 grid grid-cols-2 md:grid-cols-5 gap-10 border-t border-white/10">
          {/* Brand */}
          <div className="col-span-2">
            <a href="#" onClick={(e) => e.preventDefault()} className="inline-flex items-center gap-2 mb-5">
              <PulseLogo />
              <span className="text-2xl font-bold tracking-tight">Pulse</span>
            </a>
            <p className="text-sm text-white/60 mb-6 max-w-xs leading-relaxed">
              A weekly newsletter for curious minds. Read by founders, designers, and builders at companies you've heard of.
            </p>
            <div className="space-y-2 text-sm">
              <a href="mailto:hello@pulse.email" className="inline-flex items-center gap-2 text-white/70 hover:text-lime-400 transition-colors">
                <Mail className="w-4 h-4" /> hello@pulse.email
              </a>
              <div className="flex items-center gap-2 text-white/70">
                <Rss className="w-4 h-4" /> RSS · /feed.xml
              </div>
            </div>
          </div>

          {/* Link columns */}
          {NAV.map((col, ci) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: ci * 0.08 }}
            >
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40 mb-4" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="group inline-flex items-center gap-1 text-sm text-white/70 hover:text-lime-400 transition-colors"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-lime-400 transition-all duration-300 mr-0 group-hover:mr-1.5" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="py-7 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
            © {new Date().getFullYear()} Pulse Media. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {[Twitter, Linkedin, Github, Rss].map((Icon, i) => (
              <a
                key={i}
                href="#"
                onClick={(e) => e.preventDefault()}
                className="w-9 h-9 rounded-full flex items-center justify-center text-white/60 hover:text-lime-400 transition-all hover:scale-110"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── Subscriber counter (animated count) ────────────────────────────────────
function SubscriberCounter() {
  const [count, setCount] = useState(47000);
  const target = 47823;
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((c) => {
        if (c >= target) return c;
        const inc = Math.max(1, Math.ceil((target - c) / 30));
        return Math.min(target, c + inc);
      });
    }, 60);
    return () => clearInterval(interval);
  }, []);
  return <span>{count.toLocaleString()}</span>;
}

// ── Big subscribe form with states ─────────────────────────────────────────
function BigSubscribeForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("success");
    setTimeout(() => { setStatus("idle"); setEmail(""); }, 4000);
  };
  return (
    <form onSubmit={submit} className="max-w-lg mx-auto">
      <div className="flex flex-col sm:flex-row gap-2 p-2 rounded-2xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(10px)" }}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          disabled={status !== "idle"}
          className="flex-1 h-12 px-4 text-base bg-transparent outline-none text-white placeholder:text-white/40 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={status !== "idle"}
          className="h-12 px-6 rounded-xl font-semibold text-sm transition-all hover:scale-105 disabled:opacity-70 inline-flex items-center justify-center gap-2 whitespace-nowrap"
          style={{ background: "linear-gradient(135deg, #84cc16 0%, #65a30d 100%)", color: "#0a0a0a" }}
        >
          {status === "loading" ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Subscribing...</>
          ) : status === "success" ? (
            <><Check className="w-4 h-4" /> Subscribed!</>
          ) : (
            <>Subscribe free <ArrowRight className="w-4 h-4" /></>
          )}
        </button>
      </div>
      <p className="mt-3 text-xs text-white/40">
        Free forever. Unsubscribe in one click. No spam, ever.
      </p>
    </form>
  );
}

// ── Animated waveform background ───────────────────────────────────────────
function WaveformBg() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    let t = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const bars = 80;
      const barWidth = rect.width / bars;
      for (let i = 0; i < bars; i++) {
        const wave = Math.sin(i * 0.2 + t) * 0.5 + Math.sin(i * 0.5 + t * 1.5) * 0.3 + Math.sin(i * 0.1 - t * 0.7) * 0.2;
        const amp = Math.abs(wave) * 60 + 8;
        const x = i * barWidth;
        const yCenter = rect.height / 2;

        const alpha = 0.05 + Math.abs(wave) * 0.15;
        ctx.fillStyle = `rgba(132, 204, 22, ${alpha})`;
        ctx.fillRect(x + 1, yCenter - amp / 2, barWidth - 2, amp);

        // Mirror
        ctx.fillStyle = `rgba(250, 204, 21, ${alpha * 0.5})`;
        ctx.fillRect(x + 1, yCenter + amp / 2, barWidth - 2, amp * 0.4);
      }

      t += 0.04;
      raf = requestAnimationFrame(render);
    };
    render();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none opacity-40" />;
}

// ── Pulse logo — waveform glyph ────────────────────────────────────────────
function PulseLogo() {
  return (
    <svg viewBox="0 0 64 64" className="w-9 h-9" aria-hidden="true">
      <defs>
        <linearGradient id="pls-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#84cc16" />
          <stop offset="50%" stopColor="#facc15" />
          <stop offset="100%" stopColor="#84cc16" />
        </linearGradient>
      </defs>
      <rect x="6" y="28" width="4" height="8" rx="2" fill="url(#pls-grad)" />
      <rect x="14" y="20" width="4" height="24" rx="2" fill="url(#pls-grad)" />
      <rect x="22" y="14" width="4" height="36" rx="2" fill="url(#pls-grad)" />
      <rect x="30" y="6" width="4" height="52" rx="2" fill="url(#pls-grad)" />
      <rect x="38" y="14" width="4" height="36" rx="2" fill="url(#pls-grad)" />
      <rect x="46" y="20" width="4" height="24" rx="2" fill="url(#pls-grad)" />
      <rect x="54" y="28" width="4" height="8" rx="2" fill="url(#pls-grad)" />
    </svg>
  );
}
