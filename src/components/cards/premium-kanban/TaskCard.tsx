"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MessageSquare, Paperclip, CheckSquare, Calendar } from "lucide-react";
import type { Card } from "./board-store";

const PRIORITY: Record<Card["priority"], { label: string; color: string }> = {
  urgent: { label: "Urgent", color: "#ef4444" },
  high: { label: "High", color: "#f97316" },
  medium: { label: "Medium", color: "#eab308" },
  low: { label: "Low", color: "#64748b" },
};

// Presentational card — reused by the sortable wrapper AND the DragOverlay
// (so the overlay never mounts a second useSortable with the same id).
export function CardContent({ card, dragging = false }: { card: Card; dragging?: boolean }) {
  const p = PRIORITY[card.priority];
  return (
    <div
      className={`rounded-xl border bg-white p-3 transition-shadow ${
        dragging ? "border-indigo-300 shadow-xl ring-2 ring-indigo-400/30" : "border-slate-200 shadow-sm hover:border-slate-300"
      }`}
    >
      {card.labels.length > 0 && (
        <div className="mb-2 flex flex-wrap gap-1">
          {card.labels.map((l) => (
            <span
              key={l.name}
              className="rounded px-1.5 py-0.5 text-[10px] font-semibold"
              style={{ background: `${l.color}1a`, color: l.color }}
            >
              {l.name}
            </span>
          ))}
        </div>
      )}

      <p className="text-[13px] font-medium leading-snug text-slate-800">{card.title}</p>

      <div className="mt-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-semibold"
            style={{ background: `${p.color}1a`, color: p.color }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: p.color }} />
            {p.label}
          </span>
          {card.subtasks.total > 0 && (
            <span className="inline-flex items-center gap-1 text-[11px] text-slate-400">
              <CheckSquare className="h-3 w-3" />
              {card.subtasks.done}/{card.subtasks.total}
            </span>
          )}
        </div>
        {card.assignees.length > 0 && (
          <div className="flex -space-x-1.5">
            {card.assignees.map((a) => (
              <span
                key={a.initials}
                className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-white text-[9px] font-bold text-white"
                style={{ background: a.color }}
              >
                {a.initials}
              </span>
            ))}
          </div>
        )}
      </div>

      {(card.comments > 0 || card.attachments > 0 || card.due) && (
        <div className="mt-2 flex items-center gap-3 border-t border-slate-100 pt-2 text-[11px] text-slate-400">
          {card.due && (
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {card.due}
            </span>
          )}
          {card.comments > 0 && (
            <span className="inline-flex items-center gap-1">
              <MessageSquare className="h-3 w-3" />
              {card.comments}
            </span>
          )}
          {card.attachments > 0 && (
            <span className="inline-flex items-center gap-1">
              <Paperclip className="h-3 w-3" />
              {card.attachments}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export function TaskCard({ card }: { card: Card }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card.id,
    data: { type: "card" },
  });
  const style = { transform: CSS.Transform.toString(transform), transition };
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`touch-none cursor-grab outline-none active:cursor-grabbing ${isDragging ? "opacity-40" : ""}`}
    >
      <CardContent card={card} />
    </div>
  );
}
