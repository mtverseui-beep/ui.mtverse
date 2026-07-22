import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ChatGPT Theme - Agents React Component",
  description: "ChatGPT Theme is a production-ready agents React component featuring Tinte ChatGPT theme demo. Copy, customize, and use it in Next.js projects.",
  keywords: ["ChatGPT Theme","Agents component","Agents React component","Agents Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/premium/chatgpt-theme" },
  openGraph: {
    type: "website",
    url: "/components/premium/chatgpt-theme",
    title: "ChatGPT Theme - Agents React Component",
    description: "ChatGPT Theme is a production-ready agents React component featuring Tinte ChatGPT theme demo. Copy, customize, and use it in Next.js projects.",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "ChatGPT Theme - Agents React Component",
    description: "ChatGPT Theme is a production-ready agents React component featuring Tinte ChatGPT theme demo. Copy, customize, and use it in Next.js projects.",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "ChatGPT Theme",
  "description": "ChatGPT Theme is a production-ready agents React component featuring Tinte ChatGPT theme demo. Copy, customize, and use it in Next.js projects.",
  "url": "https://ui.mtverse.dev/components/premium/chatgpt-theme",
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
