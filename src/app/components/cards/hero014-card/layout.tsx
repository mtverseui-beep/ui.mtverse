import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terminal Typing Matrix Code - Hero React Component",
  description: "Terminal Typing Matrix Code is a production-ready hero React component featuring Terminal typing animation + matrix code bg + GitHub stars (Stacktrace)....",
  keywords: ["Terminal Typing Matrix Code","Hero component","Hero React component","Hero Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/heroes/hero014" },
  openGraph: {
    type: "website",
    url: "/components/heroes/hero014",
    title: "Terminal Typing Matrix Code - Hero React Component",
    description: "Terminal Typing Matrix Code is a production-ready hero React component featuring Terminal typing animation + matrix code bg + GitHub stars (Stacktrace)....",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Terminal Typing Matrix Code - Hero React Component",
    description: "Terminal Typing Matrix Code is a production-ready hero React component featuring Terminal typing animation + matrix code bg + GitHub stars (Stacktrace)....",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Terminal Typing Matrix Code",
  "description": "Terminal Typing Matrix Code is a production-ready hero React component featuring Terminal typing animation + matrix code bg + GitHub stars (Stacktrace)....",
  "url": "https://ui.mtverse.dev/components/heroes/hero014",
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
