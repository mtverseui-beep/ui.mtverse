import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Layered Waves - Backgrounds React Component",
  description: "Layered Waves is a production-ready backgrounds React component featuring Layered SVG curves · fintech and services CTA · slow transform-only motion. Copy,...",
  keywords: ["Layered Waves","Backgrounds component","Backgrounds React component","Backgrounds Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/backgrounds/gradient-waves-bg" },
  openGraph: {
    type: "website",
    url: "/components/backgrounds/gradient-waves-bg",
    title: "Layered Waves - Backgrounds React Component",
    description: "Layered Waves is a production-ready backgrounds React component featuring Layered SVG curves · fintech and services CTA · slow transform-only motion. Copy,...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Layered Waves - Backgrounds React Component",
    description: "Layered Waves is a production-ready backgrounds React component featuring Layered SVG curves · fintech and services CTA · slow transform-only motion. Copy,...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Layered Waves",
  "description": "Layered Waves is a production-ready backgrounds React component featuring Layered SVG curves · fintech and services CTA · slow transform-only motion. Copy,...",
  "url": "https://ui.mtverse.dev/components/backgrounds/gradient-waves-bg",
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
