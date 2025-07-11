import React, { useState } from "react";
import "../PatientMedicalInfo.css"; // Ensure correct path
import { FaBars, FaUser, FaCog, FaCalendar, FaHome } from "react-icons/fa";
import profileImg from "../assets/im1.png"; // Ensure image path is correct

const PatientMedicalInfo = () => {
  const [selectedTab, setSelectedTab] = useState("Allergies");
  // const allergies = localStorage.getItem("allergies") == null ? null : JSON.parse(localStorage.getItem("allergies"));
  // const chronics = localStorage.getItem("chronics") == null ? null : JSON.parse(localStorage.getItem("chronics"));
  // const medications = localStorage.getItem("medications") == null ? null : JSON.parse(localStorage.getItem("medications"));

  const medicalData = {
    "Allergies": localStorage.getItem("allergies") == null ? null : (JSON.parse(localStorage.getItem("allergies"))).allergies,
    "Chronic Diseases": localStorage.getItem("chronics") == null ? null : JSON.parse(localStorage.getItem("chronics")).chronics,
    "Current Medications": localStorage.getItem("medications") == null ? null : JSON.parse(localStorage.getItem("medications")).medications,
  };

  return (
    <div className="container">
      {/* Sidebar */}
      <div className="sidebar-medical">
        <FaHome className="sidebar-icon" onClick={() => window.location.href = "/home"}/>
        {/* <FaCalendar className="sidebar-icon" /> */}
        <FaUser className="sidebar-icon active-icon" onClick={() => window.location.href = "/profile"} />
        {/* <FaCog className="sidebar-icon" /> */}
      </div>

      {/* Sidebar Menu */}
      <div className="sidebar-menu">
        {Object.keys(medicalData).map((tab) => (
          <button
            key={tab}
            className={`menu-button ${selectedTab === tab ? "active" : ""}`}
            onClick={() => {setSelectedTab(tab);console.log(medicalData[tab])}
            }
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content Section */}
      <div className="content-section">
        <h2>{selectedTab}</h2>
        <ul>
          {medicalData[selectedTab]?.map((item, index) => (
            <li key={index}>{selectedTab == "Current Medications" ? `${item.name} | Dose: ${item.dose} | From: ${item.startDate}, To: ${item.endDate}` : `${item.description}`}</li>
          ))}
        </ul>

        {/* Profile Picture on Top Right */}
        <img src={profileImg} alt="Profile" className="profile-img" />
      </div>
    </div>
  );
};

export default PatientMedicalInfo;
