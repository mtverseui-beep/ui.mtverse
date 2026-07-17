"use client";

import { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";
import { cardRoutes } from "@/components/cards-data/cards";
import type { CodeEntryMetadata, CodeEntryResponse } from "./code-types";
import { DocsPanel } from "./DocsPanel";

interface ComponentDocsProps {
  slug: string;
  initialMetadata?: CodeEntryMetadata;
}

export function ComponentDocs({ slug, initialMetadata }: ComponentDocsProps) {
  const [metadata, setMetadata] = useState<CodeEntryMetadata | undefined>(initialMetadata);
  const [failed, setFailed] = useState(false);
  const cardMeta = cardRoutes.find((card) => card.slug === slug);

  useEffect(() => {
    if (metadata) return;

    const controller = new AbortController();
    let active = true;

    fetch(`/api/components/${encodeURIComponent(slug)}/code`, {
      method: "GET",
      cache: "force-cache",
      signal: controller.signal,
    })
      .then(async (response) => {
        const payload = (await response.json()) as CodeEntryResponse & { error?: string };
        if (!response.ok) throw new Error(payload.error || "Unable to load component metadata.");
        return payload.entry;
      })
      .then((entry) => {
        if (!active) return;
        setMetadata({
          componentName: entry.componentName,
          mainFile: entry.mainFile,
          npmPackages: entry.npmPackages,
          dependencies: entry.dependencies,
          installCommand: entry.installCommand,
        });
      })
      .catch(() => {
        if (active && !controller.signal.aborted) setFailed(true);
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, [metadata, slug]);

  if (!cardMeta) {
    return (
      <div className="rounded-xl border cs-border p-8 text-center cs-muted">
        Documentation is not available for this component.
      </div>
    );
  }

  if (!metadata && !failed) return <DocsSkeleton />;

  return (
    <>
      {failed && (
        <div className="mb-4 flex items-center gap-2 rounded-lg border border-amber-500/25 bg-amber-500/10 px-3 py-2 text-xs text-amber-600 dark:text-amber-300">
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
          Source metadata could not be loaded; showing the base documentation.
        </div>
      )}
      <DocsPanel
        slug={slug}
        title={cardMeta.title}
        animation={cardMeta.animation}
        accent={cardMeta.accent}
        componentName={metadata?.componentName || slug.replace(/-card$/, "")}
        npmPackages={metadata?.npmPackages || []}
        dependencies={metadata?.dependencies || []}
        category={cardMeta.category}
        sourcePath={metadata?.mainFile.path}
        installCommand={metadata?.installCommand}
      />
    </>
  );
}

function DocsSkeleton() {
  return (
    <div className="space-y-5" role="status" aria-label="Loading component documentation">
      <div className="h-10 w-64 animate-pulse rounded-lg bg-[var(--card-input-bg)]" />
      {["70%", "90%", "82%", "76%"].map((width) => (
        <div key={width} className="space-y-2">
          <div className="h-3 w-28 animate-pulse rounded bg-[var(--card-input-bg)]" />
          <div className="h-14 animate-pulse rounded-xl bg-[var(--card-input-bg)]" style={{ width }} />
        </div>
      ))}
      <span className="sr-only">Loading component documentation</span>
    </div>
  );
}