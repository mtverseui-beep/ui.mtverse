import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terminal CLI Green Typing Price – Pricing React Component",
  description: "Terminal CLI Green Typing Price is a production-ready pricing React component featuring Terminal/CLI developer + CRT scanlines + typing price display…",
  keywords: ["Terminal CLI Green Typing Price","Pricing component","Pricing React component","Pricing Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/pricing014-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/pricing014-card",
    title: "Terminal CLI Green Typing Price – Pricing React Component",
    description: "Terminal CLI Green Typing Price is a production-ready pricing React component featuring Terminal/CLI developer + CRT scanlines + typing price display…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terminal CLI Green Typing Price – Pricing React Component",
    description: "Terminal CLI Green Typing Price is a production-ready pricing React component featuring Terminal/CLI developer + CRT scanlines + typing price display…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Terminal CLI Green Typing Price",
  "description": "Terminal CLI Green Typing Price is a production-ready pricing React component featuring Terminal/CLI developer + CRT scanlines + typing price display…",
  "url": "https://www.mtverse.dev/components/cards/pricing014-card",
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
