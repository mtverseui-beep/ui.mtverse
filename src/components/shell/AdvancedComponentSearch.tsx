"use client";

import * as React from "react";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { cardRoutes } from "@/components/cards-data/cards";

const MAX_VISIBLE_RESULTS = 12;
const ALL_CATEGORIES = "All categories";

const searchIndex = cardRoutes.map((card) => ({
  ...card,
  searchable: `${card.title} ${card.category} ${card.slug.replaceAll("-", " ")} ${card.animation}`.toLowerCase(),
}));

const categories = [
  ALL_CATEGORIES,
  ...Array.from(new Set(cardRoutes.map((card) => card.category))).sort(),
];

function scoreResult(searchable: string, title: string, category: string, tokens: string[]) {
  const normalizedTitle = title.toLowerCase();
  const normalizedCategory = category.toLowerCase();

  return tokens.reduce((score, token) => {
    if (normalizedTitle === token) return score + 100;
    if (normalizedTitle.startsWith(token)) return score + 40;
    if (normalizedTitle.includes(token)) return score + 20;
    if (normalizedCategory.includes(token)) return score + 10;
    if (searchable.includes(token)) return score + 4;
    return score;
  }, 0);
}

export function AdvancedComponentSearch() {
  const router = useRouter();
  const rootRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState(ALL_CATEGORIES);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const deferredQuery = React.useDeferredValue(query);

  const matches = React.useMemo(() => {
    const tokens = deferredQuery.toLowerCase().trim().split(/\s+/).filter(Boolean);

    return searchIndex
      .filter((card) => category === ALL_CATEGORIES || card.category === category)
      .filter((card) => tokens.every((token) => card.searchable.includes(token)))
      .map((card) => ({
        card,
        score: tokens.length ? scoreResult(card.searchable, card.title, card.category, tokens) : 0,
      }))
      .sort((a, b) => b.score - a.score || a.card.title.localeCompare(b.card.title));
  }, [category, deferredQuery]);

  const visibleResults = matches.slice(0, MAX_VISIBLE_RESULTS);

  React.useEffect(() => {
    setActiveIndex(0);
  }, [category, deferredQuery]);

  React.useEffect(() => {
    const onShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
        requestAnimationFrame(() => inputRef.current?.focus());
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };

    window.addEventListener("keydown", onShortcut);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onShortcut);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  const openResult = React.useCallback(
    (href: string) => {
      setOpen(false);
      inputRef.current?.blur();
      router.push(href);
    },
    [router],
  );

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
      return;
    }
    if (!visibleResults.length) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);
      setActiveIndex((index) => (index + 1) % visibleResults.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setOpen(true);
      setActiveIndex((index) => (index - 1 + visibleResults.length) % visibleResults.length);
    } else if (event.key === "Enter" && open) {
      event.preventDefault();
      openResult(visibleResults[activeIndex]?.card.href ?? visibleResults[0].card.href);
    }
  };

  return (
    <div ref={rootRef} className="relative min-w-0">
      <div className="relative">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 cs-subtle" strokeWidth={2} aria-hidden="true" />
        <input
          ref={inputRef}
          type="search"
          role="combobox"
          aria-label={`Search all ${cardRoutes.length} components`}
          aria-expanded={open}
          aria-controls="global-component-search-results"
          aria-autocomplete="list"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder={`Search ${cardRoutes.length} components…`}
          className="h-8 w-40 rounded-lg border cs-border cs-input py-1.5 pl-8 pr-8 text-[12px] cs-text outline-none transition placeholder:cs-subtle focus-visible:w-56 focus-visible:ring-2 focus-visible:ring-cyan-400/40 sm:w-52 lg:w-72 lg:focus-visible:w-80"
        />
        {query ? (
          <button
            type="button"
            aria-label="Clear global search"
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded cs-subtle hover:cs-text"
          >
            <X className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        ) : (
          <kbd className="pointer-events-none absolute right-2 top-1/2 hidden -translate-y-1/2 rounded border cs-border px-1 py-0.5 text-[9px] font-semibold cs-subtle lg:block">⌘K</kbd>
        )}
      </div>

      {open && (
        <div
          id="global-component-search-results"
          role="listbox"
          className="absolute right-0 top-10 z-80 w-[min(40rem,calc(100vw-1.5rem))] overflow-hidden rounded-2xl border cs-border bg-[var(--card-surface)] shadow-2xl backdrop-blur-xl"
        >
          <div className="flex items-center gap-2 border-b cs-border p-2.5">
            <select
              aria-label="Filter search by category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="min-w-0 flex-1 rounded-lg border cs-border cs-input px-2.5 py-2 text-xs font-medium cs-text outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40"
            >
              {categories.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <span className="shrink-0 text-[11px] tabular-nums cs-subtle">
              {matches.length} result{matches.length === 1 ? "" : "s"}
            </span>
          </div>

          <div className="max-h-[min(30rem,65vh)] overflow-y-auto p-1.5">
            {visibleResults.length ? visibleResults.map(({ card }, index) => (
              <button
                key={card.slug}
                type="button"
                role="option"
                aria-selected={index === activeIndex}
                onMouseEnter={() => {
                  setActiveIndex(index);
                  router.prefetch(card.href);
                }}
                onFocus={() => {
                  setActiveIndex(index);
                  router.prefetch(card.href);
                }}
                onClick={() => openResult(card.href)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left outline-none transition ${
                  index === activeIndex ? "bg-[var(--card-hover)]" : "hover:bg-[var(--card-hover)]"
                }`}
              >
                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: card.accent }} aria-hidden="true" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-xs font-semibold cs-text">{card.title}</span>
                  <span className="mt-0.5 block truncate text-[10.5px] cs-subtle">{card.animation}</span>
                </span>
                <span className="shrink-0 rounded-full border cs-border px-2 py-1 text-[9px] font-semibold cs-muted">{card.category}</span>
              </button>
            )) : (
              <div className="px-4 py-10 text-center">
                <p className="text-sm font-semibold cs-text">No components found</p>
                <p className="mt-1 text-xs cs-muted">Try fewer keywords or choose another category.</p>
              </div>
            )}
          </div>

          {matches.length > MAX_VISIBLE_RESULTS && (
            <div className="border-t cs-border px-3 py-2 text-[10.5px] cs-subtle">
              Showing the best {MAX_VISIBLE_RESULTS} matches. Add more keywords to narrow the search.
            </div>
          )}
        </div>
      )}
    </div>
  );
}