import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Floating Inputs - Forms React Component",
  description: "Floating Inputs is a production-ready forms React component featuring Float labels + focus glow + validation + strength. Copy, customize, and use it in...",
  keywords: ["Floating Inputs","Forms component","Forms React component","Forms Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/forms/animated-floating-input" },
  openGraph: {
    type: "website",
    url: "/components/forms/animated-floating-input",
    title: "Floating Inputs - Forms React Component",
    description: "Floating Inputs is a production-ready forms React component featuring Float labels + focus glow + validation + strength. Copy, customize, and use it in...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Floating Inputs - Forms React Component",
    description: "Floating Inputs is a production-ready forms React component featuring Float labels + focus glow + validation + strength. Copy, customize, and use it in...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Floating Inputs",
  "description": "Floating Inputs is a production-ready forms React component featuring Float labels + focus glow + validation + strength. Copy, customize, and use it in...",
  "url": "https://ui.mtverse.dev/components/forms/animated-floating-input",
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
