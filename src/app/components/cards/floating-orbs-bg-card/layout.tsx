import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ambient Orbs - Backgrounds React Component",
  description: "Ambient Orbs is a production-ready backgrounds React component featuring Soft dimensional color fields · transform-only motion · universal hero layout....",
  keywords: ["Ambient Orbs","Backgrounds component","Backgrounds React component","Backgrounds Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/backgrounds/floating-orbs-bg" },
  openGraph: {
    type: "website",
    url: "/components/backgrounds/floating-orbs-bg",
    title: "Ambient Orbs - Backgrounds React Component",
    description: "Ambient Orbs is a production-ready backgrounds React component featuring Soft dimensional color fields · transform-only motion · universal hero layout....",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Ambient Orbs - Backgrounds React Component",
    description: "Ambient Orbs is a production-ready backgrounds React component featuring Soft dimensional color fields · transform-only motion · universal hero layout....",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Ambient Orbs",
  "description": "Ambient Orbs is a production-ready backgrounds React component featuring Soft dimensional color fields · transform-only motion · universal hero layout....",
  "url": "https://ui.mtverse.dev/components/backgrounds/floating-orbs-bg",
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
