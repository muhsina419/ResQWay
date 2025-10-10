// src/pages/Volunteer.tsx
import React, { useState } from "react";
import axios from "axios";

const Volunteer: React.FC = () => {
  const [location, setLocation] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/join-volunteer/", {
        location,
      });
      console.log(response.data);
      setSuccess(true);
    } catch (error) {
      console.error("Error joining volunteer:", error);
      alert("Failed to join as volunteer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-100 text-black font-serif p-4">
      <div className="bg-pink-200 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-red-700">
          🤝 Join as Volunteer
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <label className="font-semibold text-lg">Enter your location:</label>
          <input
            type="text"
            placeholder="E.g., Kochi, Kerala"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-red-400 hover:bg-red-700 text-black font-semibold py-2 rounded-xl"
          >
            {loading ? "Submitting..." : "Join Now"}
          </button>
        </form>
        {success && (
          <p className="text-green-600 text-center mt-4 font-semibold">
            ✅ You have successfully joined as a volunteer!
          </p>
        )}
      </div>
    </div>
  );
};

export default Volunteer;