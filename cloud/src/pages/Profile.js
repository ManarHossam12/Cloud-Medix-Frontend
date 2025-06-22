import React, { useState, useEffect } from "react";
import api from "../axios";
import "../PatientProfile.css"; // Use your own CSS
import { FaPen } from "react-icons/fa";
import im1 from "../assets/im1.png"; // Or your real user image

const Profile = () => {
  const [user, setUser] = useState(null);
  const [contact, setContact] = useState({ name: "", phone: "", relation: "" });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    // Get user info (from localStorage set at login)
    const stored = JSON.parse(localStorage.getItem("userData"));
    if (!stored) return;
    setUser(stored);

    setContact({
      name: stored.emergencyContactName || "",
      phone: stored.emergencyContactPhone || "",
      relation: stored.emergencyContactRelation || "",
    });
  }, []);

  // Update contact info
  async function handleUpdate() {
  console.log("user object for update:", user); // Keep for debugging!
  const userId = user?.patientId; // Use patientId!
  if (!userId) return alert("No user ID found");
  try {
    await api.put(`/SystemUser/update_settings/${userId}`, {
      EmergencyContactName: contact.name,
      EmergencyContactPhone: contact.phone,
      EmergencyContactRelation: contact.relation,
    });
    alert("Emergency contact updated!");
    setEditMode(false);

    // Update user data in localStorage for consistency
    const updatedUser = { ...user, 
      emergencyContactName: contact.name, 
      emergencyContactPhone: contact.phone, 
      emergencyContactRelation: contact.relation 
    };
    setUser(updatedUser);
    localStorage.setItem("userData", JSON.stringify(updatedUser));
  } catch (err) {
    alert("Update failed: " + (err.response?.data?.error || err.message));
  }
}


  if (!user) return null;
return (
  <div className="profile-outer-root">
    <div className="profile-card">
      {/* LEFT SIDE */}
      <div className="profile-card-left">
        <div className="profile-avatar">
          <img src={im1} alt="User" />
        </div>
        <div className="profile-fields">
          <div className="profile-fields-row">
            <div className="profile-mini-field">
              <label>Age</label>
              <span>{user.date ? (new Date().getFullYear() - new Date(user.date).getFullYear()) + " yrs" : "—"}</span>
            </div>
            <div className="profile-mini-field">
              <label>Weight</label>
              <span>{user.weight || "—"}</span>
            </div>
            <div className="profile-mini-field">
              <label>Blood Group</label>
              <span>{user.bloodGroup || "—"}</span>
            </div>
          </div>
          <div className="profile-fields-row">
            <div className="profile-mini-field">
              <label>Sex</label>
              <span>{user.gender === 1 ? "M" : user.gender === 2 ? "F" : "—"}</span>
            </div>
            <div className="profile-mini-field">
              <label>Height</label>
              <span>{user.height || "—"}</span>
            </div>
            <div className="profile-mini-field">
              <label>Joined on</label>
              <span>{user.date ? new Date(user.date).toLocaleDateString() : "—"}</span>
            </div>
          </div>
          <div className="profile-fields-row">
            <div className="profile-wide-field">
              <label>Full Name</label>
              <span>{user.fullName || "—"}</span>
            </div>
            <div className="profile-wide-field">
              <label>National ID</label>
              <span>{user.nationalID || "—"}</span>
            </div>
          </div>
          <div className="profile-fields-row">
            <div className="profile-wide-field">
              <label>Mobile Number</label>
              <span>{user.phone || "—"}</span>
            </div>
          </div>
          <div className="profile-address-field">
            <label>Address</label>
            <textarea
              readOnly
              value={
                user.address
                  ? [
                      user.address.government,
                      user.address.city,
                      user.address.street,
                      user.address.buildingNumber ? `Bldg: ${user.address.buildingNumber}` : "",
                      user.address.floor ? `Floor: ${user.address.floor}` : "",
                      user.address.apartmentNumber ? `Apt: ${user.address.apartmentNumber}` : "",
                    ]
                      .filter(Boolean)
                      .join(", ")
                  : "—"
              }
            />
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: EMERGENCY CONTACT */}
      <div className="profile-card-right">
        <div className="profile-ec-header">
          Emergency Contact{" "}
          {!editMode && (
            <button className="ec-pen" onClick={() => setEditMode(true)}>
              <FaPen />
            </button>
          )}
        </div>
        <div className="profile-ec-list">
          <div className="profile-ec-box">
            <label>Full Name</label>
            <input
              type="text"
              value={contact.name}
              readOnly={!editMode}
              className="contact-input"
              onChange={e => setContact({ ...contact, name: e.target.value })}
            />
            <label>Mobile Number</label>
            <input
              type="text"
              value={contact.phone}
              readOnly={!editMode}
              className="contact-input"
              onChange={e => setContact({ ...contact, phone: e.target.value })}
            />
            <label>Relation</label>
            <input
              type="text"
              value={contact.relation}
              readOnly={!editMode}
              className="contact-input"
              onChange={e => setContact({ ...contact, relation: e.target.value })}
            />
            {editMode && (
              <>
                <button className="save-btn" onClick={handleUpdate}>
                  Save
                </button>
                <button className="cancel-btn" onClick={() => setEditMode(false)}>
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);

};

export default Profile;
