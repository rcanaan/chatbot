import React from "react";
import styles from "./SideBar.module.css";
import { useMessages } from "../Context/MessageContext";
import Message from "./Message";

const SideBar: React.FC = () => {
  const { messages, resendMessage, deleteMessage } = useMessages();
  const sentMessages = messages
    .filter((message) => message.type === "sent")
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  return (
    <div className={styles.sidebar}>
      <ul>
        <h3>My Recent Messages</h3>
        {sentMessages.map((message) => (
          <Message
            key={message.id}
            id={message.id}
            text={message.text}
            timestamp={message.timestamp}
            type={message.type}
            onResend={resendMessage}
            onDelete={deleteMessage}
            showActions={true}
          />
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
