import React, { useEffect, useState } from "react";
import "../PatientMedicalInfo.css"; // Ensure correct path
import { FaBars, FaUser, FaCog, FaCalendar, FaHome } from "react-icons/fa";
import profileImg from "../assets/im1.png"; // Ensure image path is correct
import { localhost } from "../config";

const MyReservations = () => {
  const user = JSON.parse(localStorage.getItem("user")).user;
  const userId = JSON.parse(localStorage.getItem("user")).id;
  const userToken = JSON.parse(localStorage.getItem("user")).token;
  // const [reservations, setReservations] = useState(localStorage.getItem("reservations") == null ? null : (JSON.parse(localStorage.getItem("reservations"))).reservations);
  const [reservations, setReservations] = useState([]);
  const reservationStates = ["Confirmed", "Canceled", "Completed"];

  async function fetchData() {
      const response = await fetch(`${localhost}/reservation/patient/central/${userId}`, {
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
      setReservations(data.data);
    }

  useEffect(() => {
    fetchData();
  }, []);

  const cancelReservation = async(reservation, index) => {
    if(window.confirm("Are you sure you want to cancel this reservation?"))
    {
      const response = await fetch(`${localhost}/hospitalRoutings/${reservation.hospital.id}`, {
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
      const cancelResponse = await fetch(`${data.data}reservation/${userId}/${reservation.id}`, {
        method: "DELETE",
        headers:{
        'Authorization': `Bearer ${userToken}`
        }
      });
      if(cancelResponse.status === 401)
      {
        window.location.href = "/";
        // alert("Token expired.");
      }
      const cancelData = await cancelResponse.json();
      if(cancelData.statusCode != 200)
      {
        alert("Error occured!");
      }
      else
      {
        alert("Canceled successfully.");
        fetchData();
      }
    }
  }

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
      {/* <div className="sidebar-menu">
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
      </div> */}

      {/* Content Section */}
      <div className="content-section">
        <h2>My Reservations</h2>
        <table>
          <tr>
            <th>Physician Name</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Hospital</th>
            <th>Status</th>
          </tr>
          {reservations?.map((item, index) => (
          <tr>
            <td>{item.physicianName}</td>
            <td>{item.startTime.split("T").at(0)} | {item.startTime.split("T").at(-1)}</td>
            <td>{item.endTime.split("T").at(0)} | {item.endTime.split("T").at(-1)}</td>
            <td>{item.hospital.name}</td>
            <td>{reservationStates[item.status]}</td>
            {item.status === 0 && <td><button className="cancel-btn" onClick={() => cancelReservation(item, index)}>Cancel</button></td>}
          </tr>
          ))}
        </table>

        {/* Profile Picture on Top Right */}
        <img src={profileImg} alt="Profile" className="profile-img" />
      </div>
    </div>
  );
};

export default MyReservations;
