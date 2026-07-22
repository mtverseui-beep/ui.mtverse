import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Electric Silk - Backgrounds React Component",
  description: "Electric Silk is a production-ready backgrounds React component featuring Elegant SVG ribbons · restrained luminous color · CTA-ready contrast. Copy,...",
  keywords: ["Electric Silk","Backgrounds component","Backgrounds React component","Backgrounds Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/backgrounds/neon-wave-bg" },
  openGraph: {
    type: "website",
    url: "/components/backgrounds/neon-wave-bg",
    title: "Electric Silk - Backgrounds React Component",
    description: "Electric Silk is a production-ready backgrounds React component featuring Elegant SVG ribbons · restrained luminous color · CTA-ready contrast. Copy,...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Electric Silk - Backgrounds React Component",
    description: "Electric Silk is a production-ready backgrounds React component featuring Elegant SVG ribbons · restrained luminous color · CTA-ready contrast. Copy,...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Electric Silk",
  "description": "Electric Silk is a production-ready backgrounds React component featuring Elegant SVG ribbons · restrained luminous color · CTA-ready contrast. Copy,...",
  "url": "https://ui.mtverse.dev/components/backgrounds/neon-wave-bg",
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
