import React from "react";
import "../style.css";

const ReservationCard = ({ title }) => {
  return (
    <div className="reservation-card">
      <div className="card-content">
        <img src="../assets/medical-icon.png" alt="Icon" className="card-icon" />
        <span>{title}</span>
      </div>
    </div>
  );
};

export default ReservationCard;
