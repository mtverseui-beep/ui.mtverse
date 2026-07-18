"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

type Props = React.ComponentProps<typeof NextThemesProvider>;

// Compatibility boundary for components that import next-themes. The root layout
// forces the public library to light mode, so there is no global theme state or toggle.
export function ThemeProvider({ children, ...props }: Props) {
  return (
    <NextThemesProvider {...props}>
      <div suppressHydrationWarning className="contents">
        {children}
      </div>
    </NextThemesProvider>
  );
}
