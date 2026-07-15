"use client";
import { useState, createContext, useContext, ReactNode } from "react";
import { Sun, Moon } from "lucide-react";

interface BgContextType { dark: boolean; }
export const BgContext = createContext<BgContextType>({ dark: true });
export const useBg = () => useContext(BgContext);

interface BackgroundShellProps {
  children: ReactNode;
  darkDefault?: boolean;
}

/**
 * Clean, minimal wrapper — just dark/light toggle.
 * No content overlay, no intensity selector, no star button.
 * Professional and production-ready.
 */
export function BackgroundShell({ children, darkDefault = true }: BackgroundShellProps) {
  const [dark, setDark] = useState(darkDefault);
  return (
    <BgContext.Provider value={{ dark }}>
      <div className="relative h-full w-full overflow-hidden">
        <div className="absolute inset-0">{children}</div>
        {/* Single clean toggle — bottom right */}
        <button
          onClick={() => setDark(!dark)}
          className="absolute bottom-3 right-3 z-20 flex h-8 w-8 items-center justify-center rounded-lg backdrop-blur-md transition"
          style={{
            background: dark ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.7)",
            border: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)"}`,
            color: dark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.5)",
          }}
          title="Toggle dark/light"
        >
          {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      </div>
    </BgContext.Provider>
  );
}
