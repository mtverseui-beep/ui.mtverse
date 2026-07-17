import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Word Blur Reveal Gradient AI Orb – Hero React Component",
  description: "Word Blur Reveal Gradient AI Orb is a production-ready hero React component featuring Word blur reveal + gradient AI + orb rotation + scroll mask. Copy,…",
  keywords: ["Word Blur Reveal Gradient AI Orb","Hero component","Hero React component","Hero Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/hero004-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/hero004-card",
    title: "Word Blur Reveal Gradient AI Orb – Hero React Component",
    description: "Word Blur Reveal Gradient AI Orb is a production-ready hero React component featuring Word blur reveal + gradient AI + orb rotation + scroll mask. Copy,…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Word Blur Reveal Gradient AI Orb – Hero React Component",
    description: "Word Blur Reveal Gradient AI Orb is a production-ready hero React component featuring Word blur reveal + gradient AI + orb rotation + scroll mask. Copy,…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Word Blur Reveal Gradient AI Orb",
  "description": "Word Blur Reveal Gradient AI Orb is a production-ready hero React component featuring Word blur reveal + gradient AI + orb rotation + scroll mask. Copy,…",
  "url": "https://www.mtverse.dev/components/cards/hero004-card",
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
