"use client";

import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";

export function RadialGauge({
  value,
  size = 128,
  thickness = 12,
  color = "#f5a623",
  trackColor = "#eef0f6",
  label,
  sublabel,
}: {
  value: number;
  size?: number;
  thickness?: number;
  color?: string;
  trackColor?: string;
  label?: string;
  sublabel?: string;
}) {
  const data = [{ value }];
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <RadialBarChart
        width={size}
        height={size}
        cx="50%"
        cy="50%"
        innerRadius={size / 2 - thickness}
        outerRadius={size / 2}
        barSize={thickness}
        data={data}
        startAngle={90}
        endAngle={-270}
      >
        <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
        <RadialBar
          background={{ fill: trackColor }}
          dataKey="value"
          cornerRadius={thickness / 2}
          fill={color}
          isAnimationActive
          animationDuration={1200}
          animationEasing="ease-out"
        />
      </RadialBarChart>
      {(label || sublabel) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {label && <span className="text-2xl font-extrabold text-ink-900 dark:text-white">{label}</span>}
          {sublabel && <span className="text-[11px] text-ink-500 dark:text-ink-300">{sublabel}</span>}
        </div>
      )}
    </div>
  );
}

export function MultiRing({
  rings,
  size = 132,
  gap = 4,
  thickness = 9,
  centerLabel,
  centerSub,
}: {
  rings: { value: number; color: string; track?: string }[];
  size?: number;
  gap?: number;
  thickness?: number;
  centerLabel?: string;
  centerSub?: string;
}) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {rings.map((r, i) => {
          const radius = size / 2 - thickness / 2 - i * (thickness + gap);
          const circumference = 2 * Math.PI * radius;
          const dash = (r.value / 100) * circumference;
          return (
            <g key={`${r.color}-${i}`} transform={`rotate(-90 ${size / 2} ${size / 2})`}>
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={r.track ?? "#eef0f6"}
                strokeWidth={thickness}
              />
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={r.color}
                strokeWidth={thickness}
                strokeLinecap="round"
                strokeDasharray={`${dash} ${circumference}`}
                style={{
                  transition: "stroke-dasharray 1.1s ease-out",
                }}
              />
            </g>
          );
        })}
      </svg>
      {(centerLabel || centerSub) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {centerLabel && <span className="text-xl font-extrabold text-ink-900 dark:text-white">{centerLabel}</span>}
          {centerSub && <span className="text-[11px] text-ink-500 dark:text-ink-300">{centerSub}</span>}
        </div>
      )}
    </div>
  );
}
