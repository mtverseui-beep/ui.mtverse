import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Split Interactive Demo Tabbed – Hero React Component",
  description: "Split Interactive Demo Tabbed is a production-ready hero React component featuring Split interactive demo + tabbed panel (Inbox/Analytics/Settings) + social…",
  keywords: ["Split Interactive Demo Tabbed","Hero component","Hero React component","Hero Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/hero013-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/hero013-card",
    title: "Split Interactive Demo Tabbed – Hero React Component",
    description: "Split Interactive Demo Tabbed is a production-ready hero React component featuring Split interactive demo + tabbed panel (Inbox/Analytics/Settings) + social…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Split Interactive Demo Tabbed – Hero React Component",
    description: "Split Interactive Demo Tabbed is a production-ready hero React component featuring Split interactive demo + tabbed panel (Inbox/Analytics/Settings) + social…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Split Interactive Demo Tabbed",
  "description": "Split Interactive Demo Tabbed is a production-ready hero React component featuring Split interactive demo + tabbed panel (Inbox/Analytics/Settings) + social…",
  "url": "https://www.mtverse.dev/components/cards/hero013-card",
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
