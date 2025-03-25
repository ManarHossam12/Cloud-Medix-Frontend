import React from "react";
import { FaBars, FaClipboardList, FaCalendarCheck, FaNotesMedical, FaUser, FaCog } from "react-icons/fa";

const Sidebar = () => {
  const handleIconClick = (iconName) => {
    if (iconName === "Menu") {
      window.location.href = "/home";
    } else if (iconName === "Medical Records") {
      window.location.href = "/medical-record";
    } else if (iconName === "User Profile") {
      window.location.href = "/profile";
    }
  };

  return (
    <div className="sidebarr">
      <FaBars className="sidebar-icon" onClick={() => handleIconClick("Menu")} />
      <FaClipboardList className="sidebar-icon" onClick={() => handleIconClick("Medical Records")} />
      <FaCalendarCheck className="sidebar-icon" onClick={() => handleIconClick("Calendar")} />
      <FaNotesMedical className="sidebar-icon" onClick={() => handleIconClick("Notes")} />
      <FaUser className="sidebar-icon active" onClick={() => handleIconClick("User Profile")} />
      <FaCog className="sidebar-icon" onClick={() => handleIconClick("Settings")} />
    </div>
  );
};

export default Sidebar;
