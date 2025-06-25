import React from "react";
import "../PatientProfile.css";
import { FaPen } from "react-icons/fa";
import im1 from "../assets/im1.png";

const PatientProfile = () => {
  const user = JSON.parse(localStorage.getItem("user")).user;
  return (
    <div className="profile-container">
      {/* Profile Section */}
      <div className="profile-details-container">
        <div className="profile-header">
          <h1 className="profile-title">Profile</h1>
          <FaPen className="edit-icon" />
        </div>

        <div className="profile-content">
          <div className="profile-pic-section">
            <img src={im1} alt="User" className="profile-img" />
          </div>

          {/* Three-column grid for info fields */}
          <div className="profile-info-grid">
            <div className="info-box">
              <label>Age</label>
              <span className="info-value">{new Date().getFullYear() - new Date(user.date).getFullYear()}</span>
            </div>
          </div>

          {/* Two-column layout for personal details */}
          <div className="profile-details-grid">
            <div className="detail-box">
              <label>First Name</label>
              <span className="detail-value">{user.fullName.split(" ").at(0)}</span>
            </div>
            <div className="detail-box">
              <label>Last Name</label>
              <span className="detail-value">{user.fullName.split(" ").at(-1)}</span>
            </div>
            <div className="detail-box">
              <label>Mobile Number</label>
              <span className="detail-value">{user.phone}</span>
            </div>
          </div>

          <div className="info-box address-box">
            <label>Address</label>
            <textarea readOnly className="address-text">
              {`${user.address.buildingNumber} ${user.address.street}, ${user.address.city}, ${user.address.government}`}
            </textarea>
          </div>
        </div>
      </div>

      {/* Right Section (Emergency Contacts) */}
      <div className="emergency-contacts">
        <div className="contacts-header">
          <h2>Emergency Contacts</h2>
          <FaPen className="edit-icon" />
        </div>
        <div className="contacts-container">
            <div className="contact-box">
              <label>Emergency Contact Full Name</label>
              <input type="text" value={user.emergencyContactName != null ? user.emergencyContactName : "No emergency contact registered"} readOnly className="contact-input" />
              <label>Emergency Contact Mobile Number</label>
              <input type="text" value={user.emergencyContactPhone != null ? user.emergencyContactPhone : "No emergency contact registered"} readOnly className="contact-input" />
            </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;