import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard Uptime Grid Metrics - Footer React Component",
  description: "Dashboard Uptime Grid Metrics is a production-ready footer React component featuring Dashboard product — uptime indicator + animated grid bg (Pinpoint)....",
  keywords: ["Dashboard Uptime Grid Metrics","Footer component","Footer React component","Footer Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/footers/footer013" },
  openGraph: {
    type: "website",
    url: "/components/footers/footer013",
    title: "Dashboard Uptime Grid Metrics - Footer React Component",
    description: "Dashboard Uptime Grid Metrics is a production-ready footer React component featuring Dashboard product — uptime indicator + animated grid bg (Pinpoint)....",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Dashboard Uptime Grid Metrics - Footer React Component",
    description: "Dashboard Uptime Grid Metrics is a production-ready footer React component featuring Dashboard product — uptime indicator + animated grid bg (Pinpoint)....",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Dashboard Uptime Grid Metrics",
  "description": "Dashboard Uptime Grid Metrics is a production-ready footer React component featuring Dashboard product — uptime indicator + animated grid bg (Pinpoint)....",
  "url": "https://ui.mtverse.dev/components/footers/footer013",
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
