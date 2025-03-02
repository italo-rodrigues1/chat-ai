import { useEffect } from "react";
import { cn } from "@/lib/utils";
// import { Brain, UserRound } from "lucide-react";
import { useChatStore } from "@/store/chat";

export default function BoxMessage() {
  const messages = useChatStore((state) => state.messages);

  useEffect(() => {
    console.log("messages: ", messages);
    const messageContainer = document.querySelector(".message-container");
    if (messageContainer) {
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      className="flex flex-col-reverse gap-4 h-[76%] w-[100%] max-w-[800px] overflow-y-auto message-container pb-[50px]"
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
          {/* {msg.role === "assistant" && (
            <Brain className="w-[40px] h-[40px] text-gray-400 mt-1 flex-shrink-0" />
          )} */}
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
          {/* {msg.role === "user" && (
            <UserRound className="w-[40px] h-[40px] text-blue-400 mt-1 flex-shrink-0" />
          )} */}
        </div>
      ))}
    </div>
  );
}
