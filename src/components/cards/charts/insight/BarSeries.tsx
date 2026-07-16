"use client";

import {
  BarChart,
  Bar,
  XAxis,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from "recharts";
import { useReducedMotion } from "./useReducedMotion";

export type SeriesDef = { key: string; color: string; name?: string };

export function BarSeries({
  data,
  keys,
  xKey = "x",
  height = 140,
  radius = 8,
  barSize = 10,
  stacked = false,
  showAxis = false,
  barGap = 4,
}: {
  data: Record<string, any>[];
  keys: SeriesDef[];
  xKey?: string;
  height?: number;
  radius?: number;
  barSize?: number;
  stacked?: boolean;
  showAxis?: boolean;
  barGap?: number;
  fallback?: React.ReactNode;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} barGap={barGap} margin={{ top: 4, right: 2, bottom: showAxis ? 0 : -4, left: 2 }}>
        {showAxis && (
          <XAxis dataKey={xKey} axisLine={false} tickLine={false} tick={{ fill: "#8686a0", fontSize: 10 }} interval={0} />
        )}
        <Tooltip
          cursor={{ fill: "rgba(18,18,26,0.04)" }}
          contentStyle={{
            backgroundColor: "var(--chart-tooltip-bg)",
            border: "1px solid var(--chart-tooltip-border)",
            borderRadius: 12,
            boxShadow: "0 8px 24px rgba(18,18,26,0.14)",
            color: "var(--chart-tooltip-text)",
            fontSize: 12,
          }}
          labelStyle={{ color: "var(--chart-tooltip-text)" }}
        />
        {keys.map((k, i) => (
          <Bar
            key={`${k.key}-${i}`}
            dataKey={k.key}
            name={k.name ?? k.key}
            fill={k.color}
            stackId={stacked ? "s" : undefined}
            radius={stacked ? (i === keys.length - 1 ? [radius, radius, 0, 0] : i === 0 ? [0, 0, radius, radius] : [0, 0, 0, 0]) : [radius, radius, radius, radius]}
            barSize={barSize}
            isAnimationActive={!reduceMotion}
            animationDuration={900}
            animationEasing="ease-out"
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}

export function BarSeriesRainbow({
  data,
  xKey = "x",
  valueKey = "value",
  colors,
  height = 130,
  radius = 8,
  barSize = 14,
  highlightIndex,
  highlightColor,
}: {
  data: Record<string, any>[];
  xKey?: string;
  valueKey?: string;
  colors: string[];
  height?: number;
  radius?: number;
  barSize?: number;
  highlightIndex?: number;
  highlightColor?: string;
  fallback?: React.ReactNode;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 4, right: 2, bottom: 0, left: 2 }}>
        <XAxis dataKey={xKey} axisLine={false} tickLine={false} tick={{ fill: "#8686a0", fontSize: 10 }} />
        <Tooltip
          cursor={{ fill: "rgba(18,18,26,0.04)" }}
          contentStyle={{ backgroundColor: "var(--chart-tooltip-bg)", border: "1px solid var(--chart-tooltip-border)", borderRadius: 12, boxShadow: "0 8px 24px rgba(18,18,26,0.14)", color: "var(--chart-tooltip-text)", fontSize: 12 }}
          labelStyle={{ color: "var(--chart-tooltip-text)" }}
        />
        <Bar dataKey={valueKey} radius={[radius, radius, radius, radius]} barSize={barSize} isAnimationActive={!reduceMotion} animationDuration={900} key={`rainbow-${barSize}`}>
          {data.map((d, i) => (
            <Cell
              key={`cell-${i}-${d?.[valueKey] ?? 0}`}
              fill={highlightIndex !== undefined && i === highlightIndex ? highlightColor ?? colors[i % colors.length] : colors[i % colors.length]}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
