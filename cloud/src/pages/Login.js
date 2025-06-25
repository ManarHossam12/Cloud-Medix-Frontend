import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles.css"; // Ensure this is linked correctly
import Layout from "../components/Layout"; // ✅ Import Layout

const Login = () => {
  const [username, setUsername] = useState("");
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

    if (username.trim() === "" || password.trim() === "") {
      setError("Email and password are required!");
      return;
    }

    // if (!validateEmail(username)) {
    //   setError("Invalid email format!");
    //   return;
    // }

    try {
      // Replace with API authentication logic
      const response = await fetch("https://localhost:5001/SystemAccount/login-patient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password }),
      });

      const data = await response.json();
      if(data.statusCode != 200)
      {
        throw new Error("Invalid credentials");
      }
      const detailedResponse = await fetch(`https://localhost:5001/SystemUser/patient/${data.data[0]}`, {
        method: "GET",
      });

      const detailedData = await detailedResponse.json();
      if(detailedData.statusCode != 200)
      {
        throw new Error("Error occurred!");
      }
      localStorage.setItem("user", JSON.stringify({ id: data.data[0] ,user: detailedData.data, token: data.data[1] }));
      navigate("/home");
    } catch (err) {
      setError(err.message || "Login failed. Try again.");
    }
  };

  return (
    <div className="main">
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
              <label htmlFor="email">Username</label>
              <input
                type="text"
                id="email"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
        </div>

        {/* 🌐 Branding */}
        <div className="logo">Cloud<span>Medix</span></div>
      </div>
    </div>
  );
};

export default Login;
