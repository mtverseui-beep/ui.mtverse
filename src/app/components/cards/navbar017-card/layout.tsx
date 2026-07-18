import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Split Navigation Scroll Shrink - Navbar React Component",
  description: "Split Navigation Scroll Shrink is a production-ready navbar React component featuring Split navigation — two groups + center divider + scroll shrink...",
  keywords: ["Split Navigation Scroll Shrink","Navbar component","Navbar React component","Navbar Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/navbars/navbar017" },
  openGraph: {
    type: "website",
    url: "/components/navbars/navbar017",
    title: "Split Navigation Scroll Shrink - Navbar React Component",
    description: "Split Navigation Scroll Shrink is a production-ready navbar React component featuring Split navigation — two groups + center divider + scroll shrink...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Split Navigation Scroll Shrink - Navbar React Component",
    description: "Split Navigation Scroll Shrink is a production-ready navbar React component featuring Split navigation — two groups + center divider + scroll shrink...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Split Navigation Scroll Shrink",
  "description": "Split Navigation Scroll Shrink is a production-ready navbar React component featuring Split navigation — two groups + center divider + scroll shrink...",
  "url": "https://ui.mtverse.dev/components/navbars/navbar017",
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
