"use client";

import { cn } from "@/lib/utils";

export function Avatar({
  seed,
  size = 36,
  ring,
}: {
  seed: string;
  size?: number;
  ring?: boolean;
}) {
  return (
    <img
      src={`https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(seed)}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`}
      width={size}
      height={size}
      alt={seed}
      loading="lazy"
      className={cn("rounded-full bg-canvas dark:bg-white/10 object-cover", ring && "ring-2 ring-white shadow")}
    />
  );
}

export function ProfileRow({
  name,
  role,
  seed,
  action,
}: {
  name: string;
  role: string;
  seed: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex min-w-0 items-center gap-2.5">
        <Avatar seed={seed} size={38} />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-ink-900 dark:text-white leading-tight">{name}</p>
          {role && <p className="truncate text-xs text-ink-500 dark:text-ink-300 leading-tight">{role}</p>}
        </div>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function Pill({
  children,
  active,
  color,
}: {
  children: React.ReactNode;
  active?: boolean;
  color?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold transition-colors whitespace-nowrap",
        active ? "text-white" : "bg-canvas dark:bg-white/5 text-ink-500 dark:text-ink-300"
      )}
      style={active ? { background: color ?? "#12121a" } : undefined}
    >
      {children}
    </span>
  );
}

export function Dot({ color }: { color: string }) {
  return <span className="inline-block h-2 w-2 rounded-full" style={{ background: color }} />;
}

export function Legend({ items }: { items: { label: string; color: string }[] }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
      {items.map((it, i) => (
        <span key={`${it.label}-${i}`} className="flex items-center gap-1.5 text-[11px] text-ink-500 dark:text-ink-300 whitespace-nowrap">
          <Dot color={it.color} />
          {it.label}
        </span>
      ))}
    </div>
  );
}

export function StatDelta({ value }: { value: number }) {
  const up = value >= 0;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[11px] font-bold whitespace-nowrap",
        up
          ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
          : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
      )}
    >
      {up ? "↑" : "↓"} {Math.abs(value)}%
    </span>
  );
}

export function InlineProgress({
  value,
  color = "#12121a",
  height = 8,
  label,
}: {
  value: number;
  color?: string;
  height?: number;
  label?: string;
}) {
  return (
    <div>
      <div className="relative w-full rounded-full bg-canvas dark:bg-white/5 overflow-hidden" style={{ height }}>
        <div
          className="rank-bar-fill h-full rounded-full"
          style={{ background: color, width: `${value}%` }}
        />
      </div>
      {label && <p className="mt-1.5 text-[11px] text-ink-500 dark:text-ink-300">{label}</p>}
    </div>
  );
}
