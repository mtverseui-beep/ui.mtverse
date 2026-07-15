import { CardPage } from "@/components/library/CardPage";
import { AnimatedBeamCard } from "@/components/cards/more/AnimatedBeamCard";

export default function Page() {
  return (
    <CardPage slug="animated-beam-card">
      <div className="flex h-full min-h-[520px] w-full items-center justify-center p-4 sm:p-8">
        <AnimatedBeamCard />
      </div>
    </CardPage>
  );
}
