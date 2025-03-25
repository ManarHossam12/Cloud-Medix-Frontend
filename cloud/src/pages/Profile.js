import { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get("/api/profile").then(response => setUser(response.data));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Profile</h2>
      {user ? (
        <div className="mt-4">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      ) : <p>Loading...</p>}
    </div>
  );
};

export default Profile;
