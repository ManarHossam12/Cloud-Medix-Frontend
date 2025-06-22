// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:5000",
  // Add any default headers here
});

// Optional: Add interceptors for auth, logging, etc.

export default api;
