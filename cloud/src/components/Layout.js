import React from "react";
import Sidebar from "./Sidebar";
import "../styles.css";

const Layout = ({ children }) => {
  console.log("Layout component is rendering"); // ✅ Debugging Log
  return (
    <div className="layout">
      <Sidebar />
      <div className="page-content">{children}</div>
    </div>
  );
};

export default Layout;
