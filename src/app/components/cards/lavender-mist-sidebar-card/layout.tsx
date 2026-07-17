import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lavender Mist Sidebar – Sidebar React Component",
  description: "Lavender Mist Sidebar is a production-ready sidebar React component featuring Soft lavender purple · misty fog overlay · glassmorphism · calming wellness…",
  keywords: ["Lavender Mist Sidebar","Sidebar component","Sidebar React component","Sidebar Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/lavender-mist-sidebar-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/lavender-mist-sidebar-card",
    title: "Lavender Mist Sidebar – Sidebar React Component",
    description: "Lavender Mist Sidebar is a production-ready sidebar React component featuring Soft lavender purple · misty fog overlay · glassmorphism · calming wellness…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lavender Mist Sidebar – Sidebar React Component",
    description: "Lavender Mist Sidebar is a production-ready sidebar React component featuring Soft lavender purple · misty fog overlay · glassmorphism · calming wellness…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Lavender Mist Sidebar",
  "description": "Lavender Mist Sidebar is a production-ready sidebar React component featuring Soft lavender purple · misty fog overlay · glassmorphism · calming wellness…",
  "url": "https://www.mtverse.dev/components/cards/lavender-mist-sidebar-card",
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
