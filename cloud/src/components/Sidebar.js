import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// Use icons from react-icons (choose ones that closely match your design)
import { FaBars, FaThLarge, FaVials, FaCalendarAlt, FaUser, FaCog } from "react-icons/fa";
import { MdTimeline } from "react-icons/md"; // For the stats/graph icon

import "../Sidebar.css"; // Make sure your styles match the reference!

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Helper for active state
  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      {/* Toggle Button */}
      <div className="sidebar-toggle" onClick={() => setCollapsed((c) => !c)}>
        <FaBars style={{ color: "#8224e3", fontSize: 28 }} />
      </div>
      {/* Navigation Icons */}
      <div className="sidebar-icons">
        {/* Home */}
        <FaThLarge
          className={`sidebar-icon${isActive("/home") ? " active" : ""}`}
          onClick={() => navigate("/home")}
        />
        {/* Medical Info */}
        <MdTimeline
          className={`sidebar-icon${isActive("/medical-record") ? " active" : ""}`}
          onClick={() => navigate("/medical-record")}
        />
        {/* Reservations */}
        <FaCalendarAlt
          className={`sidebar-icon${isActive("/reservations") ? " active" : ""}`}
          onClick={() => navigate("/reservations")}
        />

        <FaVials
          className={`sidebar-icon${isActive("/test-requests") ? " active" : ""}`}
          onClick={() => navigate("/test-requests")}
        />
        {/* Profile */}
        <FaUser
          className={`sidebar-icon${isActive("/profile") ? " active" : ""}`}
          onClick={() => navigate("/profile")}
        />
        {/* Settings */}
        <FaCog
          className={`sidebar-icon${isActive("/settings") ? " active" : ""}`}
          onClick={() => navigate("/settings")}
        />
      </div>
    </nav>
  );
};

export default Sidebar;
