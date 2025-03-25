import React from "react";
import "../rec.css";

const ReceptionistHome = () => {
  const reservations = [
    { id: 1, name: "Osama MOHAMMED", time: "10:00 AM - 10:20 AM", doctor: "Dr. Ali KAMEL" },
    { id: 2, name: "Osama MOHAMMED", time: "10:00 AM - 10:20 AM", doctor: "Dr. Ali KAMEL" },
    { id: 3, name: "Osama MOHAMMED", time: "10:00 AM - 10:20 AM", doctor: "Dr. Ali KAMEL" },
    { id: 4, name: "Osama MOHAMMED", time: "10:00 AM - 10:20 AM", doctor: "Dr. Ali KAMEL" },
    { id: 5, name: "Osama MOHAMMED", time: "10:00 AM - 10:20 AM", doctor: "Dr. Ali KAMEL" },
  ];

  return (
    <div className="receptionist-container">
      <div className="sidebar">
        <button className="sidebar-button">Reservations</button>
        <button className="sidebar-button">Visits</button>
        <button className="sidebar-button">Available Slots</button>
        <button className="sidebar-add">+</button>
      </div>
      <div className="main-content">
        <div className="header">
          <input type="date" className="date-picker" />
          <select className="department-select">
            <option>Cardiology Department</option>
          </select>
          <span className="user-name">Mr. Zeyad OTHMAN</span>
        </div>
        <div className="reservations-list">
          {reservations.map((res) => (
            <div key={res.id} className="reservation-card">
              <p><strong>Patient Name:</strong> {res.name}</p>
              <p><strong>Visit Time:</strong> {res.time}</p>
              <p><strong>Physician Name:</strong> {res.doctor}</p>
              <button className="cancel-button">Cancel</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReceptionistHome;
