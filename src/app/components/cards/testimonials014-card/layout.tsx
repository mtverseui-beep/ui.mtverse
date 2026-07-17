import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terminal CLI Green Phosphor – Testimonials React Component",
  description: "Terminal CLI Green Phosphor is a production-ready testimonials React component featuring Terminal/CLI green phosphor CRT + scanlines + JetBrains Mono +…",
  keywords: ["Terminal CLI Green Phosphor","Testimonials component","Testimonials React component","Testimonials Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/testimonials014-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/testimonials014-card",
    title: "Terminal CLI Green Phosphor – Testimonials React Component",
    description: "Terminal CLI Green Phosphor is a production-ready testimonials React component featuring Terminal/CLI green phosphor CRT + scanlines + JetBrains Mono +…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terminal CLI Green Phosphor – Testimonials React Component",
    description: "Terminal CLI Green Phosphor is a production-ready testimonials React component featuring Terminal/CLI green phosphor CRT + scanlines + JetBrains Mono +…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Terminal CLI Green Phosphor",
  "description": "Terminal CLI Green Phosphor is a production-ready testimonials React component featuring Terminal/CLI green phosphor CRT + scanlines + JetBrains Mono +…",
  "url": "https://www.mtverse.dev/components/cards/testimonials014-card",
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
