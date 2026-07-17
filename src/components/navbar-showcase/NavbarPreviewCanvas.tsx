"use client";

import { useRef, type ReactNode } from "react";

// ──────────────────────────────────────────────────────────────────────────
// NavbarPreviewCanvas
// ──────────────────────────────────────────────────────────────────────────
// A browser-style preview canvas. Always renders at full available width
// (desktop preview only). Provides a scrollable scroll-sandbox so sticky /
// scroll-aware navbars work. Contains position:fixed children (mobile
// drawers) to the canvas via `contain: paint`.

interface NavbarPreviewCanvasProps {
  /** Render prop: receives the scroll container ref, returns the navbar element. */
  children: (scrollRef: React.RefObject<HTMLDivElement | null>) => ReactNode;
  /** Blank scroll space height in px. */
  scrollSpaceHeight: number;
}

export function NavbarPreviewCanvas({
  children,
  scrollSpaceHeight,
}: NavbarPreviewCanvasProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="flex min-h-0 flex-1 items-stretch overflow-hidden p-3 sm:p-4">
      <div
        className="relative flex h-full min-h-0 w-full flex-col overflow-hidden rounded-xl border cs-border bg-background shadow-sm"
        style={{
          width: "100%",
          maxWidth: "none",
          contain: "paint",
        }}
      >
        <div
          ref={scrollRef}
          className="@container component-theme-scope min-h-0 flex-1 overflow-y-auto overflow-x-hidden"
          style={{ scrollbarWidth: "thin" }}
        >
          {children(scrollRef)}
          <div
            aria-hidden="true"
            style={{ height: `${scrollSpaceHeight}px` }}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}
