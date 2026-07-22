import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OTP Input - Forms React Component",
  description: "OTP Input is a production-ready forms React component featuring Auto-advance + paste + backspace + verify. Copy, customize, and use it in Next.js projects.",
  keywords: ["OTP Input","Forms component","Forms React component","Forms Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/forms/otp-input" },
  openGraph: {
    type: "website",
    url: "/components/forms/otp-input",
    title: "OTP Input - Forms React Component",
    description: "OTP Input is a production-ready forms React component featuring Auto-advance + paste + backspace + verify. Copy, customize, and use it in Next.js projects.",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "OTP Input - Forms React Component",
    description: "OTP Input is a production-ready forms React component featuring Auto-advance + paste + backspace + verify. Copy, customize, and use it in Next.js projects.",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "OTP Input",
  "description": "OTP Input is a production-ready forms React component featuring Auto-advance + paste + backspace + verify. Copy, customize, and use it in Next.js projects.",
  "url": "https://ui.mtverse.dev/components/forms/otp-input",
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
