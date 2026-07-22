import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Dot Field - Backgrounds React Component",
  description: "Product Dot Field is a production-ready backgrounds React component featuring Disciplined CSS dot field · screenshot-ready focal lighting · non-interactive....",
  keywords: ["Product Dot Field","Backgrounds component","Backgrounds React component","Backgrounds Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/backgrounds/dot-matrix-bg" },
  openGraph: {
    type: "website",
    url: "/components/backgrounds/dot-matrix-bg",
    title: "Product Dot Field - Backgrounds React Component",
    description: "Product Dot Field is a production-ready backgrounds React component featuring Disciplined CSS dot field · screenshot-ready focal lighting · non-interactive....",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Product Dot Field - Backgrounds React Component",
    description: "Product Dot Field is a production-ready backgrounds React component featuring Disciplined CSS dot field · screenshot-ready focal lighting · non-interactive....",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Product Dot Field",
  "description": "Product Dot Field is a production-ready backgrounds React component featuring Disciplined CSS dot field · screenshot-ready focal lighting · non-interactive....",
  "url": "https://ui.mtverse.dev/components/backgrounds/dot-matrix-bg",
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
