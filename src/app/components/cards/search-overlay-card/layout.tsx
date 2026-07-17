import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search Overlay – Modals React Component",
  description: "Search Overlay is a production-ready modals React component featuring Fullscreen blurred search with recent + suggestions + ESC to close. Copy, customize,…",
  keywords: ["Search Overlay","Modals component","Modals React component","Modals Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/search-overlay-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/search-overlay-card",
    title: "Search Overlay – Modals React Component",
    description: "Search Overlay is a production-ready modals React component featuring Fullscreen blurred search with recent + suggestions + ESC to close. Copy, customize,…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Search Overlay – Modals React Component",
    description: "Search Overlay is a production-ready modals React component featuring Fullscreen blurred search with recent + suggestions + ESC to close. Copy, customize,…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Search Overlay",
  "description": "Search Overlay is a production-ready modals React component featuring Fullscreen blurred search with recent + suggestions + ESC to close. Copy, customize,…",
  "url": "https://www.mtverse.dev/components/cards/search-overlay-card",
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
