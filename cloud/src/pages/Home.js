import React, { useState, useEffect } from "react";
import { FaBell, FaSignOutAlt } from "react-icons/fa";
import defaultProfileImg from "../assets/im1.png";
import docCard from "../assets/im.png";
import Sidebar from "../components/Sidebar"; // Import Sidebar
import "../PatientHome.css";

const mainActions = [
  {
    label: "View Medical Record",
    path: "/medical-record",
    img: docCard,
  },
  {
    label: "Tests/Scans Results",
    path: "/test-results",
    img: docCard,
  },
  {
    label: "Make Reservation",
    path: "/add-reservation",
    img: docCard,
  },
  {
    label: "My Reservations",
    path: "/reservations",
    img: docCard,
  },
];

const PatientHome = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) setUser(JSON.parse(storedUserData));
    else window.location.href = "/login";
  }, []);

  const [calendarDate, setCalendarDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());

  const month = calendarDate.getMonth();
  const year = calendarDate.getFullYear();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDay = new Date(year, month, 1).getDay();
  const weekDays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  const today = new Date();

  const prevMonth = () => setCalendarDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCalendarDate(new Date(year, month + 1, 1));
  const go = (path) => window.location.href = path;
  const handleLogout = () => {
    localStorage.removeItem("userData");
    window.location.href = "/";
  };

  if (!user) return null;

  return (
    <div className="pdf-home-root">
      {/* Sidebar */}
      <Sidebar />

      <div className="pdf-home-main">
        {/* Header */}
        <div className="pdf-header-row">
          <div className="pdf-home-title">Home</div>
          <FaBell className="pdf-bell" />
        </div>
        {/* Main Actions */}
        <div className="pdf-cards-list">
          {mainActions.map((action) => (
            <div key={action.label} className="pdf-action-card" onClick={() => go(action.path)}>
              <div className="pdf-card-label">{action.label}</div>
              <img src={action.img} alt="" className="pdf-card-img" />
            </div>
          ))}
        </div>
      </div>

      <div className="pdf-home-right">
        {/* Profile Card */}
        <div className="pdf-profile-card">
          <img src={user.profileImg || defaultProfileImg} alt="Profile" className="pdf-profile-img"/>
          <div className="pdf-profile-name">{user.fullName}</div>
          <div className="pdf-profile-stats">
            <div className="pdf-profile-stat">70</div>
            <div className="pdf-profile-stat">5'10"</div>
            <button className="pdf-profile-logout-btn" onClick={handleLogout}>
              <FaSignOutAlt />
            </button>
          </div>
        </div>
        {/* Calendar */}
        <div className="pdf-calendar-card">
          <div className="pdf-calendar-header">
            <span className="pdf-calendar-title">
              {calendarDate.toLocaleString('default', { month: 'long' })} {year}
            </span>
            <span>
              <button className="pdf-cal-btn" onClick={prevMonth}>&lt;</button>
              <button className="pdf-cal-btn" onClick={nextMonth}>&gt;</button>
            </span>
          </div>
          <div className="pdf-calendar-grid">
            {weekDays.map((day, idx) => (
              <span key={idx} className="pdf-calendar-day">{day}</span>
            ))}
            {/* Padding days */}
            {[...Array((startDay + 6) % 7)].map((_, idx) => (
              <span key={`empty-${idx}`} className="pdf-calendar-date empty"></span>
            ))}
            {[...Array(daysInMonth)].map((_, dateIdx) => {
              const dayNum = dateIdx + 1;
              const isToday =
                dayNum === today.getDate() &&
                month === today.getMonth() &&
                year === today.getFullYear();
              const isSelected = dayNum === selectedDay;
              return (
                <span
                  key={dayNum}
                  className={
                    "pdf-calendar-date" +
                    (isToday ? " today" : "") +
                    (isSelected ? " selected" : "")
                  }
                  onClick={() => setSelectedDay(dayNum)}
                >
                  {dayNum}
                </span>
              );
            })}
          </div>
          <button className="pdf-calendar-action-btn" onClick={() => go("/add-reservation")}>
            + Make Reservations
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientHome;
