import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Progress Bar - Forms React Component",
  description: "Progress Bar is a production-ready forms React component featuring Controlled linear, circular, and checkout progress. Copy, customize, and use it in...",
  keywords: ["Progress Bar","Forms component","Forms React component","Forms Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/forms/progress-bar" },
  openGraph: {
    type: "website",
    url: "/components/forms/progress-bar",
    title: "Progress Bar - Forms React Component",
    description: "Progress Bar is a production-ready forms React component featuring Controlled linear, circular, and checkout progress. Copy, customize, and use it in...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Progress Bar - Forms React Component",
    description: "Progress Bar is a production-ready forms React component featuring Controlled linear, circular, and checkout progress. Copy, customize, and use it in...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Progress Bar",
  "description": "Progress Bar is a production-ready forms React component featuring Controlled linear, circular, and checkout progress. Copy, customize, and use it in...",
  "url": "https://ui.mtverse.dev/components/forms/progress-bar",
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
