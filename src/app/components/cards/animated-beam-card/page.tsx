import { CardPage } from "@/components/library/CardPage";

export default function Page() {
  return (
    <CardPage slug="animated-beam-card">
      <div className="flex h-full items-center justify-center p-8">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Animated Beam component requires container refs.</p>
          <p className="mt-1 text-xs text-muted-foreground/60">View source code in the Code tab.</p>
        </div>
      </div>
    </CardPage>
  );
}
