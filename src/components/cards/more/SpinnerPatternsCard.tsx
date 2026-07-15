"use client";

import type React from "react";



interface SpinnerCardProps {
  name: string;
  children: React.ReactNode;
}

function SpinnerCard({ name, children }: SpinnerCardProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-card p-6">
      <div className="flex h-20 w-20 items-center justify-center">{children}</div>
      <span className="mt-4 text-sm font-medium text-muted-foreground">{name}</span>
    </div>
  );
}

// 1. Classic Spinner
function ClassicSpinner() {
  return <div className="h-8 w-8 animate-spin rounded-full border-4 border-muted border-t-primary" />;
}

// 2. Dual Ring
function DualRing() {
  return (
    <div className="relative h-10 w-10">
      <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-primary" />
      <div className="absolute inset-1 animate-spin rounded-full border-4 border-transparent border-b-primary/50 [animation-direction:reverse] [animation-duration:1.5s]" />
    </div>
  );
}

// 3. Pulse
function PulseSpinner() {
  return <div className="h-8 w-8 animate-pulse rounded-full bg-primary" />;
}

// 4. Bounce Dots
function BounceDots() {
  return (
    <div className="flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="h-3 w-3 animate-bounce rounded-full bg-primary"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  );
}

// 5. Fade Dots
function FadeDots() {
  return (
    <div className="flex items-center gap-2">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="h-2.5 w-2.5 animate-pulse rounded-full bg-primary"
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </div>
  );
}

// 6. Ring Pulse
function RingPulse() {
  return (
    <div className="relative flex h-10 w-10 items-center justify-center">
      <div className="absolute h-full w-full animate-ping rounded-full bg-primary/30" />
      <div className="h-4 w-4 rounded-full bg-primary" />
    </div>
  );
}

// 7. Bar Loader
function BarLoader() {
  return (
    <div className="flex h-8 items-end gap-1">
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="w-1.5 animate-pulse rounded-full bg-primary"
          style={{
            height: "16px",
            animationDelay: `${i * 0.1}s`,
            animationDuration: "0.6s",
          }}
        />
      ))}
    </div>
  );
}

// 8. Rotating Squares
function RotatingSquares() {
  return (
    <div className="relative h-8 w-8 animate-spin [animation-duration:2s]">
      <div className="absolute left-0 top-0 h-3 w-3 rounded-sm bg-primary" />
      <div className="absolute right-0 top-0 h-3 w-3 rounded-sm bg-primary/70" />
      <div className="absolute bottom-0 right-0 h-3 w-3 rounded-sm bg-primary/50" />
      <div className="absolute bottom-0 left-0 h-3 w-3 rounded-sm bg-primary/30" />
    </div>
  );
}

// 9. Growing Ring
function GrowingRing() {
  return (
    <div className="relative h-10 w-10">
      <div className="absolute inset-0 animate-ping rounded-full border-4 border-primary opacity-75" />
      <div className="absolute inset-2 animate-ping rounded-full border-2 border-primary opacity-50 [animation-delay:0.2s]" />
    </div>
  );
}

// 10. Dot Grid
function DotGrid() {
  return (
    <div className="grid grid-cols-3 gap-1">
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <div
          key={i}
          className="h-2 w-2 animate-pulse rounded-full bg-primary"
          style={{ animationDelay: `${i * 0.1}s` }}
        />
      ))}
    </div>
  );
}

// 11. Spinning Bars
function SpinningBars() {
  return (
    <div className="relative h-8 w-8 animate-spin">
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <div
          key={i}
          className="absolute left-1/2 top-0 h-2.5 w-1 -translate-x-1/2 rounded-full bg-primary"
          style={{
            transform: `rotate(${i * 45}deg) translateY(0)`,
            transformOrigin: "center 16px",
            opacity: 1 - i * 0.1,
          }}
        />
      ))}
    </div>
  );
}

// 12. Orbit
function OrbitSpinner() {
  return (
    <div className="relative h-10 w-10 animate-spin [animation-duration:1.5s]">
      <div className="absolute inset-0 rounded-full border-2 border-muted" />
      <div className="absolute -top-1 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-primary" />
    </div>
  );
}

// 13. Scale Squares
function ScaleSquares() {
  return (
    <div className="flex gap-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="h-4 w-4 animate-pulse rounded-sm bg-primary"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  );
}

// 14. Circular Progress
function CircularProgress() {
  return (
    <svg className="h-10 w-10 animate-spin" viewBox="0 0 50 50">
      <circle className="stroke-muted" cx="25" cy="25" r="20" fill="none" strokeWidth="4" />
      <circle
        className="stroke-primary"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="80 120"
      />
    </svg>
  );
}

// 15. Flip Card
function FlipCard() {
  return (
    <div
      className="h-8 w-8 rounded-md bg-primary"
      style={{
        animation: "flip 1s ease-in-out infinite",
      }}
    />
  );
}

// 16. Wave Bars
function WaveBars() {
  return (
    <div className="flex h-8 items-center gap-0.5">
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="w-1.5 rounded-full bg-primary"
          style={{
            animation: "wave 1s ease-in-out infinite",
            animationDelay: `${i * 0.1}s`,
            height: "8px",
          }}
        />
      ))}
    </div>
  );
}

// 17. Ripple
function RippleSpinner() {
  return (
    <div className="relative h-10 w-10">
      <div
        className="absolute inset-0 rounded-full border-2 border-primary"
        style={{
          animation: "ripple 1.5s ease-out infinite",
        }}
      />
      <div
        className="absolute inset-0 rounded-full border-2 border-primary"
        style={{
          animation: "ripple 1.5s ease-out infinite",
          animationDelay: "0.5s",
        }}
      />
    </div>
  );
}

// 18. Spinning Gradient
function SpinningGradient() {
  return (
    <div
      className="h-8 w-8 animate-spin rounded-full"
      style={{
        background: "conic-gradient(from 0deg, transparent, hsl(var(--primary)))",
      }}
    />
  );
}

const spinnerNames = [
  "Classic Spinner",
  "Dual Ring",
  "Pulse",
  "Bounce Dots",
  "Fade Dots",
  "Ring Pulse",
  "Bar Loader",
  "Rotating Squares",
  "Growing Ring",
  "Dot Grid",
  "Spinning Bars",
  "Orbit",
  "Scale Squares",
  "Circular Progress",
  "Flip Card",
  "Wave Bars",
  "Ripple",
  "Spinning Gradient",
];
const spinnerComponents = [
  ClassicSpinner,
  DualRing,
  PulseSpinner,
  BounceDots,
  FadeDots,
  RingPulse,
  BarLoader,
  RotatingSquares,
  GrowingRing,
  DotGrid,
  SpinningBars,
  OrbitSpinner,
  ScaleSquares,
  CircularProgress,
  FlipCard,
  WaveBars,
  RippleSpinner,
  SpinningGradient,
];

export function SpinnerPatternsCard() {


  return (
    <>
      <style>{`
        @keyframes flip {
          0% { transform: perspective(120px) rotateX(0deg) rotateY(0deg); }
          50% { transform: perspective(120px) rotateX(-180deg) rotateY(0deg); }
          100% { transform: perspective(120px) rotateX(-180deg) rotateY(-180deg); }
        }
        @keyframes wave {
          0%, 100% { height: 8px; }
          50% { height: 24px; }
        }
        @keyframes ripple {
          0% { transform: scale(0.5); opacity: 1; }
          100% { transform: scale(1.5); opacity: 0; }
        }
      `}</style>
      <div className="min-h-full bg-background p-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-2 text-3xl font-bold text-foreground">Spinner Animation Patterns</h1>
          <p className="mb-8 text-muted-foreground">A collection of 18 loading spinner animations</p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {spinnerNames.map((name, index) => {
              const SpinnerComponent = spinnerComponents[index];
              return (
                <SpinnerCard
                  key={name}
                  name={name}

                >
                  <SpinnerComponent />
                </SpinnerCard>
              );
            })}
          </div>
        </div>
      </div>

    </>
  );
}
