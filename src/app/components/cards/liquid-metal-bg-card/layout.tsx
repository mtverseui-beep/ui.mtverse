import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Liquid Chrome - Backgrounds React Component",
  description: "Liquid Chrome is a production-ready backgrounds React component featuring Controlled metallic halo · luxury product lighting · reduced-motion safe. Copy,...",
  keywords: ["Liquid Chrome","Backgrounds component","Backgrounds React component","Backgrounds Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/backgrounds/liquid-metal-bg" },
  openGraph: {
    type: "website",
    url: "/components/backgrounds/liquid-metal-bg",
    title: "Liquid Chrome - Backgrounds React Component",
    description: "Liquid Chrome is a production-ready backgrounds React component featuring Controlled metallic halo · luxury product lighting · reduced-motion safe. Copy,...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Liquid Chrome - Backgrounds React Component",
    description: "Liquid Chrome is a production-ready backgrounds React component featuring Controlled metallic halo · luxury product lighting · reduced-motion safe. Copy,...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Liquid Chrome",
  "description": "Liquid Chrome is a production-ready backgrounds React component featuring Controlled metallic halo · luxury product lighting · reduced-motion safe. Copy,...",
  "url": "https://ui.mtverse.dev/components/backgrounds/liquid-metal-bg",
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
