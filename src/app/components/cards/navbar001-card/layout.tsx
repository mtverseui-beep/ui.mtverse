import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scroll-Aware Floating Glass Pill – Navbar React Component",
  description: "Scroll-Aware Floating Glass Pill is a production-ready navbar React component featuring Scroll-aware floating glass pill + mobile menu. Copy, customize, and…",
  keywords: ["Scroll-Aware Floating Glass Pill","Navbar component","Navbar React component","Navbar Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/navbar001-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/navbar001-card",
    title: "Scroll-Aware Floating Glass Pill – Navbar React Component",
    description: "Scroll-Aware Floating Glass Pill is a production-ready navbar React component featuring Scroll-aware floating glass pill + mobile menu. Copy, customize, and…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Scroll-Aware Floating Glass Pill – Navbar React Component",
    description: "Scroll-Aware Floating Glass Pill is a production-ready navbar React component featuring Scroll-aware floating glass pill + mobile menu. Copy, customize, and…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Scroll-Aware Floating Glass Pill",
  "description": "Scroll-Aware Floating Glass Pill is a production-ready navbar React component featuring Scroll-aware floating glass pill + mobile menu. Copy, customize, and…",
  "url": "https://www.mtverse.dev/components/cards/navbar001-card",
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
