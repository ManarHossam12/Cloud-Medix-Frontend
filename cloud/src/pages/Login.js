import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles.css"; // Ensure this is linked correctly
import Layout from "../components/Layout"; // ✅ Import Layout

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (email.trim() === "" || password.trim() === "") {
      setError("Email and password are required!");
      return;
    }

    if (!validateEmail(email)) {
      setError("Invalid email format!");
      return;
    }

    try {
      // Replace with API authentication logic
      const response = await fetch("https://your-api.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      localStorage.setItem("user", JSON.stringify({ email: data.email }));
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed. Try again.");
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
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
