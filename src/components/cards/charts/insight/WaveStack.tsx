"use client";

import { useId } from "react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { useReducedMotion } from "./useReducedMotion";

export function WaveStack({
  data,
  keys,
  height = 140,
}: {
  data: Record<string, any>[];
  keys: { key: string; color: string }[];
  height?: number;
  fallback?: React.ReactNode;
}) {
  const uid = useId().replace(/:/g, "");
  const reduceMotion = useReducedMotion();
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
          <Area key={`${k.key}-${i}`} type="monotone" dataKey={k.key} stroke="none" fill={`url(#wave-${k.key}-${uid})`} isAnimationActive={!reduceMotion} animationDuration={1300} animationEasing="ease-out" />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
}
