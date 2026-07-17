import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brutalist Offset Shadow Auth – Auth React Component",
  description: "Brutalist Offset Shadow Auth is a production-ready auth React component featuring Brutalist black/yellow offset shadow card + square inputs + Archivo Black.…",
  keywords: ["Brutalist Offset Shadow Auth","Auth component","Auth React component","Auth Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/auth003-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/auth003-card",
    title: "Brutalist Offset Shadow Auth – Auth React Component",
    description: "Brutalist Offset Shadow Auth is a production-ready auth React component featuring Brutalist black/yellow offset shadow card + square inputs + Archivo Black.…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Brutalist Offset Shadow Auth – Auth React Component",
    description: "Brutalist Offset Shadow Auth is a production-ready auth React component featuring Brutalist black/yellow offset shadow card + square inputs + Archivo Black.…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Brutalist Offset Shadow Auth",
  "description": "Brutalist Offset Shadow Auth is a production-ready auth React component featuring Brutalist black/yellow offset shadow card + square inputs + Archivo Black.…",
  "url": "https://www.mtverse.dev/components/cards/auth003-card",
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
