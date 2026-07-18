import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Loading Skeletons - Core React Component",
  description: "Loading Skeletons is a production-ready core React component featuring Card · table · profile · chat · article skeletons · shimmer animation · dark/light....",
  keywords: ["Loading Skeletons","Core component","Core React component","Core Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/loading-skeletons" },
  openGraph: {
    type: "website",
    url: "/components/cards/loading-skeletons",
    title: "Loading Skeletons - Core React Component",
    description: "Loading Skeletons is a production-ready core React component featuring Card · table · profile · chat · article skeletons · shimmer animation · dark/light....",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Loading Skeletons - Core React Component",
    description: "Loading Skeletons is a production-ready core React component featuring Card · table · profile · chat · article skeletons · shimmer animation · dark/light....",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Loading Skeletons",
  "description": "Loading Skeletons is a production-ready core React component featuring Card · table · profile · chat · article skeletons · shimmer animation · dark/light....",
  "url": "https://ui.mtverse.dev/components/cards/loading-skeletons",
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
