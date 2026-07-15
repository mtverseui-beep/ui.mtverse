"use client";

import { useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Plus, X } from "lucide-react";
import { TaskCard } from "./TaskCard";
import { useBoardStore, type Card, type Column as Col } from "./board-store";

export function Column({ column, cards }: { column: Col; cards: Card[] }) {
  const { setNodeRef, isOver } = useDroppable({ id: column.id, data: { type: "column" } });
  const addCard = useBoardStore((s) => s.addCard);
  const [composing, setComposing] = useState(false);
  const [title, setTitle] = useState("");

  const submit = () => {
    const t = title.trim();
    if (t) addCard(column.id, t);
    setTitle("");
    setComposing(false);
  };

  return (
    <div className="flex h-full min-h-0 w-72 shrink-0 flex-col rounded-2xl border border-slate-200/70 bg-slate-100/50">
      {/* Header */}
      <div className="flex shrink-0 items-center gap-2 px-3 py-2.5">
        <span className="h-2 w-2 rounded-full" style={{ background: column.accent }} />
        <span className="text-[13px] font-semibold text-slate-700">{column.title}</span>
        <span className="rounded-full bg-slate-200/80 px-1.5 text-[11px] font-semibold text-slate-500">{cards.length}</span>
        <button
          onClick={() => setComposing(true)}
          className="ml-auto flex h-6 w-6 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-200/80 hover:text-slate-700"
          aria-label={`Add task to ${column.title}`}
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      {/* Droppable list */}
      <div
        ref={setNodeRef}
        className={`min-h-0 flex-1 overflow-y-auto px-2 pb-2 transition-colors ${isOver ? "bg-indigo-50/60" : ""}`}
      >
        <SortableContext items={cards.map((c) => c.id)} strategy={verticalListSortingStrategy}>
          <div className="flex flex-col gap-2">
            {cards.map((c) => (
              <TaskCard key={c.id} card={c} />
            ))}
          </div>
        </SortableContext>

        {cards.length === 0 && !composing && (
          <div className="mt-1 rounded-xl border border-dashed border-slate-200 py-8 text-center text-[11px] text-slate-400">
            Drop tasks here
          </div>
        )}

        {composing && (
          <div className="mt-2 rounded-xl border border-indigo-300 bg-white p-2 shadow-sm">
            <textarea
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  submit();
                }
                if (e.key === "Escape") {
                  setComposing(false);
                  setTitle("");
                }
              }}
              placeholder="Task title…"
              rows={2}
              className="w-full resize-none bg-transparent text-[13px] text-slate-800 outline-none placeholder:text-slate-400"
            />
            <div className="mt-1 flex items-center gap-2">
              <button onClick={submit} className="rounded-md bg-indigo-500 px-2.5 py-1 text-[12px] font-semibold text-white transition-colors hover:bg-indigo-600">
                Add task
              </button>
              <button
                onClick={() => {
                  setComposing(false);
                  setTitle("");
                }}
                className="flex h-6 w-6 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                aria-label="Cancel"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
