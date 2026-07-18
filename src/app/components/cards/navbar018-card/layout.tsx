import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Centered Serif Split Nav - Navbar React Component",
  description: "Centered Serif Split Nav is a production-ready navbar React component featuring Centered logo — symmetric split nav + serif typography + hairline underline...",
  keywords: ["Centered Serif Split Nav","Navbar component","Navbar React component","Navbar Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/navbars/navbar018" },
  openGraph: {
    type: "website",
    url: "/components/navbars/navbar018",
    title: "Centered Serif Split Nav - Navbar React Component",
    description: "Centered Serif Split Nav is a production-ready navbar React component featuring Centered logo — symmetric split nav + serif typography + hairline underline...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Centered Serif Split Nav - Navbar React Component",
    description: "Centered Serif Split Nav is a production-ready navbar React component featuring Centered logo — symmetric split nav + serif typography + hairline underline...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Centered Serif Split Nav",
  "description": "Centered Serif Split Nav is a production-ready navbar React component featuring Centered logo — symmetric split nav + serif typography + hairline underline...",
  "url": "https://ui.mtverse.dev/components/navbars/navbar018",
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
