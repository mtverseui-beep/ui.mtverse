import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Task Creation Modal – Modals React Component",
  description: "Task Creation Modal is a production-ready modals React component featuring Form with char counter + color label swatches + assignee dropdown + date pickers…",
  keywords: ["Task Creation Modal","Modals component","Modals React component","Modals Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/confirmation-dialog-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/confirmation-dialog-card",
    title: "Task Creation Modal – Modals React Component",
    description: "Task Creation Modal is a production-ready modals React component featuring Form with char counter + color label swatches + assignee dropdown + date pickers…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Task Creation Modal – Modals React Component",
    description: "Task Creation Modal is a production-ready modals React component featuring Form with char counter + color label swatches + assignee dropdown + date pickers…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Task Creation Modal",
  "description": "Task Creation Modal is a production-ready modals React component featuring Form with char counter + color label swatches + assignee dropdown + date pickers…",
  "url": "https://www.mtverse.dev/components/cards/confirmation-dialog-card",
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
