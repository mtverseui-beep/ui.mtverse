import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio Cursor Blink Project Tiles – Footer React Component",
  description: "Portfolio Cursor Blink Project Tiles is a production-ready footer React component featuring Portfolio — personal name brand + status badge + cursor blink…",
  keywords: ["Portfolio Cursor Blink Project Tiles","Footer component","Footer React component","Footer Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/footer019-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/footer019-card",
    title: "Portfolio Cursor Blink Project Tiles – Footer React Component",
    description: "Portfolio Cursor Blink Project Tiles is a production-ready footer React component featuring Portfolio — personal name brand + status badge + cursor blink…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio Cursor Blink Project Tiles – Footer React Component",
    description: "Portfolio Cursor Blink Project Tiles is a production-ready footer React component featuring Portfolio — personal name brand + status badge + cursor blink…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Portfolio Cursor Blink Project Tiles",
  "description": "Portfolio Cursor Blink Project Tiles is a production-ready footer React component featuring Portfolio — personal name brand + status badge + cursor blink…",
  "url": "https://www.mtverse.dev/components/cards/footer019-card",
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
