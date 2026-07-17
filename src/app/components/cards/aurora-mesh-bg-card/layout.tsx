import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aurora Commerce – Backgrounds React Component",
  description: "Aurora Commerce is a production-ready backgrounds React component featuring Premium aurora wash · hero-safe scrim · slow transform-only drift · light/dark.…",
  keywords: ["Aurora Commerce","Backgrounds component","Backgrounds React component","Backgrounds Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/aurora-mesh-bg-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/aurora-mesh-bg-card",
    title: "Aurora Commerce – Backgrounds React Component",
    description: "Aurora Commerce is a production-ready backgrounds React component featuring Premium aurora wash · hero-safe scrim · slow transform-only drift · light/dark.…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aurora Commerce – Backgrounds React Component",
    description: "Aurora Commerce is a production-ready backgrounds React component featuring Premium aurora wash · hero-safe scrim · slow transform-only drift · light/dark.…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Aurora Commerce",
  "description": "Aurora Commerce is a production-ready backgrounds React component featuring Premium aurora wash · hero-safe scrim · slow transform-only drift · light/dark.…",
  "url": "https://www.mtverse.dev/components/cards/aurora-mesh-bg-card",
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
