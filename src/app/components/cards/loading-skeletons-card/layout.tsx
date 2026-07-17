import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Loading Skeletons – Core React Component",
  description: "Loading Skeletons is a production-ready core React component featuring Card · table · profile · chat · article skeletons · shimmer animation · dark/light.…",
  keywords: ["Loading Skeletons","Core component","Core React component","Core Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/loading-skeletons-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/loading-skeletons-card",
    title: "Loading Skeletons – Core React Component",
    description: "Loading Skeletons is a production-ready core React component featuring Card · table · profile · chat · article skeletons · shimmer animation · dark/light.…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Loading Skeletons – Core React Component",
    description: "Loading Skeletons is a production-ready core React component featuring Card · table · profile · chat · article skeletons · shimmer animation · dark/light.…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Loading Skeletons",
  "description": "Loading Skeletons is a production-ready core React component featuring Card · table · profile · chat · article skeletons · shimmer animation · dark/light.…",
  "url": "https://www.mtverse.dev/components/cards/loading-skeletons-card",
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
