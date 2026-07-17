import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fluid CTA – Agents React Component",
  description: "Fluid CTA is a production-ready agents React component featuring Fluid layout morph CTA → expanding form card + mesh gradient bg + spring. Copy, customize,…",
  keywords: ["Fluid CTA","Agents component","Agents React component","Agents Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/fluid-cta-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/fluid-cta-card",
    title: "Fluid CTA – Agents React Component",
    description: "Fluid CTA is a production-ready agents React component featuring Fluid layout morph CTA → expanding form card + mesh gradient bg + spring. Copy, customize,…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fluid CTA – Agents React Component",
    description: "Fluid CTA is a production-ready agents React component featuring Fluid layout morph CTA → expanding form card + mesh gradient bg + spring. Copy, customize,…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Fluid CTA",
  "description": "Fluid CTA is a production-ready agents React component featuring Fluid layout morph CTA → expanding form card + mesh gradient bg + spring. Copy, customize,…",
  "url": "https://www.mtverse.dev/components/cards/fluid-cta-card",
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
