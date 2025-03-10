import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="text-lg font-bold">Patient Portal</h1>
      <div>
        <Link to="/" className="mr-4">Home</Link>
        <Link to="/dashboard" className="mr-4">Dashboard</Link>
        <Link to="/appointments" className="mr-4">Appointments</Link>
        <Link to="/records">Medical Records</Link>
      </div>
    </nav>
  );
};

export default Navbar;
