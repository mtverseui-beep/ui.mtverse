import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard Uptime Grid Metrics – Footer React Component",
  description: "Dashboard Uptime Grid Metrics is a production-ready footer React component featuring Dashboard product — uptime indicator + animated grid bg (Pinpoint).…",
  keywords: ["Dashboard Uptime Grid Metrics","Footer component","Footer React component","Footer Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/footer013-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/footer013-card",
    title: "Dashboard Uptime Grid Metrics – Footer React Component",
    description: "Dashboard Uptime Grid Metrics is a production-ready footer React component featuring Dashboard product — uptime indicator + animated grid bg (Pinpoint).…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dashboard Uptime Grid Metrics – Footer React Component",
    description: "Dashboard Uptime Grid Metrics is a production-ready footer React component featuring Dashboard product — uptime indicator + animated grid bg (Pinpoint).…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Dashboard Uptime Grid Metrics",
  "description": "Dashboard Uptime Grid Metrics is a production-ready footer React component featuring Dashboard product — uptime indicator + animated grid bg (Pinpoint).…",
  "url": "https://www.mtverse.dev/components/cards/footer013-card",
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
