import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Split Interactive Demo Tabs - Hero React Component",
  description: "Split Interactive Demo Tabs is a production-ready hero React component featuring Bg image + word blur reveal + CTAs (Skydda). Copy, customize, and use it in...",
  keywords: ["Split Interactive Demo Tabs","Hero component","Hero React component","Hero Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/heroes/hero008" },
  openGraph: {
    type: "website",
    url: "/components/heroes/hero008",
    title: "Split Interactive Demo Tabs - Hero React Component",
    description: "Split Interactive Demo Tabs is a production-ready hero React component featuring Bg image + word blur reveal + CTAs (Skydda). Copy, customize, and use it in...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Split Interactive Demo Tabs - Hero React Component",
    description: "Split Interactive Demo Tabs is a production-ready hero React component featuring Bg image + word blur reveal + CTAs (Skydda). Copy, customize, and use it in...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Split Interactive Demo Tabs",
  "description": "Split Interactive Demo Tabs is a production-ready hero React component featuring Bg image + word blur reveal + CTAs (Skydda). Copy, customize, and use it in...",
  "url": "https://ui.mtverse.dev/components/heroes/hero008",
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
