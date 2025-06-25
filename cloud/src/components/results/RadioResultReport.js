import React from "react";
import './RadioResultReport.css';

const RadioResultReport = ({ result, onCloseReport}) => {
  const closeReport = () => {
    onCloseReport();
  }
  if (!result) return null;

  return (
    <div className="report-overlay-radio">
      <div className="report-container-radio">
        <div className="report-box-radio">
          <h3>Radiology Result Details</h3>
          <div className="report-content-radio">
            <p>
              <strong>Date of Result:</strong> {result.dateOfResult.split("T").at(0)}
            </p>
            <p>
              <strong>Results:</strong>
            </p>
            <table className="results-table-radio">
                <thead>
                <tr>
                    <th>Test</th>
                    <th>Result</th>
                </tr>
                </thead>
                <tbody>
                {result.tests && result.results ? (
                    result.tests.map((test, index) => (
                    <tr key={index}>
                        <td>{test}</td>
                        <td>
                          <img src={`https://drive.google.com/uc?export=view&id=${result.results[index].split("/d/")[1].split("/view")[0]}`}/>
                          <a target="_blank" href={`https://drive.google.com/uc?export=view&id=${result.results[index].split("/d/")[1].split("/view")[0]}`}>View Image</a>
                        </td>
                    </tr>
                    ))
                ) : (
                    <tr>
                        <td>No data available</td>
                    </tr>
                )}
                </tbody>
            </table>
            <p>
                <strong>Notes:</strong>
            </p>
            {result.notes ? (
                <p>
                    {result.notes}
                </p>
            ) : (
                "No notes written"
            )}
          </div>
        </div>
        <button type="button" className="close-report-btn-radio" onClick={closeReport}>Close</button>
      </div>
    </div>
  );
};

export default RadioResultReport;