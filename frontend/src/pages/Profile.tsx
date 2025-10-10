// src/pages/Profile.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile: React.FC = () => {
  const [isVolunteer, setIsVolunteer] = useState(false);
  const [location, setLocation] = useState("");

  useEffect(() => {
    // Fetch volunteer status (API endpoint example)
    axios
      .get("http://127.0.0.1:8000/api/profile/")
      .then((res) => {
        setIsVolunteer(res.data.is_volunteer);
        setLocation(res.data.location || "");
      })
      .catch((err) => console.error("Error fetching profile:", err));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-100 text-black font-serif p-4">
      <div className="bg-pink-200 p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
        <div className="relative inline-block mb-4">
          <div
            className={`w-24 h-24 rounded-full border-4 ${
              isVolunteer ? "border-green-500" : "border-gray-400"
            } flex items-center justify-center text-4xl`}
          >
            👤
          </div>
          {isVolunteer && (
            <span className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></span>
          )}
        </div>
        <h2 className="text-2xl font-bold mb-2">Your Profile</h2>
        {isVolunteer ? (
          <>
            <p className="text-green-600 font-semibold">
              ✅ Registered Volunteer
            </p>
            <p className="mt-2">📍 Location: {location}</p>
          </>
        ) : (
          <p className="text-gray-700">Not yet a volunteer</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
