import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sage Forest Sidebar – Sidebar React Component",
  description: "Sage Forest Sidebar is a production-ready sidebar React component featuring Earthy sage green · organic rounded shapes · section-colored gradients ·…",
  keywords: ["Sage Forest Sidebar","Sidebar component","Sidebar React component","Sidebar Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/sage-forest-sidebar-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/sage-forest-sidebar-card",
    title: "Sage Forest Sidebar – Sidebar React Component",
    description: "Sage Forest Sidebar is a production-ready sidebar React component featuring Earthy sage green · organic rounded shapes · section-colored gradients ·…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sage Forest Sidebar – Sidebar React Component",
    description: "Sage Forest Sidebar is a production-ready sidebar React component featuring Earthy sage green · organic rounded shapes · section-colored gradients ·…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Sage Forest Sidebar",
  "description": "Sage Forest Sidebar is a production-ready sidebar React component featuring Earthy sage green · organic rounded shapes · section-colored gradients ·…",
  "url": "https://www.mtverse.dev/components/cards/sage-forest-sidebar-card",
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
