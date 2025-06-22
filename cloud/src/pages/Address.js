import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios";
import "../styles.css";

const Address = () => {
  const navigate = useNavigate();
  const [address, setAddress] = useState({
    country: "Egypt", // default, change as needed
    city: "",
    street: "",
    postalCode: "",
    government: "",
    buildingNumber: "",
  });
  const [gender, setGender] = useState(""); // Add gender selection
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (!storedUserData) {
      navigate("/signup");
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    const storedUserData = JSON.parse(localStorage.getItem("userData"));

    if (!storedUserData) {
      setError("User data is missing. Please restart the signup process.");
      navigate("/signup");
      return;
    }

    // Compose the correct payload
    const fullData = {
      userName: storedUserData.userName,
      fullName: storedUserData.fullName,
      email: storedUserData.email,
      password: storedUserData.password,
      nationalID: storedUserData.nationalId, // Might need to update the signup step to match this spelling!
      date: storedUserData.dateOfBirth,      // Or rename key in signup step to "date"
      phone: storedUserData.phoneNumber,     // Or rename key in signup step to "phone"
      gender: parseInt(gender, 10),          // Or however you want to represent it
      address: {
        country: address.country,
        city: address.city,
        street: address.street,
        postalCode: address.postalCode,
        government: address.government,
        buildingNumber: address.buildingNumber,
      }
    };

    try {
      const response = await api.post("/systemaccount/register-patient", fullData);

     // After getting response from /systemaccount/register-patient
      if (response.status === 200 || response.status === 201) {
        // Suppose response.data = { patientId, fullName, email, ... }
        localStorage.setItem("userData", JSON.stringify(response.data));
        navigate("/home"); // or wherever you want to go next
      }

    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        "Signup failed. Please try again."
      );
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

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSignup}>
          <div className="input-group">
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={address.country}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={address.city}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              name="street"
              placeholder="Street"
              value={address.street}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              value={address.postalCode}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              name="government"
              placeholder="Government"
              value={address.government}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="number"
              name="buildingNumber"
              placeholder="Building Number"
              value={address.buildingNumber}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Gender Selector */}
          <div className="input-group">
            <select value={gender} onChange={handleGenderChange} required>
              <option value="">Select Gender</option>
              <option value={1}>Male</option>
              <option value={2}>Female</option>
            </select>
          </div>

          <button type="submit" className="btn-signin">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Address;
