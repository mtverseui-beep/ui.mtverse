import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Virtualized Audit Grid - Tables React Component",
  description: "Virtualized Audit Grid is a production-ready tables React component featuring 5,000 deterministic events · TanStack virtualization · ResizeObserver sizing ·...",
  keywords: ["Virtualized Audit Grid","Tables component","Tables React component","Tables Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/tables/virtual-scroll-table" },
  openGraph: {
    type: "website",
    url: "/components/tables/virtual-scroll-table",
    title: "Virtualized Audit Grid - Tables React Component",
    description: "Virtualized Audit Grid is a production-ready tables React component featuring 5,000 deterministic events · TanStack virtualization · ResizeObserver sizing ·...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Virtualized Audit Grid - Tables React Component",
    description: "Virtualized Audit Grid is a production-ready tables React component featuring 5,000 deterministic events · TanStack virtualization · ResizeObserver sizing ·...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Virtualized Audit Grid",
  "description": "Virtualized Audit Grid is a production-ready tables React component featuring 5,000 deterministic events · TanStack virtualization · ResizeObserver sizing ·...",
  "url": "https://ui.mtverse.dev/components/tables/virtual-scroll-table",
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
