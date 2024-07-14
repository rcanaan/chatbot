// src/hooks/useSocket.ts
import { useCallback, useEffect, useRef } from "react";
import { Socket, io } from "socket.io-client";
import { useMessages } from "../Context/MessageContext";

const useSocket = () => {
  const { addMessage } = useMessages();

  const socketRef = useRef<Socket | null>(null);

  const initSocket = useCallback(() => {
    const socket = io("http://localhost:4000");

    socket.on("connect", () => {
      console.log(`Connected to socket ${socket.id}`);
    });

    socket.on("chat-message", (msg) => {
      console.log("Message received:", msg);
      addMessage(msg, "received");
    });

    socket.on("disconnect", () => {
      console.log(`Disconnected from socket ${socket.id}`);
    });

    return socket;
  }, [addMessage]);

  useEffect(() => {
    if (socketRef.current?.connected) {
      return;
    }
    socketRef.current = initSocket();
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [initSocket]);

  return socketRef.current;
};

export default useSocket;
