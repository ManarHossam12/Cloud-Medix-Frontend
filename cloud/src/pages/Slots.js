import React, { useEffect, useState } from "react";
import "../PatientMedicalInfo.css"; // Ensure correct path
import { FaBars, FaUser, FaCog, FaCalendar, FaHome } from "react-icons/fa";
import profileImg from "../assets/im1.png"; // Ensure image path is correct
import ReservationCard from "../components/ReservationCard";

const Slots = () => {
  const user = JSON.parse(localStorage.getItem("user")).user;
  const userId = JSON.parse(localStorage.getItem("user")).id;
  const userToken = JSON.parse(localStorage.getItem("user")).token;
  const [selectedTab, setSelectedTab] = useState(null);
  const [selectedHospital, setSelectedHospital] = useState(null);
  // const allergies = localStorage.getItem("allergies") == null ? null : JSON.parse(localStorage.getItem("allergies"));
  // const chronics = localStorage.getItem("chronics") == null ? null : JSON.parse(localStorage.getItem("chronics"));
  // const medications = localStorage.getItem("medications") == null ? null : JSON.parse(localStorage.getItem("medications"));

  const hospitals = localStorage.getItem("hospitals") == null ? null : (JSON.parse(localStorage.getItem("hospitals"))).hospitals;
  const [slots, setSlots] = useState([]);

  const getSlots = async(hospital) => {
    const response = await fetch(`${hospital.routingUrl}slots/${userId}`, {
      method: "GET",
      headers:{
      'Authorization': `Bearer ${userToken}`
      }
    });

    if(response.status === 401)
    {
      window.location.href = "/";
      // alert("Token expired.");
    }
    const data = await response.json();
    if(data.statusCode != 200)
    {
      alert("Error occured!");
    }
    setSlots(data.data);
  }

  const reserveSlot = async(slot, hospital) => {
    alert(hospital.routingUrl);
    var body = JSON.stringify({
      "hospitalPatientInternalId": hospital.id,
      "slotId": slot.id,
      "reservationDate": new Date().toISOString().split(".").at(0)
    });
    const response = await fetch(`${hospital.routingUrl}reservation/${userId}`, {
      method: "POST",
      headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userToken}`
      },
      body: body
    });

    if(response.status === 401)
    {
      window.location.href = "/";
      // alert("Token expired.");
    }
    const data = await response.json();
    if(data.statusCode != 200)
    {
      alert("Error occured!");
    }
    else
    {
      alert("Reserved successfully");
      getSlots(hospital);
    }
  }

  useEffect(() => {
      if(selectedHospital != null)
      {
        getSlots(selectedHospital);
      }
    }, []);

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
        {hospitals.map((hospital) => (
          <button
            key={hospital.id}
            className={`menu-button ${selectedTab === hospital.name ? "active" : ""}`}
            onClick={() => {setSelectedTab(hospital.name); getSlots(hospital); setSelectedHospital(hospital)}
            }
          >
            {hospital.name}
          </button>
        ))}
      </div>

      {/* Content Section */}
      <div className="content-section" style={{overflowY: "auto"}}>
        <h2>{selectedTab}</h2>
        {slots.map((slot) => (
          <ReservationCard slot={slot} hospital={selectedHospital} onReserve={reserveSlot}/>
        ))}

        {/* Profile Picture on Top Right */}
        <img src={profileImg} alt="Profile" className="profile-img" />
      </div>
    </div>
  );
};

export default Slots;
