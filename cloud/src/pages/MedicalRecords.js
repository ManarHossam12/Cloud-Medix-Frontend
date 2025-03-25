import { useState, useEffect } from "react";
import axios from "axios";

const MedicalRecords = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    axios.get("/api/medical-records").then(response => setRecords(response.data));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Medical Records</h2>
      <ul className="mt-4">
        {records.map(record => (
          <li key={record.id} className="p-2 border-b">{record.details}</li>
        ))}
      </ul>
    </div>
  );
};

export default MedicalRecords;
