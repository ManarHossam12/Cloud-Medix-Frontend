import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css"; // Ensure this is linked correctly

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (email.trim() === "" || password.trim() === "") {
      setError("Email and password are required!");
      return;
    }

    // Simulating authentication (Replace with API logic)
    if (email === "user@example.com" && password === "password123") {
      localStorage.setItem("user", JSON.stringify({ email }));
      navigate("/dashboard");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="background">
      {/* 🔵 Blue Circles */}
      <div className="circle left-circle"></div>
      <div className="circle right-circle"></div>

      {/* 📦 Login Box */}
      <div className="login-container">
        <h2>
          Welcome <span>Back!</span>
        </h2>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-signin">Sign In</button>
        </form>
      </div>

      {/* 🌐 Branding */}
      <div className="logo">Cloud<span>Medix</span></div>
    </div>
  );
};

export default Login;
