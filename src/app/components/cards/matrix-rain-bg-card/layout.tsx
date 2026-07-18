import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Emerald Data Veil - Backgrounds React Component",
  description: "Emerald Data Veil is a production-ready backgrounds React component featuring Enterprise data rhythm · refined gradient columns · replaces novelty code...",
  keywords: ["Emerald Data Veil","Backgrounds component","Backgrounds React component","Backgrounds Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/backgrounds/matrix-rain-bg" },
  openGraph: {
    type: "website",
    url: "/components/backgrounds/matrix-rain-bg",
    title: "Emerald Data Veil - Backgrounds React Component",
    description: "Emerald Data Veil is a production-ready backgrounds React component featuring Enterprise data rhythm · refined gradient columns · replaces novelty code...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Emerald Data Veil - Backgrounds React Component",
    description: "Emerald Data Veil is a production-ready backgrounds React component featuring Enterprise data rhythm · refined gradient columns · replaces novelty code...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Emerald Data Veil",
  "description": "Emerald Data Veil is a production-ready backgrounds React component featuring Enterprise data rhythm · refined gradient columns · replaces novelty code...",
  "url": "https://ui.mtverse.dev/components/backgrounds/matrix-rain-bg",
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
