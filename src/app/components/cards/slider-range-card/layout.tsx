import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Range Slider - Forms React Component",
  description: "Range Slider is a production-ready forms React component featuring Accessible dual, single, and stepped sliders. Copy, customize, and use it in Next.js...",
  keywords: ["Range Slider","Forms component","Forms React component","Forms Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/forms/slider-range" },
  openGraph: {
    type: "website",
    url: "/components/forms/slider-range",
    title: "Range Slider - Forms React Component",
    description: "Range Slider is a production-ready forms React component featuring Accessible dual, single, and stepped sliders. Copy, customize, and use it in Next.js...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Range Slider - Forms React Component",
    description: "Range Slider is a production-ready forms React component featuring Accessible dual, single, and stepped sliders. Copy, customize, and use it in Next.js...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Range Slider",
  "description": "Range Slider is a production-ready forms React component featuring Accessible dual, single, and stepped sliders. Copy, customize, and use it in Next.js...",
  "url": "https://ui.mtverse.dev/components/forms/slider-range",
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
