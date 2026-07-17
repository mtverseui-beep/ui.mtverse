import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Form Modal – Modals React Component",
  description: "Contact Form Modal is a production-ready modals React component featuring Gradient header form with name/email/message + success state animation. Copy,…",
  keywords: ["Contact Form Modal","Modals component","Modals React component","Modals Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/contact-form-modal-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/contact-form-modal-card",
    title: "Contact Form Modal – Modals React Component",
    description: "Contact Form Modal is a production-ready modals React component featuring Gradient header form with name/email/message + success state animation. Copy,…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Form Modal – Modals React Component",
    description: "Contact Form Modal is a production-ready modals React component featuring Gradient header form with name/email/message + success state animation. Copy,…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Contact Form Modal",
  "description": "Contact Form Modal is a production-ready modals React component featuring Gradient header form with name/email/message + success state animation. Copy,…",
  "url": "https://www.mtverse.dev/components/cards/contact-form-modal-card",
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
