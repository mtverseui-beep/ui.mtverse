import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Progress Bar – Forms React Component",
  description: "Progress Bar is a production-ready forms React component featuring Controlled linear, circular, and checkout progress. Copy, customize, and use it in…",
  keywords: ["Progress Bar","Forms component","Forms React component","Forms Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/progress-bar-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/progress-bar-card",
    title: "Progress Bar – Forms React Component",
    description: "Progress Bar is a production-ready forms React component featuring Controlled linear, circular, and checkout progress. Copy, customize, and use it in…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Progress Bar – Forms React Component",
    description: "Progress Bar is a production-ready forms React component featuring Controlled linear, circular, and checkout progress. Copy, customize, and use it in…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Progress Bar",
  "description": "Progress Bar is a production-ready forms React component featuring Controlled linear, circular, and checkout progress. Copy, customize, and use it in…",
  "url": "https://www.mtverse.dev/components/cards/progress-bar-card",
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
