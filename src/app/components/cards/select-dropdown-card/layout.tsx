import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Select Dropdown – Forms React Component",
  description: "Select Dropdown is a production-ready forms React component featuring Portal select + cascading fields + searchable combobox. Copy, customize, and use it in…",
  keywords: ["Select Dropdown","Forms component","Forms React component","Forms Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/select-dropdown-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/select-dropdown-card",
    title: "Select Dropdown – Forms React Component",
    description: "Select Dropdown is a production-ready forms React component featuring Portal select + cascading fields + searchable combobox. Copy, customize, and use it in…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Select Dropdown – Forms React Component",
    description: "Select Dropdown is a production-ready forms React component featuring Portal select + cascading fields + searchable combobox. Copy, customize, and use it in…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Select Dropdown",
  "description": "Select Dropdown is a production-ready forms React component featuring Portal select + cascading fields + searchable combobox. Copy, customize, and use it in…",
  "url": "https://www.mtverse.dev/components/cards/select-dropdown-card",
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
