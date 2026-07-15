"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

type Props = React.ComponentProps<typeof NextThemesProvider>;

// Wraps the app with next-themes. Default theme is dark (matches the
// premium showcase aesthetic), with class-based switching so Tailwind's
// `dark:` variant and our `.dark` CSS variable overrides both activate.
//
// The smooth theme transition is handled by a `theme-transition` class on
// <html> that is added briefly during theme changes — see globals.css.
//
// suppressHydrationWarning is passed to the inner wrapper div to prevent
// the next-themes hydration mismatch warning in dev mode (the .dark class
// is applied client-side after hydration, causing a server/client mismatch).
export function ThemeProvider({ children, ...props }: Props) {
  return (
    <NextThemesProvider {...props}>
      <div suppressHydrationWarning className="contents">
        {children}
      </div>
    </NextThemesProvider>
  );
}
