"use client";

import BoxMessage from "@/components/box-message";
import InputBox from "@/components/input-box";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-[100%] pr-6">
      <BoxMessage />
      <InputBox />
    </div>
  );
}
