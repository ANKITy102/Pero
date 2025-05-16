"use client"

import type { Message } from "ai"
import { motion } from "framer-motion"
import { useEffect, useRef } from "react"

interface ChatMessageProps {
  message: Message & { content: string }
  index: number
}

export default function ChatMessage({ message, index }: ChatMessageProps) {
  const isUser = message.role === "user"
  const messageRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to the latest message
  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [message.content])

  return (
    <motion.div
      ref={messageRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div className={`max-w-3xl rounded-lg p-4 ${isUser ? "bg-blue-600" : "bg-zinc-800"}`}>
        <div className="prose prose-invert" dangerouslySetInnerHTML={{ __html: message.content }} />
      </div>
    </motion.div>
  )
}
