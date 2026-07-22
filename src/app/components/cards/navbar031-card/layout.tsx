import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Startup Gradient CTA Dropdown - Navbar React Component",
  description: "Startup Gradient CTA Dropdown is a production-ready navbar React component featuring Startup landing — CTA + dropdown nav + scroll shrink + slide-down...",
  keywords: ["Startup Gradient CTA Dropdown","Navbar component","Navbar React component","Navbar Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/navbars/navbar031" },
  openGraph: {
    type: "website",
    url: "/components/navbars/navbar031",
    title: "Startup Gradient CTA Dropdown - Navbar React Component",
    description: "Startup Gradient CTA Dropdown is a production-ready navbar React component featuring Startup landing — CTA + dropdown nav + scroll shrink + slide-down...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Startup Gradient CTA Dropdown - Navbar React Component",
    description: "Startup Gradient CTA Dropdown is a production-ready navbar React component featuring Startup landing — CTA + dropdown nav + scroll shrink + slide-down...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Startup Gradient CTA Dropdown",
  "description": "Startup Gradient CTA Dropdown is a production-ready navbar React component featuring Startup landing — CTA + dropdown nav + scroll shrink + slide-down...",
  "url": "https://ui.mtverse.dev/components/navbars/navbar031",
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
