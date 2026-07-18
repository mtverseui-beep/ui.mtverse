import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tooltip - Forms React Component",
  description: "Tooltip is a production-ready forms React component featuring Portal tooltips on hover and keyboard focus. Copy, customize, and use it in Next.js projects.",
  keywords: ["Tooltip","Forms component","Forms React component","Forms Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/forms/tooltip" },
  openGraph: {
    type: "website",
    url: "/components/forms/tooltip",
    title: "Tooltip - Forms React Component",
    description: "Tooltip is a production-ready forms React component featuring Portal tooltips on hover and keyboard focus. Copy, customize, and use it in Next.js projects.",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Tooltip - Forms React Component",
    description: "Tooltip is a production-ready forms React component featuring Portal tooltips on hover and keyboard focus. Copy, customize, and use it in Next.js projects.",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Tooltip",
  "description": "Tooltip is a production-ready forms React component featuring Portal tooltips on hover and keyboard focus. Copy, customize, and use it in Next.js projects.",
  "url": "https://ui.mtverse.dev/components/forms/tooltip",
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
