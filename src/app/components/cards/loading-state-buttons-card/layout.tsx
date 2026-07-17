import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Loading State Buttons – Buttons React Component",
  description: "Loading State Buttons is a production-ready buttons React component featuring Async state machine + progress fill. Copy, customize, and use it in Next.js…",
  keywords: ["Loading State Buttons","Buttons component","Buttons React component","Buttons Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/loading-state-buttons-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/loading-state-buttons-card",
    title: "Loading State Buttons – Buttons React Component",
    description: "Loading State Buttons is a production-ready buttons React component featuring Async state machine + progress fill. Copy, customize, and use it in Next.js…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Loading State Buttons – Buttons React Component",
    description: "Loading State Buttons is a production-ready buttons React component featuring Async state machine + progress fill. Copy, customize, and use it in Next.js…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Loading State Buttons",
  "description": "Loading State Buttons is a production-ready buttons React component featuring Async state machine + progress fill. Copy, customize, and use it in Next.js…",
  "url": "https://www.mtverse.dev/components/cards/loading-state-buttons-card",
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
