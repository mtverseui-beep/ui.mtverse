import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bento Grid Hero Live Counter - Hero React Component",
  description: "Bento Grid Hero Live Counter is a production-ready hero React component featuring Bento grid hero — 6 content cards + live counter + code snippet +...",
  keywords: ["Bento Grid Hero Live Counter","Hero component","Hero React component","Hero Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/heroes/hero016" },
  openGraph: {
    type: "website",
    url: "/components/heroes/hero016",
    title: "Bento Grid Hero Live Counter - Hero React Component",
    description: "Bento Grid Hero Live Counter is a production-ready hero React component featuring Bento grid hero — 6 content cards + live counter + code snippet +...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Bento Grid Hero Live Counter - Hero React Component",
    description: "Bento Grid Hero Live Counter is a production-ready hero React component featuring Bento grid hero — 6 content cards + live counter + code snippet +...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Bento Grid Hero Live Counter",
  "description": "Bento Grid Hero Live Counter is a production-ready hero React component featuring Bento grid hero — 6 content cards + live counter + code snippet +...",
  "url": "https://ui.mtverse.dev/components/heroes/hero016",
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
