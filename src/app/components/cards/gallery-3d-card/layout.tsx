import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "3D Infinite Gallery – Agents React Component",
  description: "3D Infinite Gallery is a production-ready agents React component featuring Three.js WebGL infinite gallery · cloth shader + scroll/keys/touch + auto-play.…",
  keywords: ["3D Infinite Gallery","Agents component","Agents React component","Agents Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/gallery-3d-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/gallery-3d-card",
    title: "3D Infinite Gallery – Agents React Component",
    description: "3D Infinite Gallery is a production-ready agents React component featuring Three.js WebGL infinite gallery · cloth shader + scroll/keys/touch + auto-play.…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "3D Infinite Gallery – Agents React Component",
    description: "3D Infinite Gallery is a production-ready agents React component featuring Three.js WebGL infinite gallery · cloth shader + scroll/keys/touch + auto-play.…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "3D Infinite Gallery",
  "description": "3D Infinite Gallery is a production-ready agents React component featuring Three.js WebGL infinite gallery · cloth shader + scroll/keys/touch + auto-play.…",
  "url": "https://www.mtverse.dev/components/cards/gallery-3d-card",
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
