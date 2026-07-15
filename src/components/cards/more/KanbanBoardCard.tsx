"use client";

// ════════════════════════════════════════════════════════════════════════════
// KanbanBoardCard — Premium drag-and-drop project board (@dnd-kit) · ADVANCED
// ════════════════════════════════════════════════════════════════════════════
// A Linear/Trello-tier board: cards reorder within a column and move across
// columns with a lifted DragOverlay, WIP counts, inline task composer, live
// search, and full keyboard-drag accessibility. State lives in a zustand store.
// Module: ../premium-kanban/{board-store, Column, TaskCard}.

import {
  DndContext,
  DragOverlay,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  closestCorners,
  type DragStartEvent,
  type DragOverEvent,
  type DragEndEvent,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { LayoutGrid, Search, Plus, SlidersHorizontal } from "lucide-react";
import { Column } from "../premium-kanban/Column";
import { CardContent } from "../premium-kanban/TaskCard";
import { useBoardStore, type Card } from "../premium-kanban/board-store";

export function KanbanBoardCard() {
  const columns = useBoardStore((s) => s.columns);
  const columnCards = useBoardStore((s) => s.columnCards);
  const cardsById = useBoardStore((s) => s.cardsById);
  const query = useBoardStore((s) => s.query);
  const setQuery = useBoardStore((s) => s.setQuery);
  const addCard = useBoardStore((s) => s.addCard);
  const activeId = useBoardStore((s) => s.activeId);
  const setActiveId = useBoardStore((s) => s.setActiveId);
  const moveOver = useBoardStore((s) => s.moveOver);
  const reorderEnd = useBoardStore((s) => s.reorderEnd);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const q = query.trim().toLowerCase();
  const activeCard: Card | null = activeId ? cardsById[activeId] ?? null : null;
  const total = Object.keys(cardsById).length;

  return (
    <div className="flex h-full min-h-0 w-full flex-col bg-[#f8f9fc] text-slate-900">
      {/* Toolbar */}
      <div className="flex shrink-0 items-center gap-3 border-b border-slate-200 bg-white/70 px-4 py-3 backdrop-blur">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 text-white">
          <LayoutGrid className="h-4 w-4" strokeWidth={2.2} />
        </span>
        <div className="flex flex-col leading-none">
          <span className="text-[14px] font-bold tracking-tight">Sprint Board</span>
          <span className="mt-0.5 text-[11px] text-slate-400">{total} tasks · {columns.length} columns</span>
        </div>

        <div className="relative ml-auto hidden sm:block">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tasks…"
            aria-label="Search tasks"
            className="h-9 w-44 rounded-lg border border-slate-200 bg-white pl-8 pr-3 text-[13px] outline-none transition focus:w-56 focus:ring-2 focus:ring-indigo-400/40"
          />
        </div>
        <button className="hidden h-9 items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 text-[12.5px] text-slate-500 transition-colors hover:bg-slate-50 md:flex">
          <SlidersHorizontal className="h-3.5 w-3.5" /> Filter
        </button>
        <button
          onClick={() => addCard("backlog", "New task")}
          className="flex h-9 items-center gap-1.5 rounded-lg bg-indigo-500 px-3 text-[12.5px] font-semibold text-white transition-colors hover:bg-indigo-600"
        >
          <Plus className="h-4 w-4" /> New
        </button>
      </div>

      {/* Board */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={(e: DragStartEvent) => setActiveId(String(e.active.id))}
        onDragOver={(e: DragOverEvent) => {
          if (e.over) moveOver(String(e.active.id), String(e.over.id));
        }}
        onDragEnd={(e: DragEndEvent) => {
          if (e.over) reorderEnd(String(e.active.id), String(e.over.id));
          setActiveId(null);
        }}
        onDragCancel={() => setActiveId(null)}
      >
        <div className="min-h-0 flex-1 overflow-x-auto overflow-y-hidden p-4 [scrollbar-width:thin]">
          <div className="flex h-full min-h-0 gap-4">
            {columns.map((col) => {
              const cards = columnCards[col.id]
                .map((id) => cardsById[id])
                .filter((c): c is Card => Boolean(c) && (!q || c.title.toLowerCase().includes(q)));
              return <Column key={col.id} column={col} cards={cards} />;
            })}
          </div>
        </div>

        <DragOverlay dropAnimation={{ duration: 220, easing: "cubic-bezier(0.16,1,0.3,1)" }}>
          {activeCard ? (
            <div className="w-[272px] rotate-2">
              <CardContent card={activeCard} dragging />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
