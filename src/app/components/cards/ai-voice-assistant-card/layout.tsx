import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Voice Assistant – AI React Component",
  description: "AI Voice Assistant is a production-ready ai React component featuring Live microphone waveform · browser speech-to-text · voice playback · pause/mute/end…",
  keywords: ["AI Voice Assistant","AI component","AI React component","AI Tailwind component","React UI component","Next.js component","TypeScript component","Tailwind CSS component","Framer Motion component","dark mode component","responsive UI component","copy paste React component"],
  alternates: { canonical: "/components/cards/ai-voice-assistant-card" },
  openGraph: {
    type: "website",
    url: "/components/cards/ai-voice-assistant-card",
    title: "AI Voice Assistant – AI React Component",
    description: "AI Voice Assistant is a production-ready ai React component featuring Live microphone waveform · browser speech-to-text · voice playback · pause/mute/end…",
    images: [{ url: "/mtverse-logo.png", width: 64, height: 64, alt: "mtverse UI component library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Voice Assistant – AI React Component",
    description: "AI Voice Assistant is a production-ready ai React component featuring Live microphone waveform · browser speech-to-text · voice playback · pause/mute/end…",
    images: ["/mtverse-logo.png"],
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": "AI Voice Assistant",
  "description": "AI Voice Assistant is a production-ready ai React component featuring Live microphone waveform · browser speech-to-text · voice playback · pause/mute/end…",
  "url": "https://www.mtverse.dev/components/cards/ai-voice-assistant-card",
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
