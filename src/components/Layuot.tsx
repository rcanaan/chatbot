// src/components/Layout.tsx
import React, { ReactNode, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import styles from "./Layout.module.css";
import SideBar from "./SideBar";

interface LayoutProps {
  children: ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(true);
  const onClickSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.content}>
        {isSideBarOpen && <SideBar />}
        <main className={styles.main}>{children}</main>
      </div>
      <Footer onClickSideBar={onClickSideBar} isSideBarOpen={isSideBarOpen} />
    </div>
  );
}
