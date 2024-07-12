// src/components/MessageList.tsx
import React from "react";
import Message from "./Message";
import { useMessages } from "../Context/MessageContext";
import styles from "./MessageList.module.css";

const MessageList: React.FC = () => {
  const { messages, resendMessage, deleteMessage } = useMessages();

  return (
    <div className={styles.messageList}>
      <h2>Sent Messages</h2>
      <ul>
        {messages.map((message) => (
          <Message
            key={message.id}
            id={message.id}
            text={message.text}
            timestamp={message.timestamp}
            type={message.type}
            onResend={resendMessage}
            onDelete={deleteMessage}
          />
        ))}
      </ul>
    </div>
  );
};

export default MessageList;
