import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";

const ReservationCard = ({ reservation, onCancel }) => {
  return (
    <Card sx={{ margin: "10px", backgroundColor: "#e3f2fd" }}>
      <CardContent>
        <Typography variant="h6">Patient: {reservation.patientName}</Typography>
        <Typography>Time: {reservation.time}</Typography>
        <Typography>Doctor: {reservation.doctorName}</Typography>
        <Button variant="contained" color="error" onClick={() => onCancel(reservation.id)}>
          Cancel
        </Button>
      </CardContent>
    </Card>
  );
};

export default ReservationCard;
