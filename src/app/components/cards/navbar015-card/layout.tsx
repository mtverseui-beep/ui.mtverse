import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Code-Host Repo Tabs Branch - Navbar React Component",
  description: "Code-Host Repo Tabs Branch is a production-ready navbar React component featuring Developer tools — dense dark + branch selector + icon nav + ⌘K search...",
  keywords: ["Code-Host Repo Tabs Branch","Navbar component","Navbar React component","Navbar Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/navbars/navbar015" },
  openGraph: {
    type: "website",
    url: "/components/navbars/navbar015",
    title: "Code-Host Repo Tabs Branch - Navbar React Component",
    description: "Code-Host Repo Tabs Branch is a production-ready navbar React component featuring Developer tools — dense dark + branch selector + icon nav + ⌘K search...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Code-Host Repo Tabs Branch - Navbar React Component",
    description: "Code-Host Repo Tabs Branch is a production-ready navbar React component featuring Developer tools — dense dark + branch selector + icon nav + ⌘K search...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Code-Host Repo Tabs Branch",
  "description": "Code-Host Repo Tabs Branch is a production-ready navbar React component featuring Developer tools — dense dark + branch selector + icon nav + ⌘K search...",
  "url": "https://ui.mtverse.dev/components/navbars/navbar015",
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
