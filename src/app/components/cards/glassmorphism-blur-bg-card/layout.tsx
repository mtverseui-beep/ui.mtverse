import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Glass Atmosphere - Backgrounds React Component",
  description: "Glass Atmosphere is a production-ready backgrounds React component featuring Atmospheric color · refined glass facets · premium software hero. Copy,...",
  keywords: ["Glass Atmosphere","Backgrounds component","Backgrounds React component","Backgrounds Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/backgrounds/glassmorphism-blur-bg" },
  openGraph: {
    type: "website",
    url: "/components/backgrounds/glassmorphism-blur-bg",
    title: "Glass Atmosphere - Backgrounds React Component",
    description: "Glass Atmosphere is a production-ready backgrounds React component featuring Atmospheric color · refined glass facets · premium software hero. Copy,...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Glass Atmosphere - Backgrounds React Component",
    description: "Glass Atmosphere is a production-ready backgrounds React component featuring Atmospheric color · refined glass facets · premium software hero. Copy,...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Glass Atmosphere",
  "description": "Glass Atmosphere is a production-ready backgrounds React component featuring Atmospheric color · refined glass facets · premium software hero. Copy,...",
  "url": "https://ui.mtverse.dev/components/backgrounds/glassmorphism-blur-bg",
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
