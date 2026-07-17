import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Screenshot – Features React Component",
  description: "Product Screenshot is a production-ready features React component featuring Large product screenshot mockup + floating annotations + browser chrome. Copy,…",
  keywords: ["Product Screenshot","Features component","Features React component","Features Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/feature-screenshot-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/feature-screenshot-card",
    title: "Product Screenshot – Features React Component",
    description: "Product Screenshot is a production-ready features React component featuring Large product screenshot mockup + floating annotations + browser chrome. Copy,…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Product Screenshot – Features React Component",
    description: "Product Screenshot is a production-ready features React component featuring Large product screenshot mockup + floating annotations + browser chrome. Copy,…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Product Screenshot",
  "description": "Product Screenshot is a production-ready features React component featuring Large product screenshot mockup + floating annotations + browser chrome. Copy,…",
  "url": "https://www.mtverse.dev/components/cards/feature-screenshot-card",
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
