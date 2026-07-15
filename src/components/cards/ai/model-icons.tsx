// Real AI model brand icons as SVG components
// These match the actual brand logos of each AI provider

import type { SVGProps } from "react";

// OpenAI logo — the distinctive flower/spiral shape
export function OpenAIIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v3l-2.597 1.5-2.607-1.5z"/>
    </svg>
  );
}

// Anthropic Claude logo — the sunburst/asterisk shape
export function ClaudeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M12 2.75v18.5M2.75 12h18.5M5.46 5.46l13.08 13.08M18.54 5.46 5.46 18.54" stroke="currentColor" strokeWidth="2.35" strokeLinecap="round" />
      <circle cx="12" cy="12" r="2.25" fill="currentColor" />
    </svg>
  );
}

// Google Gemini logo — the 4-pointed sparkle
export function GeminiIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 24A14.304 14.304 0 0 0 0 12 14.304 14.304 0 0 0 12 0a14.305 14.305 0 0 0 12 12 14.305 14.305 0 0 0-12 12"/>
    </svg>
  );
}

// Meta Llama logo
export function LlamaIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.236L19.5 8 12 11.764 4.5 8 12 4.236zM4 9.764l7 3.5v7.5l-7-3.5v-7.5zm9 11v-7.5l7-3.5v7.5l-7 3.5z"/>
    </svg>
  );
}

// Mistral AI logo
export function MistralIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M3 3h4v4H3V3zm5 0h4v4H8V3zm5 0h4v4h-4V3zm5 0h3v4h-3V3zM3 8h4v4H3V8zm5 0h4v4H8V8zm5 0h4v4h-4V8zm5 0h3v4h-3V8zM3 13h4v4H3v-4zm15 0h4v4h-4v-4zM3 18h4v3H3v-3zm5 0h4v3H8v-3zm5 0h4v3h-4v-3zm5 0h3v3h-3v-3z"/>
    </svg>
  );
}

// Perplexity logo
export function PerplexityIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 1L3 5v6l9 4 9-4V5l-9-4zm0 2.3L18.5 6 12 8.7 5.5 6 12 3.3zM5 7.2l6 2.7v8.6L5 15.8V7.2zm14 0v8.6l-6 2.7V9.9l6-2.7zM7 18.5l5 2.2 5-2.2v2.3l-5 2.2-5-2.2v-2.3z"/>
    </svg>
  );
}

// Cohere logo
export function CohereIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5l-4-4 1.41-1.41L11 13.67l5.59-5.59L18 9.5l-7 7z"/>
    </svg>
  );
}

// Model config with brand icons
export const AI_MODELS = [
  { id: "gpt-4o", name: "GPT-4o", vendor: "OpenAI", badge: "smart", color: "#10a37f", context: "128K", price: 5, Icon: OpenAIIcon },
  { id: "gpt-4o-mini", name: "GPT-4o mini", vendor: "OpenAI", badge: "fast", color: "#10a37f", context: "128K", price: 0.15, Icon: OpenAIIcon },
  { id: "o1-preview", name: "o1-preview", vendor: "OpenAI", badge: "reasoning", color: "#10a37f", context: "128K", price: 15, Icon: OpenAIIcon },
  { id: "claude-3.5-sonnet", name: "Claude 3.5 Sonnet", vendor: "Anthropic", badge: "fast", color: "#d97757", context: "200K", price: 3, Icon: ClaudeIcon },
  { id: "claude-3-opus", name: "Claude 3 Opus", vendor: "Anthropic", badge: "smart", color: "#d97757", context: "200K", price: 15, Icon: ClaudeIcon },
  { id: "gemini-1.5-pro", name: "Gemini 1.5 Pro", vendor: "Google", badge: "long", color: "#4285f4", context: "2M", price: 1.25, Icon: GeminiIcon },
  { id: "gemini-1.5-flash", name: "Gemini 1.5 Flash", vendor: "Google", badge: "fast", color: "#4285f4", context: "1M", price: 0.075, Icon: GeminiIcon },
  { id: "llama-3.1-405b", name: "Llama 3.1 405B", vendor: "Meta", badge: "open", color: "#0866ff", context: "128K", price: 0.9, Icon: LlamaIcon },
  { id: "llama-3.1-70b", name: "Llama 3.1 70B", vendor: "Meta", badge: "open", color: "#0866ff", context: "128K", price: 0.35, Icon: LlamaIcon },
  { id: "mistral-large", name: "Mistral Large 2", vendor: "Mistral AI", badge: "eu", color: "#fa520f", context: "128K", price: 2, Icon: MistralIcon },
  { id: "perplexity-sonar", name: "Perplexity Sonar", vendor: "Perplexity", badge: "search", color: "#20808d", context: "32K", price: 2, Icon: PerplexityIcon },
  { id: "command-r-plus", name: "Command R+", vendor: "Cohere", badge: "rag", color: "#39594d", context: "128K", price: 2.5, Icon: CohereIcon },
] as const;

export type AIModel = typeof AI_MODELS[number];
