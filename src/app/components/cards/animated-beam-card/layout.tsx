import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Animated Beam - Agents React Component",
  description: "Animated Beam is a production-ready agents React component featuring Animated SVG beams connecting brand logos + OpenAI hub + gradient flow. Copy,...",
  keywords: ["Animated Beam","Agents component","Agents React component","Agents Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/premium/animated-beam" },
  openGraph: {
    type: "website",
    url: "/components/premium/animated-beam",
    title: "Animated Beam - Agents React Component",
    description: "Animated Beam is a production-ready agents React component featuring Animated SVG beams connecting brand logos + OpenAI hub + gradient flow. Copy,...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Animated Beam - Agents React Component",
    description: "Animated Beam is a production-ready agents React component featuring Animated SVG beams connecting brand logos + OpenAI hub + gradient flow. Copy,...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Animated Beam",
  "description": "Animated Beam is a production-ready agents React component featuring Animated SVG beams connecting brand logos + OpenAI hub + gradient flow. Copy,...",
  "url": "https://ui.mtverse.dev/components/premium/animated-beam",
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
