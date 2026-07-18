import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Staggered Text Reveal Isometric - Hero React Component",
  description: "Staggered Text Reveal Isometric is a production-ready hero React component featuring Staggered text reveal + char-by-char blur + static isometric SVG. Copy,...",
  keywords: ["Staggered Text Reveal Isometric","Hero component","Hero React component","Hero Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/heroes/hero001" },
  openGraph: {
    type: "website",
    url: "/components/heroes/hero001",
    title: "Staggered Text Reveal Isometric - Hero React Component",
    description: "Staggered Text Reveal Isometric is a production-ready hero React component featuring Staggered text reveal + char-by-char blur + static isometric SVG. Copy,...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Staggered Text Reveal Isometric - Hero React Component",
    description: "Staggered Text Reveal Isometric is a production-ready hero React component featuring Staggered text reveal + char-by-char blur + static isometric SVG. Copy,...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Staggered Text Reveal Isometric",
  "description": "Staggered Text Reveal Isometric is a production-ready hero React component featuring Staggered text reveal + char-by-char blur + static isometric SVG. Copy,...",
  "url": "https://ui.mtverse.dev/components/heroes/hero001",
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
