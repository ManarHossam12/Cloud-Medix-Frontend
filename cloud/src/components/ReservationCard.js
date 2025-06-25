import React from "react";
import "../style.css";

const ReservationCard = ({ slot, hospital, onReserve }) => {
  const user = JSON.parse(localStorage.getItem("user")).user;
  const userId = JSON.parse(localStorage.getItem("user")).id;
  const userToken = JSON.parse(localStorage.getItem("user")).token;

  const reserve = async() => {
    onReserve(slot, hospital);
  }

  return (
    <div className="reservation-card">
      <div className="card-content">
        <div>
          <p><span>Dr. {slot.physicianFullName}</span></p>
          <p><span>{slot.specialtyName}</span></p>
          <p><span>{slot.startTime.split("T").at(0)} | {slot.startTime.split("T").at(-1)}</span></p>
          <p><span>{slot.endTime.split("T").at(0)} | {slot.endTime.split("T").at(-1)}</span></p>
          {slot.reserved && <p><span>Already Reserved</span></p>}
        </div>
        {!(slot.reserved) && <button className="reserve-btn" onClick={() => reserve()}>Reserve</button>}
      </div>
    </div>
  );
};

export default ReservationCard;
