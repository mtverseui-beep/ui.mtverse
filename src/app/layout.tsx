import type { Metadata } from "next";
import { Archivo, Cormorant_Garamond, Fraunces, Geist, Geist_Mono, Instrument_Serif, Inter_Tight, JetBrains_Mono, Manrope, Playfair_Display, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/theme-provider";
import { MAIN_SITE_URL, UI_SITE_DESCRIPTION, UI_SITE_NAME, UI_SITE_URL } from "@/lib/site-config";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"], preload: false });
const jetbrainsMono = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], preload: false });
const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], preload: false });
const fraunces = Fraunces({ variable: "--font-fraunces", subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800", "900"], preload: false });
const archivo = Archivo({ variable: "--font-archivo", subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"], preload: false });
const cormorant = Cormorant_Garamond({ variable: "--font-cormorant", subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], preload: false });
const instrumentSerif = Instrument_Serif({ variable: "--font-instrument", subsets: ["latin"], weight: ["400"], preload: false });
const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800"], preload: false });
const interTight = Inter_Tight({ variable: "--font-inter-tight", subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800", "900"], preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(UI_SITE_URL),
  title: { default: "mtverse UI - React and Next.js Component Library", template: "%s | mtverse UI" },
  description: UI_SITE_DESCRIPTION,
  keywords: ["React component library", "Next.js components", "TypeScript components", "Tailwind CSS components", "animated UI components", "responsive React components", "dashboard UI components"],
  authors: [{ name: "mtverse", url: MAIN_SITE_URL }],
  creator: "mtverse",
  publisher: "mtverse",
  applicationName: UI_SITE_NAME,
  category: "Web Development",
  alternates: { canonical: UI_SITE_URL },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: UI_SITE_URL,
    siteName: UI_SITE_NAME,
    title: "mtverse UI - React and Next.js Component Library",
    description: UI_SITE_DESCRIPTION,
    images: [{ url: "/mtverse-logo.png", width: 1200, height: 630, alt: "mtverse UI" }],
  },
  twitter: { card: "summary", title: "mtverse UI - React and Next.js Component Library", description: UI_SITE_DESCRIPTION, images: ["/mtverse-logo.png"] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  icons: { icon: "/mtverse-logo.png", shortcut: "/mtverse-logo.png", apple: "/mtverse-logo.png" },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} ${fraunces.variable} ${archivo.variable} ${cormorant.variable} ${instrumentSerif.variable} ${manrope.variable} ${interTight.variable}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
