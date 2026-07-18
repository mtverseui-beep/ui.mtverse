import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rich Text Editor - Forms React Component",
  description: "Rich Text Editor is a production-ready forms React component featuring Safe Markdown + formatting toolbar + slash commands. Copy, customize, and use it in...",
  keywords: ["Rich Text Editor","Forms component","Forms React component","Forms Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/forms/rich-text-editor" },
  openGraph: {
    type: "website",
    url: "/components/forms/rich-text-editor",
    title: "Rich Text Editor - Forms React Component",
    description: "Rich Text Editor is a production-ready forms React component featuring Safe Markdown + formatting toolbar + slash commands. Copy, customize, and use it in...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Rich Text Editor - Forms React Component",
    description: "Rich Text Editor is a production-ready forms React component featuring Safe Markdown + formatting toolbar + slash commands. Copy, customize, and use it in...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Rich Text Editor",
  "description": "Rich Text Editor is a production-ready forms React component featuring Safe Markdown + formatting toolbar + slash commands. Copy, customize, and use it in...",
  "url": "https://ui.mtverse.dev/components/forms/rich-text-editor",
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
