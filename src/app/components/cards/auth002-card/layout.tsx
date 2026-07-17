import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aurora Glassmorphism Auth – Auth React Component",
  description: "Aurora Glassmorphism Auth is a production-ready auth React component featuring Aurora glassmorphism centered card + floating gradient orbs + staggered…",
  keywords: ["Aurora Glassmorphism Auth","Auth component","Auth React component","Auth Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/auth002-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/auth002-card",
    title: "Aurora Glassmorphism Auth – Auth React Component",
    description: "Aurora Glassmorphism Auth is a production-ready auth React component featuring Aurora glassmorphism centered card + floating gradient orbs + staggered…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aurora Glassmorphism Auth – Auth React Component",
    description: "Aurora Glassmorphism Auth is a production-ready auth React component featuring Aurora glassmorphism centered card + floating gradient orbs + staggered…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Aurora Glassmorphism Auth",
  "description": "Aurora Glassmorphism Auth is a production-ready auth React component featuring Aurora glassmorphism centered card + floating gradient orbs + staggered…",
  "url": "https://www.mtverse.dev/components/cards/auth002-card",
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
