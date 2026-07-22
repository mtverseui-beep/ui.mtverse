import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aurora Commerce - Backgrounds React Component",
  description: "Aurora Commerce is a production-ready backgrounds React component featuring Premium aurora wash · hero-safe scrim · slow transform-only drift · light/dark....",
  keywords: ["Aurora Commerce","Backgrounds component","Backgrounds React component","Backgrounds Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/backgrounds/aurora-mesh-bg" },
  openGraph: {
    type: "website",
    url: "/components/backgrounds/aurora-mesh-bg",
    title: "Aurora Commerce - Backgrounds React Component",
    description: "Aurora Commerce is a production-ready backgrounds React component featuring Premium aurora wash · hero-safe scrim · slow transform-only drift · light/dark....",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Aurora Commerce - Backgrounds React Component",
    description: "Aurora Commerce is a production-ready backgrounds React component featuring Premium aurora wash · hero-safe scrim · slow transform-only drift · light/dark....",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Aurora Commerce",
  "description": "Aurora Commerce is a production-ready backgrounds React component featuring Premium aurora wash · hero-safe scrim · slow transform-only drift · light/dark....",
  "url": "https://ui.mtverse.dev/components/backgrounds/aurora-mesh-bg",
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
