import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Executive Constellation - Backgrounds React Component",
  description: "Executive Constellation is a production-ready backgrounds React component featuring Deterministic SVG network · technical depth · no canvas loop ·...",
  keywords: ["Executive Constellation","Backgrounds component","Backgrounds React component","Backgrounds Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/backgrounds/particle-constellation-bg" },
  openGraph: {
    type: "website",
    url: "/components/backgrounds/particle-constellation-bg",
    title: "Executive Constellation - Backgrounds React Component",
    description: "Executive Constellation is a production-ready backgrounds React component featuring Deterministic SVG network · technical depth · no canvas loop ·...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Executive Constellation - Backgrounds React Component",
    description: "Executive Constellation is a production-ready backgrounds React component featuring Deterministic SVG network · technical depth · no canvas loop ·...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Executive Constellation",
  "description": "Executive Constellation is a production-ready backgrounds React component featuring Deterministic SVG network · technical depth · no canvas loop ·...",
  "url": "https://ui.mtverse.dev/components/backgrounds/particle-constellation-bg",
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
