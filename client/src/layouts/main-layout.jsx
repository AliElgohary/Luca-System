import React from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import styles from "./mainLayout.module.css";
const MainLayout = ({ children }) => {
  return (
    <div className="h-screen flex w-full">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Navbar />
        <main className={styles.layout}>{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
