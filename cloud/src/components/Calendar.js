import React from "react";
import "../style.css";

const Calendar = () => {
  return (
    <div className="calendar">
      <h3>July 2023</h3>
      <div className="calendar-grid">
        {[...Array(31)].map((_, index) => (
          <div key={index} className={index + 1 === 14 ? "calendar-day active" : "calendar-day"}>
            {index + 1}
          </div>
        ))}
      </div>
      <button className="reserve-btn">+ Make Reservations</button>
    </div>
  );
};

export default Calendar;
