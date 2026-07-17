import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skydda Blur Reveal Hover Scale – Pricing React Component",
  description: "Skydda Blur Reveal Hover Scale is a production-ready pricing React component featuring Monthly/yearly spring toggle + blur reveal + hover scale (Skydda).…",
  keywords: ["Skydda Blur Reveal Hover Scale","Pricing component","Pricing React component","Pricing Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/pricing005-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/pricing005-card",
    title: "Skydda Blur Reveal Hover Scale – Pricing React Component",
    description: "Skydda Blur Reveal Hover Scale is a production-ready pricing React component featuring Monthly/yearly spring toggle + blur reveal + hover scale (Skydda).…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Skydda Blur Reveal Hover Scale – Pricing React Component",
    description: "Skydda Blur Reveal Hover Scale is a production-ready pricing React component featuring Monthly/yearly spring toggle + blur reveal + hover scale (Skydda).…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Skydda Blur Reveal Hover Scale",
  "description": "Skydda Blur Reveal Hover Scale is a production-ready pricing React component featuring Monthly/yearly spring toggle + blur reveal + hover scale (Skydda).…",
  "url": "https://www.mtverse.dev/components/cards/pricing005-card",
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
