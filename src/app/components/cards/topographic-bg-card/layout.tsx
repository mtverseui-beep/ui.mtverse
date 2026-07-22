import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Topographic Lines - Backgrounds React Component",
  description: "Topographic Lines is a production-ready backgrounds React component featuring Measured contour rhythm · static-first CSS lines · outdoor and finance heroes....",
  keywords: ["Topographic Lines","Backgrounds component","Backgrounds React component","Backgrounds Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/backgrounds/topographic-bg" },
  openGraph: {
    type: "website",
    url: "/components/backgrounds/topographic-bg",
    title: "Topographic Lines - Backgrounds React Component",
    description: "Topographic Lines is a production-ready backgrounds React component featuring Measured contour rhythm · static-first CSS lines · outdoor and finance heroes....",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Topographic Lines - Backgrounds React Component",
    description: "Topographic Lines is a production-ready backgrounds React component featuring Measured contour rhythm · static-first CSS lines · outdoor and finance heroes....",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Topographic Lines",
  "description": "Topographic Lines is a production-ready backgrounds React component featuring Measured contour rhythm · static-first CSS lines · outdoor and finance heroes....",
  "url": "https://ui.mtverse.dev/components/backgrounds/topographic-bg",
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
