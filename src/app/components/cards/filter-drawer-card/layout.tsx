import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Filter Drawer – Modals React Component",
  description: "Filter Drawer is a production-ready modals React component featuring Left slide filter with price range + categories + rating stars. Copy, customize, and…",
  keywords: ["Filter Drawer","Modals component","Modals React component","Modals Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/filter-drawer-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/filter-drawer-card",
    title: "Filter Drawer – Modals React Component",
    description: "Filter Drawer is a production-ready modals React component featuring Left slide filter with price range + categories + rating stars. Copy, customize, and…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Filter Drawer – Modals React Component",
    description: "Filter Drawer is a production-ready modals React component featuring Left slide filter with price range + categories + rating stars. Copy, customize, and…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Filter Drawer",
  "description": "Filter Drawer is a production-ready modals React component featuring Left slide filter with price range + categories + rating stars. Copy, customize, and…",
  "url": "https://www.mtverse.dev/components/cards/filter-drawer-card",
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
