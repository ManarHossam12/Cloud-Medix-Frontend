import React, { useState, useEffect } from "react";
import api from "../axios";
import Sidebar from "../components/Sidebar";
import "../Reservations.css"; // Create or update for custom styling

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userData"));
    if (!storedUser || !storedUser.patientId) {
      window.location.href = "/login";
      return;
    }
    setUser(storedUser);

    async function fetchReservations() {
      setLoading(true);
      try {
        const res = await api.get(`/reservation/patient/central/${storedUser.patientId}`);
        // Expecting response.data.data to be an array
        setReservations(res.data.data || []);
      } catch (e) {
        setReservations([]);
      } finally {
        setLoading(false);
      }
    }
    fetchReservations();
  }, []);

  // Cancel reservation handler (optional)
  const handleCancel = async (reservationId) => {
    if (!window.confirm("Are you sure you want to cancel this reservation?")) return;
    try {
      await api.delete(`/reservation/${reservationId}`);
      setReservations((prev) => prev.filter(r => r.id !== reservationId));
    } catch (e) {
      alert("Failed to cancel reservation.");
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar active="reservations" />
      <div className="reservations-main">
        <h1 className="reservations-title">My Reservations</h1>
        {loading ? (
          <div>Loading...</div>
        ) : reservations.length === 0 ? (
          <div>No reservations found.</div>
        ) : (
          <table className="reservations-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Start</th>
                <th>End</th>
                <th>Physician</th>
                <th>Department</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((r) => (
                <tr key={r.id}>
                  <td>
                    {r.slot && r.slot.startTime
                      ? new Date(r.slot.startTime).toLocaleDateString()
                      : "-"}
                  </td>
                  <td>
                    {r.slot && r.slot.startTime
                      ? new Date(r.slot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                      : "-"}
                  </td>
                  <td>
                    {r.slot && r.slot.endTime
                      ? new Date(r.slot.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                      : "-"}
                  </td>
                  <td>{r.slot && r.slot.physician ? r.slot.physician.name : "-"}</td>
                  <td>{r.slot && r.slot.specialty ? r.slot.specialty.name : "-"}</td>
                  <td>{r.status || "-"}</td>
                  <td>
                    {r.status === "CONFIRMED" && (
                      <button
                        className="cancel-btn"
                        onClick={() => handleCancel(r.id)}
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Reservations;
