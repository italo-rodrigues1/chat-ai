export default function BoxMessage() {
  const message = [
    {
      role: "user",
      content: "Hello",
    },
    {
      role: "assistant",
      content: "Hello, how can I help you today?",
    },
  ];
  return (
    <div className="flex flex-col gap-2">
      {message.map((msg, index) => (
        <div
          key={index}
          className={`flex ${
            msg.role === "user" ? "flex-row" : "flex-row-reverse"
          } gap-2 items-start`}
        >
          <div
            className={`w-32 ${
              msg.role === "user" ? "bg-blue-100" : "bg-gray-100"
            } p-4 rounded-lg text-left text-sm`}
          >
            {msg.content}
          </div>
        </div>
      ))}
    </div>
  );
}
