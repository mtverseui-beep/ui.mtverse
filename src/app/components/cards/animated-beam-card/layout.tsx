import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Animated Beam – Agents React Component",
  description: "Animated Beam is a production-ready agents React component featuring Animated SVG beams connecting brand logos + OpenAI hub + gradient flow. Copy,…",
  keywords: ["Animated Beam","Agents component","Agents React component","Agents Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/animated-beam-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/animated-beam-card",
    title: "Animated Beam – Agents React Component",
    description: "Animated Beam is a production-ready agents React component featuring Animated SVG beams connecting brand logos + OpenAI hub + gradient flow. Copy,…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Animated Beam – Agents React Component",
    description: "Animated Beam is a production-ready agents React component featuring Animated SVG beams connecting brand logos + OpenAI hub + gradient flow. Copy,…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Animated Beam",
  "description": "Animated Beam is a production-ready agents React component featuring Animated SVG beams connecting brand logos + OpenAI hub + gradient flow. Copy,…",
  "url": "https://www.mtverse.dev/components/cards/animated-beam-card",
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
