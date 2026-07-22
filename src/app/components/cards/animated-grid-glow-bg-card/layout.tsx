import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Grid Spotlight - Backgrounds React Component",
  description: "Grid Spotlight is a production-ready backgrounds React component featuring Enterprise grid illumination · fixed focal balance · no pointer-state rerenders....",
  keywords: ["Grid Spotlight","Backgrounds component","Backgrounds React component","Backgrounds Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/backgrounds/animated-grid-glow-bg" },
  openGraph: {
    type: "website",
    url: "/components/backgrounds/animated-grid-glow-bg",
    title: "Grid Spotlight - Backgrounds React Component",
    description: "Grid Spotlight is a production-ready backgrounds React component featuring Enterprise grid illumination · fixed focal balance · no pointer-state rerenders....",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Grid Spotlight - Backgrounds React Component",
    description: "Grid Spotlight is a production-ready backgrounds React component featuring Enterprise grid illumination · fixed focal balance · no pointer-state rerenders....",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Grid Spotlight",
  "description": "Grid Spotlight is a production-ready backgrounds React component featuring Enterprise grid illumination · fixed focal balance · no pointer-state rerenders....",
  "url": "https://ui.mtverse.dev/components/backgrounds/animated-grid-glow-bg",
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
