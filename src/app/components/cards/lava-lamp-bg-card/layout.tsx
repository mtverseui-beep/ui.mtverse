import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Organic Gradient - Backgrounds React Component",
  description: "Organic Gradient is a production-ready backgrounds React component featuring Calm organic color fields · lifestyle hero composition · no metaball loop....",
  keywords: ["Organic Gradient","Backgrounds component","Backgrounds React component","Backgrounds Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/backgrounds/lava-lamp-bg" },
  openGraph: {
    type: "website",
    url: "/components/backgrounds/lava-lamp-bg",
    title: "Organic Gradient - Backgrounds React Component",
    description: "Organic Gradient is a production-ready backgrounds React component featuring Calm organic color fields · lifestyle hero composition · no metaball loop....",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Organic Gradient - Backgrounds React Component",
    description: "Organic Gradient is a production-ready backgrounds React component featuring Calm organic color fields · lifestyle hero composition · no metaball loop....",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Organic Gradient",
  "description": "Organic Gradient is a production-ready backgrounds React component featuring Calm organic color fields · lifestyle hero composition · no metaball loop....",
  "url": "https://ui.mtverse.dev/components/backgrounds/lava-lamp-bg",
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
