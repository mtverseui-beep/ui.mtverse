import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Parallax SVG Draw Floating Icons - Hero React Component",
  description: "Parallax SVG Draw Floating Icons is a production-ready hero React component featuring Parallax blobs + SVG draw + floating icons + slide-in (Olea). Copy,...",
  keywords: ["Parallax SVG Draw Floating Icons","Hero component","Hero React component","Hero Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/heroes/hero009" },
  openGraph: {
    type: "website",
    url: "/components/heroes/hero009",
    title: "Parallax SVG Draw Floating Icons - Hero React Component",
    description: "Parallax SVG Draw Floating Icons is a production-ready hero React component featuring Parallax blobs + SVG draw + floating icons + slide-in (Olea). Copy,...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Parallax SVG Draw Floating Icons - Hero React Component",
    description: "Parallax SVG Draw Floating Icons is a production-ready hero React component featuring Parallax blobs + SVG draw + floating icons + slide-in (Olea). Copy,...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Parallax SVG Draw Floating Icons",
  "description": "Parallax SVG Draw Floating Icons is a production-ready hero React component featuring Parallax blobs + SVG draw + floating icons + slide-in (Olea). Copy,...",
  "url": "https://ui.mtverse.dev/components/heroes/hero009",
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
