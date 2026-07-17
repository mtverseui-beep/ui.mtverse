import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nested Drawer – Modals React Component",
  description: "Nested Drawer is a production-ready modals React component featuring Drawer within drawer with breadcrumb + back navigation + slide transitions. Copy,…",
  keywords: ["Nested Drawer","Modals component","Modals React component","Modals Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/nested-drawer-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/nested-drawer-card",
    title: "Nested Drawer – Modals React Component",
    description: "Nested Drawer is a production-ready modals React component featuring Drawer within drawer with breadcrumb + back navigation + slide transitions. Copy,…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nested Drawer – Modals React Component",
    description: "Nested Drawer is a production-ready modals React component featuring Drawer within drawer with breadcrumb + back navigation + slide transitions. Copy,…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Nested Drawer",
  "description": "Nested Drawer is a production-ready modals React component featuring Drawer within drawer with breadcrumb + back navigation + slide transitions. Copy,…",
  "url": "https://www.mtverse.dev/components/cards/nested-drawer-card",
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
