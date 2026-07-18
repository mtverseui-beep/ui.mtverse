import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Filter Drawer - Modals React Component",
  description: "Filter Drawer is a production-ready modals React component featuring Left slide filter with price range + categories + rating stars. Copy, customize, and...",
  keywords: ["Filter Drawer","Modals component","Modals React component","Modals Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/modals/filter-drawer" },
  openGraph: {
    type: "website",
    url: "/components/modals/filter-drawer",
    title: "Filter Drawer - Modals React Component",
    description: "Filter Drawer is a production-ready modals React component featuring Left slide filter with price range + categories + rating stars. Copy, customize, and...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Filter Drawer - Modals React Component",
    description: "Filter Drawer is a production-ready modals React component featuring Left slide filter with price range + categories + rating stars. Copy, customize, and...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Filter Drawer",
  "description": "Filter Drawer is a production-ready modals React component featuring Left slide filter with price range + categories + rating stars. Copy, customize, and...",
  "url": "https://ui.mtverse.dev/components/modals/filter-drawer",
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
