"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { AlertCircle, ExternalLink, LockKeyhole, RotateCw } from "lucide-react";
import type { CodeEntryResponse } from "./code-types";

const responseCache = new Map<string, CodeEntryResponse>();
const MAIN_SITE_URL = (process.env.NEXT_PUBLIC_MAIN_SITE_URL || "https://www.mtverse.dev").replace(/\/$/, "");
const UI_SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://ui.mtverse.dev").replace(/\/$/, "");

const LazyCodePanel = dynamic(
  () => import("./CodePanel").then((module) => module.CodePanel),
  { ssr: false, loading: () => <CodePanelSkeleton /> },
);

type AccessResponse = {
  authenticated?: boolean;
  canAccess?: boolean;
  accessToken?: string;
  error?: string;
};

type LoadStatus = "loading" | "ready" | "locked" | "error";

export function CodePanelLoader({ slug }: { slug: string }) {
  return <CodePanelRequest key={slug} slug={slug} />;
}

function CodePanelRequest({ slug }: { slug: string }) {
  const cached = responseCache.get(slug);
  const [result, setResult] = useState<CodeEntryResponse | null>(cached ?? null);
  const [status, setStatus] = useState<LoadStatus>(cached ? "ready" : "loading");
  const [error, setError] = useState<string | null>(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (responseCache.has(slug)) return;

    const controller = new AbortController();
    let active = true;

    async function loadCode() {
      try {
        const accessResponse = await fetch(`${MAIN_SITE_URL}/api/ui-library/access-token`, {
          method: "GET",
          credentials: "include",
          cache: "no-store",
          signal: controller.signal,
        });
        const access = (await accessResponse.json()) as AccessResponse;

        if (accessResponse.status === 401 || accessResponse.status === 403) {
          if (!active) return;
          setAuthenticated(Boolean(access.authenticated));
          setError(access.error || "UI Library lifetime access is required.");
          setStatus("locked");
          return;
        }

        if (!accessResponse.ok || !access.accessToken) {
          throw new Error(access.error || "Unable to verify UI Library access.");
        }

        const codeResponse = await fetch(`/api/components/${encodeURIComponent(slug)}/code`, {
          method: "GET",
          cache: "no-store",
          headers: { Authorization: `Bearer ${access.accessToken}` },
          signal: controller.signal,
        });
        const payload = (await codeResponse.json()) as CodeEntryResponse & { error?: string };

        if (!codeResponse.ok) {
          throw new Error(payload.error || "Unable to load component code.");
        }

        if (!active) return;
        responseCache.set(slug, payload);
        setResult(payload);
        setStatus("ready");
      } catch (reason: unknown) {
        if (!active || controller.signal.aborted) return;
        setError(reason instanceof Error ? reason.message : "Unable to load component code.");
        setStatus("error");
      }
    }

    void loadCode();
    return () => {
      active = false;
      controller.abort();
    };
  }, [attempt, slug]);

  const retry = useCallback(() => {
    responseCache.delete(slug);
    setError(null);
    setResult(null);
    setStatus("loading");
    setAttempt((value) => value + 1);
  }, [slug]);

  if (status === "loading") return <CodePanelSkeleton />;
  if (status === "locked") {
    return <LockedCodePanel authenticated={authenticated} message={error} onRetry={retry} />;
  }

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

function LockedCodePanel({
  authenticated,
  message,
  onRetry,
}: {
  authenticated: boolean;
  message: string | null;
  onRetry: () => void;
}) {
  const pathname = usePathname();
  const returnTo = UI_SITE_URL + pathname;
  const continuation = `/ui-library/continue?returnTo=${encodeURIComponent(returnTo)}`;
  const signInUrl = `${MAIN_SITE_URL}/sign-in?next=${encodeURIComponent(continuation)}`;
  const pricingUrl = `${MAIN_SITE_URL}/pricing#ui-library`;

  return (
    <div className="relative flex min-h-72 overflow-hidden rounded-xl border cs-border cs-surface p-6 sm:p-9">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/70 to-transparent" />
      <div className="mx-auto flex max-w-lg flex-col items-center justify-center text-center">
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
          <LockKeyhole className="h-5 w-5" aria-hidden="true" />
        </div>
        <p className="text-base font-semibold cs-text">Source code is protected</p>
        <p className="mt-2 text-sm leading-6 cs-muted">
          {message || "Unlock lifetime access to view, copy, and use every component source file."}
        </p>
        <div className="mt-6 flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
          {!authenticated ? (
            <a href={signInUrl} className="inline-flex h-10 items-center justify-center rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-500">
              Sign in
            </a>
          ) : null}
          <a href={pricingUrl} className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border cs-border px-4 text-sm font-semibold cs-text transition hover:bg-[var(--card-hover)]">
            Unlock lifetime access
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
          {authenticated ? (
            <button type="button" onClick={onRetry} className="inline-flex h-10 items-center justify-center gap-2 rounded-lg px-3 text-sm font-semibold cs-muted transition hover:bg-[var(--card-hover)] hover:text-[var(--card-text)]">
              <RotateCw className="h-3.5 w-3.5" aria-hidden="true" />
              Check again
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
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
