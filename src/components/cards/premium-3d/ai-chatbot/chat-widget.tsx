"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { X, Plus, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { AnimatedOrb } from "./animated-orb"
import { DirectDebitCard } from "./direct-debit-card"
import { motion, AnimatePresence } from "framer-motion"

interface Message {
  id: number
  text: string
  isUser: boolean
  component?: React.ReactNode
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [showSuggestion, setShowSuggestion] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! How can I help you?", isUser: false },
    { id: 2, text: "Hi! I have a question about your product.", isUser: true },
    { id: 3, text: "Of course! I'm here to help. What's your question?", isUser: false },
    { id: 4, text: "Do you offer a refund guarantee?", isUser: true },
    { id: 5, text: "Yes, we offer a 30-day unconditional money-back guarantee.", isUser: false },
    { id: 6, text: "That's perfect! Can you show me payment options?", isUser: true },
    {
      id: 7,
      text: "", // Removed the "Here's an example..." text
      isUser: false,
      component: <DirectDebitCard />,
    },
    { id: 8, text: "Excellent, thanks for this information!", isUser: true },
    { id: 9, text: "You're welcome! Feel free to ask if you have any other questions.", isUser: false },
  ])
  const [inputValue, setInputValue] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    audioRef.current = new Audio("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/open-WbfFaH8Y88MyCuFrnh3hBIxabYIsBT.mp3")
  }, [])

  useEffect(() => {
    if (isOpen) {
      const contentTimer = setTimeout(() => setShowContent(true), 1000)
      return () => clearTimeout(contentTimer)
    }

    const collapseTimer = setTimeout(() => setIsExpanded(false), 150)
    return () => clearTimeout(collapseTimer)
  }, [isOpen])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!inputValue.trim()) return

    const newMessage: Message = {
      id: Date.now(),
      text: inputValue,
      isUser: true,
    }

    setMessages((prev) => [...prev, newMessage])
    setInputValue("")

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "Thank you for your message! An agent will respond soon.",
          isUser: false,
        },
      ])
    }, 1000)
  }

  const widgetWidth = typeof window !== "undefined" && window.innerWidth < 768 ? window.innerWidth - 32 : 320
  const orbTargetX = -(widgetWidth - 16 - 20 - 32)
  const orbTargetY = -(562.5 - 16 - 20 - 32)
  const orbTargetScale = 40 / 64

  const handleOrbClick = () => {
    if (!isOpen) {
      audioRef.current?.play()
      setIsExpanded(true)
      setIsOpen(true)
      setShowSuggestion(false)
    }
  }

  // Show the suggestion bubble after 2s, auto-hide after 8s
  useEffect(() => {
    if (isOpen) return
    const showTimer = setTimeout(() => setShowSuggestion(true), 2000)
    const hideTimer = setTimeout(() => setShowSuggestion(false), 10000)
    return () => { clearTimeout(showTimer); clearTimeout(hideTimer) }
  }, [isOpen])

  return (
    <div className="absolute bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
      <div
        className="absolute bottom-0 right-0 z-30 cursor-pointer"
        style={{
          transition: isOpen
            ? "transform 1s cubic-bezier(0.22, 1, 0.36, 1)"
            : "transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
          transform: isExpanded
            ? `translate3d(${orbTargetX}px, ${orbTargetY}px, 0) scale(${orbTargetScale})`
            : "translate3d(0, 0, 0) scale(1)",
          transformOrigin: "center center",
          willChange: "transform",
          backfaceVisibility: "hidden",
        }}
        onClick={handleOrbClick}
      >
        <AnimatedOrb size={64} />
      </div>

      {/* Suggestion bubble â€” appears next to the orb prompting the user to click */}
      <AnimatePresence>
        {showSuggestion && !isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.85 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.85 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-3 right-20 z-40 flex items-center gap-2 rounded-2xl bg-white px-3.5 py-2.5 shadow-2xl dark:bg-zinc-900"
            style={{ boxShadow: "rgba(17, 12, 46, 0.15) 0px 24px 48px 0px" }}
            onClick={handleOrbClick}
          >
            <span className="text-[12px] font-semibold text-zinc-900 whitespace-nowrap dark:text-zinc-100">
              ðŸ‘‹ Click to chat with Jarvis
            </span>
            {/* Arrow pointing right toward the orb */}
            <span
              className="absolute -right-1.5 bottom-4 h-3 w-3 rotate-45 bg-white dark:bg-zinc-900"
              style={{ boxShadow: "2px -2px 4px rgba(17, 12, 46, 0.05)" }}
            />
            {/* Pulse ring to draw attention */}
            <motion.span
              className="absolute -right-1 bottom-3 h-5 w-5 rounded-full"
              style={{ border: "2px solid #9bc761" }}
              animate={{ scale: [1, 1.8], opacity: [0.7, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className={cn(
          "bg-zinc-50 overflow-hidden flex flex-col origin-bottom-right dark:bg-zinc-950",
          isExpanded ? "rounded-3xl max-md:rounded-2xl" : "rounded-[100px]",
        )}
        style={{
          width: isExpanded ? widgetWidth : 64,
          height: isExpanded ? 562.5 : 64,
          boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px",
          transition: isOpen
            ? "width 1s cubic-bezier(0.22, 1, 0.36, 1), height 1s cubic-bezier(0.22, 1, 0.36, 1), border-radius 1s cubic-bezier(0.22, 1, 0.36, 1)"
            : "width 0.8s cubic-bezier(0.22, 1, 0.36, 1), height 0.8s cubic-bezier(0.22, 1, 0.36, 1), border-radius 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
          willChange: "width, height",
          backfaceVisibility: "hidden",
        }}
      >
        <div
          className={cn("flex flex-col h-full", showContent ? "opacity-100" : "opacity-0")}
          style={{
            transition: "opacity 150ms ease-out",
            willChange: "opacity",
          }}
        >
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 z-20 pointer-events-none h-24">
            <div
              className={cn(
                "absolute inset-0 overflow-hidden bg-gradient-to-b from-white via-white to-transparent dark:from-zinc-950 dark:via-zinc-950",
                isExpanded ? "rounded-3xl max-md:rounded-2xl" : "rounded-[100px]",
              )}
              style={{
                transition: isOpen
                  ? "border-radius 1s cubic-bezier(0.22, 1, 0.36, 1)"
                  : "border-radius 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            />

            {/* Content */}
            <div className="relative p-4 flex items-center justify-between pointer-events-auto">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" />
                <div>
                  <h3 className="font-semibold text-sm text-zinc-950 dark:text-zinc-100">Jarvis</h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">Your personal assistant</p>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setShowContent(false)
                  setIsOpen(false)
                }}
                className="w-8 h-8 rounded-full hover:bg-zinc-200/50 flex items-center justify-center transition-colors bg-zinc-100 dark:bg-zinc-800 dark:hover:bg-zinc-700"
              >
                <X className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 pt-20 space-y-3 bg-zinc-50 scrollbar-none dark:bg-zinc-950">
            <AnimatePresence initial={false}>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={cn(
                    "flex",
                    message.component ? "justify-stretch" : message.isUser ? "justify-end" : "justify-start",
                  )}
                >
                  {message.component ? (
                    <div className="w-full">{message.component}</div>
                  ) : (
                    <div
                      className={cn(
                        "inline-block max-w-[80%] p-3 rounded-2xl text-sm break-words",
                        message.isUser
                          ? "bg-zinc-100 text-zinc-950 rounded-br-sm dark:bg-zinc-800 dark:text-zinc-100"
                          : "bg-card text-card-foreground rounded-bl-sm",
                      )}
                      style={{
                        boxShadow:
                          "rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px",
                      }}
                    >
                      {message.text}
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-card border-t border-border shrink-0 border-none">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Write a message..."
                className="flex-1 bg-muted rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground"
              />
              <button
                className="w-9 h-9 rounded-full flex items-center justify-center bg-zinc-100 hover:bg-zinc-200 transition-colors dark:bg-zinc-800 dark:hover:bg-zinc-700"
                onClick={() => console.log("[v0] Plus button clicked")}
              >
                <Plus className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
              </button>
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer hover:bg-zinc-200 transition-colors bg-blue-500"
                onClick={handleSend}
              >
                <ArrowRight className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
