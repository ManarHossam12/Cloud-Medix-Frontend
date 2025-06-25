import React, { useState } from "react";
import './ResultCard.css';
import LabResultReport from "./LabResultReport";
import RadioResultReport from "./RadioResultReport";

const ResultCard = ({ test , type }) => {
  const user = JSON.parse(localStorage.getItem("user")).user;
  const userId = JSON.parse(localStorage.getItem("user")).id;
  const userToken = JSON.parse(localStorage.getItem("user")).token;
    const [view, setView] = useState(false);
    const testStates = ["Requested", "Initiated", "Completed"];
    const [result, setResult] = useState(null);
    const viewReport = async() => {
      const response = await fetch(`https://localhost:5001/test/viewTestResults/central/${userId}/${test.id}`, {
          method: "GET",
          headers:{
          'Authorization': `Bearer ${userToken}`
          }
        });

        if(response.status === 401)
        {
          window.location.href = "/";
          // alert("Token expired.");
        }
        const data = await response.json();
        if(data.statusCode != 200)
        {
          alert("Error occured!");
        }
        setResult(data.data);
    }
    const closeReport = () => {
        setView(false); // Hide the report view
      }
    if (!test) return null;

    return (
      <div className="result-card">
        <div className="result-card-content">
          <p>
            <strong>Request Time:</strong> {test.dateOfRequest.split("T").at(0)}
          </p>
          <p>
            <strong>Tests:</strong> {test.tests}
          </p>
          <p>
            <strong>Status:</strong> {testStates[test.status]}
          </p>
        </div>
        <div className="buttons-group">
          {(test.status === 2) && <button type="button" className="details-button-result" onClick={viewResult}>View Results</button>}
        </div>
        {view && type === 0 && (
            <LabResultReport result={result} onCloseReport={closeReport}/>
        )}
        {view && type === 1 && (
            <RadioResultReport result={result} onCloseReport={closeReport}/>
        )}
      </div>
    );

    function viewResult() {
        viewReport();
        setView(true);
    }
  };
  
  export default ResultCard;