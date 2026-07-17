import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mono Editorial Sidebar – Sidebar React Component",
  description: "Mono Editorial Sidebar is a production-ready sidebar React component featuring Pure black & white · Georgia serif · newspaper masthead · no color ·…",
  keywords: ["Mono Editorial Sidebar","Sidebar component","Sidebar React component","Sidebar Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/mono-editorial-sidebar-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/mono-editorial-sidebar-card",
    title: "Mono Editorial Sidebar – Sidebar React Component",
    description: "Mono Editorial Sidebar is a production-ready sidebar React component featuring Pure black & white · Georgia serif · newspaper masthead · no color ·…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mono Editorial Sidebar – Sidebar React Component",
    description: "Mono Editorial Sidebar is a production-ready sidebar React component featuring Pure black & white · Georgia serif · newspaper masthead · no color ·…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Mono Editorial Sidebar",
  "description": "Mono Editorial Sidebar is a production-ready sidebar React component featuring Pure black & white · Georgia serif · newspaper masthead · no color ·…",
  "url": "https://www.mtverse.dev/components/cards/mono-editorial-sidebar-card",
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
