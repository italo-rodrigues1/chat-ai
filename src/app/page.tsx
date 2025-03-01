"use client";

import BoxMessage from "@/components/box-message";
import InputBox from "@/components/input-box";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen">
      <BoxMessage />
      <InputBox />
    </div>
  );
}
