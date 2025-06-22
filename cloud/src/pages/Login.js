import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles.css"; // Ensure this is linked correctly
import Layout from "../components/Layout"; // ✅ Import Layout
import api from "../axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async (e) => {
  e.preventDefault();
  setError("");

  if (userName.trim() === "" || password.trim() === "") {
    setError("Username and password are required!");
    return;
  }

  try {
    const response = await api.post("/systemaccount/login-patient", {
      userName,
      password,
    });

     if (response.data.statusCode === 200 && response.data.data.length > 0) {
  const patientId = response.data.data[0];
  // Optionally save JWT: const jwtToken = response.data.data[1];

  try {
    // Fetch profile
    const profileRes = await api.get(`/SystemUser/patient/${patientId}`);
    if (profileRes.data.statusCode === 200) {
      // Store the profile in localStorage for all pages to use
      localStorage.setItem("userData", JSON.stringify({
        ...profileRes.data.data,
        patientId // Attach patientId for API requests
      }));
      window.location.href = "/home";
    } else {
      alert("Could not fetch profile. Please try again.");
    }
  } catch (e) {
    alert("Error fetching patient profile.");
  }
}
  } catch (err) {
    setError(
      err.response?.data?.message ||
      err.response?.data?.error ||
      "Login failed. Try again."
    );
  }
};


  return (
    <div className="background">
      {/* 🔵 Blue Circles */}
      <div className="circle left-circle"></div>
      <div className="circle right-circle"></div>

      {/* 📦 Login Box */}
      <div className="login-container">
        <h2 className="welcome">
          Welcome <span>Back!</span>
        </h2>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>


          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-signin">Sign In</button>
        </form>

        {/* 🔗 Sign Up Link */}
        <p className="signup-text">
          Don't have an account? <Link to="/signup" className="signup-link">Sign Up</Link>
        </p>

        {/* 🔗 Link to Receptionist Home */}
        <p className="signup-text">
          Are you a receptionist? <Link to="/Home" className="signup-link">Go to Receptionist Home</Link>
        </p>
      </div>

      {/* 🌐 Branding */}
      <div className="logo">Cloud<span>Medix</span></div>
    </div>
  );
};

export default Login;
