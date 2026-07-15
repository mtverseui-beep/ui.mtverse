"use client";

import { AreaChart, Area, ResponsiveContainer } from "recharts";

export function WaveStack({
  data,
  keys,
  height = 140,
  fallback,
}: {
  data: Record<string, any>[];
  keys: { key: string; color: string }[];
  height?: number;
  fallback?: React.ReactNode;
}) {
  if (fallback && data.length === 0) return <>{fallback}</>;
  // Unique gradient id per-instance
  const uid = Math.random().toString(36).slice(2, 7);
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 4, right: 0, bottom: 0, left: 0 }}>
        <defs>
          {keys.map((k, i) => (
            <linearGradient key={`${k.key}-${i}`} id={`wave-${k.key}-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={k.color} stopOpacity={0.85} />
              <stop offset="100%" stopColor={k.color} stopOpacity={0.15} />
            </linearGradient>
          ))}
        </defs>
        {keys.map((k, i) => (
          <Area
            key={`${k.key}-${i}`}
            type="monotone"
            dataKey={k.key}
            stroke="none"
            fill={`url(#wave-${k.key}-${uid})`}
            isAnimationActive
            animationDuration={1300}
            animationEasing="ease-out"
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
}
