import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Emoji Picker - Forms React Component",
  description: "Emoji Picker is a production-ready forms React component featuring Category grid + search + recent. Copy, customize, and use it in Next.js projects.",
  keywords: ["Emoji Picker","Forms component","Forms React component","Forms Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/forms/emoji-picker" },
  openGraph: {
    type: "website",
    url: "/components/forms/emoji-picker",
    title: "Emoji Picker - Forms React Component",
    description: "Emoji Picker is a production-ready forms React component featuring Category grid + search + recent. Copy, customize, and use it in Next.js projects.",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Emoji Picker - Forms React Component",
    description: "Emoji Picker is a production-ready forms React component featuring Category grid + search + recent. Copy, customize, and use it in Next.js projects.",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Emoji Picker",
  "description": "Emoji Picker is a production-ready forms React component featuring Category grid + search + recent. Copy, customize, and use it in Next.js projects.",
  "url": "https://ui.mtverse.dev/components/forms/emoji-picker",
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
