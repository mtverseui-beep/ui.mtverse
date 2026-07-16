"use client";

import { useId } from "react";
import { LineChart, Line, ResponsiveContainer, XAxis, Tooltip } from "recharts";
import { useReducedMotion } from "./useReducedMotion";

export type LineSeriesDef = { key: string; color: string; name?: string; dashed?: boolean };

export function LineSeries({
  data,
  keys,
  xKey = "x",
  height = 140,
  showAxis = false,
  strokeWidth = 2.5,
  gradientId,
}: {
  data: Record<string, any>[];
  keys: LineSeriesDef[];
  xKey?: string;
  height?: number;
  showAxis?: boolean;
  strokeWidth?: number;
  gradientId?: string;
  fallback?: React.ReactNode;
}) {
  const id = useId().replace(/:/g, "");
  const reduceMotion = useReducedMotion();
  const gid = gradientId ?? `lg-${keys.map((k) => k.key).join("-")}-${id}`;
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 6, right: 4, bottom: showAxis ? 0 : 2, left: 4 }}>
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="1" y2="0">
            {keys.length === 1 ? (
              <>
                <stop offset="0%" stopColor={keys[0].color} stopOpacity={0.55} />
                <stop offset="100%" stopColor={keys[0].color} stopOpacity={1} />
              </>
            ) : (
              <>
                <stop offset="0%" stopColor={keys[0]?.color} />
                <stop offset="100%" stopColor={keys[keys.length - 1]?.color} />
              </>
            )}
          </linearGradient>
        </defs>
        {showAxis && <XAxis dataKey={xKey} axisLine={false} tickLine={false} tick={{ fill: "#8686a0", fontSize: 10 }} />}
        <Tooltip
          contentStyle={{ backgroundColor: "var(--chart-tooltip-bg)", border: "1px solid var(--chart-tooltip-border)", borderRadius: 12, boxShadow: "0 8px 24px rgba(18,18,26,0.14)", color: "var(--chart-tooltip-text)", fontSize: 12 }}
          labelStyle={{ color: "var(--chart-tooltip-text)" }}
        />
        {keys.map((k, i) => (
          <Line
            key={`${k.key}-${i}`}
            type="monotone"
            dataKey={k.key}
            name={k.name ?? k.key}
            stroke={keys.length === 1 ? `url(#${gid})` : k.color}
            strokeWidth={strokeWidth}
            strokeDasharray={k.dashed ? "4 4" : undefined}
            dot={false}
            activeDot={{ r: 4 }}
            isAnimationActive={!reduceMotion}
            animationDuration={1100}
            animationEasing="ease-out"
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
