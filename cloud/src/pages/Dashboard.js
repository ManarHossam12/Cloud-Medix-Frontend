import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold">Welcome to Patient Portal</h2>
      <div className="grid grid-cols-2 gap-4 mt-6">
        <Link to="/profile" className="p-4 bg-blue-400 text-white rounded">View Profile</Link>
        <Link to="/reservations" className="p-4 bg-green-400 text-white rounded">Manage Reservations</Link>
        <Link to="/medical-records" className="p-4 bg-yellow-400 text-white rounded">Medical Records</Link>
        <Link to="/test-results" className="p-4 bg-purple-400 text-white rounded">Test Results</Link>
      </div>
    </div>
  );
};

export default Dashboard;
