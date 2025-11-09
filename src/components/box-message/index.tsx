"use client";

import { useEffect } from "react";
import { cn } from "@/lib/utils";
import Avatar from "@/components/ui/avatar-chat";
import { useChatStore } from "@/store/chat";
import { motion, AnimatePresence } from "framer-motion";

export default function BoxMessage() {
  const messages = useChatStore((state) => state.messages);
  const isLoading = useChatStore((state) => state.isLoading);

  useEffect(() => {
    console.log("messages: ", messages);
    const messageContainer = document.querySelector(".message-container");
    if (messageContainer) {
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      className="flex flex-col justify-end gap-4 h-[76%] w-[100%] max-w-[800px] overflow-y-auto message-container pb-[50px] chat-container"
      style={{ scrollbarWidth: "thin", scrollbarColor: "#4A5568 #1A202C" }}
    >
      <AnimatePresence initial={false} mode="popLayout">
        {messages.map((msg, index) => {
          const nextMsg = messages[index + 1];
          const isConsecutive = nextMsg && nextMsg.role === msg.role;

          return (
            <motion.div
              layout
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.18 }}
              key={index}
              className={cn(
                "flex items-start gap-3 mb-1",
                msg.role === "user" ? "justify-end" : "justify-start",
                isConsecutive ? "mb-1" : "mb-4"
              )}
            >
              {msg.role !== "user" && (
                <div className="self-start">
                  <Avatar name="AI" size="sm" />
                </div>
              )}
              <div
                className={cn(
                  "max-w-[70%] p-3 rounded-lg text-sm message-bubble",
                  msg.role === "user"
                    ? "bg-blue-600 text-white self-end shadow-md"
                    : "bg-gray-700 text-gray-200 self-start shadow-sm"
                )}
              >
                {msg.content}
              </div>
              {msg.role === "user" && (
                <div className="self-end">
                  <Avatar name="Você" size="sm" />
                </div>
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="flex items-start gap-3"
          >
            <div className="self-start">
              <Avatar name="AI" size="sm" />
            </div>
            <div className="max-w-[70%] p-2 rounded-lg bg-gray-700 text-gray-200 message-bubble typing-indicator">
              <span className="dot" />
              <span className="dot" />
              <span className="dot" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
