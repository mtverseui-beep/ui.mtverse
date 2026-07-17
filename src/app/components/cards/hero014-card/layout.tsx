import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terminal Typing Matrix Code – Hero React Component",
  description: "Terminal Typing Matrix Code is a production-ready hero React component featuring Terminal typing animation + matrix code bg + GitHub stars (Stacktrace).…",
  keywords: ["Terminal Typing Matrix Code","Hero component","Hero React component","Hero Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/hero014-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/hero014-card",
    title: "Terminal Typing Matrix Code – Hero React Component",
    description: "Terminal Typing Matrix Code is a production-ready hero React component featuring Terminal typing animation + matrix code bg + GitHub stars (Stacktrace).…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terminal Typing Matrix Code – Hero React Component",
    description: "Terminal Typing Matrix Code is a production-ready hero React component featuring Terminal typing animation + matrix code bg + GitHub stars (Stacktrace).…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Terminal Typing Matrix Code",
  "description": "Terminal Typing Matrix Code is a production-ready hero React component featuring Terminal typing animation + matrix code bg + GitHub stars (Stacktrace).…",
  "url": "https://www.mtverse.dev/components/cards/hero014-card",
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
