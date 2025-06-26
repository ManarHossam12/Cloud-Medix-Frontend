import React, { useState } from "react";
import "../PatientHome.css";
import { FaClipboardList, FaCalendarCheck, FaUserMd, FaNotesMedical, FaCog, FaUser, FaBars, FaPlus } from "react-icons/fa";
import MedicalIcon from "../assets/im.png";
import Calendar from "../components/Calendar";
import { localhost } from "../config";

const PatientHome = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T").at(0));
  const user = JSON.parse(localStorage.getItem("user")).user;
  const userId = JSON.parse(localStorage.getItem("user")).id;
  const userToken = JSON.parse(localStorage.getItem("user")).token;

  const setMedicalRecord = async() => {
    const response = await fetch(`${localhost}/medicalRecord/patientId/${userId}`, {
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
      localStorage.setItem("allergies", JSON.stringify({ allergies: data.data["allergies"] }));
      localStorage.setItem("chronics", JSON.stringify({ chronics: data.data["chronics"] }));
      localStorage.setItem("medications", JSON.stringify({ medications: data.data["currentMedications"] }));
  }

  const setMedicalData = async() => {
    const responseDiagnoses = await fetch(`${localhost}/diagnosis/${userId}`, {
        method: "GET",
        headers:{
        'Authorization': `Bearer ${userToken}`
        }
      });
      if(responseDiagnoses.status === 401)
      {
        window.location.href = "/";
        // alert("Token expired.");
      }
      const dataDiagnosis = await responseDiagnoses.json();
      if(dataDiagnosis.statusCode != 200)
      {
        alert("Error occured!");
      }
      const responseTreatments = await fetch(`${localhost}/treatment/${userId}`, {
        method: "GET",
        headers:{
        'Authorization': `Bearer ${userToken}`
        }
      });
      if(responseTreatments.status === 401)
      {
        window.location.href = "/";
        // alert("Token expired.");
      }
      const dataTreatments = await responseTreatments.json();
      if(dataTreatments.statusCode != 200)
      {
        alert("Error occured!");
      }
      localStorage.setItem("diagnoses", JSON.stringify({ diagnoses: dataDiagnosis.data }));
      localStorage.setItem("treatments", JSON.stringify({ treatments: dataTreatments.data }));
  }

  const setTestsData = async() => {
    const responseLab = await fetch(`${localhost}/test/LABORATORY/patient/viewTestRequests/central/${userId}`, {
        method: "GET",
        headers:{
        'Authorization': `Bearer ${userToken}`
        }
      });
      if(responseLab.status === 401)
      {
        window.location.href = "/";
        // alert("Token expired.");
      }
      const dataLab = await responseLab.json();
      if(dataLab.statusCode != 200)
      {
        alert("Error occured!");
      }
      const responseRadio = await fetch(`${localhost}/test/RADIOLOGY/patient/viewTestRequests/central/${userId}`, {
        method: "GET",
        headers:{
        'Authorization': `Bearer ${userToken}`
        }
      });
      if(responseRadio.status === 401)
      {
        window.location.href = "/";
        // alert("Token expired.");
      }
      const dataRadio = await responseRadio.json();
      if(dataRadio.statusCode != 200)
      {
        alert("Error occured!");
      }
      localStorage.setItem("lab", JSON.stringify({ lab: dataLab.data }));
      localStorage.setItem("radio", JSON.stringify({ radio: dataRadio.data }));
  }

  const setHospitals = async() => {
    const response = await fetch(`${localhost}/hospitalRoutings/allHospitals`, {
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
      localStorage.setItem("hospitals", JSON.stringify({ hospitals: data.data }));
  }

  const handleButtonClick = async(buttonText) => {
    if (buttonText === "View Medical Record") {
        await setMedicalRecord();
        window.location.href = "/medical-record";
    } else if (buttonText === "View Diagnoses and Treatments") {
        await setMedicalData();
        window.location.href = "/diagnoses-treatments";
    } else if (buttonText === "Tests/Scans Results") {
        await setTestsData();
        window.location.href = "/tests-scans";
    } else if (buttonText === "My Reservations") {
        window.location.href = "/my-reservations";
    } else if (buttonText === "Make Reservation") {
      await setHospitals();
        window.location.href = "/slots";
    }
  };

  const handleIconClick = async(iconName) => {
    if (iconName === "Menu") {
        window.location.href = "/home";
    } else if (iconName === "Medical Records") {
        await setMedicalRecord();
        window.location.href = "/medical-record";
    } else if (iconName === "User Profile") {
        window.location.href = "/profile";
    }
  };


  return (
    <div className="container">
      {/* Sidebar */}
      {/* <div className="sidebarr">
        <FaBars className="sidebar-icon" onClick={() => handleIconClick("Menu")} />
        <FaClipboardList className="sidebar-icon" onClick={() => handleIconClick("Medical Records")} />
        <FaCalendarCheck className="sidebar-icon" onClick={() => handleIconClick("Calendar")} />
        <FaUser className="sidebar-icon" onClick={() => handleIconClick("User Profile")} />
      </div> */}

      {/* Main Content */}
      <div className="main-container">
        <h1 className="header">Home</h1>
        <div className="content-box">
          {["View Medical Record", "View Diagnoses and Treatments", "Tests/Scans Results", "Make Reservation", "My Reservations"].map((text, index) => (
            <button 
              key={index} 
              className="button button-styled" 
              onClick={() => handleButtonClick(text)}
            >
              <span className="button-text">{text}</span>
              <div className="button-icon-container">
                <img src={MedicalIcon} alt="Medical Icon" className="custom-icon" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div className="right-panel">
        <div className="profile" onClick={() => handleIconClick("User Profile")} style={{ cursor: "pointer" }}>
          <img src="profile.png" alt="User" className="profile-img" />
          <div className="profile-name">{user.fullName}</div>
          <div className="profile-stats">
            <div className="stat-box">70</div>
            <div className="stat-box">5'10"</div>
            <div className="stat-box add-btn"><FaPlus /></div>
          </div>
        </div>
        <Calendar/>
        {/* <button className="reservation-btn" onClick={() => handleButtonClick("Make Reservation")}> 
          <FaPlus className="button-icon" /> Make Reservations
        </button> */}
      </div>
    </div>
  );
};

export default PatientHome;