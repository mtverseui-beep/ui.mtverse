"use client";

// Pure CSS animated rank bars — no Framer Motion, no scroll listeners.
// Animates width from 0 → pct on mount via the `rank-bar-fill` keyframes
// declared in globals.css. Respects prefers-reduced-motion automatically
// because the keyframe is a CSS animation (browser handles the media query).

export function RankBars({
  items,
  max,
  height = 10,
  gap = 10,
  labelWidth = 0,
}: {
  items: { label: string; value: number; color: string; textOnBar?: boolean }[];
  max?: number;
  height?: number;
  gap?: number;
  labelWidth?: number;
}) {
  const m = max ?? Math.max(...items.map((i) => i.value));
  return (
    <div className="flex flex-col" style={{ gap }}>
      {items.map((item, i) => {
        const pct = Math.max(6, (item.value / m) * 100);
        return (
          <div key={`${item.label}-${i}`} className="flex items-center gap-2">
            {labelWidth > 0 && (
              <span className="shrink-0 text-xs text-ink-500 dark:text-ink-300" style={{ width: labelWidth }}>
                {item.label}
              </span>
            )}
            <div className="relative flex-1 rounded-full bg-canvas dark:bg-white/5 overflow-hidden" style={{ height }}>
              <div
                className="rank-bar-fill h-full rounded-full flex items-center"
                style={{
                  background: item.color,
                  width: `${pct}%`,
                  animationDelay: `${i * 0.06}s`,
                }}
              >
                {item.textOnBar && (
                  <span className="pl-3 text-[11px] font-semibold text-white truncate">{item.label}</span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
