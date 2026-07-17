import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Emerald Data Veil – Backgrounds React Component",
  description: "Emerald Data Veil is a production-ready backgrounds React component featuring Enterprise data rhythm · refined gradient columns · replaces novelty code…",
  keywords: ["Emerald Data Veil","Backgrounds component","Backgrounds React component","Backgrounds Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/matrix-rain-bg-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/matrix-rain-bg-card",
    title: "Emerald Data Veil – Backgrounds React Component",
    description: "Emerald Data Veil is a production-ready backgrounds React component featuring Enterprise data rhythm · refined gradient columns · replaces novelty code…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Emerald Data Veil – Backgrounds React Component",
    description: "Emerald Data Veil is a production-ready backgrounds React component featuring Enterprise data rhythm · refined gradient columns · replaces novelty code…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Emerald Data Veil",
  "description": "Emerald Data Veil is a production-ready backgrounds React component featuring Enterprise data rhythm · refined gradient columns · replaces novelty code…",
  "url": "https://www.mtverse.dev/components/cards/matrix-rain-bg-card",
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
