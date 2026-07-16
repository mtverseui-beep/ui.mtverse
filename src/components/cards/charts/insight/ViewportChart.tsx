"use client";

import { type ComponentType, type CSSProperties, type ReactNode, useEffect, useRef, useState } from "react";

type ViewportProps = { height?: number; size?: number; fallback?: ReactNode };
const callbacks = new Map<Element, () => void>();
let observer: IntersectionObserver | null = null;

function getObserver() {
  if (typeof window === "undefined" || !("IntersectionObserver" in window)) return null;
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        callbacks.get(entry.target)?.();
        callbacks.delete(entry.target);
        observer?.unobserve(entry.target);
      }
    },
    { rootMargin: "600px 0px", threshold: 0 },
  );
  return observer;
}

export function withViewportChart<P extends ViewportProps>(Chart: ComponentType<P>) {
  function ViewportChart(props: P) {
    const ref = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      const node = ref.current;
      const pool = getObserver();
      if (!node || mounted) return;
      if (!pool) {
        const frame = requestAnimationFrame(() => setMounted(true));
        return () => cancelAnimationFrame(frame);
      }
      callbacks.set(node, () => setMounted(true));
      pool.observe(node);
      return () => {
        callbacks.delete(node);
        pool.unobserve(node);
      };
    }, [mounted]);

    const size = typeof props.size === "number" ? props.size : undefined;
    const style: CSSProperties = { height: props.height ?? size ?? 140, width: size ?? "100%", minWidth: size, flex: size ? "0 0 auto" : undefined };
    return <div ref={ref} style={style}>{mounted ? <Chart {...props} /> : props.fallback ?? <div className="h-full w-full rounded-xl bg-canvas/60 dark:bg-white/[0.03]" aria-hidden />}</div>;
  }
  ViewportChart.displayName = `ViewportChart(${Chart.displayName ?? Chart.name ?? "Chart"})`;
  return ViewportChart;
}
