// src/context/MessageContext.tsx
import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { v4 as uuidv4 } from "uuid";
import useSocket from "../hooks/useSocket";

export type MessageType = "sent" | "received";

export interface MessageDetails {
  id: string;
  text: string;
  timestamp: Date;
  type: MessageType;
}

interface MessageContextType {
  messages: MessageDetails[];
  addMessage: (text: string, type: MessageType) => void;
  resendMessage: (id: string) => void;
  deleteMessage: (id: string) => void;
}

const emptyState: MessageContextType = {
  messages: [],
  addMessage: () => {},
  resendMessage: () => {},
  deleteMessage: () => {},
};

const MessageContext = createContext<MessageContextType>(emptyState);

export const MessageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [messages, setMessages] = useState<MessageDetails[]>([]);

  useEffect(() => {
    console.log("Messages in Context:", messages);
  }, [messages]);

  const socket = useSocket();

  const addMessage = (text: string, type: MessageType) => {
    const newMessage = {
      id: uuidv4(),
      text,
      timestamp: new Date(),
      type,
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const resendMessage = (id: string) => {
    const message = messages.find((msg) => msg.id === id);
    if (message) {
      const newMessage = {
        id: uuidv4(),
        text: message.text,
        timestamp: new Date(),
        type: "sent" as MessageType,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      socket?.emit("chat-message", newMessage.text);
    }
  };

  const deleteMessage = (id: string) => {
    setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== id));
  };

  return (
    <MessageContext.Provider
      value={{ messages, addMessage, resendMessage, deleteMessage }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export const useMessages = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useMessages must be used within a MessageProvider");
  }
  return context;
};
