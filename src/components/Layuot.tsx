// src/components/Layout.tsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import styles from "./Layout.module.css";
import SideBar from "./SideBar";

export default function Layout() {
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(true);
  const onClickSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.content}>
        {isSideBarOpen && <SideBar />}
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
      <Footer onClickSideBar={onClickSideBar} isSideBarOpen={isSideBarOpen} />
    </div>
  );
}
