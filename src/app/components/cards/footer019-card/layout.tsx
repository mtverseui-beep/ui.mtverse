import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio Cursor Blink Project Tiles - Footer React Component",
  description: "Portfolio Cursor Blink Project Tiles is a production-ready footer React component featuring Portfolio — personal name brand + status badge + cursor blink...",
  keywords: ["Portfolio Cursor Blink Project Tiles","Footer component","Footer React component","Footer Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/footers/footer019" },
  openGraph: {
    type: "website",
    url: "/components/footers/footer019",
    title: "Portfolio Cursor Blink Project Tiles - Footer React Component",
    description: "Portfolio Cursor Blink Project Tiles is a production-ready footer React component featuring Portfolio — personal name brand + status badge + cursor blink...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Portfolio Cursor Blink Project Tiles - Footer React Component",
    description: "Portfolio Cursor Blink Project Tiles is a production-ready footer React component featuring Portfolio — personal name brand + status badge + cursor blink...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Portfolio Cursor Blink Project Tiles",
  "description": "Portfolio Cursor Blink Project Tiles is a production-ready footer React component featuring Portfolio — personal name brand + status badge + cursor blink...",
  "url": "https://ui.mtverse.dev/components/footers/footer019",
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
