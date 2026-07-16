"use client";

import { useId } from "react";
import { AreaChart, Area, ResponsiveContainer, XAxis, Tooltip } from "recharts";
import { useReducedMotion } from "./useReducedMotion";

export type AreaSeriesDef = { key: string; color: string; name?: string; opacity?: number };

export function AreaSeries({
  data,
  keys,
  xKey = "x",
  height = 140,
  showAxis = false,
  stacked = false,
  strokeWidth = 2.5,
}: {
  data: Record<string, any>[];
  keys: AreaSeriesDef[];
  xKey?: string;
  height?: number;
  showAxis?: boolean;
  stacked?: boolean;
  strokeWidth?: number;
  fallback?: React.ReactNode;
}) {
  const uid = useId().replace(/:/g, "");
  const reduceMotion = useReducedMotion();
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 6, right: 2, bottom: 0, left: 2 }}>
        <defs>
          {keys.map((k, i) => (
            <linearGradient key={`${k.key}-${i}`} id={`area-${k.key}-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={k.color} stopOpacity={k.opacity ?? 0.35} />
              <stop offset="100%" stopColor={k.color} stopOpacity={0} />
            </linearGradient>
          ))}
        </defs>
        {showAxis && <XAxis dataKey={xKey} axisLine={false} tickLine={false} tick={{ fill: "#8686a0", fontSize: 10 }} />}
        <Tooltip
          contentStyle={{ backgroundColor: "var(--chart-tooltip-bg)", border: "1px solid var(--chart-tooltip-border)", borderRadius: 12, boxShadow: "0 8px 24px rgba(18,18,26,0.14)", color: "var(--chart-tooltip-text)", fontSize: 12 }}
          labelStyle={{ color: "var(--chart-tooltip-text)" }}
        />
        {keys.map((k, i) => (
          <Area
            key={`${k.key}-${i}`}
            type="monotone"
            dataKey={k.key}
            name={k.name ?? k.key}
            stroke={k.color}
            strokeWidth={strokeWidth}
            fill={`url(#area-${k.key}-${uid})`}
            stackId={stacked ? "s" : undefined}
            isAnimationActive={!reduceMotion}
            animationDuration={1100}
            animationEasing="ease-out"
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
}
