import React from "react";
import './LabResultReport.css';

const LabResultReport = ({ result, onCloseReport}) => {
  const closeReport = () => {
    onCloseReport();
  }
  if (!result) return null;

  return (
    <div className="report-overlay-lab">
      <div className="report-container-lab">
        <div className="report-box-lab">
          <h3>Laboratory Result Details</h3>
          <div className="report-content-lab">
            <p>
              <strong>Date of Result:</strong> {result.dateOfResult.split("T").at(0)}
            </p>
            <p>
              <strong>Results:</strong>
            </p>
            <table className="results-table-lab">
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
                        <td>{result.results[index]}</td>
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
            {result.notes != null ? (
                <p>
                    {result.notes}
                </p>
            ) : (
                "No notes written"
            )}
          </div>
        </div>
        <button type="button" className="close-report-btn-lab" onClick={closeReport}>Close</button>
      </div>
    </div>
  );
};

export default LabResultReport;