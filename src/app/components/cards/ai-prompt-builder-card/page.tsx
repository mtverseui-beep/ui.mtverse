import { CardPage } from "@/components/library/CardPage";
import { AIPromptBuilder } from "@/components/cards/ai/AIPromptBuilder";

export default function Page() {
  return (
    <CardPage slug="ai-prompt-builder-card">
      <AIPromptBuilder />
    </CardPage>
  );
}
