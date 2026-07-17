import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aurora Wave Centered Auth – Auth React Component",
  description: "Aurora Wave Centered Auth is a production-ready auth React component featuring Vertical centered card + animated SVG aurora waves bg + indigo gradient +…",
  keywords: ["Aurora Wave Centered Auth","Auth component","Auth React component","Auth Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/auth017-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/auth017-card",
    title: "Aurora Wave Centered Auth – Auth React Component",
    description: "Aurora Wave Centered Auth is a production-ready auth React component featuring Vertical centered card + animated SVG aurora waves bg + indigo gradient +…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aurora Wave Centered Auth – Auth React Component",
    description: "Aurora Wave Centered Auth is a production-ready auth React component featuring Vertical centered card + animated SVG aurora waves bg + indigo gradient +…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Aurora Wave Centered Auth",
  "description": "Aurora Wave Centered Auth is a production-ready auth React component featuring Vertical centered card + animated SVG aurora waves bg + indigo gradient +…",
  "url": "https://www.mtverse.dev/components/cards/auth017-card",
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
