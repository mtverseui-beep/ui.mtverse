import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Split Navigation Scroll Shrink – Navbar React Component",
  description: "Split Navigation Scroll Shrink is a production-ready navbar React component featuring Split navigation — two groups + center divider + scroll shrink…",
  keywords: ["Split Navigation Scroll Shrink","Navbar component","Navbar React component","Navbar Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/navbar017-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/navbar017-card",
    title: "Split Navigation Scroll Shrink – Navbar React Component",
    description: "Split Navigation Scroll Shrink is a production-ready navbar React component featuring Split navigation — two groups + center divider + scroll shrink…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Split Navigation Scroll Shrink – Navbar React Component",
    description: "Split Navigation Scroll Shrink is a production-ready navbar React component featuring Split navigation — two groups + center divider + scroll shrink…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Split Navigation Scroll Shrink",
  "description": "Split Navigation Scroll Shrink is a production-ready navbar React component featuring Split navigation — two groups + center divider + scroll shrink…",
  "url": "https://www.mtverse.dev/components/cards/navbar017-card",
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
