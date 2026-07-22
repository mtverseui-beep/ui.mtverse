import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fullscreen Takeover Staggered - Navbar React Component",
  description: "Fullscreen Takeover Staggered is a production-ready navbar React component featuring Full screen menu — minimal bar + fullscreen takeover + staggered large...",
  keywords: ["Fullscreen Takeover Staggered","Navbar component","Navbar React component","Navbar Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/navbars/navbar025" },
  openGraph: {
    type: "website",
    url: "/components/navbars/navbar025",
    title: "Fullscreen Takeover Staggered - Navbar React Component",
    description: "Fullscreen Takeover Staggered is a production-ready navbar React component featuring Full screen menu — minimal bar + fullscreen takeover + staggered large...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Fullscreen Takeover Staggered - Navbar React Component",
    description: "Fullscreen Takeover Staggered is a production-ready navbar React component featuring Full screen menu — minimal bar + fullscreen takeover + staggered large...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Fullscreen Takeover Staggered",
  "description": "Fullscreen Takeover Staggered is a production-ready navbar React component featuring Full screen menu — minimal bar + fullscreen takeover + staggered large...",
  "url": "https://ui.mtverse.dev/components/navbars/navbar025",
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
