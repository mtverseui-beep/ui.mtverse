import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hover Preview Cards – Features React Component",
  description: "Hover Preview Cards is a production-ready features React component featuring Feature cards with hover video preview + overlay + play button. Copy,…",
  keywords: ["Hover Preview Cards","Features component","Features React component","Features Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/feature-hover-preview-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/feature-hover-preview-card",
    title: "Hover Preview Cards – Features React Component",
    description: "Hover Preview Cards is a production-ready features React component featuring Feature cards with hover video preview + overlay + play button. Copy,…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hover Preview Cards – Features React Component",
    description: "Hover Preview Cards is a production-ready features React component featuring Feature cards with hover video preview + overlay + play button. Copy,…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Hover Preview Cards",
  "description": "Hover Preview Cards is a production-ready features React component featuring Feature cards with hover video preview + overlay + play button. Copy,…",
  "url": "https://www.mtverse.dev/components/cards/feature-hover-preview-card",
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
