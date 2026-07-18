import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Minimal Split Headline Cards - Hero React Component",
  description: "Minimal Split Headline Cards is a production-ready hero React component featuring Synthwave retro — perspective grid + neon sun + palm silhouettes + neon...",
  keywords: ["Minimal Split Headline Cards","Hero component","Hero React component","Hero Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/heroes/hero021" },
  openGraph: {
    type: "website",
    url: "/components/heroes/hero021",
    title: "Minimal Split Headline Cards - Hero React Component",
    description: "Minimal Split Headline Cards is a production-ready hero React component featuring Synthwave retro — perspective grid + neon sun + palm silhouettes + neon...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Minimal Split Headline Cards - Hero React Component",
    description: "Minimal Split Headline Cards is a production-ready hero React component featuring Synthwave retro — perspective grid + neon sun + palm silhouettes + neon...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Minimal Split Headline Cards",
  "description": "Minimal Split Headline Cards is a production-ready hero React component featuring Synthwave retro — perspective grid + neon sun + palm silhouettes + neon...",
  "url": "https://ui.mtverse.dev/components/heroes/hero021",
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
