import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Reservations from "./pages/Reservations";
import PatientMedicalInfo from "./pages/PatientMedicalInfo";
import Layout from "./components/Layout";
import PatientHome from "./pages/Home";
import ReceptionistHome from "./pages/ReceptionistHome";
import Address from "./pages/Address";
import AddReservation from "./pages/AddReservation";  // <-- Add this import
import TestResults from "./pages/TestResults";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<PatientHome />} />
        <Route path="/receptionist" element={<ReceptionistHome />} />
        <Route path="/address" element={<Address />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/test-results" element={<TestResults />} />
        <Route path="/test-results/:testId" element={<TestResults />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/add-reservation" element={<AddReservation />} /> {/* <-- Add this route */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Layout><Profile /></Layout>} />
        <Route path="/medical-record" element={<PatientMedicalInfo />} />
      </Routes>
    </Router>
  );
}

export default App;
