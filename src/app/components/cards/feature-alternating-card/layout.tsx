import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alternating Image Text - Features React Component",
  description: "Alternating Image Text is a production-ready features React component featuring Alternating left/right image+text rows + scroll reveal + Unsplash images....",
  keywords: ["Alternating Image Text","Features component","Features React component","Features Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/features/feature-alternating" },
  openGraph: {
    type: "website",
    url: "/components/features/feature-alternating",
    title: "Alternating Image Text - Features React Component",
    description: "Alternating Image Text is a production-ready features React component featuring Alternating left/right image+text rows + scroll reveal + Unsplash images....",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Alternating Image Text - Features React Component",
    description: "Alternating Image Text is a production-ready features React component featuring Alternating left/right image+text rows + scroll reveal + Unsplash images....",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Alternating Image Text",
  "description": "Alternating Image Text is a production-ready features React component featuring Alternating left/right image+text rows + scroll reveal + Unsplash images....",
  "url": "https://ui.mtverse.dev/components/features/feature-alternating",
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
