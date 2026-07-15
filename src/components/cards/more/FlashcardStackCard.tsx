"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Check, Flame, RotateCcw, Sparkles, Zap } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

const SERIF = 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif';

// FlashcardStackCard — premium learning deck.
// Ivory + bronze palette with serif headings. Progress bar of reviewed/total,
// due-cards count, difficulty badges, study streak with flame, peek-out fan
// of the deck on hover, a Start review CTA, and flip-to-reveal inside the
// study view. Realistic content: Spanish vocabulary.

interface Card {
  id: number;
  front: string;
  back: string;
  hint: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

const DECK: Card[] = [
  { id: 1, front: "mercer", back: "to deserve / earn", hint: "verb", difficulty: "Medium" },
  { id: 2, front: "umbral", back: "threshold", hint: "noun · masc.", difficulty: "Hard" },
  { id: 3, front: "efímero", back: "ephemeral", hint: "adjective", difficulty: "Hard" },
  { id: 4, front: "bruma", back: "mist / haze", hint: "noun · fem.", difficulty: "Easy" },
  { id: 5, front: "olido", back: "smell (noun)", hint: "noun · masc.", difficulty: "Medium" },
];

const DIFF_TONE = {
  Easy: "text-emerald-700 dark:text-emerald-300 border-emerald-500/30 bg-emerald-500/10",
  Medium: "text-amber-700 dark:text-amber-300 border-amber-500/30 bg-amber-500/10",
  Hard: "text-rose-700 dark:text-rose-300 border-rose-500/30 bg-rose-500/10",
} as const;

export function FlashcardStackCard() {
  const [reviewing, setReviewing] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [idx, setIdx] = useState(0);
  const [reviewed, setReviewed] = useState(0);

  const start = () => {
    setReviewing(true);
    setIdx(0);
    setFlipped(false);
    setReviewed(0);
  };
  const exit = () => {
    setReviewing(false);
    setFlipped(false);
  };
  const next = () => {
    setReviewed((r) => r + 1);
    setFlipped(false);
    setIdx((i) => (i + 1) % DECK.length);
  };

  const total = DECK.length;
  const due = total - reviewed;

  return (
    <motion.div
      className="w-[clamp(280px,90vw,380px)] select-none"
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      {/* Ambient bronze glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-10 -z-10 rounded-[40px] blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 28% 16%, rgba(180,135,81,0.22), transparent 55%), radial-gradient(circle at 80% 88%, rgba(120,93,68,0.16), transparent 60%)",
        }}
      />

      <article className="cs-surface overflow-hidden rounded-[22px] border cs-border shadow-[0_30px_70px_-35px_rgba(74,58,42,0.4)]">
        <AnimatePresence mode="wait">
          {reviewing ? (
            <StudyView
              key="study"
              card={DECK[idx]}
              idx={idx}
              total={total}
              flipped={flipped}
              onFlip={() => setFlipped((f) => !f)}
              onNext={next}
              onExit={exit}
            />
          ) : (
            <DeckView
              key="deck"
              total={total}
              due={due}
              streak={12}
              onStart={start}
            />
          )}
        </AnimatePresence>
      </article>
    </motion.div>
  );
}

function DeckView({
  total,
  due,
  streak,
  onStart,
}: {
  total: number;
  due: number;
  streak: number;
  onStart: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  // peek fan positions for the 3 top cards
  const FAN = [
    { x: -54, r: -8, y: 6 },
    { x: 0, r: 0, y: 0 },
    { x: 54, r: 8, y: 6 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.3, ease: EASE }}
    >
      {/* Header */}
      <header className="flex items-center justify-between px-6 pb-3 pt-5">
        <div>
          <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-700 dark:text-amber-300">
            <Brain className="h-3 w-3" strokeWidth={2.4} />
            Spanish · B2
          </p>
          <h2 className="mt-1 text-[20px] font-bold leading-tight cs-text" style={{ fontFamily: SERIF }}>
            Evening Vocabulary
          </h2>
        </div>
        <span className="flex items-center gap-1 rounded-full border border-orange-400/40 bg-orange-50 px-2 py-1 text-[10px] font-bold text-orange-700 dark:border-orange-500/30 dark:bg-orange-500/10 dark:text-orange-300">
          <Flame className="h-3 w-3 fill-orange-500 text-orange-500" strokeWidth={1.8} />
          {streak}d streak
        </span>
      </header>

      {/* Stats row */}
      <div className="grid grid-cols-3 divide-x cs-border mx-6 mb-4 rounded-xl border bg-amber-50/40 dark:bg-amber-500/5">
        <Stat label="Due" value={String(due)} tone="text-amber-700 dark:text-amber-300" />
        <Stat label="New" value="3" tone="cs-text" />
        <Stat label="Total" value={String(total)} tone="cs-text" />
      </div>

      {/* Deck fan */}
      <div
        className="relative mx-auto h-[150px] w-full"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {[2, 1, 0].map((layer) => {
          const pos = FAN[layer];
          return (
            <motion.div
              key={layer}
              className="absolute left-1/2 top-1/2 h-[110px] w-[190px] rounded-xl border border-amber-900/15 bg-amber-50 shadow-md dark:border-amber-100/10 dark:bg-stone-800"
              animate={{
                x: hovered ? pos.x - 95 : -95,
                y: hovered ? pos.y - 55 : -55 + layer * 6,
                rotate: hovered ? pos.r : 0,
                scale: 1 - layer * 0.04,
                opacity: layer === 2 ? 0.55 : 1,
                zIndex: 3 - layer,
              }}
              transition={{ duration: 0.5, ease: EASE, delay: layer * 0.04 }}
            >
              <div className="flex h-full flex-col items-center justify-center gap-1 px-3 text-center">
                <Sparkles className="h-3.5 w-3.5 text-amber-600 dark:text-amber-300" strokeWidth={2} />
                <span className="text-[15px] font-bold cs-text" style={{ fontFamily: SERIF }}>
                  {DECK[layer].front}
                </span>
                <span
                  className={`rounded-full border px-2 py-0.5 text-[8.5px] font-bold uppercase tracking-wider ${DIFF_TONE[DECK[layer].difficulty]}`}
                >
                  {DECK[layer].difficulty}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Progress */}
      <div className="px-6 pb-3">
        <div className="mb-1 flex items-center justify-between text-[10.5px]">
          <span className="font-medium cs-muted">Session progress</span>
          <span className="font-bold cs-text">0 / {total}</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-amber-900/10 dark:bg-amber-100/10">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500"
            initial={{ width: "0%" }}
            animate={{ width: "8%" }}
            transition={{ duration: 0.8, ease: EASE }}
          />
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 pb-5">
        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={onStart}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-stone-900 py-3 text-[13px] font-semibold text-amber-50 transition hover:bg-stone-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40 dark:bg-amber-100 dark:text-stone-900 dark:hover:bg-white"
        >
          <Zap className="h-4 w-4" strokeWidth={2.4} />
          Start review ({due} due)
        </motion.button>
      </div>
    </motion.div>
  );
}

function StudyView({
  card,
  idx,
  total,
  flipped,
  onFlip,
  onNext,
  onExit,
}: {
  card: Card;
  idx: number;
  total: number;
  flipped: boolean;
  onFlip: () => void;
  onNext: () => void;
  onExit: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3, ease: EASE }}
    >
      {/* progress + exit */}
      <header className="flex items-center justify-between px-6 pb-3 pt-5">
        <motion.button
          type="button"
          whileTap={{ scale: 0.95 }}
          onClick={onExit}
          aria-label="Exit review"
          className="flex items-center gap-1 text-[11px] font-medium cs-muted transition hover:cs-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40"
        >
          <RotateCcw className="h-3.5 w-3.5" strokeWidth={2.2} />
          Exit
        </motion.button>
        <span className="text-[11px] font-bold cs-text">
          {idx + 1} <span className="cs-subtle">/ {total}</span>
        </span>
      </header>

      {/* progress bar */}
      <div className="px-6 pb-3">
        <div className="h-1 w-full overflow-hidden rounded-full bg-amber-900/10 dark:bg-amber-100/10">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500"
            animate={{ width: `${((idx + 1) / total) * 100}%` }}
            transition={{ duration: 0.4, ease: EASE }}
          />
        </div>
      </div>

      {/* Flip card */}
      <div className="px-6 pb-3" style={{ perspective: 1200 }}>
        <motion.button
          type="button"
          onClick={onFlip}
          aria-label={flipped ? "Show question" : "Show answer"}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          style={{ transformStyle: "preserve-3d" }}
          className="relative block h-[220px] w-full cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40"
        >
          {/* FRONT — question */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-amber-900/15 bg-amber-50 p-5 text-center dark:border-amber-100/10 dark:bg-stone-800"
            style={{ backfaceVisibility: "hidden" }}
          >
            <span
              className={`mb-2 rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${DIFF_TONE[card.difficulty]}`}
            >
              {card.difficulty}
            </span>
            <p className="text-[10px] font-medium uppercase tracking-wider cs-subtle">{card.hint}</p>
            <p className="mt-1 text-[32px] font-bold leading-tight cs-text" style={{ fontFamily: SERIF }}>
              {card.front}
            </p>
            <p className="mt-3 text-[10.5px] italic cs-muted">Tap to reveal answer</p>
          </div>
          {/* BACK — answer */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-amber-700/30 bg-gradient-to-br from-amber-100 to-orange-50 p-5 text-center dark:from-stone-700 dark:to-stone-800"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <span className="mb-2 inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300">
              <Check className="h-2.5 w-2.5" strokeWidth={2.6} />
              Answer
            </span>
            <p className="text-[26px] font-bold leading-tight text-amber-800 dark:text-amber-200" style={{ fontFamily: SERIF }}>
              {card.back}
            </p>
          </div>
        </motion.button>
      </div>

      {/* Next */}
      <div className="px-6 pb-5">
        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={onNext}
          disabled={!flipped}
          className="w-full rounded-xl bg-stone-900 py-3 text-[13px] font-semibold text-amber-50 transition hover:bg-stone-800 disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40 dark:bg-amber-100 dark:text-stone-900 dark:hover:bg-white"
        >
          {flipped ? "Got it — next card" : "Reveal answer first"}
        </motion.button>
      </div>
    </motion.div>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <div className="py-2 text-center">
      <p className={`text-[18px] font-bold tabular-nums ${tone}`}>{value}</p>
      <p className="text-[9.5px] uppercase tracking-wider cs-subtle">{label}</p>
    </div>
  );
}
