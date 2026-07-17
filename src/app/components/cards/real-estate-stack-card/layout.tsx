import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Property Discovery – Stack React Component",
  description: "Property Discovery is a production-ready stack React component featuring Swipe + save. Copy, customize, and use it in Next.js projects.",
  keywords: ["Property Discovery","Stack component","Stack React component","Stack Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/real-estate-stack-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/real-estate-stack-card",
    title: "Property Discovery – Stack React Component",
    description: "Property Discovery is a production-ready stack React component featuring Swipe + save. Copy, customize, and use it in Next.js projects.",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Property Discovery – Stack React Component",
    description: "Property Discovery is a production-ready stack React component featuring Swipe + save. Copy, customize, and use it in Next.js projects.",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Property Discovery",
  "description": "Property Discovery is a production-ready stack React component featuring Swipe + save. Copy, customize, and use it in Next.js projects.",
  "url": "https://www.mtverse.dev/components/cards/real-estate-stack-card",
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
