import React from "react";
import "../PatientProfile.css";
import { FaPen } from "react-icons/fa";
import im1 from "../assets/im1.png";

const PatientProfile = () => {
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
              <span className="info-value">49 yrs</span>
            </div>
            <div className="info-box">
              <label>Weight</label>
              <span className="info-value">70 kgs</span>
            </div>
            <div className="info-box">
              <label>Blood Group</label>
              <span className="info-value">O+</span>
            </div>
            <div className="info-box">
              <label>Sex</label>
              <span className="info-value">M</span>
            </div>
            <div className="info-box">
              <label>Height</label>
              <span className="info-value">5 feet 10 inches</span>
            </div>
            <div className="info-box">
              <label>Joined on</label>
              <span className="info-value">10.07.2023</span>
            </div>
          </div>

          {/* Two-column layout for personal details */}
          <div className="profile-details-grid">
            <div className="detail-box">
              <label>First Name</label>
              <span className="detail-value">Wade</span>
            </div>
            <div className="detail-box">
              <label>Last Name</label>
              <span className="detail-value">Warren</span>
            </div>
            <div className="detail-box">
              <label>Mobile Number</label>
              <span className="detail-value">+91-9054XXXXXX</span>
            </div>
            <div className="detail-box">
              <label>Alternate Mobile Number</label>
              <span className="detail-value">+91-8024XXXXXX</span>
            </div>
          </div>

          <div className="info-box address-box">
            <label>Address</label>
            <textarea readOnly className="address-text">
              123, Park Avenue, Lorran Street, New York, dsfihgiudfshguidfhguidfhdhdfh dhdfidhgfhdghi
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
          {[1, 2, 3].map((contact) => (
            <div key={contact} className="contact-box">
              <label>Contact {contact} Full Name</label>
              <input type="text" value="Wade Warren" readOnly className="contact-input" />
              <label>Contact {contact} Mobile Number</label>
              <input type="text" value="+91-9054XXXXXX" readOnly className="contact-input" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;