"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Volume2, VolumeX } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

// VoiceAudioCard — 3 unique voice/audio button interactions:
// 1. Hold-to-talk — hold the mic, animated sound waves radiate while held
// 2. Mute toggle — speaker icon morphs (volume bars animate) on toggle
// 3. Volume slider button — click to expand a slider, drag to adjust

export function VoiceAudioCard() {
  return (
    <motion.div className="w-[clamp(280px,88vw,380px)] select-none" initial={{ opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.7, ease: EASE }}>
      <div aria-hidden className="pointer-events-none absolute -inset-8 -z-10 rounded-[40px] blur-3xl" style={{ background: "radial-gradient(circle at 30% 20%, rgba(168,85,247,0.08), transparent 55%)" }} />
      <div className="cs-surface overflow-hidden rounded-[22px] border cs-border shadow-[0_30px_70px_-35px_rgba(0,0,0,0.25)]">
        <div className="border-b cs-border px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-500/10 ring-1 ring-violet-500/20"><Mic className="h-3.5 w-3.5 text-violet-600 dark:text-violet-400" strokeWidth={2.2} /></div>
            <div><h2 className="text-[14px] font-bold tracking-tight cs-text">Voice & Audio</h2><p className="text-[10.5px] cs-muted">Hold-to-talk · mute morph · volume slider</p></div>
          </div>
        </div>
        <div className="space-y-7 p-5">
          <HoldToTalkButton />
          <MuteToggleButton />
          <VolumeSliderButton />
        </div>
        <div className="border-t cs-border px-5 py-2.5 text-center"><p className="text-[9.5px] cs-subtle">Hold the mic · toggle mute · expand volume</p></div>
      </div>
    </motion.div>
  );
}

function HoldToTalkButton() {
  const [holding, setHolding] = useState(false);
  return (
    <div>
      <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider cs-subtle">1 · Hold to Talk</label>
      <div className="flex items-center justify-center py-2">
        <motion.button type="button" onMouseDown={() => setHolding(true)} onMouseUp={() => setHolding(false)} onMouseLeave={() => setHolding(false)} onTouchStart={() => setHolding(true)} onTouchEnd={() => setHolding(false)} whileTap={{ scale: 0.95 }} className="relative flex h-14 w-14 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/40" style={{ background: holding ? "#7c3aed" : "#1e293b" }}>
          {/* Radiating sound waves while held */}
          <AnimatePresence>
            {holding && [0, 1, 2].map(i => (
              <motion.span key={i} className="absolute inset-0 rounded-full border-2 border-violet-400" initial={{ scale: 1, opacity: 0.6 }} animate={{ scale: 1.8, opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.3, ease: "easeOut" }} />
            ))}
          </AnimatePresence>
          <Mic className="relative z-10 h-5 w-5 text-white" strokeWidth={2} />
        </motion.button>
      </div>
      <p className="text-center text-[10px] cs-subtle">{holding ? "Recording…" : "Hold to talk"}</p>
    </div>
  );
}

function MuteToggleButton() {
  const [muted, setMuted] = useState(false);
  return (
    <div>
      <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider cs-subtle">2 · Mute Toggle</label>
      <div className="flex items-center justify-center py-1">
        <motion.button type="button" onClick={() => setMuted(m => !m)} whileTap={{ scale: 0.92 }} className="flex items-center gap-2.5 rounded-xl border cs-border cs-surface px-5 py-2.5 text-[12.5px] font-semibold cs-text transition cs-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/40">
          <AnimatePresence mode="wait">
            {muted ? (
              <motion.span key="muted" initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: 90 }} transition={{ duration: 0.2 }}><VolumeX className="h-5 w-5 text-rose-500" strokeWidth={2} /></motion.span>
            ) : (
              <motion.span key="on" initial={{ scale: 0, rotate: 90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: -90 }} transition={{ duration: 0.2 }}>
                <span className="flex items-end gap-0.5">
                  <Volume2 className="h-5 w-5 text-violet-600 dark:text-violet-400" strokeWidth={2} />
                  <motion.span className="flex gap-0.5" animate={{ height: [6, 12, 6] }} transition={{ duration: 0.8, repeat: Infinity }}>
                    <span className="w-0.5 rounded-full bg-violet-500" style={{ height: "4px" }} />
                    <span className="w-0.5 rounded-full bg-violet-500" style={{ height: "8px" }} />
                    <span className="w-0.5 rounded-full bg-violet-500" style={{ height: "6px" }} />
                  </motion.span>
                </span>
              </motion.span>
            )}
          </AnimatePresence>
          {muted ? "Unmute" : "Mute"}
        </motion.button>
      </div>
    </div>
  );
}

function VolumeSliderButton() {
  const [expanded, setExpanded] = useState(false);
  const [volume, setVolume] = useState(60);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const pct = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    setVolume(Math.round(pct));
  };

  return (
    <div>
      <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider cs-subtle">3 · Volume Slider</label>
      <div className="flex items-center justify-center py-1">
        <motion.div layout className="flex items-center gap-2 rounded-xl border cs-border cs-surface p-1" style={{ overflow: "hidden" }}>
          <motion.button type="button" onClick={() => setExpanded(e => !e)} whileTap={{ scale: 0.92 }} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg cs-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/40">
            <Volume2 className="h-4 w-4 cs-text" strokeWidth={2.2} />
          </motion.button>
          <AnimatePresence>
            {expanded && (
              <motion.div ref={sliderRef} initial={{ width: 0, opacity: 0 }} animate={{ width: 120, opacity: 1 }} exit={{ width: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="relative flex h-9 cursor-pointer items-center" onMouseMove={(e) => { if (e.buttons === 1) handleMove(e); }} onClick={handleMove}>
                <div className="relative h-1.5 w-full rounded-full" style={{ background: "var(--card-border)" }}>
                  <div className="absolute inset-y-0 left-0 rounded-full bg-violet-500" style={{ width: `${volume}%` }} />
                  <div className="absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full border-2 border-violet-500 bg-white shadow-sm" style={{ left: `calc(${volume}% - 7px)` }} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {expanded && <span className="w-8 text-center text-[11px] font-semibold cs-muted tabular-nums">{volume}</span>}
        </motion.div>
      </div>
    </div>
  );
}
