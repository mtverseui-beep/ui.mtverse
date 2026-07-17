import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dropdown Menu – Forms React Component",
  description: "Dropdown Menu is a production-ready forms React component featuring Action, preference, and nested portal menus. Copy, customize, and use it in Next.js…",
  keywords: ["Dropdown Menu","Forms component","Forms React component","Forms Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/dropdown-menu-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/dropdown-menu-card",
    title: "Dropdown Menu – Forms React Component",
    description: "Dropdown Menu is a production-ready forms React component featuring Action, preference, and nested portal menus. Copy, customize, and use it in Next.js…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dropdown Menu – Forms React Component",
    description: "Dropdown Menu is a production-ready forms React component featuring Action, preference, and nested portal menus. Copy, customize, and use it in Next.js…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Dropdown Menu",
  "description": "Dropdown Menu is a production-ready forms React component featuring Action, preference, and nested portal menus. Copy, customize, and use it in Next.js…",
  "url": "https://www.mtverse.dev/components/cards/dropdown-menu-card",
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
