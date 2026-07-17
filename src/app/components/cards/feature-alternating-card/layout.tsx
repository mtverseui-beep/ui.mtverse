import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alternating Image Text – Features React Component",
  description: "Alternating Image Text is a production-ready features React component featuring Alternating left/right image+text rows + scroll reveal + Unsplash images.…",
  keywords: ["Alternating Image Text","Features component","Features React component","Features Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/feature-alternating-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/feature-alternating-card",
    title: "Alternating Image Text – Features React Component",
    description: "Alternating Image Text is a production-ready features React component featuring Alternating left/right image+text rows + scroll reveal + Unsplash images.…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alternating Image Text – Features React Component",
    description: "Alternating Image Text is a production-ready features React component featuring Alternating left/right image+text rows + scroll reveal + Unsplash images.…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Alternating Image Text",
  "description": "Alternating Image Text is a production-ready features React component featuring Alternating left/right image+text rows + scroll reveal + Unsplash images.…",
  "url": "https://www.mtverse.dev/components/cards/feature-alternating-card",
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
