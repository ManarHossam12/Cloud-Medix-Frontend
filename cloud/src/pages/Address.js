import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";
import { localhost } from "../config";

const Address = () => {
  const navigate = useNavigate();
  const [address, setAddress] = useState({
    government: "",
    city: "",
    street: "",
    buildingNumber: "",
    floor: "",
    apartmentNumber: "",
  });

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (!storedUserData) {
      navigate("/signup"); // Redirect back if no user data found
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const storedUserData = JSON.parse(localStorage.getItem("userData"));

    if (!storedUserData) {
      alert("User data is missing. Please restart the signup process.");
      navigate("/signup");
      return;
    }

    const fullData = { ...storedUserData, address };

    try {
      console.log("Sending signup request...");

      const response = await fetch(`${localhost}/systemaccount/register-patient`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fullData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Signup failed. Please try again.");
      }

      console.log("Signup successful!");
      localStorage.removeItem("userData"); // Clear stored data
      navigate("/login");
    } catch (err) {
      console.error("Signup error:", err);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div className="background">
      <div className="circle left-circle"></div>
      <div className="circle right-circle"></div>

      <div className="login-container">
        <h2 className="welcome">
          Address <span>Details</span>
        </h2>

        <form onSubmit={handleSignup}>
          <div className="input-group">
            <input type="text" name="government" placeholder="Government" value={address.government} onChange={handleInputChange} required />
          </div>

          <div className="input-group">
            <input type="text" name="city" placeholder="City" value={address.city} onChange={handleInputChange} required />
          </div>

          <div className="input-group">
            <input type="text" name="street" placeholder="Street" value={address.street} onChange={handleInputChange} required />
          </div>

          <div className="input-group">
            <input type="number" name="buildingNumber" placeholder="Building Number" value={address.buildingNumber} onChange={handleInputChange} required />
          </div>

          <div className="input-group">
            <input type="number" name="floor" placeholder="Floor (Optional)" value={address.floor} onChange={handleInputChange} />
          </div>

          <div className="input-group">
            <input type="number" name="apartmentNumber" placeholder="Apartment Number (Optional)" value={address.apartmentNumber} onChange={handleInputChange} />
          </div>

          <button type="submit" className="btn-signin">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Address;
