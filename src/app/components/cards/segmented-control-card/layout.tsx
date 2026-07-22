import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Segmented Controls - Buttons React Component",
  description: "Segmented Controls is a production-ready buttons React component featuring Glassmorphic sliding pill + 3D depth. Copy, customize, and use it in Next.js...",
  keywords: ["Segmented Controls","Buttons component","Buttons React component","Buttons Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/buttons/segmented-control" },
  openGraph: {
    type: "website",
    url: "/components/buttons/segmented-control",
    title: "Segmented Controls - Buttons React Component",
    description: "Segmented Controls is a production-ready buttons React component featuring Glassmorphic sliding pill + 3D depth. Copy, customize, and use it in Next.js...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Segmented Controls - Buttons React Component",
    description: "Segmented Controls is a production-ready buttons React component featuring Glassmorphic sliding pill + 3D depth. Copy, customize, and use it in Next.js...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Segmented Controls",
  "description": "Segmented Controls is a production-ready buttons React component featuring Glassmorphic sliding pill + 3D depth. Copy, customize, and use it in Next.js...",
  "url": "https://ui.mtverse.dev/components/buttons/segmented-control",
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
