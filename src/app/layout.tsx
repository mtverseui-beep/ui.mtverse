import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, JetBrains_Mono, Space_Grotesk, Fraunces, Archivo, Cormorant_Garamond, Instrument_Serif, Manrope, Inter_Tight } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"] });
const jetbrainsMono = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });
const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });
const fraunces = Fraunces({ variable: "--font-fraunces", subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800", "900"] });
const archivo = Archivo({ variable: "--font-archivo", subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"] });
const cormorant = Cormorant_Garamond({ variable: "--font-cormorant", subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });
const instrumentSerif = Instrument_Serif({ variable: "--font-instrument", subsets: ["latin"], weight: ["400"] });
const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800"] });
const interTight = Inter_Tight({ variable: "--font-inter-tight", subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800", "900"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mtverse.dev"),
  title: {
    default: "mtverse — Premium UI Component Library | 360+ Animated React Components",
    template: "%s · mtverse UI Library",
  },
  description:
    "mtverse is a premium open-source UI component library built with Next.js 16, TypeScript, Tailwind CSS, and Framer Motion. 360+ production-ready animated components: navbars, footers, hero sections, pricing tables, auth flows, testimonials, feature grids, CTAs, charts, dashboards, and more. Copy-paste ready with full source code, dark mode, and responsive design.",
  keywords: [
    // Brand
    "mtverse",
    "mtverse UI",
    "mtverse components",
    // Core tech stack
    "Next.js components",
    "Next.js 16",
    "React components",
    "TypeScript components",
    "Tailwind CSS components",
    "Framer Motion components",
    "shadcn/ui alternative",
    "shadcn ui",
    // Component types
    "UI component library",
    "React component library",
    "Tailwind component library",
    "animated components",
    "card components",
    "navbar components",
    "footer components",
    "hero sections",
    "pricing tables",
    "auth pages",
    "login forms",
    "signup forms",
    "testimonials",
    "feature sections",
    "CTA sections",
    "dashboard templates",
    "chart components",
    "data visualization",
    "bento grid",
    "bento dashboard",
    // Specific patterns
    "responsive components",
    "dark mode components",
    "mobile-first components",
    "copy paste components",
    "open source UI kit",
    "free UI components",
    "modern UI design",
    "glassmorphism",
    "neumorphism",
    "gradient cards",
    "animated cards",
    "interactive UI",
    "micro interactions",
    "page transitions",
    "scroll animations",
    // SEO long-tail
    "React UI kit 2026",
    "best Tailwind components",
    "Next.js dashboard template",
    "Next.js auth template",
    "Next.js landing page",
    "SaaS UI kit",
    "startup landing page components",
    "portfolio website components",
    "agency website template",
    "ecommerce UI components",
    "admin dashboard components",
    "analytics dashboard",
    "component library for SaaS",
    "developer tools",
    "front-end development",
    "web design inspiration",
    "design system",
    "design tokens",
    // Action keywords
    "free components",
    "download UI kit",
    "React components download",
    "Tailwind CSS examples",
    "Next.js examples",
    "Framer Motion examples",
  ],
  authors: [{ name: "mtverse", url: "https://www.mtverse.dev" }],
  creator: "mtverse",
  publisher: "mtverse",
  applicationName: "mtverse UI Library",
  category: "Technology",
  classification: "Web Development · UI Components · Design System",
  alternates: {
    canonical: "https://www.mtverse.dev",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.mtverse.dev",
    siteName: "mtverse UI Library",
    title: "mtverse — Premium UI Component Library | 360+ Animated React Components",
    description:
      "Production-ready animated React components built with Next.js, TypeScript, Tailwind CSS, and Framer Motion. Navbars, footers, heroes, pricing, auth, testimonials, charts, dashboards, and more.",
    images: [
      {
        url: "/mtverse-logo.png",
        width: 64,
        height: 64,
        alt: "mtverse logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "mtverse — Premium UI Component Library",
    description:
      "360+ production-ready animated React components. Next.js · TypeScript · Tailwind CSS · Framer Motion. Copy-paste ready with full source code.",
    creator: "@mtverse",
    images: ["/mtverse-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/mtverse-logo.png",
    shortcut: "/mtverse-logo.png",
    apple: "/mtverse-logo.png",
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} ${fraunces.variable} ${archivo.variable} ${cormorant.variable} ${instrumentSerif.variable} ${manrope.variable} ${interTight.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
