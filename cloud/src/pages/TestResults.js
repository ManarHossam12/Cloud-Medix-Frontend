import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { getTestRequestsByPatientCentral } from "./testRequests"; // your API functions import
import "../TestResults.css";

const DEPARTMENT_MAP = {
  0: "General",
  1: "Cardiology",
  2: "Neurology",
  // add your actual department mappings here
};

const STATUS_MAP = {
  0: "Pending",
  1: "Completed",
  2: "Cancelled",
  // add your actual status mappings here
};

const TestResults = () => {
  const [testRequests, setTestRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Dynamically get patientId from localStorage userData
  const storedUser = JSON.parse(localStorage.getItem("userData"));
  const patientId = storedUser?.patientId || storedUser?.id || null;

  // Set testType dynamically; adjust as needed
  const testType = "LABORATORY";

  useEffect(() => {
    if (!patientId) {
      setError("Patient ID not found in local storage.");
      setLoading(false);
      return;
    }

    async function fetchRequests() {
      try {
        setLoading(true);
        const data = await getTestRequestsByPatientCentral(patientId, testType);
        setTestRequests(data);
      } catch (err) {
        setError(err.message || "Failed to fetch test requests.");
      } finally {
        setLoading(false);
      }
    }

    fetchRequests();
  }, [patientId, testType]);

  if (loading) return <div>Loading test requests...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="test-results-root">
      <Sidebar />
      <div className="test-results-main">
        <h1>Test Requests / Scan Results</h1>
        {testRequests.length === 0 ? (
          <p>No test requests found.</p>
        ) : (
          testRequests.map((request) => (
            <div key={request.id} className="test-result-card">
              <h3>Request ID: {request.id}</h3>
              <p>Date of Request: {new Date(request.dateOfRequest).toLocaleDateString()}</p>
              <p>Department: {DEPARTMENT_MAP[request.department] || "Unknown Department"}</p>
              <p>Tests Requested:</p>
              <ul>
                {Array.isArray(request.tests) && request.tests.length > 0 ? (
                  request.tests.map((test, idx) => <li key={idx}>{test}</li>)
                ) : (
                  <li>No tests listed</li>
                )}
              </ul>
              <p>Status: {STATUS_MAP[request.status] || "Unknown Status"}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TestResults;
