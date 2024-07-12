// src/components/SideBar.tsx
import React from "react";
import styles from "./SideBar.module.css";
import { useMessages } from "../Context/MessageContext";

const SideBar: React.FC = () => {
  const { messages, resendMessage, deleteMessage } = useMessages();

  const sentMessages = messages.filter((message) => message.type === "sent");

  return (
    <div className={styles.sidebar}>
      <ul>
        {sentMessages.map((message) => (
          <li key={message.id}>
            <p>{message.text}</p>
            <small>{new Date(message.timestamp).toLocaleTimeString()}</small>
            <div className={styles.actions}>
              <button onClick={() => resendMessage(message.id)}>Resend</button>
              <button onClick={() => deleteMessage(message.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
