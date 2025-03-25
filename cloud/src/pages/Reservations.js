import React, { useState, useEffect } from "react";
import ReservationCard from "../components/ReservationCard";
import AddButton from "../components/AddButton";
import axios from "axios";

const Reservations = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    axios.get("/api/reservations").then((response) => {
      setReservations(response.data);
    });
  }, []);

  const cancelReservation = (id) => {
    setReservations(reservations.filter((res) => res.id !== id));
    axios.delete(`/api/reservations/${id}`);
  };

  return (
    <div>
      <h2>Reservations</h2>
      {reservations.map((res) => (
        <ReservationCard key={res.id} reservation={res} onCancel={cancelReservation} />
      ))}
      <AddButton onClick={() => alert("Add new reservation")} />
    </div>
  );
};

export default Reservations;
