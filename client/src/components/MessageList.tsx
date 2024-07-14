// src/components/MessageList.tsx
import React, { useEffect } from "react";
import Message from "./Message";
import { useMessages } from "../Context/MessageContext";
import styles from "./MessageList.module.css";

const MessageList: React.FC = () => {
  const { messages, resendMessage, deleteMessage } = useMessages();
  const sentMessages = messages.filter((message) => message.type === "sent");
  const receivedMessages = messages.filter(
    (message) => message.type === "received"
  );

  useEffect(() => {
    console.log("All Messages:", messages);
    console.log("Sent Messages:", sentMessages);
    console.log("Received Messages:", receivedMessages);
  }, [messages, sentMessages, receivedMessages]);

  return (
    <div className={styles.messageList}>
      <div className={styles.messageList__titles}>
        <h2 className={styles.received__messages}>Received Messages</h2>
        <h2 className={styles.sent__messages}>Sent Messages</h2>
      </div>
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
            showActions={false}
          />
        ))}
      </ul>
    </div>
  );
};

export default MessageList;
