"use client";

import type React from "react";
import { useState } from "react";
import { X, Code } from "lucide-react";

interface SpinnerCardProps {
  name: string;
  children: React.ReactNode;
  spinnerIndex: number;
  onViewCode: (index: number) => void;
}

function SpinnerCard({ name, children, spinnerIndex, onViewCode }: SpinnerCardProps) {
  return (
    <div className="group relative flex flex-col items-center justify-center rounded-lg border border-border bg-card p-6">
      <button
        onClick={() => onViewCode(spinnerIndex)}
        className="absolute right-2 top-2 flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        title="View Code"
      >
        <Code className="h-3 w-3" />
        <span>Code</span>
      </button>
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

interface CodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  spinner: { name: string; code: string; description: string; customKeyframe?: boolean };
}

function CodeModal({ isOpen, onClose, spinner }: CodeModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 flex max-h-[80vh] w-full max-w-lg flex-col rounded-lg border border-border bg-card shadow-lg">
        <div className="flex items-center justify-between border-b border-border p-4">
          <h3 className="text-lg font-semibold text-foreground">{spinner.name}</h3>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2 rounded-md border border-blue-500/30 bg-blue-500/10 px-3 py-2">
              <span className="text-xs font-medium text-blue-600 dark:text-blue-400">Requires Tailwind CSS</span>
            </div>
            <div>
              <h4 className="mb-2 text-sm font-medium text-foreground">Description</h4>
              <p className="text-sm text-muted-foreground">{spinner.description}</p>
            </div>
            <div>
              <h4 className="mb-2 text-sm font-medium text-foreground">Usage</h4>
              <div className="rounded-md bg-muted p-3">
                <pre className="overflow-x-auto text-xs text-foreground">
                  <code>{spinner.code}</code>
                </pre>
              </div>
            </div>
            {spinner.customKeyframe && (
              <div className="rounded-md border border-yellow-500/30 bg-yellow-500/10 p-3">
                <p className="text-xs text-yellow-600 dark:text-yellow-400">
                  This animation requires a custom CSS keyframe. Add it to your global styles or use a style tag.
                </p>
              </div>
            )}
            <div>
              <h4 className="mb-2 text-sm font-medium text-foreground">Steps</h4>
              <ol className="list-inside list-decimal space-y-1 text-sm text-muted-foreground">
                <li>Ensure Tailwind CSS is installed in your project</li>
                <li>Copy the code above</li>
                <li>Paste into your React component</li>
                {spinner.customKeyframe && <li>Add the keyframe CSS to your global styles</li>}
                <li>Customize colors using Tailwind classes</li>
                <li>Adjust size by changing width/height values</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const spinnerData = [
  {
    name: "Classic Spinner",
    code: `<div className="h-8 w-8 animate-spin rounded-full border-4 border-muted border-t-primary" />`,
    description: "A simple spinning circle with a colored arc. Uses Tailwind's built-in animate-spin.",
  },
  {
    name: "Dual Ring",
    code: `<div className="relative h-10 w-10">
  <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-primary" />
  <div className="absolute inset-1 animate-spin rounded-full border-4 border-transparent border-b-primary/50 [animation-direction:reverse] [animation-duration:1.5s]" />
</div>`,
    description: "Two concentric rings spinning in opposite directions for a dynamic effect.",
  },
  {
    name: "Pulse",
    code: `<div className="h-8 w-8 animate-pulse rounded-full bg-primary" />`,
    description: "A simple pulsing circle using Tailwind's animate-pulse utility.",
  },
  {
    name: "Bounce Dots",
    code: `<div className="flex items-center gap-1">
  {[0, 1, 2].map((i) => (
    <div
      key={i}
      className="h-3 w-3 animate-bounce rounded-full bg-primary"
      style={{ animationDelay: \`\${i * 0.15}s\` }}
    />
  ))}
</div>`,
    description: "Three dots bouncing in sequence with staggered delays.",
  },
  {
    name: "Fade Dots",
    code: `<div className="flex items-center gap-2">
  {[0, 1, 2].map((i) => (
    <div
      key={i}
      className="h-2.5 w-2.5 animate-pulse rounded-full bg-primary"
      style={{ animationDelay: \`\${i * 0.2}s\` }}
    />
  ))}
</div>`,
    description: "Three dots fading in and out with staggered timing.",
  },
  {
    name: "Ring Pulse",
    code: `<div className="relative flex h-10 w-10 items-center justify-center">
  <div className="absolute h-full w-full animate-ping rounded-full bg-primary/30" />
  <div className="h-4 w-4 rounded-full bg-primary" />
</div>`,
    description: "A solid dot with an expanding ping effect using animate-ping.",
  },
  {
    name: "Bar Loader",
    code: `<div className="flex h-8 items-end gap-1">
  {[0, 1, 2, 3, 4].map((i) => (
    <div
      key={i}
      className="w-1.5 animate-pulse rounded-full bg-primary"
      style={{
        height: "16px",
        animationDelay: \`\${i * 0.1}s\`,
        animationDuration: "0.6s",
      }}
    />
  ))}
</div>`,
    description: "Multiple vertical bars pulsing to create an equalizer effect.",
  },
  {
    name: "Rotating Squares",
    code: `<div className="relative h-8 w-8 animate-spin [animation-duration:2s]">
  <div className="absolute left-0 top-0 h-3 w-3 rounded-sm bg-primary" />
  <div className="absolute right-0 top-0 h-3 w-3 rounded-sm bg-primary/70" />
  <div className="absolute bottom-0 right-0 h-3 w-3 rounded-sm bg-primary/50" />
  <div className="absolute bottom-0 left-0 h-3 w-3 rounded-sm bg-primary/30" />
</div>`,
    description: "Four squares in corners with varying opacity, rotating together.",
  },
  {
    name: "Growing Ring",
    code: `<div className="relative h-10 w-10">
  <div className="absolute inset-0 animate-ping rounded-full border-4 border-primary opacity-75" />
  <div className="absolute inset-2 animate-ping rounded-full border-2 border-primary opacity-50 [animation-delay:0.2s]" />
</div>`,
    description: "Concentric rings expanding outward with ping animation.",
  },
  {
    name: "Dot Grid",
    code: `<div className="grid grid-cols-3 gap-1">
  {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
    <div
      key={i}
      className="h-2 w-2 animate-pulse rounded-full bg-primary"
      style={{ animationDelay: \`\${i * 0.1}s\` }}
    />
  ))}
</div>`,
    description: "A 3x3 grid of dots pulsing in sequence.",
  },
  {
    name: "Spinning Bars",
    code: `<div className="relative h-8 w-8 animate-spin">
  {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
    <div
      key={i}
      className="absolute left-1/2 top-0 h-2.5 w-1 -translate-x-1/2 rounded-full bg-primary"
      style={{
        transform: \`rotate(\${i * 45}deg) translateY(0)\`,
        transformOrigin: "center 16px",
        opacity: 1 - i * 0.1,
      }}
    />
  ))}
</div>`,
    description: "Eight bars arranged in a circle with fading opacity, spinning together.",
  },
  {
    name: "Orbit",
    code: `<div className="relative h-10 w-10 animate-spin [animation-duration:1.5s]">
  <div className="absolute inset-0 rounded-full border-2 border-muted" />
  <div className="absolute -top-1 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-primary" />
</div>`,
    description: "A dot orbiting around a circular track.",
  },
  {
    name: "Scale Squares",
    code: `<div className="flex gap-1">
  {[0, 1, 2].map((i) => (
    <div
      key={i}
      className="h-4 w-4 animate-pulse rounded-sm bg-primary"
      style={{ animationDelay: \`\${i * 0.15}s\` }}
    />
  ))}
</div>`,
    description: "Three squares pulsing in sequence.",
  },
  {
    name: "Circular Progress",
    code: `<svg className="h-10 w-10 animate-spin" viewBox="0 0 50 50">
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
</svg>`,
    description: "SVG-based circular progress indicator with dashed stroke.",
  },
  {
    name: "Flip Card",
    code: `// Add this CSS
@keyframes flip {
  0% { transform: perspective(120px) rotateX(0deg) rotateY(0deg); }
  50% { transform: perspective(120px) rotateX(-180deg) rotateY(0deg); }
  100% { transform: perspective(120px) rotateX(-180deg) rotateY(-180deg); }
}

// Component
<div
  className="h-8 w-8 rounded-md bg-primary"
  style={{ animation: "flip 1s ease-in-out infinite" }}
/>`,
    description: "A 3D flipping card effect using CSS perspective transforms.",
    customKeyframe: true,
  },
  {
    name: "Wave Bars",
    code: `// Add this CSS
@keyframes wave {
  0%, 100% { height: 8px; }
  50% { height: 24px; }
}

// Component
<div className="flex h-8 items-center gap-0.5">
  {[0, 1, 2, 3, 4].map((i) => (
    <div
      key={i}
      className="w-1.5 rounded-full bg-primary"
      style={{
        animation: "wave 1s ease-in-out infinite",
        animationDelay: \`\${i * 0.1}s\`,
        height: "8px",
      }}
    />
  ))}
</div>`,
    description: "Bars that grow and shrink in a wave pattern.",
    customKeyframe: true,
  },
  {
    name: "Ripple",
    code: `// Add this CSS
@keyframes ripple {
  0% { transform: scale(0.5); opacity: 1; }
  100% { transform: scale(1.5); opacity: 0; }
}

// Component
<div className="relative h-10 w-10">
  <div
    className="absolute inset-0 rounded-full border-2 border-primary"
    style={{ animation: "ripple 1.5s ease-out infinite" }}
  />
  <div
    className="absolute inset-0 rounded-full border-2 border-primary"
    style={{ animation: "ripple 1.5s ease-out infinite", animationDelay: "0.5s" }}
  />
</div>`,
    description: "Expanding ripple circles that fade out.",
    customKeyframe: true,
  },
  {
    name: "Spinning Gradient",
    code: `<div
  className="h-8 w-8 animate-spin rounded-full"
  style={{
    background: "conic-gradient(from 0deg, transparent, hsl(var(--primary)))",
  }}
/>`,
    description: "A spinning gradient circle using CSS conic-gradient.",
  },
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
  const [selectedSpinner, setSelectedSpinner] = useState<number | null>(null);

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
            {spinnerData.map((spinner, index) => {
              const SpinnerComponent = spinnerComponents[index];
              return (
                <SpinnerCard
                  key={spinner.name}
                  name={spinner.name}
                  spinnerIndex={index}
                  onViewCode={setSelectedSpinner}
                >
                  <SpinnerComponent />
                </SpinnerCard>
              );
            })}
          </div>
        </div>
      </div>
      {selectedSpinner !== null && (
        <CodeModal
          isOpen={selectedSpinner !== null}
          onClose={() => setSelectedSpinner(null)}
          spinner={spinnerData[selectedSpinner]}
        />
      )}
    </>
  );
}
