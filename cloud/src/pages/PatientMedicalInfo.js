import React, { useState, useEffect } from "react";
import api from "../axios";
import Sidebar from "../components/Sidebar";

import im1 from "../assets/im1.png";
import "../PatientMedicalInfo.css"; // CSS file from below

const TABS = [
  { label: "Allergies", key: "Allergies" },
  { label: "Chronic Diseases", key: "Chronic Diseases" },
  { label: "Previous Diagnosis", key: "Previous Diagnosis" },
  { label: "Current Medications", key: "Current Medications" },
];

const apiToTabKey = {
  allergies: "Allergies",
  chronics: "Chronic Diseases",
  previousDiagnoses: "Previous Diagnosis",
  currentMedications: "Current Medications",
};

const PatientMedicalInfo = () => {
  const [selectedTab, setSelectedTab] = useState(TABS[0].key);
  const [medicalData, setMedicalData] = useState({});
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userData"));
    setUser(storedUser);

    const patientId = storedUser?.patientId || storedUser?.id;
    if (!patientId) return;

    async function fetchData() {
      setLoading(true);
      try {
        const res = await api.get(`/MedicalRecord/patientId/${patientId}`);
        const record = res.data.data || {};
        // Map backend keys to tab keys
        setMedicalData({
          "Allergies": record.allergies || [],
          "Chronic Diseases": record.chronics || [],
          "Previous Diagnosis": record.previousDiagnoses || [],
          "Current Medications": record.currentMedications || [],
        });
      } catch {
        setMedicalData({});
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="medix-root">
      {/* Sidebar */}
     <Sidebar active="medical-record" />


      {/* Content */}
      <div className="medix-main">
        {/* Tabs as sidebar buttons */}
        <div className="medix-tabbar">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              className={
                "medix-tab-btn" + (selectedTab === tab.key ? " active" : "")
              }
              onClick={() => setSelectedTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {/* Medical Data Display */}
        <div className="medix-info-card">
          <h2>{selectedTab}</h2>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ul>
  {(medicalData[selectedTab] && medicalData[selectedTab].length > 0) ? (
    medicalData[selectedTab].map((item, idx) => {
      if (typeof item === "object" && item !== null) {
        // Hide fields you don't want (like id, medicalRecordId, etc)
        const hideFields = ["id", "medicalRecordId", "MedicalRecordId"];
        const entries = Object.entries(item).filter(([key]) => !hideFields.includes(key));
        return (
          <li key={idx} style={{ marginBottom: 8, listStyle: "disc" }}>
            {/* All fields as label: value pairs, on the same line */}
            {entries.map(([key, value], i) => (
              <span key={key} style={{ marginRight: 20 }}>
                <strong>
                  {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}:
                </strong>{" "}
                {value}
                {i !== entries.length - 1}
              </span>
            ))}
          </li>
        );
      } else {
        // fallback for string
        return <li key={idx}>{item}</li>;
      }
    })
  ) : (
    <li>No data</li>
  )}
</ul>


          )}
        </div>
        {/* Profile pic top-right */}
        <div className="medix-profile-pic-wrap">
          <img src={im1} className="medix-profile-pic" alt="Profile" />
        </div>
      </div>
    </div>
  );
};

export default PatientMedicalInfo;
