import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Midnight Velvet Sidebar – Sidebar React Component",
  description: "Midnight Velvet Sidebar is a production-ready sidebar React component featuring Luxury dark purple · gold accents · Georgia serif · velvet texture ·…",
  keywords: ["Midnight Velvet Sidebar","Sidebar component","Sidebar React component","Sidebar Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/midnight-velvet-sidebar-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/midnight-velvet-sidebar-card",
    title: "Midnight Velvet Sidebar – Sidebar React Component",
    description: "Midnight Velvet Sidebar is a production-ready sidebar React component featuring Luxury dark purple · gold accents · Georgia serif · velvet texture ·…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Midnight Velvet Sidebar – Sidebar React Component",
    description: "Midnight Velvet Sidebar is a production-ready sidebar React component featuring Luxury dark purple · gold accents · Georgia serif · velvet texture ·…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Midnight Velvet Sidebar",
  "description": "Midnight Velvet Sidebar is a production-ready sidebar React component featuring Luxury dark purple · gold accents · Georgia serif · velvet texture ·…",
  "url": "https://www.mtverse.dev/components/cards/midnight-velvet-sidebar-card",
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
