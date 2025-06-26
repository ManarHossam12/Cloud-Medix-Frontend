import React, { useState } from "react";
import "../PatientMedicalInfo.css"; // Ensure correct path
import { FaBars, FaUser, FaCog, FaCalendar, FaHome } from "react-icons/fa";
import profileImg from "../assets/im1.png"; // Ensure image path is correct
import ResultCard from "../components/results/ResultCard";

const TestsAndScans = () => {
  const [selectedTab, setSelectedTab] = useState("Lab Tests");
  const testStates = ["Requested", "Initiated", "Completed"];
  // const allergies = localStorage.getItem("allergies") == null ? null : JSON.parse(localStorage.getItem("allergies"));
  // const chronics = localStorage.getItem("chronics") == null ? null : JSON.parse(localStorage.getItem("chronics"));
  // const medications = localStorage.getItem("medications") == null ? null : JSON.parse(localStorage.getItem("medications"));

  const medicalData = {
    "Lab Tests": localStorage.getItem("lab") == null ? null : (JSON.parse(localStorage.getItem("lab"))).lab,
    "Radiology": localStorage.getItem("radio") == null ? null : JSON.parse(localStorage.getItem("radio")).radio,
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
        {medicalData[selectedTab].map((test) => (
          <ResultCard test={test} type={selectedTab === "Radiology" ? 1 : 0}/>
        ))}
        <img src={profileImg} alt="Profile" className="profile-img" />
      </div>
    </div>
  );
};

export default TestsAndScans;
