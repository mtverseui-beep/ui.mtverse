import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cat Slider - Agents React Component",
  description: "Cat Slider is a production-ready agents React component featuring 5 expandable cat cards (Docked). Copy, customize, and use it in Next.js projects.",
  keywords: ["Cat Slider","Agents component","Agents React component","Agents Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/premium/cat-slider" },
  openGraph: {
    type: "website",
    url: "/components/premium/cat-slider",
    title: "Cat Slider - Agents React Component",
    description: "Cat Slider is a production-ready agents React component featuring 5 expandable cat cards (Docked). Copy, customize, and use it in Next.js projects.",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Cat Slider - Agents React Component",
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
  "url": "https://ui.mtverse.dev/components/premium/cat-slider",
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
