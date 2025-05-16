"use client";

import { useEffect, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { motion } from "framer-motion";
import { Send, Paperclip } from "lucide-react";
import ChatMessage from "@/components/chat/chatMessage";
import { renderLatex } from "@/components/chat/latexRenderer";
import SuggestionCard from "@/components/chat/suggestionCard";
import { suggestions } from "@/components/chat/suggestions";

export default function ChatPage() {
  const [mounted, setMounted] = useState(false);
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat();
  const hasMessages = messages.length > 0;

  // Handle entry animations
  useEffect(() => {
    setMounted(true);
  }, []);

  // Process messages to render LaTeX
  const processedMessages = messages.map((message) => ({
    ...message,
    content: renderLatex(message.content),
  }));

  return (
    <div className="  text-white">
      <div className="container max-w-6xl mx-auto p-4 md:p-6">
        <div className="flex flex-col h-[82vh]  text-white">
          <main className="flex-1 p-6 overflow-y-auto">
            {mounted && (
              <>
                {/* Welcome message with animation */}
                {!hasMessages && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8 mt-24"
                  >
                    <motion.h1
                      className="text-3xl font-bold mb-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      Hello there!
                    </motion.h1>
                    <motion.p
                      className="text-2xl text-gray-400"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                    >
                      How can I help you today?
                    </motion.p>
                  </motion.div>
                )}

                {/* Chat messages */}
                <div className="space-y-4">
                  {processedMessages.map((message, index) => (
                    <ChatMessage
                      key={message.id}
                      message={message}
                      index={index}
                    />
                  ))}
                </div>

                {/* Suggestion cards when no messages */}
                {!hasMessages && (
                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    {suggestions.map((suggestion, index) => (
                      <SuggestionCard
                        key={index}
                        title={suggestion.title}
                        subtitle={suggestion.subtitle}
                        onClick={() => {
                          handleInputChange({
                            target: {
                              value:
                                suggestion.title + " " + suggestion.subtitle,
                            },
                          } as any);
                          handleSubmit(new Event("submit") as any);
                        }}
                        delay={0.7 + index * 0.1}
                      />
                    ))}
                  </motion.div>
                )}
              </>
            )}
          </main>

          {/* Message input */}
          <motion.div
            className="p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <form onSubmit={handleSubmit} className="relative">
              <div className="flex items-center bg-zinc-900 rounded-full p-2 pl-4 pr-16">
                <button type="button" className="text-gray-400 mr-2">
                  <Paperclip size={20} />
                </button>
                <input
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Send a message..."
                  className="w-full bg-transparent border-none focus:outline-none text-white placeholder-gray-500"
                />
                <button
                  type="submit"
                  className="absolute right-2 p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors"
                  disabled={isLoading || !input.trim()}
                >
                  <Send size={20} className="text-white" />
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
