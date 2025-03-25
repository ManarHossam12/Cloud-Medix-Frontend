import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Reservations from "./pages/Reservations";
import Visits from "./pages/Visits";
import AvailableSlots from "./pages/AvailableSlots";
import { Box } from "@mui/material";

const App = () => {
  return (
    <Router>
      <Header />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box sx={{ flexGrow: 1, padding: 3, marginLeft: "240px", marginTop: "64px" }}>
          <Routes>
            <Route path="/reservations" element={<Reservations />} />
            <Route path="/visits" element={<Visits />} />
            <Route path="/available-slots" element={<AvailableSlots />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default App;
