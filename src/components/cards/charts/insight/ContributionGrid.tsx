"use client";

// SVG contribution grid with pure CSS stagger animation — no Framer Motion.

export function ContributionGrid({
  weeks,
  months,
  colors,
}: {
  weeks: number[][];
  months: string[];
  colors: string[];
}) {
  const weeksCount = weeks.length;
  const daysCount = weeks[0]?.length ?? 7;
  const cell = 9;
  const gap = 3;
  const width = weeksCount * cell + (weeksCount - 1) * gap;
  const height = daysCount * cell + (daysCount - 1) * gap;

  return (
    <div className="w-full">
      <div className="flex justify-between mb-1.5 px-0.5">
        {months.map((m) => (
          <span key={m} className="text-[10px] text-ink-500 dark:text-ink-300">
            {m}
          </span>
        ))}
      </div>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        className="w-full"
        style={{ height: "auto" }}
      >
        {weeks.map((week, wi) =>
          week.map((level, di) => {
            const x = wi * (cell + gap);
            const y = di * (cell + gap);
            return (
              <rect
                key={`${wi}-${di}`}
                x={x}
                y={y}
                width={cell}
                height={cell}
                rx={2}
                className="contrib-cell"
                style={{
                  fill: colors[level] ?? colors[0],
                  animationDelay: `${Math.min((wi * 7 + di) * 0.004, 0.8)}s`,
                  transformOrigin: `${x + cell / 2}px ${y + cell / 2}px`,
                }}
              />
            );
          })
        )}
      </svg>
    </div>
  );
}
