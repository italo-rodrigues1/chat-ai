import { useEffect, useState, useCallback } from "react";
import { io, Socket } from "socket.io-client";

interface UseSocketReturn {
  socket: Socket | null;
  messages: any[];
  sendMessage: (event: string, data: any) => void;
}

const useSocket = (url: string): UseSocketReturn => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const socketIo = io(url, {
      transports: ["websocket"],
      reconnection: true,
    });

    setSocket(socketIo);

    socketIo.on("connect", () => {
      console.log("Conectado ao Socket.IO:", socketIo.id);
    });

    socketIo.on("message", (data: any) => {
      console.log("Mensagem recebida:", data);
      setMessages((prev) => [...prev, data]);
    });

    socketIo.on("connect_error", (error) => {
      console.error("Erro de conexão:", error);
    });

    return () => {
      socketIo.disconnect();
    };
  }, [url]);

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

  return { socket, messages, sendMessage };
};

export default useSocket;
