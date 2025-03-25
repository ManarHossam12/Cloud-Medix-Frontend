import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css"; // Ensure this is linked correctly

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleNext = (e) => {
    e.preventDefault();
    setError("");

    if (!userName.trim() || !fullName.trim() || !email.trim() || !password.trim() || 
        !confirmPassword.trim() || !phoneNumber.trim() || !nationalId.trim() || !dateOfBirth.trim()) {
      setError("All fields are required!");
      return;
    }

    if (!validateEmail(email)) {
      setError("Invalid email format!");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    // Store user data temporarily before navigating
    const userData = { userName, fullName, email, password, confirmPassword, phoneNumber, nationalId, dateOfBirth };
    localStorage.setItem("userData", JSON.stringify(userData));
    
    // Redirect to Address Page
    navigate("/address");
  };

  return (
    <div className="background">
      <div className="circle left-circle"></div>
      <div className="circle right-circle"></div>

      <div className="login-container">
        <h2 className="welcome">
          Create <span>Account</span>
        </h2>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleNext}>
          <div className="input-group">
            <input type="text" placeholder="Username" value={userName} onChange={(e) => setUserName(e.target.value)} required />
          </div>

          <div className="input-group">
            <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
          </div>

          <div className="input-group">
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="input-group">
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          <div className="input-group">
            <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </div>

          <div className="input-group">
            <input type="tel" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
          </div>

          <div className="input-group">
            <input type="text" placeholder="National ID" value={nationalId} onChange={(e) => setNationalId(e.target.value)} required />
          </div>

          <div className="input-group">
            <input type="date" placeholder="Date of Birth" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} required />
          </div>

          <button type="submit" className="btn-signin">Next</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
