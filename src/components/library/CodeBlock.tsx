"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Check, Copy } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const EASE = [0.16, 1, 0.3, 1] as const;

interface CodeBlockProps {
  code: string;
  language: string;
  label?: string;
  maxHeight?: number;
}

export function CodeBlock({
  code,
  language,
  label,
  maxHeight = 520,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Simulate a brief skeleton on mount / when code changes so the user
  // sees a smooth loading transition rather than a hard content swap.
  useEffect(() => {
    // Defer setState to avoid synchronous render-loop warning.
    const startRaf = requestAnimationFrame(() => setLoading(true));
    const t = setTimeout(() => setLoading(false), 200);
    return () => {
      cancelAnimationFrame(startRaf);
      clearTimeout(t);
    };
  }, [code]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 2000);
    });
  }, [code]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-200/80 bg-slate-950 dark:border-white/10">
      {/* Sticky mini toolbar */}
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-slate-950/95 px-4 py-2 backdrop-blur-md">
        <div className="flex items-center gap-2">
          {/* Traffic lights */}
          <span className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          </span>
          {label && (
            <span className="ml-2 font-mono text-[11px] font-medium text-slate-400">
              {label}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? "Code copied" : "Copy code"}
          className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40 ${
            copied
              ? "bg-emerald-500/15 text-emerald-400"
              : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200"
          }`}
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" strokeWidth={2.4} />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" strokeWidth={2} />
              Copy
            </>
          )}
        </button>
      </div>

      {/* Code content */}
      <div
        className="scrollbar-modern overflow-auto"
        style={{ maxHeight: `${maxHeight}px` }}
      >
        {loading ? (
          <CodeSkeleton />
        ) : (
          <SyntaxHighlighter
            language={language}
            style={oneDark}
            showLineNumbers
            customStyle={{
              margin: 0,
              padding: "16px 20px",
              background: "transparent",
              fontSize: "12.5px",
              fontFamily:
                'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
            }}
            lineNumberStyle={{
              color: "rgba(148, 163, 184, 0.35)",
              paddingRight: "20px",
              minWidth: "2.5em",
              userSelect: "none",
            }}
            wrapLongLines={false}
          >
            {code}
          </SyntaxHighlighter>
        )}
      </div>
    </div>
  );
}

function CodeSkeleton() {
  return (
    <div className="space-y-2 p-5">
      {Array.from({ length: 16 }).map((_, i) => (
        <div
          key={i}
          className="h-3 rounded animate-pulse"
          style={{
            width: `${60 + Math.sin(i * 2.3) * 30 + (i % 3) * 10}%`,
            background: `rgba(148, 163, 184, ${0.05 + (i % 4) * 0.02})`,
          }}
        />
      ))}
    </div>
  );
}
