import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rhythm Columns - Backgrounds React Component",
  description: "Rhythm Columns is a production-ready backgrounds React component featuring Editorial media rhythm · controlled gradient columns · reduced-motion fallback....",
  keywords: ["Rhythm Columns","Backgrounds component","Backgrounds React component","Backgrounds Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/backgrounds/color-audio-bars-bg" },
  openGraph: {
    type: "website",
    url: "/components/backgrounds/color-audio-bars-bg",
    title: "Rhythm Columns - Backgrounds React Component",
    description: "Rhythm Columns is a production-ready backgrounds React component featuring Editorial media rhythm · controlled gradient columns · reduced-motion fallback....",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Rhythm Columns - Backgrounds React Component",
    description: "Rhythm Columns is a production-ready backgrounds React component featuring Editorial media rhythm · controlled gradient columns · reduced-motion fallback....",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Rhythm Columns",
  "description": "Rhythm Columns is a production-ready backgrounds React component featuring Editorial media rhythm · controlled gradient columns · reduced-motion fallback....",
  "url": "https://ui.mtverse.dev/components/backgrounds/color-audio-bars-bg",
  "programmingLanguage": [
    "TypeScript",
    "React",
    "CSS"
  ],
  "runtimePlatform": "Next.js",
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
