"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Send, Paperclip, BotIcon } from "lucide-react";
import ChatMessage from "@/components/chat/chatMessage";
import { renderLatex } from "@/components/chat/latexRenderer";
import SuggestionCard from "@/components/chat/suggestionCard";
import { suggestions } from "@/components/chat/suggestions";
import { ChatMessageT } from "@/lib/types/types";
import { getChatResponse } from "@/lib/actions/chatReplica";

export default function ChatPage({
  initialMessages,
  replicaId,
  replicaName,
  userImage,
  replicaImage,
}: {
  initialMessages: ChatMessageT[];
  replicaId: string;
  replicaName: string;
  userImage: string;
  replicaImage: string;
}) {
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useState<ChatMessageT[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const hasMessages = messages.length > 0;

  useEffect(() => {
    setMessages(initialMessages);
    setMounted(true);
  }, []);

  const processedMessages = messages.map((message) => ({
    ...message,
    content: renderLatex(message.content),
  }));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: ChatMessageT = {
      id: Date.now(),
      created_at: new Date().toISOString(),
      content: input,
      role: "user",
      is_private: false,
      source: "web",
      replica_uuid: replicaId,
      is_archived: false,
      original_message_id: null,
      replica_slug: "",
      user_uuid: "",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await getChatResponse(replicaId, input);
      setMessages((prev) => [...prev, response.data]); // assumes response is ChatMessageT
    } catch (error) {
      console.error("Failed to get response", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[84vh] text-white">
      <main className="flex-1 px-6 overflow-y-auto custom-scrollbar">
        {mounted && (
          <>
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
                  Hi, I&apos;m a trained replica of {replicaName}.
                </motion.h1>
                <motion.p
                  className="text-2xl text-gray-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  Got something on your mind?
                </motion.p>
              </motion.div>
            )}

            <div className="space-y-4 pb-2">
              {processedMessages.map((message, index) => (
                <ChatMessage
                  key={index}
                  message={{ role: message.role, content: message.content }}
                  index={index}
                  userImage={userImage}
                  replicaImage={replicaImage}
                />
              ))}
              {isLoading && (
                <div className="flex items-center space-x-2 animate-pulse text-sm text-gray-400 px-4 py-2">
                  <BotIcon className="h-4 w-4 text-primary animate-bounce" />
                  <span>{replicaName}&apos;s replica is thinking...</span>
                </div>
              )}
            </div>

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
                      const prompt =
                        suggestion.title + " " + suggestion.subtitle;
                      setInput(prompt);
                    }}
                    delay={0.7 + index * 0.1}
                  />
                ))}
              </motion.div>
            )}
          </>
        )}
      </main>

      <motion.div
        className="px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <form onSubmit={handleSubmit} className="relative">
          <div className="flex flex-col items-center border border-teal-900 bg-zinc-900 rounded-3xl py-2 px-5">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Send a message..."
              className="w-full bg-transparent py-2 border-none focus:outline-none text-white placeholder-gray-500"
            />
            <div className="flex justify-between h-fit w-full">
              <button type="button" className="text-gray-400 mr-2">
                <Paperclip size={20} />
              </button>
              <button
                type="submit"
                className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors"
                disabled={isLoading || !input.trim()}
              >
                <Send size={20} className="text-white" />
              </button>
            </div>
          </div>
        </form>
        <p className="text-sm text-gray-400 mt-2 text-center">
          You are chatting with replica of{" "}
          <span className=" text-white">{replicaName}</span>
        </p>
      </motion.div>
    </div>
  );
}
