import React, { useState, useEffect } from 'react';
import './CustomCalendar.css'; // Custom styles

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T").at(0));

  // Get current date
  const today = new Date();
  const currentMonth = today.getMonth(); // 0-11 (June is 5)
  const currentYear = today.getFullYear(); // 2025
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Generate days for the current month
  const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const daysInMonth = getDaysInMonth(currentMonth, currentYear);

  // Get the first day of the month (0 = Sunday, 1 = Monday, etc.)
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const startingOffset = firstDay === 0 ? 6 : firstDay - 1; // Adjust to start from Monday

  // const handleDateClick = (day) => {
  //   const selected = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  //   setSelectedDate(selected);
  // };

  return (
    <div className="calendar-container">
      <h2>{monthNames[currentMonth]} {currentYear}</h2>
      <div className="calendar-grid">
        {"Mo Tu We Th Fr Sa Su".split(" ").map((day, index) => (
          <span key={index} className="calendar-day">{day}</span>
        ))}
        {[...Array(startingOffset)].map((_, index) => (
          <span key={`empty-${index}`} className="calendar-date empty"></span>
        ))}
        {[...Array(daysInMonth)].map((_, date) => (
          <span
            key={date}
            className={`calendar-date ${selectedDate && parseInt(selectedDate.split('-').pop()) === date + 1 ? 'selected' : ''}`}
            // onClick={() => handleDateClick(date + 1)}
          >
            {date + 1}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Calendar;