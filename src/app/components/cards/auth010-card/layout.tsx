import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cyberpunk Neon Auth – Auth React Component",
  description: "Cyberpunk Neon Auth is a production-ready auth React component featuring Cyberpunk neon grid floor + scanlines + neon glowing border + magenta/cyan. Copy,…",
  keywords: ["Cyberpunk Neon Auth","Auth component","Auth React component","Auth Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/auth010-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/auth010-card",
    title: "Cyberpunk Neon Auth – Auth React Component",
    description: "Cyberpunk Neon Auth is a production-ready auth React component featuring Cyberpunk neon grid floor + scanlines + neon glowing border + magenta/cyan. Copy,…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cyberpunk Neon Auth – Auth React Component",
    description: "Cyberpunk Neon Auth is a production-ready auth React component featuring Cyberpunk neon grid floor + scanlines + neon glowing border + magenta/cyan. Copy,…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Cyberpunk Neon Auth",
  "description": "Cyberpunk Neon Auth is a production-ready auth React component featuring Cyberpunk neon grid floor + scanlines + neon glowing border + magenta/cyan. Copy,…",
  "url": "https://www.mtverse.dev/components/cards/auth010-card",
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
