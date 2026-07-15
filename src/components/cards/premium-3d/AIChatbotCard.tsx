"use client";

import { motion } from "framer-motion";
import { ChatWidget } from "./ai-chatbot/chat-widget";

const EASE = [0.16, 1, 0.3, 1] as const;

export function AIChatbotCard() {
  return (
    <motion.div
      className="relative min-h-screen w-full overflow-hidden"
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      {/* Blurred background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("/ai-chatbot/d18b9597-28c2-428c-b475-274758e1b7b8.png")',
          filter: "blur(20px)",
          transform: "scale(1.1)",
        }}
      />

      {/* Chat widget — bottom-right floating orb that expands */}
      <div className="relative z-10 min-h-screen p-8">
        <ChatWidget />
      </div>
    </motion.div>
  );
}
