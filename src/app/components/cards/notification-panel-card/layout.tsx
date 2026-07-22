import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notification Panel - Modals React Component",
  description: "Notification Panel is a production-ready modals React component featuring Right slide panel with unread badges + mark all as read + layout animations. Copy,...",
  keywords: ["Notification Panel","Modals component","Modals React component","Modals Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/modals/notification-panel" },
  openGraph: {
    type: "website",
    url: "/components/modals/notification-panel",
    title: "Notification Panel - Modals React Component",
    description: "Notification Panel is a production-ready modals React component featuring Right slide panel with unread badges + mark all as read + layout animations. Copy,...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Notification Panel - Modals React Component",
    description: "Notification Panel is a production-ready modals React component featuring Right slide panel with unread badges + mark all as read + layout animations. Copy,...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Notification Panel",
  "description": "Notification Panel is a production-ready modals React component featuring Right slide panel with unread badges + mark all as read + layout animations. Copy,...",
  "url": "https://ui.mtverse.dev/components/modals/notification-panel",
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
