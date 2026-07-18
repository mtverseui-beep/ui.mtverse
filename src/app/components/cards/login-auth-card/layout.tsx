import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login Auth - Core React Component",
  description: "Login Auth is a production-ready core React component featuring Two-column split. Copy, customize, and use it in Next.js projects.",
  keywords: ["Login Auth","Core component","Core React component","Core Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/login-auth" },
  openGraph: {
    type: "website",
    url: "/components/cards/login-auth",
    title: "Login Auth - Core React Component",
    description: "Login Auth is a production-ready core React component featuring Two-column split. Copy, customize, and use it in Next.js projects.",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Login Auth - Core React Component",
    description: "Login Auth is a production-ready core React component featuring Two-column split. Copy, customize, and use it in Next.js projects.",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Login Auth",
  "description": "Login Auth is a production-ready core React component featuring Two-column split. Copy, customize, and use it in Next.js projects.",
  "url": "https://ui.mtverse.dev/components/cards/login-auth",
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
