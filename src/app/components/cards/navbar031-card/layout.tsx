import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Startup Gradient CTA Dropdown – Navbar React Component",
  description: "Startup Gradient CTA Dropdown is a production-ready navbar React component featuring Startup landing — CTA + dropdown nav + scroll shrink + slide-down…",
  keywords: ["Startup Gradient CTA Dropdown","Navbar component","Navbar React component","Navbar Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/navbar031-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/navbar031-card",
    title: "Startup Gradient CTA Dropdown – Navbar React Component",
    description: "Startup Gradient CTA Dropdown is a production-ready navbar React component featuring Startup landing — CTA + dropdown nav + scroll shrink + slide-down…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Startup Gradient CTA Dropdown – Navbar React Component",
    description: "Startup Gradient CTA Dropdown is a production-ready navbar React component featuring Startup landing — CTA + dropdown nav + scroll shrink + slide-down…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Startup Gradient CTA Dropdown",
  "description": "Startup Gradient CTA Dropdown is a production-ready navbar React component featuring Startup landing — CTA + dropdown nav + scroll shrink + slide-down…",
  "url": "https://www.mtverse.dev/components/cards/navbar031-card",
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
