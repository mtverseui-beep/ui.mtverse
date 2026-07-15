"use client";
import { PageShowcase } from "@/components/navbar-showcase/PageShowcase";
import { KanbanBoardCard } from "@/components/cards/more/KanbanBoardCard";

export default function Page() {
  return (
    <PageShowcase slug="kanban-board-card">
      <KanbanBoardCard />
    </PageShowcase>
  );
}
