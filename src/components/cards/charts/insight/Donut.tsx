"use client";

import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { useReducedMotion } from "./useReducedMotion";

export function Donut({
  data,
  size = 128,
  thickness = 14,
  centerLabel,
  centerSub,
}: {
  data: { name: string; value: number; color: string }[];
  size?: number;
  thickness?: number;
  centerLabel?: string;
  centerSub?: string;
  fallback?: React.ReactNode;
}) {
  const reduceMotion = useReducedMotion();
  const outer = size / 2;
  const inner = outer - thickness;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <PieChart width={size} height={size}>
        <Tooltip
          contentStyle={{ backgroundColor: "var(--chart-tooltip-bg)", border: "1px solid var(--chart-tooltip-border)", borderRadius: 12, boxShadow: "0 8px 24px rgba(18,18,26,0.14)", color: "var(--chart-tooltip-text)", fontSize: 12 }}
          labelStyle={{ color: "var(--chart-tooltip-text)" }}
        />
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={inner}
          outerRadius={outer}
          startAngle={90}
          endAngle={-270}
          paddingAngle={3}
          stroke="none"
          cornerRadius={6}
          isAnimationActive={!reduceMotion}
          animationDuration={1000}
          animationEasing="ease-out"
        >
          {data.map((d, i) => <Cell key={`${d.name}-${i}`} fill={d.color} />)}
        </Pie>
      </PieChart>
      {(centerLabel || centerSub) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {centerLabel && <span className="text-xl font-extrabold text-ink-900 dark:text-white">{centerLabel}</span>}
          {centerSub && <span className="text-[11px] text-ink-500 dark:text-ink-300">{centerSub}</span>}
        </div>
      )}
    </div>
  );
}
