"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { Moon, Sun } from "lucide-react";

interface BgContextType {
  dark: boolean;
}

const BgContext = createContext<BgContextType | null>(null);

export function useBg() {
  const context = useContext(BgContext);
  if (!context) throw new Error("useBg must be used inside BackgroundShell");
  return context;
}

export function BackgroundShell({ children, darkDefault = false }: { children: ReactNode; darkDefault?: boolean }) {
  const [dark, setDark] = useState(darkDefault);

  return (
    <BgContext.Provider value={{ dark }}>
      <div data-bg-theme={dark ? "dark" : "light"} className={`relative h-full min-h-full w-full overflow-hidden ${dark ? "dark" : ""}`}>
        <div className="absolute inset-0">{children}</div>
        <button
          type="button"
          onClick={() => setDark((current) => !current)}
          aria-label={dark ? "Switch background to light mode" : "Switch background to dark mode"}
          aria-pressed={dark}
          className="absolute bottom-4 right-4 z-30 flex h-10 w-10 items-center justify-center rounded-full border shadow-lg backdrop-blur-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          style={{
            background: dark ? "rgba(15,23,42,0.72)" : "rgba(255,255,255,0.78)",
            borderColor: dark ? "rgba(255,255,255,0.14)" : "rgba(15,23,42,0.10)",
            color: dark ? "#f8fafc" : "#0f172a",
          }}
        >
          {dark ? <Sun aria-hidden="true" className="h-4 w-4" /> : <Moon aria-hidden="true" className="h-4 w-4" />}
        </button>
      </div>
    </BgContext.Provider>
  );
}