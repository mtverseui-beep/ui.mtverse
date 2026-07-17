import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bento Grid Hero Live Counter – Hero React Component",
  description: "Bento Grid Hero Live Counter is a production-ready hero React component featuring Bento grid hero — 6 content cards + live counter + code snippet +…",
  keywords: ["Bento Grid Hero Live Counter","Hero component","Hero React component","Hero Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/hero016-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/hero016-card",
    title: "Bento Grid Hero Live Counter – Hero React Component",
    description: "Bento Grid Hero Live Counter is a production-ready hero React component featuring Bento grid hero — 6 content cards + live counter + code snippet +…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bento Grid Hero Live Counter – Hero React Component",
    description: "Bento Grid Hero Live Counter is a production-ready hero React component featuring Bento grid hero — 6 content cards + live counter + code snippet +…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Bento Grid Hero Live Counter",
  "description": "Bento Grid Hero Live Counter is a production-ready hero React component featuring Bento grid hero — 6 content cards + live counter + code snippet +…",
  "url": "https://www.mtverse.dev/components/cards/hero016-card",
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
