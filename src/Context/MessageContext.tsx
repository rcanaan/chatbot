// src/context/MessageContext.tsx
import React, { createContext, useState, ReactNode, useContext } from "react";
import { v4 as uuidv4 } from "uuid";

type MessageType = "sent" | "received";

export interface MessageDetails {
  id: string;
  text: string;
  // timestamp: number;
  timestamp: Date;
  type: MessageType;
}

interface MessageContextType {
  messages: MessageDetails[];
  addMessage: (text: string, type: MessageType) => void;
  resendMessage: (id: string) => void;
  deleteMessage: (id: string) => void;
  nameSet: boolean;
  setNameSet: (value: boolean) => void;
}
const emptyState: MessageContextType = {
  messages: [],
  addMessage: () => {},
  resendMessage: () => {},
  deleteMessage: () => {},
  nameSet: false,
  setNameSet: () => {},
};
const MessageContext = createContext<MessageContextType>(emptyState);

export const MessageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [messages, setMessages] = useState<MessageDetails[]>([]);
  const [nameSet, setNameSet] = useState<boolean>(false);

  const addMessage = (text: string, type: MessageType) => {
    const newMessage = { id: uuidv4(), text, timestamp: new Date(), type };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };
  const resendMessage = (id: string) => {
    const message = messages.find((msg) => msg.id === id);
    if (message) {
      addMessage(message.text, message.type);
    }
  };

  const deleteMessage = (id: string) => {
    setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== id));
  };

  return (
    <MessageContext.Provider
      value={{
        messages,
        addMessage,
        resendMessage,
        deleteMessage,
        nameSet,
        setNameSet,
      }}
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
