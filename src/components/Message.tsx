// src/components/Message.tsx
import React from "react";
import styles from "./Message.module.css";
import { MessageDetails } from "../Context/MessageContext";

interface MessageProps extends MessageDetails {
  onResend: (id: string) => void;
  onDelete: (id: string) => void;
  showActions: boolean;
}

const Message: React.FC<MessageProps> = ({
  id,
  text,
  timestamp,
  type,
  onResend,
  onDelete,
  showActions,
}) => {
  return (
    <li className={`${styles.message} ${styles[type]}`}>
      <p>{text}</p>
      <small>{new Date(timestamp).toLocaleTimeString()}</small>
      {showActions && (
        <div className={styles.actions}>
          <button onClick={() => onResend(id)}>Resend</button>
          <button onClick={() => onDelete(id)}>Delete</button>
        </div>
      )}
    </li>
  );
};

export default Message;
