"use client";

import { PieChart, Pie, Cell, Tooltip } from "recharts";

export function Donut({
  data,
  size = 128,
  thickness = 14,
  centerLabel,
  centerSub,
  fallback,
}: {
  data: { name: string; value: number; color: string }[];
  size?: number;
  thickness?: number;
  centerLabel?: string;
  centerSub?: string;
  fallback?: React.ReactNode;
}) {
  if (fallback && data.length === 0) return <>{fallback}</>;
  const outer = size / 2;
  const inner = outer - thickness;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <PieChart width={size} height={size}>
        <Tooltip
          contentStyle={{
            borderRadius: 12,
            border: "none",
            boxShadow: "0 8px 24px rgba(18,18,26,0.14)",
            fontSize: 12,
          }}
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
          isAnimationActive
          animationDuration={1000}
          animationEasing="ease-out"
        >
          {data.map((d, i) => (
            <Cell key={`${d.name}-${i}`} fill={d.color} />
          ))}
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
