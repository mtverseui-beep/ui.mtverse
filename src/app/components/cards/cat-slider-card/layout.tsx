import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cat Slider – Agents React Component",
  description: "Cat Slider is a production-ready agents React component featuring 5 expandable cat cards (Docked). Copy, customize, and use it in Next.js projects.",
  keywords: ["Cat Slider","Agents component","Agents React component","Agents Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/cat-slider-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/cat-slider-card",
    title: "Cat Slider – Agents React Component",
    description: "Cat Slider is a production-ready agents React component featuring 5 expandable cat cards (Docked). Copy, customize, and use it in Next.js projects.",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cat Slider – Agents React Component",
    description: "Cat Slider is a production-ready agents React component featuring 5 expandable cat cards (Docked). Copy, customize, and use it in Next.js projects.",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Cat Slider",
  "description": "Cat Slider is a production-ready agents React component featuring 5 expandable cat cards (Docked). Copy, customize, and use it in Next.js projects.",
  "url": "https://www.mtverse.dev/components/cards/cat-slider-card",
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
