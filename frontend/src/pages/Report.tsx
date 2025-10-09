import React, { useState } from "react";
import axios from "axios";

const Report: React.FC = () => {
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleRequestAmbulance = async () => {
    if (!location.trim()) {
      setMessage("⚠️ Please enter a location before requesting an ambulance.");
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/request-ambulance/", {
        location,
      });

      if (response.status === 200 || response.status === 201) {
        setMessage("✅ Ambulance request successfully sent!");
        setLocation("");
      } else {
        setMessage("❌ Failed to send ambulance request. Try again.");
      }
    } catch (error) {
      console.error("Error requesting ambulance:", error);
      setMessage("🚨 Something went wrong while sending your request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row bg-pink-100 min-h-screen text-black font-serif">
      {/* Sidebar */}
      <aside className="w-full md:w-1/4 bg-pink-200 flex flex-col justify-between p-6">
        <div>
          <h1 className="text-3xl font-bold text-red-700 mb-8">ResQWay</h1>
          <ul className="space-y-4 text-lg font-semibold">
            <li>Resource Allocation</li>
            <li>Status Tracking</li>
            <li>Geolocation and Mapping</li>
            <li>Response Teams</li>
          </ul>
        </div>

        <div className="mt-10 bg-red-300 p-4 rounded-2xl text-black font-semibold">
          <p>Emergency Hotline</p>
          <p>911</p>
          <p>Available 24/7</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold mb-6">🚑 Report an Emergency</h2>

        <div className="bg-pink-200 rounded-2xl p-6 shadow-md max-w-lg">
          <label htmlFor="location" className="block text-lg font-semibold mb-2">
            Enter Your Location
          </label>
          <input
            id="location"
            type="text"
            placeholder="e.g. Near Main Street, City Center"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-3 rounded-xl border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          <button
            onClick={handleRequestAmbulance}
            disabled={loading}
            className={`mt-4 w-full py-3 rounded-xl font-semibold text-black transition ${
              loading
                ? "bg-pink-300 cursor-not-allowed"
                : "bg-pink-400 hover:bg-pink-500"
            }`}
          >
            {loading ? "Requesting..." : "Request Ambulance"}
          </button>

          {message && (
            <p className="mt-4 text-center font-medium text-black">{message}</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Report;
