import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blob Bg Floating Glass Marquee – Hero React Component",
  description: "Blob Bg Floating Glass Marquee is a production-ready hero React component featuring Blob bg + floating glass cards + marquee ticker + sticker (Glow). Copy,…",
  keywords: ["Blob Bg Floating Glass Marquee","Hero component","Hero React component","Hero Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/hero010-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/hero010-card",
    title: "Blob Bg Floating Glass Marquee – Hero React Component",
    description: "Blob Bg Floating Glass Marquee is a production-ready hero React component featuring Blob bg + floating glass cards + marquee ticker + sticker (Glow). Copy,…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blob Bg Floating Glass Marquee – Hero React Component",
    description: "Blob Bg Floating Glass Marquee is a production-ready hero React component featuring Blob bg + floating glass cards + marquee ticker + sticker (Glow). Copy,…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Blob Bg Floating Glass Marquee",
  "description": "Blob Bg Floating Glass Marquee is a production-ready hero React component featuring Blob bg + floating glass cards + marquee ticker + sticker (Glow). Copy,…",
  "url": "https://www.mtverse.dev/components/cards/hero010-card",
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
