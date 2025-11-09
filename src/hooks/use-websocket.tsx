"use client";
import { useCallback, useEffect, useState } from "react";
import { io } from "socket.io-client";
import type { Socket } from "socket.io-client";
import { useChatStore } from "@/store/chat";

interface UseSocketReturn {
  socket: Socket | null;
  sendMessage: (event: string, data: any) => void;
}

const useSocket = (namespace: string = "chat"): UseSocketReturn => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const addMessage = useChatStore((state) => state.addMessage);
  const setIsLoading = useChatStore((state) => state.setIsLoading);

  useEffect(() => {
    const socketPath = namespace
      ? `${process.env.NEXT_PUBLIC_SOCKET_URL}/${namespace}`
      : process.env.NEXT_PUBLIC_SOCKET_URL;
    const socketIo = io(socketPath, {
      transports: ["websocket"],
      reconnection: true,
      withCredentials: true,
    });

    setSocket(socketIo);

    socketIo.on("connect", () => {
      console.log("Conectado ao Socket.IO:", socketIo.id);
    });

    socketIo.on("message", (msg: { text: string }) => {
      console.log("Mensagem recebida:", msg);
      addMessage({ role: "assistant", content: msg.text });
      setIsLoading(false);
    });

    socketIo.on("connect_error", (error) => {
      console.error("Erro de conexão:", error);
    });

    return () => {
      socketIo.disconnect();
    };
  }, [addMessage, setIsLoading]);

  const sendMessage = useCallback(
    (event: string, data: any) => {
      if (socket && socket.connected) {
        socket.emit(event, data);
      } else {
        console.error("Socket não está conectado.");
      }
    },
    [socket]
  );

  return { socket, sendMessage };
};

export default useSocket;
