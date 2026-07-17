import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Iridescent Foil – Backgrounds React Component",
  description: "Iridescent Foil is a production-ready backgrounds React component featuring Tasteful foil facets · premium identity lighting · accessible foreground scrim.…",
  keywords: ["Iridescent Foil","Backgrounds component","Backgrounds React component","Backgrounds Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/holographic-bg-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/holographic-bg-card",
    title: "Iridescent Foil – Backgrounds React Component",
    description: "Iridescent Foil is a production-ready backgrounds React component featuring Tasteful foil facets · premium identity lighting · accessible foreground scrim.…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Iridescent Foil – Backgrounds React Component",
    description: "Iridescent Foil is a production-ready backgrounds React component featuring Tasteful foil facets · premium identity lighting · accessible foreground scrim.…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Iridescent Foil",
  "description": "Iridescent Foil is a production-ready backgrounds React component featuring Tasteful foil facets · premium identity lighting · accessible foreground scrim.…",
  "url": "https://www.mtverse.dev/components/cards/holographic-bg-card",
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
