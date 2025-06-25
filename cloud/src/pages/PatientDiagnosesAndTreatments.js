import React, { useState } from "react";
import "../PatientMedicalInfo.css"; // Ensure correct path
import { FaBars, FaUser, FaCog, FaCalendar, FaHome } from "react-icons/fa";
import profileImg from "../assets/im1.png"; // Ensure image path is correct

const PatientDiagnosesAndTreatments = () => {
  const [selectedTab, setSelectedTab] = useState("Diagnoses");
  // const allergies = localStorage.getItem("allergies") == null ? null : JSON.parse(localStorage.getItem("allergies"));
  // const chronics = localStorage.getItem("chronics") == null ? null : JSON.parse(localStorage.getItem("chronics"));
  // const medications = localStorage.getItem("medications") == null ? null : JSON.parse(localStorage.getItem("medications"));

  const medicalData = {
    "Diagnoses": localStorage.getItem("diagnoses") == null ? null : (JSON.parse(localStorage.getItem("diagnoses"))).diagnoses,
    "Treatments": localStorage.getItem("treatments") == null ? null : JSON.parse(localStorage.getItem("treatments")).treatments,
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
        <table>
          <tr>
            <th>{selectedTab == "Diagnoses" ? "Description" : "Type"}</th>
            <th>Physician Name</th>
            <th>Hospital</th>
            <th>Issue Date</th>
          </tr>
          {medicalData[selectedTab]?.map((item, index) => (
          <tr>
            <td>{selectedTab == "Diagnoses" ? `${item.description}` : `${item.type}`}</td>
            <td>Dr. {item.physicianFullname}</td>
            <td>{item.hospitalName}</td>
            <td>{item.issuedDate.split("T").at(0)} | {item.issuedDate.split("T").at(-1)}</td>
          </tr>
          ))}
        </table>

        {/* Profile Picture on Top Right */}
        <img src={profileImg} alt="Profile" className="profile-img" />
      </div>
    </div>
  );
};

export default PatientDiagnosesAndTreatments;
