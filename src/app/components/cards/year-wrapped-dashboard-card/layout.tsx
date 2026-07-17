import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Year Wrapped Dashboard – Agents React Component",
  description: "Year Wrapped Dashboard is a production-ready agents React component featuring Multi-style responsive dashboard. Copy, customize, and use it in Next.js…",
  keywords: ["Year Wrapped Dashboard","Agents component","Agents React component","Agents Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/year-wrapped-dashboard-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/year-wrapped-dashboard-card",
    title: "Year Wrapped Dashboard – Agents React Component",
    description: "Year Wrapped Dashboard is a production-ready agents React component featuring Multi-style responsive dashboard. Copy, customize, and use it in Next.js…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Year Wrapped Dashboard – Agents React Component",
    description: "Year Wrapped Dashboard is a production-ready agents React component featuring Multi-style responsive dashboard. Copy, customize, and use it in Next.js…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Year Wrapped Dashboard",
  "description": "Year Wrapped Dashboard is a production-ready agents React component featuring Multi-style responsive dashboard. Copy, customize, and use it in Next.js…",
  "url": "https://www.mtverse.dev/components/cards/year-wrapped-dashboard-card",
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
