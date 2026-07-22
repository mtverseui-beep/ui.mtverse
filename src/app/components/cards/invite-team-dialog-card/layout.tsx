import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Invite Team Dialog - Modals React Component",
  description: "Invite Team Dialog is a production-ready modals React component featuring Email invite + role select + pending list + copy invite link. Copy, customize, and...",
  keywords: ["Invite Team Dialog","Modals component","Modals React component","Modals Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/modals/invite-team-dialog" },
  openGraph: {
    type: "website",
    url: "/components/modals/invite-team-dialog",
    title: "Invite Team Dialog - Modals React Component",
    description: "Invite Team Dialog is a production-ready modals React component featuring Email invite + role select + pending list + copy invite link. Copy, customize, and...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Invite Team Dialog - Modals React Component",
    description: "Invite Team Dialog is a production-ready modals React component featuring Email invite + role select + pending list + copy invite link. Copy, customize, and...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Invite Team Dialog",
  "description": "Invite Team Dialog is a production-ready modals React component featuring Email invite + role select + pending list + copy invite link. Copy, customize, and...",
  "url": "https://ui.mtverse.dev/components/modals/invite-team-dialog",
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
