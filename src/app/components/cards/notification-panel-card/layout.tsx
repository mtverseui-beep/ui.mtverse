import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notification Panel – Modals React Component",
  description: "Notification Panel is a production-ready modals React component featuring Right slide panel with unread badges + mark all as read + layout animations. Copy,…",
  keywords: ["Notification Panel","Modals component","Modals React component","Modals Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/notification-panel-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/notification-panel-card",
    title: "Notification Panel – Modals React Component",
    description: "Notification Panel is a production-ready modals React component featuring Right slide panel with unread badges + mark all as read + layout animations. Copy,…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Notification Panel – Modals React Component",
    description: "Notification Panel is a production-ready modals React component featuring Right slide panel with unread badges + mark all as read + layout animations. Copy,…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Notification Panel",
  "description": "Notification Panel is a production-ready modals React component featuring Right slide panel with unread badges + mark all as read + layout animations. Copy,…",
  "url": "https://www.mtverse.dev/components/cards/notification-panel-card",
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
