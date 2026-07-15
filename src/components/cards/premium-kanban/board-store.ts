import { create } from "zustand";
import { arrayMove } from "@dnd-kit/sortable";

// ════════════════════════════════════════════════════════════════════════════
// Kanban board store (zustand) + types + seed
// ════════════════════════════════════════════════════════════════════════════
// Holds columns, cards, and ordered card ids per column. Drag operations are
// split into `moveOver` (cross-column, live during drag) and `reorderEnd`
// (in-column reorder on drop) — the canonical @dnd-kit multi-container pattern.

export type Priority = "urgent" | "high" | "medium" | "low";
export interface Label {
  name: string;
  color: string;
}
export interface Assignee {
  initials: string;
  color: string;
}
export interface Card {
  id: string;
  title: string;
  priority: Priority;
  labels: Label[];
  assignees: Assignee[];
  due?: string;
  subtasks: { done: number; total: number };
  comments: number;
  attachments: number;
}
export interface Column {
  id: string;
  title: string;
  accent: string;
}

const COLUMNS: Column[] = [
  { id: "backlog", title: "Backlog", accent: "#64748b" },
  { id: "in-progress", title: "In Progress", accent: "#6366f1" },
  { id: "in-review", title: "In Review", accent: "#f59e0b" },
  { id: "done", title: "Done", accent: "#10b981" },
];

const L = {
  design: { name: "Design", color: "#a855f7" },
  frontend: { name: "Frontend", color: "#3b82f6" },
  backend: { name: "Backend", color: "#10b981" },
  bug: { name: "Bug", color: "#ef4444" },
  research: { name: "Research", color: "#f59e0b" },
  infra: { name: "Infra", color: "#64748b" },
};
const A = {
  sc: { initials: "SC", color: "#6366f1" },
  jd: { initials: "JD", color: "#ec4899" },
  mk: { initials: "MK", color: "#10b981" },
  al: { initials: "AL", color: "#f59e0b" },
  rp: { initials: "RP", color: "#06b6d4" },
};

const SEED: { col: string; card: Omit<Card, "id"> }[] = [
  { col: "backlog", card: { title: "Design onboarding illustration set", priority: "medium", labels: [L.design], assignees: [A.sc], subtasks: { done: 0, total: 4 }, comments: 2, attachments: 0 } },
  { col: "backlog", card: { title: "Research competitor pricing tiers", priority: "low", labels: [L.research], assignees: [A.jd], subtasks: { done: 0, total: 0 }, comments: 1, attachments: 0 } },
  { col: "backlog", card: { title: "Spike: evaluate edge runtime options", priority: "high", labels: [L.backend, L.research], assignees: [A.mk], subtasks: { done: 0, total: 3 }, comments: 0, attachments: 1 } },
  { col: "in-progress", card: { title: "Build drag-and-drop board interactions", priority: "high", labels: [L.frontend], assignees: [A.sc, A.al], due: "Nov 12", subtasks: { done: 3, total: 6 }, comments: 5, attachments: 2 } },
  { col: "in-progress", card: { title: "Refactor auth guard middleware", priority: "medium", labels: [L.backend], assignees: [A.mk], subtasks: { done: 2, total: 3 }, comments: 1, attachments: 0 } },
  { col: "in-progress", card: { title: "Fix Safari scroll jank on board", priority: "urgent", labels: [L.bug, L.frontend], assignees: [A.al], subtasks: { done: 0, total: 0 }, comments: 3, attachments: 0 } },
  { col: "in-review", card: { title: "Dashboard chart tooltips", priority: "medium", labels: [L.frontend], assignees: [A.rp], due: "Nov 09", subtasks: { done: 4, total: 4 }, comments: 2, attachments: 0 } },
  { col: "in-review", card: { title: "API rate-limit response headers", priority: "high", labels: [L.backend], assignees: [A.mk], subtasks: { done: 0, total: 0 }, comments: 0, attachments: 1 } },
  { col: "done", card: { title: "Set up CI/CD pipeline", priority: "medium", labels: [L.infra], assignees: [A.jd], subtasks: { done: 5, total: 5 }, comments: 0, attachments: 0 } },
  { col: "done", card: { title: "Dark-mode design tokens", priority: "low", labels: [L.design, L.frontend], assignees: [A.sc], subtasks: { done: 3, total: 3 }, comments: 1, attachments: 0 } },
];

const seedCardsById: Record<string, Card> = {};
const seedColumnCards: Record<string, string[]> = { backlog: [], "in-progress": [], "in-review": [], done: [] };
SEED.forEach((s, i) => {
  const id = `t-${i + 1}`;
  seedCardsById[id] = { id, ...s.card };
  seedColumnCards[s.col].push(id);
});

function findColumn(cc: Record<string, string[]>, id: string): string | undefined {
  if (id in cc) return id; // id is a column id (empty-area drop)
  return Object.keys(cc).find((c) => cc[c].includes(id));
}

interface BoardState {
  columns: Column[];
  cardsById: Record<string, Card>;
  columnCards: Record<string, string[]>;
  seq: number;
  query: string;
  activeId: string | null;
  setQuery: (q: string) => void;
  setActiveId: (id: string | null) => void;
  addCard: (columnId: string, title: string) => void;
  moveOver: (activeId: string, overId: string) => void;
  reorderEnd: (activeId: string, overId: string) => void;
}

export const useBoardStore = create<BoardState>()((set) => ({
  columns: COLUMNS,
  cardsById: seedCardsById,
  columnCards: seedColumnCards,
  seq: SEED.length + 1,
  query: "",
  activeId: null,

  setQuery: (q) => set({ query: q }),
  setActiveId: (id) => set({ activeId: id }),

  addCard: (columnId, title) =>
    set((state) => {
      const id = `t-${state.seq}`;
      const card: Card = {
        id,
        title,
        priority: "medium",
        labels: [],
        assignees: [],
        subtasks: { done: 0, total: 0 },
        comments: 0,
        attachments: 0,
      };
      return {
        seq: state.seq + 1,
        cardsById: { ...state.cardsById, [id]: card },
        columnCards: { ...state.columnCards, [columnId]: [...state.columnCards[columnId], id] },
      };
    }),

  // Cross-column live move while dragging (over another column or its cards).
  moveOver: (activeId, overId) =>
    set((state) => {
      const from = findColumn(state.columnCards, activeId);
      const to = findColumn(state.columnCards, overId);
      if (!from || !to || from === to) return state;
      const fromArr = state.columnCards[from].filter((x) => x !== activeId);
      const toArr = [...state.columnCards[to]];
      const overIsColumn = overId in state.columnCards;
      const overIndex = overIsColumn ? toArr.length : toArr.indexOf(overId);
      const insertAt = overIndex < 0 ? toArr.length : overIndex;
      toArr.splice(insertAt, 0, activeId);
      return { columnCards: { ...state.columnCards, [from]: fromArr, [to]: toArr } };
    }),

  // In-column reorder on drop (cross-column already resolved by moveOver).
  reorderEnd: (activeId, overId) =>
    set((state) => {
      const from = findColumn(state.columnCards, activeId);
      const to = findColumn(state.columnCards, overId);
      if (!from || !to || from !== to) return state;
      const arr = state.columnCards[from];
      const oldIndex = arr.indexOf(activeId);
      const newIndex = overId in state.columnCards ? arr.length - 1 : arr.indexOf(overId);
      if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) return state;
      return { columnCards: { ...state.columnCards, [from]: arrayMove(arr, oldIndex, newIndex) } };
    }),
}));
