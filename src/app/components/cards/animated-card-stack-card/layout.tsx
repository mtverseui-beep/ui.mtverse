import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Animated Card Stack – Agents React Component",
  description: "Animated Card Stack is a production-ready agents React component featuring Infinite card stack with framer-motion spring. Copy, customize, and use it in…",
  keywords: ["Animated Card Stack","Agents component","Agents React component","Agents Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/animated-card-stack-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/animated-card-stack-card",
    title: "Animated Card Stack – Agents React Component",
    description: "Animated Card Stack is a production-ready agents React component featuring Infinite card stack with framer-motion spring. Copy, customize, and use it in…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Animated Card Stack – Agents React Component",
    description: "Animated Card Stack is a production-ready agents React component featuring Infinite card stack with framer-motion spring. Copy, customize, and use it in…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Animated Card Stack",
  "description": "Animated Card Stack is a production-ready agents React component featuring Infinite card stack with framer-motion spring. Copy, customize, and use it in…",
  "url": "https://www.mtverse.dev/components/cards/animated-card-stack-card",
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
