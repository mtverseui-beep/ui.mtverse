import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentation Version Selector - Navbar React Component",
  description: "Documentation Version Selector is a production-ready navbar React component featuring Documentation — version selector + prominent search + sidebar drawer...",
  keywords: ["Documentation Version Selector","Navbar component","Navbar React component","Navbar Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/navbars/navbar028" },
  openGraph: {
    type: "website",
    url: "/components/navbars/navbar028",
    title: "Documentation Version Selector - Navbar React Component",
    description: "Documentation Version Selector is a production-ready navbar React component featuring Documentation — version selector + prominent search + sidebar drawer...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Documentation Version Selector - Navbar React Component",
    description: "Documentation Version Selector is a production-ready navbar React component featuring Documentation — version selector + prominent search + sidebar drawer...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Documentation Version Selector",
  "description": "Documentation Version Selector is a production-ready navbar React component featuring Documentation — version selector + prominent search + sidebar drawer...",
  "url": "https://ui.mtverse.dev/components/navbars/navbar028",
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
