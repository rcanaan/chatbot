// src/context/MessageContext.tsx
import React, { createContext, useState, ReactNode, useContext } from "react";

interface Message {
  id: number;
  text: string;
  timestamp: number;
  type: "sent" | "received";
}

interface MessageContextType {
  messages: Message[];
  addMessage: (text: string, type: "sent" | "received") => void;
  resendMessage: (id: number) => void;
  deleteMessage: (id: number) => void;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const MessageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const addMessage = (text: string, type: "sent" | "received") => {
    const newMessage = { id: Date.now(), text, timestamp: Date.now(), type };
    setMessages((prevMessages) =>
      [...prevMessages, newMessage].sort((a, b) => b.timestamp - a.timestamp)
    );
  };

  const resendMessage = (id: number) => {
    const message = messages.find((msg) => msg.id === id);
    if (message) {
      addMessage(message.text, message.type);
    }
  };

  const deleteMessage = (id: number) => {
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
