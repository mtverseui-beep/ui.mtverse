import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Midnight Spotlight - Backgrounds React Component",
  description: "Midnight Spotlight is a production-ready backgrounds React component featuring Cinematic depth · calm celestial dots · replaces warp-speed canvas trails....",
  keywords: ["Midnight Spotlight","Backgrounds component","Backgrounds React component","Backgrounds Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/backgrounds/starfield-bg" },
  openGraph: {
    type: "website",
    url: "/components/backgrounds/starfield-bg",
    title: "Midnight Spotlight - Backgrounds React Component",
    description: "Midnight Spotlight is a production-ready backgrounds React component featuring Cinematic depth · calm celestial dots · replaces warp-speed canvas trails....",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Midnight Spotlight - Backgrounds React Component",
    description: "Midnight Spotlight is a production-ready backgrounds React component featuring Cinematic depth · calm celestial dots · replaces warp-speed canvas trails....",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Midnight Spotlight",
  "description": "Midnight Spotlight is a production-ready backgrounds React component featuring Cinematic depth · calm celestial dots · replaces warp-speed canvas trails....",
  "url": "https://ui.mtverse.dev/components/backgrounds/starfield-bg",
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
