import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search Overlay - Modals React Component",
  description: "Search Overlay is a production-ready modals React component featuring Fullscreen blurred search with recent + suggestions + ESC to close. Copy, customize,...",
  keywords: ["Search Overlay","Modals component","Modals React component","Modals Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/modals/search-overlay" },
  openGraph: {
    type: "website",
    url: "/components/modals/search-overlay",
    title: "Search Overlay - Modals React Component",
    description: "Search Overlay is a production-ready modals React component featuring Fullscreen blurred search with recent + suggestions + ESC to close. Copy, customize,...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Search Overlay - Modals React Component",
    description: "Search Overlay is a production-ready modals React component featuring Fullscreen blurred search with recent + suggestions + ESC to close. Copy, customize,...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Search Overlay",
  "description": "Search Overlay is a production-ready modals React component featuring Fullscreen blurred search with recent + suggestions + ESC to close. Copy, customize,...",
  "url": "https://ui.mtverse.dev/components/modals/search-overlay",
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
