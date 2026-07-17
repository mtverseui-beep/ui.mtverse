import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Voice & Audio – Buttons React Component",
  description: "Voice & Audio is a production-ready buttons React component featuring Hold-to-talk + mute morph + volume slider. Copy, customize, and use it in Next.js…",
  keywords: ["Voice & Audio","Buttons component","Buttons React component","Buttons Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/voice-audio-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/voice-audio-card",
    title: "Voice & Audio – Buttons React Component",
    description: "Voice & Audio is a production-ready buttons React component featuring Hold-to-talk + mute morph + volume slider. Copy, customize, and use it in Next.js…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Voice & Audio – Buttons React Component",
    description: "Voice & Audio is a production-ready buttons React component featuring Hold-to-talk + mute morph + volume slider. Copy, customize, and use it in Next.js…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "Voice & Audio",
  "description": "Voice & Audio is a production-ready buttons React component featuring Hold-to-talk + mute morph + volume slider. Copy, customize, and use it in Next.js…",
  "url": "https://www.mtverse.dev/components/cards/voice-audio-card",
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
