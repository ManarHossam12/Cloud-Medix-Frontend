import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../axios";
import "../AddReservation.css";

const AddReservation = () => {
  // State
  const [date, setDate] = useState(new Date());
  const [hospitals, setHospitals] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [slots, setSlots] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch user, hospitals and departments on mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userData"));
    setUser(storedUser);

    api.get("/central/hospital")
      .then(res => setHospitals(res.data.data || []))
      .catch(() => setHospitals([]));

    api.get("/departments")
      .then(res => setDepartments(res.data.data || []))
      .catch(() => setDepartments([]));
  }, []);

  // Fetch all slots once on mount (no filtering in backend)
  useEffect(() => {
    setLoading(true);
   api.get("/slots")
    .then(res => {
      console.log("Slots data:", res.data.data);
      setSlots(res.data.data || []);
    })
      .catch(() => setSlots([]))
      .finally(() => setLoading(false));
      
  }, []);

  // Filter slots client-side by selectedHospital, selectedDepartment, and date
  const filteredSlots = slots.filter(slot => {
    if (selectedHospital && slot.hospitalId !== parseInt(selectedHospital)) return false;
    if (selectedDepartment && slot.departmentId !== parseInt(selectedDepartment)) return false;

    if (date) {
      const slotDate = new Date(slot.startTime).toISOString().split("T")[0];
      const selectedDate = date.toISOString().split("T")[0];
      if (slotDate !== selectedDate) return false;
    }
    return true;
  });

  // Reserve a slot
  const handleReserve = (slotId) => {
    if (!user) return alert("Please log in to reserve.");

    api.post(`/reservation/${user.id}`, {
      slotId,
      reservationDate: date.toISOString(),
    })
      .then(() => {
        alert("Reservation successful!");
        window.location.reload();
      })
      .catch(err => {
        console.error("Reservation error:", err.response?.data || err.message || err);
        alert("Failed to reserve slot");
      });
  };

  // Cancel a reservation
  const handleCancel = (reservationId) => {
    api.delete(`/reservation/${reservationId}`)
      .then(() => window.location.reload())
      .catch(() => alert("Failed to cancel reservation"));
  };

  // Format time range like "08:00 - 08:15"
  const formatTimeRange = (start, end) => {
    const options = { hour: "2-digit", minute: "2-digit" };
    const startTime = new Date(start).toLocaleTimeString([], options);
    const endTime = new Date(end).toLocaleTimeString([], options);
    return `${startTime} – ${endTime}`;
  };

  return (
    <div className="add-reservation-root" style={{ display: "flex" }}>
      <Sidebar active="calendar" />
      <div className="add-reservation-content" style={{ padding: "20px", flexGrow: 1, background: "#f5f1fa", borderRadius: "12px" }}>
        {/* Filters */}
        <div className="add-reservation-filters" style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
          <input
            type="date"
            value={date.toISOString().slice(0, 10)}
            onChange={e => setDate(new Date(e.target.value))}
            className="add-reservation-date"
            style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid #ccc" }}
          />
          <select
            value={selectedHospital}
            onChange={e => setSelectedHospital(e.target.value)}
            style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid #ccc" }}
          >
            <option value="">Select Hospital</option>
            {hospitals.map(h => (
              <option key={h.id} value={h.id}>{h.name}</option>
            ))}
          </select>
          <select
            value={selectedDepartment}
            onChange={e => setSelectedDepartment(e.target.value)}
            style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid #ccc" }}
          >
            <option value="">Select Department</option>
            {departments.map(d => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
        </div>

        {/* Slots */}
        <div className="add-reservation-slots" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {loading ? (
            <div>Loading...</div>
          ) : filteredSlots.length === 0 ? (
            <div>No slots available for the selected filters.</div>
          ) : (
            filteredSlots.map(slot => (
              <div
                key={slot.id}
                className={`add-reservation-slot ${slot.reserved ? "reserved" : ""}`}
                style={{
                  backgroundColor: slot.reserved ? "#b2f2f7" : "#e5e0f9",
                  padding: "16px",
                  borderRadius: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div className="slot-info" style={{ lineHeight: 1.3 }}>
                  <div style={{ fontWeight: "600", fontSize: "14px", color: "#1b2e5a" }}>
                    {formatTimeRange(slot.startTime, slot.endTime)}
                  </div>
                  <div style={{ fontWeight: "700", fontSize: "16px", color: "#4b37a6" }}>
                    {slot.physicianFullName || slot.doctorName || slot.physicianName || "Unknown Doctor"}
                  </div>
                  <div style={{ fontWeight: "600", fontSize: "13px", color: "#a69bdb" }}>
                    {slot.specialtyName || slot.specialty || slot.departmentName || "Unknown Specialty"}
                  </div>

                  <div style={{ fontWeight: "600", fontSize: "12px", color: "#a0a4a8" }}>
                    {slot.hospitalName || "Unknown Hospital"}
                  </div>
                </div>

                {slot.reserved ? (
                  <button
                    className="cancel-btn"
                    onClick={() => handleCancel(slot.reservationId)}
                    style={{
                      backgroundColor: "#e94f4f",
                      color: "white",
                      border: "none",
                      padding: "8px 18px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontWeight: "700",
                    }}
                  >
                    Cancel
                  </button>
                ) : (
                  <button
                    className="reserve-btn"
                    onClick={() => handleReserve(slot.id)}
                    style={{
                      backgroundColor: "#30cdfc",
                      color: "white",
                      border: "none",
                      padding: "8px 18px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontWeight: "700",
                    }}
                  >
                    Reserve
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AddReservation;
