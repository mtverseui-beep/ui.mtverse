import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Northern Gradient – Backgrounds React Component",
  description: "Northern Gradient is a production-ready backgrounds React component featuring Deterministic northern ribbons · climate-tech palette · no random render…",
  keywords: ["Northern Gradient","Backgrounds component","Backgrounds React component","Backgrounds Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/aurora-borealis-bg-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/aurora-borealis-bg-card",
    title: "Northern Gradient – Backgrounds React Component",
    description: "Northern Gradient is a production-ready backgrounds React component featuring Deterministic northern ribbons · climate-tech palette · no random render…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Northern Gradient – Backgrounds React Component",
    description: "Northern Gradient is a production-ready backgrounds React component featuring Deterministic northern ribbons · climate-tech palette · no random render…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Northern Gradient",
  "description": "Northern Gradient is a production-ready backgrounds React component featuring Deterministic northern ribbons · climate-tech palette · no random render…",
  "url": "https://www.mtverse.dev/components/cards/aurora-borealis-bg-card",
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
