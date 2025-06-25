import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import PatientMedicalInfo from "./pages/PatientMedicalInfo";

import Layout from "./components/Layout";
import PatientHome from "./pages/Home";
import ReceptionistHome from "./pages/ReceptionistHome";
import Address from "./pages/Address";
import PatientDiagnosesAndTreatments from "./pages/PatientDiagnosesAndTreatments";
import TestsAndScans from "./pages/TestsAndScans";
import MyReservations from "./pages/MyReservations";
import Slots from "./pages/Slots";







function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<PatientHome />} />
        <Route path="/receptionist" element={<ReceptionistHome />} />
        <Route path="/address" element={<Address />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/slots" element={<Slots />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Layout><Profile /></Layout>} />
        <Route path="/medical-record" element={<PatientMedicalInfo />} />
        <Route path="/diagnoses-treatments" element={<PatientDiagnosesAndTreatments />} />
        <Route path="/tests-scans" element={<TestsAndScans />} />
        <Route path="/my-reservations" element={<MyReservations />} />
      </Routes>
    </Router>
  );
}

export default App;
