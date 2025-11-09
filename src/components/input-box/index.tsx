"use client";

import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Paperclip, Send } from "lucide-react";
import { useChatStore } from "@/store/chat";
import useSocket from "@/hooks/use-websocket";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

type FileWithName = {
  name: string;
};

export default function InputBox() {
  const addMessage = useChatStore((state) => state.addMessage);
  const setIsLoading = useChatStore((state) => state.setIsLoading);
  const isLoading = useChatStore((state) => state.isLoading);

  const { sendMessage } = useSocket();

  const [text, setText] = useState("");
  const [files, setFiles] = useState<FileWithName[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prevFiles) => [
        ...prevFiles,
        ...newFiles.map((file) => ({ name: file.name })),
      ]);
    }
  };

  const handleSend = () => {
    if (text.trim()) {
      setIsLoading(true);
      addMessage({ role: "user", content: text });
      sendMessage("message", { text, files });
      setText("");
    }
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22 }}
      className="w-[800px] mx-auto p-4 bg-sidebar rounded-[8px] shadow-xl inputbox-root"
    >
      <div className="flex flex-col gap-4">
        <Textarea
          value={text}
          className={cn(
            "h-[120px] bg-transparent text-white placeholder:text-gray-400",
            "border-none focus:border-none focus:outline-none focus:ring-0",
            "resize-none text-lg p-4 !outline-none !ring-0 !shadow-none"
          )}
          placeholder="O que você deseja?"
          onChange={(e) => handleTextAreaChange(e)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey && !isLoading) {
              e.preventDefault();
              handleSend();
            }
          }}
          style={{ outline: "none", boxShadow: "none" }}
        />
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <label
              htmlFor="file-upload"
              className={cn(
                "flex items-center justify-center",
                "w-10 h-10 rounded-full",
                "bg-gray-800 hover:bg-gray-700",
                "border border-gray-600",
                "cursor-pointer transition-colors",
                "text-white"
              )}
            >
              <Paperclip className="w-5 h-5" />
            </label>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              multiple
              onChange={handleFileChange}
            />
            <div className="text-gray-400 text-sm truncate max-w-[300px] file-list">
              {files.length === 0 ? (
                <span className="opacity-70">Nenhum arquivo</span>
              ) : (
                files.map((file) => (
                  <span key={file.name} className="mr-2">
                    {file.name}
                    <span className="text-gray-500"></span>
                  </span>
                ))
              )}
            </div>
          </div>
          <Button
            onClick={handleSend}
            disabled={text.trim() === "" || isLoading}
            variant="default"
            className={cn("flex items-center justify-center gap-[10px]")}
          >
            Enviar <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
