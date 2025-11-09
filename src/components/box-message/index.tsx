"use client";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { useChatStore } from "@/store/chat";
import useSocket from "@/hooks/use-websocket";

export default function BoxMessage() {
  const { socket } = useSocket("localhost:3344");
  const addMessage = useChatStore((state) => state.addMessage);
  const messages = useChatStore((state) => state.messages);

  useEffect(() => {
    if (socket) {
      socket.on("chat-message", (msg: string) => {
        addMessage({ role: "assistant", content: msg });
      });

      return () => {
        socket.off("chat-message");
      };
    }
  }, []);

  useEffect(() => {
    console.log("messages: ", messages);
    const messageContainer = document.querySelector(".message-container");
    if (messageContainer) {
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      className="flex flex-col gap-4 h-[76%] w-[100%] max-w-[800px] overflow-y-auto message-container pb-[50px]"
      style={{ scrollbarWidth: "thin", scrollbarColor: "#4A5568 #1A202C" }}
    >
      {messages.map((msg, index) => (
        <div
          key={index}
          className={cn(
            "flex items-start gap-3",
            msg.role === "user" ? "justify-end" : "justify-start"
          )}
        >
          <div
            className={cn(
              "max-w-[70%] p-3 rounded-lg text-sm",
              msg.role === "user"
                ? "bg-blue-600 text-white self-end"
                : "bg-gray-700 text-gray-200 self-start"
            )}
          >
            {msg.content}
          </div>
        </div>
      ))}
    </div>
  );
}
