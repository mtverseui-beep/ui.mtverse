import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Editorial Mesh – Backgrounds React Component",
  description: "Editorial Mesh is a production-ready backgrounds React component featuring Art-directed warm mesh · campaign typography contrast · premium grain. Copy,…",
  keywords: ["Editorial Mesh","Backgrounds component","Backgrounds React component","Backgrounds Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/gradient-mesh-bg-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/gradient-mesh-bg-card",
    title: "Editorial Mesh – Backgrounds React Component",
    description: "Editorial Mesh is a production-ready backgrounds React component featuring Art-directed warm mesh · campaign typography contrast · premium grain. Copy,…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Editorial Mesh – Backgrounds React Component",
    description: "Editorial Mesh is a production-ready backgrounds React component featuring Art-directed warm mesh · campaign typography contrast · premium grain. Copy,…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Editorial Mesh",
  "description": "Editorial Mesh is a production-ready backgrounds React component featuring Art-directed warm mesh · campaign typography contrast · premium grain. Copy,…",
  "url": "https://www.mtverse.dev/components/cards/gradient-mesh-bg-card",
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
