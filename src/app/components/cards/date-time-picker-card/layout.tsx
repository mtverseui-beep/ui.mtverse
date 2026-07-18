import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Date & Time Picker - Forms React Component",
  description: "Date & Time Picker is a production-ready forms React component featuring Calendar grid + time stepper + date range. Copy, customize, and use it in Next.js...",
  keywords: ["Date & Time Picker","Forms component","Forms React component","Forms Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/forms/date-time-picker" },
  openGraph: {
    type: "website",
    url: "/components/forms/date-time-picker",
    title: "Date & Time Picker - Forms React Component",
    description: "Date & Time Picker is a production-ready forms React component featuring Calendar grid + time stepper + date range. Copy, customize, and use it in Next.js...",
    images: [{ url: "/mtverse-logo.png", width: 512, height: 512, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary",
    title: "Date & Time Picker - Forms React Component",
    description: "Date & Time Picker is a production-ready forms React component featuring Calendar grid + time stepper + date range. Copy, customize, and use it in Next.js...",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Date & Time Picker",
  "description": "Date & Time Picker is a production-ready forms React component featuring Calendar grid + time stepper + date range. Copy, customize, and use it in Next.js...",
  "url": "https://ui.mtverse.dev/components/forms/date-time-picker",
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
