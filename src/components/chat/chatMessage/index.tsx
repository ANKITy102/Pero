"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ThumbsUp, ThumbsDown, Copy } from "lucide-react";

interface ChatMessageProps {
  message: {
    role: string;
    content: string;
  };
  index: number;
}

export default function ChatMessage({ message, index }: ChatMessageProps) {
  const isUser = message.role === "user";
  const messageRef = useRef<HTMLDivElement>(null);
  const [copyTooltip, setCopyTooltip] = useState("Copy");

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [message.content]);

  const handleCopy = () => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = message.content;
    const text = tempElement.textContent || tempElement.innerText || "";
    navigator.clipboard.writeText(text).then(() => {
      setCopyTooltip("Copied!");
      setTimeout(() => setCopyTooltip("Copy"), 2000); // Reset tooltip after 2 seconds
    });
  };

  return (
    <motion.div
      ref={messageRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div className={`max-w-3xl rounded-lg px-4 py-3 bg-[#1b1b1d] relative`}>
        {/* Message Content */}
        <div
          className="prose prose-invert text-gray-300"
          dangerouslySetInnerHTML={{ __html: message.content }}
        />

        {/* Footer icons (like, dislike, copy) */}
        <div className="flex gap-2 justify-end mt-2 text-gray-500">
          {!isUser && (
            <>
              <ThumbsUp size={16} className="cursor-pointer hover:text-white" />
              <ThumbsDown
                size={16}
                className="cursor-pointer hover:text-white"
              />
            </>
          )}

          {/* Tooltip wrapper */}
          <div className="relative group">
            <Copy
              size={16}
              onClick={handleCopy}
              className="cursor-pointer hover:text-white"
            />
            {/* Tooltip */}
            <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 rounded bg-gray-700 px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {copyTooltip}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
