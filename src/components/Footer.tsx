import React, { useState } from "react";
import styles from "./Footer.module.css";
import { useMessages } from "../Context/MessageContext";

interface FooterProps {
  onClickSideBar: () => void;
  isSideBarOpen: boolean;
}

export default function Footer({ onClickSideBar, isSideBarOpen }: FooterProps) {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { addMessage } = useMessages();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSendClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      addMessage(inputValue, "sent");
      setIsLoading(false);
      setInputValue("");
    }, 800);
  };

  return (
    <footer className={styles.footer}>
      <button onClick={onClickSideBar}>
        {isSideBarOpen ? "Hide Sidebar" : "Show Sidebar"}
      </button>

      <input
        type="text"
        placeholder="Enter text here"
        value={inputValue}
        onChange={handleInputChange}
        className={styles.input}
      />
      <button
        onClick={handleSendClick}
        disabled={isLoading || inputValue.trim() === ""}
        className={styles.sendButton}
      >
        {isLoading ? <div className={styles.loader}></div> : "Send Input"}
      </button>
    </footer>
  );
}
