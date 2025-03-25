import React, { useState } from "react";
import "../PatientHome.css";
import { FaClipboardList, FaCalendarCheck, FaUserMd, FaNotesMedical, FaCog, FaUser, FaBars, FaPlus } from "react-icons/fa";
import MedicalIcon from "../assets/im.png";

const PatientHome = () => {
  const [selectedDate, setSelectedDate] = useState(14);

  const handleButtonClick = (buttonText) => {
    if (buttonText === "View Medical Record") {
        window.location.href = "/medical-record";
    } else if (buttonText === "Make Reservation") {
        window.location.href = "/reservations";
    } else {
        alert(`You clicked: ${buttonText}`);
    }
  };

  const handleIconClick = (iconName) => {
    if (iconName === "Menu") {
        window.location.href = "/home";
    } else if (iconName === "Medical Records") {
        window.location.href = "/medical-record";
    } else if (iconName === "User Profile") {
        window.location.href = "/profile";
    }
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="container">
      {/* Sidebar */}
      <div className="sidebarr">
        <FaBars className="sidebar-icon" onClick={() => handleIconClick("Menu")} />
        <FaClipboardList className="sidebar-icon" onClick={() => handleIconClick("Medical Records")} />
        <FaCalendarCheck className="sidebar-icon" onClick={() => handleIconClick("Calendar")} />
        <FaNotesMedical className="sidebar-icon" onClick={() => handleIconClick("Notes")} />
        <FaUser className="sidebar-icon" onClick={() => handleIconClick("User Profile")} />
        <FaCog className="sidebar-icon" onClick={() => handleIconClick("Settings")} />
      </div>

      {/* Main Content */}
      <div className="main-container">
        <h1 className="header">Home</h1>
        <div className="content-box">
          {["View Medical Record", "Tests/Scans Results", "Make Reservation", "My Reservations"].map((text, index) => (
            <button 
              key={index} 
              className="button button-styled" 
              onClick={() => handleButtonClick(text)}
            >
              <span className="button-text">{text}</span>
              <div className="button-icon-container">
                <img src={MedicalIcon} alt="Medical Icon" className="custom-icon" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div className="right-panel">
        <div className="profile" onClick={() => handleIconClick("User Profile")} style={{ cursor: "pointer" }}>
          <img src="profile.png" alt="User" className="profile-img" />
          <div className="profile-name">Wade Warren</div>
          <div className="profile-stats">
            <div className="stat-box">70</div>
            <div className="stat-box">5'10"</div>
            <div className="stat-box add-btn"><FaPlus /></div>
          </div>
        </div>
        <div className="calendar">
          <div className="calendar-header">July 2023</div>
          <div className="calendar-grid">
            {"Mo Tu We Th Fr Sa Su".split(" ").map((day, index) => (
              <span key={index} className="calendar-day">{day}</span>
            ))}
            {[...Array(31)].map((_, date) => (
              <span
                key={date}
                className={`calendar-date ${date + 1 === selectedDate ? "selected" : ""}`}
                onClick={() => handleDateClick(date + 1)}
              >
                {date + 1}
              </span>
            ))}
          </div>
        </div>
        <button className="reservation-btn" onClick={() => handleButtonClick("Make Reservation")}> 
          <FaPlus className="button-icon" /> Make Reservations
        </button>
      </div>
    </div>
  );
};

export default PatientHome;