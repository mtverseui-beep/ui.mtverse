"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { AlertCircle, RotateCw } from "lucide-react";
import type { CodeEntryResponse } from "./code-types";

const responseCache = new Map<string, CodeEntryResponse>();

const LazyCodePanel = dynamic(
  () => import("./CodePanel").then((module) => module.CodePanel),
  { ssr: false, loading: () => <CodePanelSkeleton /> },
);

export function CodePanelLoader({ slug }: { slug: string }) {
  return <CodePanelRequest key={slug} slug={slug} />;
}

function CodePanelRequest({ slug }: { slug: string }) {
  const cached = responseCache.get(slug);
  const [result, setResult] = useState<CodeEntryResponse | null>(cached ?? null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    cached ? "ready" : "loading",
  );
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (responseCache.has(slug)) return;

    const controller = new AbortController();
    let active = true;

    fetch(`/api/components/${encodeURIComponent(slug)}/code`, {
      method: "GET",
      cache: "force-cache",
      signal: controller.signal,
    })
      .then(async (response) => {
        const payload = (await response.json()) as CodeEntryResponse & { error?: string };
        if (!response.ok) {
          throw new Error(payload.error || "Unable to load component code.");
        }
        return payload;
      })
      .then((payload) => {
        if (!active) return;
        responseCache.set(slug, payload);
        setResult(payload);
        setStatus("ready");
      })
      .catch((reason: unknown) => {
        if (!active || controller.signal.aborted) return;
        setError(reason instanceof Error ? reason.message : "Unable to load component code.");
        setStatus("error");
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, [attempt, slug]);

  const retry = useCallback(() => {
    responseCache.delete(slug);
    setError(null);
    setStatus("loading");
    setAttempt((value) => value + 1);
  }, [slug]);

  if (status === "loading") return <CodePanelSkeleton />;

  if (status === "error" || !result) {
    return (
      <div className="flex min-h-56 flex-col items-center justify-center rounded-xl border cs-border p-8 text-center">
        <AlertCircle className="mb-3 h-6 w-6 text-rose-500" aria-hidden="true" />
        <p className="text-sm font-semibold cs-text">Code could not be loaded</p>
        <p className="mt-1 max-w-sm text-xs cs-muted">{error}</p>
        <button
          type="button"
          onClick={retry}
          className="mt-4 inline-flex items-center gap-2 rounded-lg border cs-border px-3 py-2 text-xs font-semibold cs-text transition hover:bg-[var(--card-hover)]"
        >
          <RotateCw className="h-3.5 w-3.5" aria-hidden="true" />
          Retry
        </button>
      </div>
    );
  }

  return <LazyCodePanel entry={result.entry} sharedCssNotes={result.sharedCssNotes} />;
}

function CodePanelSkeleton() {
  return (
    <div className="space-y-4" role="status" aria-label="Loading component code">
      <div className="flex gap-2">
        <div className="h-6 w-24 animate-pulse rounded-md bg-[var(--card-input-bg)]" />
        <div className="h-6 w-20 animate-pulse rounded-md bg-[var(--card-input-bg)]" />
      </div>
      <div className="h-10 animate-pulse rounded-lg bg-[var(--card-input-bg)]" />
      <div className="h-80 animate-pulse rounded-xl bg-[var(--card-input-bg)]" />
      <span className="sr-only">Loading component code</span>
    </div>
  );
}