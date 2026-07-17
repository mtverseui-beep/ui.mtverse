import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aurora Wave SVG Ribbons Starfield – Hero React Component",
  description: "Aurora Wave SVG Ribbons Starfield is a production-ready hero React component featuring Aurora wave — 5 animated SVG sine-wave ribbons + starfield + scroll…",
  keywords: ["Aurora Wave SVG Ribbons Starfield","Hero component","Hero React component","Hero Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/hero017-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/hero017-card",
    title: "Aurora Wave SVG Ribbons Starfield – Hero React Component",
    description: "Aurora Wave SVG Ribbons Starfield is a production-ready hero React component featuring Aurora wave — 5 animated SVG sine-wave ribbons + starfield + scroll…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aurora Wave SVG Ribbons Starfield – Hero React Component",
    description: "Aurora Wave SVG Ribbons Starfield is a production-ready hero React component featuring Aurora wave — 5 animated SVG sine-wave ribbons + starfield + scroll…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Aurora Wave SVG Ribbons Starfield",
  "description": "Aurora Wave SVG Ribbons Starfield is a production-ready hero React component featuring Aurora wave — 5 animated SVG sine-wave ribbons + starfield + scroll…",
  "url": "https://www.mtverse.dev/components/cards/hero017-card",
  "programmingLanguage": [
    "TypeScript",
    "React",
    "CSS"
  ],
  "runtimePlatform": "Next.js",
  "codeRepository": "https://github.com/mtverse",
  "author": {
    "@type": "Organization",
    "name": "mtverse",
    "url": "https://www.mtverse.dev"
  }
};

export default function ComponentLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\u003c") }}
      />
      {children}
    </>
  );
}
