// src/components/Message.tsx
import React from "react";
import styles from "./Message.module.css";

interface MessageProps {
  id: number;
  text: string;
  timestamp: number;
  type: "sent" | "received";
  onResend: (id: number) => void;
  onDelete: (id: number) => void;
}

const Message: React.FC<MessageProps> = ({
  id,
  text,
  timestamp,
  type,
  onResend,
  onDelete,
}) => {
  return (
    <li
      className={`${styles.message} ${
        type === "sent" ? styles.sent : styles.received
      }`}
    >
      <p>{text}</p>
      <small>{new Date(timestamp).toLocaleTimeString()}</small>
      <div className={styles.actions}>
        <button onClick={() => onResend(id)}>Resend</button>
        <button onClick={() => onDelete(id)}>Delete</button>
      </div>
    </li>
  );
};

export default Message;
