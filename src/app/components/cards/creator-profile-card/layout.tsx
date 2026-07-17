import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Creator Profile – Profile React Component",
  description: "Creator Profile is a production-ready profile React component featuring Tilt + cover parallax. Copy, customize, and use it in Next.js projects.",
  keywords: ["Creator Profile","Profile component","Profile React component","Profile Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/creator-profile-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/creator-profile-card",
    title: "Creator Profile – Profile React Component",
    description: "Creator Profile is a production-ready profile React component featuring Tilt + cover parallax. Copy, customize, and use it in Next.js projects.",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Creator Profile – Profile React Component",
    description: "Creator Profile is a production-ready profile React component featuring Tilt + cover parallax. Copy, customize, and use it in Next.js projects.",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Creator Profile",
  "description": "Creator Profile is a production-ready profile React component featuring Tilt + cover parallax. Copy, customize, and use it in Next.js projects.",
  "url": "https://www.mtverse.dev/components/cards/creator-profile-card",
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
