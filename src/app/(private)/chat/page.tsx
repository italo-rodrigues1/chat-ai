import BoxMessage from "@/components/box-message";
import InputBox from "@/components/input-box";

export default function Home() {
  return (
    <div className="flex justify-center flex-col items-center h-screen w-[100%]">
      <BoxMessage />
      <InputBox />
    </div>
  );
}
