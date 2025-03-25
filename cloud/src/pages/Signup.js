import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/signup", formData);
      navigate("/login");
    } catch (error) {
      alert("Signup failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold">Signup</h2>
      <form onSubmit={handleSignup} className="flex flex-col space-y-4">
        <input type="text" placeholder="Full Name" onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="p-2 border rounded"/>
        <input type="email" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="p-2 border rounded"/>
        <input type="password" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="p-2 border rounded"/>
        <button type="submit" className="p-2 bg-green-500 text-white rounded">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
