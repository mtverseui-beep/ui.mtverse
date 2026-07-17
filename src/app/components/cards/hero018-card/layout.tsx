import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "3D Product Carousel Auto-Rotate – Hero React Component",
  description: "3D Product Carousel Auto-Rotate is a production-ready hero React component featuring 3D product carousel — auto-rotate + arrows + product cards w/ images +…",
  keywords: ["3D Product Carousel Auto-Rotate","Hero component","Hero React component","Hero Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/hero018-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/hero018-card",
    title: "3D Product Carousel Auto-Rotate – Hero React Component",
    description: "3D Product Carousel Auto-Rotate is a production-ready hero React component featuring 3D product carousel — auto-rotate + arrows + product cards w/ images +…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "3D Product Carousel Auto-Rotate – Hero React Component",
    description: "3D Product Carousel Auto-Rotate is a production-ready hero React component featuring 3D product carousel — auto-rotate + arrows + product cards w/ images +…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "3D Product Carousel Auto-Rotate",
  "description": "3D Product Carousel Auto-Rotate is a production-ready hero React component featuring 3D product carousel — auto-rotate + arrows + product cards w/ images +…",
  "url": "https://www.mtverse.dev/components/cards/hero018-card",
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
