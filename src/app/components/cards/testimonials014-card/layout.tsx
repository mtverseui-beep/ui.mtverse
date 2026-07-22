import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terminal CLI Green Phosphor - Testimonials React Component",
  description: "Terminal CLI Green Phosphor is a production-ready testimonials React component featuring Terminal/CLI green phosphor CRT + scanlines + JetBrains Mono +...",
  keywords: ["Terminal CLI Green Phosphor","Testimonials component","Testimonials React component","Testimonials Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/testimonials/testimonials014" },
  openGraph: {
    type: "website",
    url: "/components/testimonials/testimonials014",
    title: "Terminal CLI Green Phosphor - Testimonials React Component",
    description: "Terminal CLI Green Phosphor is a production-ready testimonials React component featuring Terminal/CLI green phosphor CRT + scanlines + JetBrains Mono +...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Terminal CLI Green Phosphor - Testimonials React Component",
    description: "Terminal CLI Green Phosphor is a production-ready testimonials React component featuring Terminal/CLI green phosphor CRT + scanlines + JetBrains Mono +...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Terminal CLI Green Phosphor",
  "description": "Terminal CLI Green Phosphor is a production-ready testimonials React component featuring Terminal/CLI green phosphor CRT + scanlines + JetBrains Mono +...",
  "url": "https://ui.mtverse.dev/components/testimonials/testimonials014",
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
