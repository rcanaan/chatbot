import React from "react";
import styles from "./Header.module.css";

interface HeaderProps {
  username?: string;
}

export default function Header({ username = "Chatty" }: HeaderProps) {
  return (
    <header className={styles.header}>
      <h1>Chatbot {username}</h1>
    </header>
  );
}
