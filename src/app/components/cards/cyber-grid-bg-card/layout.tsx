import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Horizon Grid - Backgrounds React Component",
  description: "Horizon Grid is a production-ready backgrounds React component featuring Clean future-facing grid · true light/dark themes · restrained motion. Copy,...",
  keywords: ["Horizon Grid","Backgrounds component","Backgrounds React component","Backgrounds Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/backgrounds/cyber-grid-bg" },
  openGraph: {
    type: "website",
    url: "/components/backgrounds/cyber-grid-bg",
    title: "Horizon Grid - Backgrounds React Component",
    description: "Horizon Grid is a production-ready backgrounds React component featuring Clean future-facing grid · true light/dark themes · restrained motion. Copy,...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Horizon Grid - Backgrounds React Component",
    description: "Horizon Grid is a production-ready backgrounds React component featuring Clean future-facing grid · true light/dark themes · restrained motion. Copy,...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Horizon Grid",
  "description": "Horizon Grid is a production-ready backgrounds React component featuring Clean future-facing grid · true light/dark themes · restrained motion. Copy,...",
  "url": "https://ui.mtverse.dev/components/backgrounds/cyber-grid-bg",
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
