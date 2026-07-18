"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { AlertCircle, ExternalLink, LockKeyhole, RotateCw } from "lucide-react";
import { ComponentDocs } from "./ComponentDocs";
import type { CodeEntryMetadata, CodeEntryResponse } from "./code-types";

const MAIN_SITE_URL = (process.env.NEXT_PUBLIC_MAIN_SITE_URL || "https://www.mtverse.dev").replace(/\/$/, "");
const UI_SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://ui.mtverse.dev").replace(/\/$/, "");

type AccessResponse = {
  authenticated?: boolean;
  accessToken?: string;
  error?: string;
};

type LoadStatus = "loading" | "ready" | "locked" | "error";

export function DocsPanelLoader({ slug }: { slug: string }) {
  return <DocsPanelRequest key={slug} slug={slug} />;
}

function DocsPanelRequest({ slug }: { slug: string }) {
  const [metadata, setMetadata] = useState<CodeEntryMetadata | null>(null);
  const [status, setStatus] = useState<LoadStatus>("loading");
  const [error, setError] = useState<string | null>(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    async function loadDocs() {
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

        const docsResponse = await fetch(`/api/components/${encodeURIComponent(slug)}/code`, {
          method: "GET",
          cache: "no-store",
          headers: { Authorization: `Bearer ${access.accessToken}` },
          signal: controller.signal,
        });
        const payload = (await docsResponse.json()) as CodeEntryResponse & { error?: string };

        if (!docsResponse.ok) {
          throw new Error(payload.error || "Unable to load component documentation.");
        }

        if (!active) return;
        setMetadata({
          componentName: payload.entry.componentName,
          mainFile: payload.entry.mainFile,
          npmPackages: payload.entry.npmPackages,
          dependencies: payload.entry.dependencies,
          installCommand: payload.entry.installCommand,
        });
        setStatus("ready");
      } catch (reason: unknown) {
        if (!active || controller.signal.aborted) return;
        setError(reason instanceof Error ? reason.message : "Unable to load component documentation.");
        setStatus("error");
      }
    }

    void loadDocs();
    return () => {
      active = false;
      controller.abort();
    };
  }, [attempt, slug]);

  const retry = useCallback(() => {
    setMetadata(null);
    setError(null);
    setStatus("loading");
    setAttempt((value) => value + 1);
  }, []);

  if (status === "loading") return <DocsSkeleton />;
  if (status === "locked") {
    return <LockedDocsPanel authenticated={authenticated} message={error} onRetry={retry} />;
  }
  if (status === "error" || !metadata) {
    return (
      <div className="flex min-h-56 flex-col items-center justify-center rounded-xl border cs-border p-8 text-center">
        <AlertCircle className="mb-3 h-6 w-6 text-rose-500" aria-hidden="true" />
        <p className="text-sm font-semibold cs-text">Documentation could not be loaded</p>
        <p className="mt-1 max-w-sm text-xs cs-muted">{error}</p>
        <button type="button" onClick={retry} className="mt-4 inline-flex items-center gap-2 rounded-lg border cs-border px-3 py-2 text-xs font-semibold cs-text transition hover:bg-[var(--card-hover)]">
          <RotateCw className="h-3.5 w-3.5" aria-hidden="true" />
          Retry
        </button>
      </div>
    );
  }

  return <ComponentDocs slug={slug} initialMetadata={metadata} />;
}

function LockedDocsPanel({ authenticated, message, onRetry }: {
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
        <p className="text-base font-semibold cs-text">Documentation is protected</p>
        <p className="mt-2 text-sm leading-6 cs-muted">
          {message || "Unlock lifetime access to view setup, dependencies, imports, and implementation guidance."}
        </p>
        <div className="mt-6 flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
          {!authenticated ? (
            <a href={signInUrl} className="inline-flex h-10 items-center justify-center rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-500">Sign in</a>
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

function DocsSkeleton() {
  return (
    <div className="space-y-5" role="status" aria-label="Checking documentation access">
      <div className="h-10 w-64 animate-pulse rounded-lg bg-[var(--card-input-bg)]" />
      {["70%", "90%", "82%", "76%"].map((width) => (
        <div key={width} className="space-y-2">
          <div className="h-3 w-28 animate-pulse rounded bg-[var(--card-input-bg)]" />
          <div className="h-14 animate-pulse rounded-xl bg-[var(--card-input-bg)]" style={{ width }} />
        </div>
      ))}
      <span className="sr-only">Checking documentation access</span>
    </div>
  );
}