import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Art Gallery Slider – Agents React Component",
  description: "Art Gallery Slider is a production-ready agents React component featuring Full-screen art gallery + drag/wheel/keyboard nav. Copy, customize, and use it in…",
  keywords: ["Art Gallery Slider","Agents component","Agents React component","Agents Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/art-gallery-slider-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/art-gallery-slider-card",
    title: "Art Gallery Slider – Agents React Component",
    description: "Art Gallery Slider is a production-ready agents React component featuring Full-screen art gallery + drag/wheel/keyboard nav. Copy, customize, and use it in…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Art Gallery Slider – Agents React Component",
    description: "Art Gallery Slider is a production-ready agents React component featuring Full-screen art gallery + drag/wheel/keyboard nav. Copy, customize, and use it in…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Art Gallery Slider",
  "description": "Art Gallery Slider is a production-ready agents React component featuring Full-screen art gallery + drag/wheel/keyboard nav. Copy, customize, and use it in…",
  "url": "https://www.mtverse.dev/components/cards/art-gallery-slider-card",
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
