import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signature Mesh - Backgrounds React Component",
  description: "Signature Mesh is a production-ready backgrounds React component featuring Flagship SaaS mesh · art-directed radial light · slow composited drift. Copy,...",
  keywords: ["Signature Mesh","Backgrounds component","Backgrounds React component","Backgrounds Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/backgrounds/mesh-gradient-bg" },
  openGraph: {
    type: "website",
    url: "/components/backgrounds/mesh-gradient-bg",
    title: "Signature Mesh - Backgrounds React Component",
    description: "Signature Mesh is a production-ready backgrounds React component featuring Flagship SaaS mesh · art-directed radial light · slow composited drift. Copy,...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Signature Mesh - Backgrounds React Component",
    description: "Signature Mesh is a production-ready backgrounds React component featuring Flagship SaaS mesh · art-directed radial light · slow composited drift. Copy,...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Signature Mesh",
  "description": "Signature Mesh is a production-ready backgrounds React component featuring Flagship SaaS mesh · art-directed radial light · slow composited drift. Copy,...",
  "url": "https://ui.mtverse.dev/components/backgrounds/mesh-gradient-bg",
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
