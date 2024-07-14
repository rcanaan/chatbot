import React, { useState } from "react";
import styles from "./Footer.module.css";
import { useMessages } from "../Context/MessageContext";
import useSocket from "../hooks/useSocket";

interface FooterProps {
  onClickSideBar: () => void;
  isSideBarOpen: boolean;
}

const Footer: React.FC<FooterProps> = ({ onClickSideBar, isSideBarOpen }) => {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { addMessage } = useMessages();
  const socket = useSocket();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !isLoading && inputValue.trim() !== "") {
      handleSendClick();
    }
  };

  const handleSendClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      addMessage(inputValue, "sent");
      socket?.emit("chat-message", inputValue);
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
        onKeyDown={handleKeyDown}
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
};

export default Footer;
