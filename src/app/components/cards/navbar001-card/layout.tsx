import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scroll-Aware Floating Glass Pill - Navbar React Component",
  description: "Scroll-Aware Floating Glass Pill is a production-ready navbar React component featuring Scroll-aware floating glass pill + mobile menu. Copy, customize, and...",
  keywords: ["Scroll-Aware Floating Glass Pill","Navbar component","Navbar React component","Navbar Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/navbars/navbar001" },
  openGraph: {
    type: "website",
    url: "/components/navbars/navbar001",
    title: "Scroll-Aware Floating Glass Pill - Navbar React Component",
    description: "Scroll-Aware Floating Glass Pill is a production-ready navbar React component featuring Scroll-aware floating glass pill + mobile menu. Copy, customize, and...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Scroll-Aware Floating Glass Pill - Navbar React Component",
    description: "Scroll-Aware Floating Glass Pill is a production-ready navbar React component featuring Scroll-aware floating glass pill + mobile menu. Copy, customize, and...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Scroll-Aware Floating Glass Pill",
  "description": "Scroll-Aware Floating Glass Pill is a production-ready navbar React component featuring Scroll-aware floating glass pill + mobile menu. Copy, customize, and...",
  "url": "https://ui.mtverse.dev/components/navbars/navbar001",
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
