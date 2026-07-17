import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "3D Mouse-Tilt Parallax Dot Grid – Hero React Component",
  description: "3D Mouse-Tilt Parallax Dot Grid is a production-ready hero React component featuring 3D mouse-tilt scene + parallax dot grid + layered depth cards…",
  keywords: ["3D Mouse-Tilt Parallax Dot Grid","Hero component","Hero React component","Hero Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/hero012-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/hero012-card",
    title: "3D Mouse-Tilt Parallax Dot Grid – Hero React Component",
    description: "3D Mouse-Tilt Parallax Dot Grid is a production-ready hero React component featuring 3D mouse-tilt scene + parallax dot grid + layered depth cards…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "3D Mouse-Tilt Parallax Dot Grid – Hero React Component",
    description: "3D Mouse-Tilt Parallax Dot Grid is a production-ready hero React component featuring 3D mouse-tilt scene + parallax dot grid + layered depth cards…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "3D Mouse-Tilt Parallax Dot Grid",
  "description": "3D Mouse-Tilt Parallax Dot Grid is a production-ready hero React component featuring 3D mouse-tilt scene + parallax dot grid + layered depth cards…",
  "url": "https://www.mtverse.dev/components/cards/hero012-card",
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
