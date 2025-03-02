"use client";

import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Paperclip } from "lucide-react";

type FileWithName = {
  name: string;
};

export default function InputBox() {
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

  return (
    <div className="w-[800px] mx-auto p-4 bg-sidebar rounded-[5px] shadow-lg">
      <div className="flex flex-col gap-4">
        <Textarea
          className={cn(
            "h-[120px] bg-transparent text-white placeholder:text-gray-500",
            "border-none focus:border-none focus:outline-none focus:ring-0",
            "resize-none text-lg p-4 !outline-none !ring-0 !shadow-none"
          )}
          placeholder="O que você deseja?"
          style={{ outline: "none", boxShadow: "none" }}
        />
        <div className="flex items-center gap-2">
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
          <span className="text-gray-400 text-sm truncate max-w-[300px]">
            {files.map((file) => (
              <span key={file.name}>{file.name} | </span>
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}
