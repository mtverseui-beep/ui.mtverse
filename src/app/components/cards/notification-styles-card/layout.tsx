import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notification Center - Data React Component",
  description: "Notification Center is a production-ready data React component featuring Priority filter + reveal. Copy, customize, and use it in Next.js projects.",
  keywords: ["Notification Center","Data component","Data React component","Data Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/notification-styles" },
  openGraph: {
    type: "website",
    url: "/components/cards/notification-styles",
    title: "Notification Center - Data React Component",
    description: "Notification Center is a production-ready data React component featuring Priority filter + reveal. Copy, customize, and use it in Next.js projects.",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Notification Center - Data React Component",
    description: "Notification Center is a production-ready data React component featuring Priority filter + reveal. Copy, customize, and use it in Next.js projects.",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Notification Center",
  "description": "Notification Center is a production-ready data React component featuring Priority filter + reveal. Copy, customize, and use it in Next.js projects.",
  "url": "https://ui.mtverse.dev/components/cards/notification-styles",
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
