import React, { useState } from "react";
import "../PatientMedicalInfo.css"; // Ensure correct path
import { FaBars, FaUser, FaCog, FaCalendar } from "react-icons/fa";
import profileImg from "../assets/im1.png"; // Ensure image path is correct

const PatientMedicalInfo = () => {
  const [selectedTab, setSelectedTab] = useState("Allergies");

  const medicalData = {
    "Allergies": ["x", "y", "z"],
    "Chronic Diseases": ["Diabetes", "Hypertension"],
    "Previous Diagnosis": ["Asthma", "Migraines"],
    "Current Medications": ["Paracetamol", "Aspirin"],
  };

  return (
    <div className="medical-container">
      {/* Sidebar */}
      <div className="sidebar">
        <FaBars className="sidebar-icon" />
        <FaCalendar className="sidebar-icon" />
        <FaUser className="sidebar-icon active-icon" />
        <FaCog className="sidebar-icon" />
      </div>

      {/* Sidebar Menu */}
      <div className="sidebar-menu">
        {Object.keys(medicalData).map((tab) => (
          <button
            key={tab}
            className={`menu-button ${selectedTab === tab ? "active" : ""}`}
            onClick={() => setSelectedTab(tab)}
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
            <li key={index}>{item}</li>
          ))}
        </ul>

        {/* Profile Picture on Top Right */}
        <img src={profileImg} alt="Profile" className="profile-img" />
      </div>
    </div>
  );
};

export default PatientMedicalInfo;
