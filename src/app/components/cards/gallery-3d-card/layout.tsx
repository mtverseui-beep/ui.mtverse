import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "3D Infinite Gallery - Agents React Component",
  description: "3D Infinite Gallery is a production-ready agents React component featuring Three.js WebGL infinite gallery · cloth shader + scroll/keys/touch + auto-play....",
  keywords: ["3D Infinite Gallery","Agents component","Agents React component","Agents Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/premium/gallery-3d" },
  openGraph: {
    type: "website",
    url: "/components/premium/gallery-3d",
    title: "3D Infinite Gallery - Agents React Component",
    description: "3D Infinite Gallery is a production-ready agents React component featuring Three.js WebGL infinite gallery · cloth shader + scroll/keys/touch + auto-play....",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "3D Infinite Gallery - Agents React Component",
    description: "3D Infinite Gallery is a production-ready agents React component featuring Three.js WebGL infinite gallery · cloth shader + scroll/keys/touch + auto-play....",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "3D Infinite Gallery",
  "description": "3D Infinite Gallery is a production-ready agents React component featuring Three.js WebGL infinite gallery · cloth shader + scroll/keys/touch + auto-play....",
  "url": "https://ui.mtverse.dev/components/premium/gallery-3d",
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
