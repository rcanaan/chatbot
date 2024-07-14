import React, { useEffect, useRef, useState } from "react";
import styles from "./Footer.module.css";
import { useMessages } from "../Context/MessageContext";

interface FooterProps {
  onClickSideBar: () => void;
  isSideBarOpen: boolean;
  setUsername: (name: string) => void;
}

export default function Footer({
  onClickSideBar,
  isSideBarOpen,
  setUsername,
}: FooterProps) {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { addMessage, messages, nameSet, setNameSet } = useMessages();
  const initialMessageSet = useRef(false);
  useEffect(() => {
    if (!initialMessageSet.current && messages.length === 0 && !nameSet) {
      addMessage("What is your name?", "received");
      initialMessageSet.current = true;
    }
  }, [addMessage, messages.length, nameSet, setNameSet]);

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
      if (!nameSet) {
        setUsername(inputValue);
        addMessage(inputValue, "sent");
        addMessage(`Hello ${inputValue}!`, "received");
        setNameSet(true);
      } else {
        addMessage(inputValue, "sent");
        // ChatBot Echo message after a delay
        setTimeout(() => {
          addMessage(inputValue, "received");
        }, 800);
      }
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
}
