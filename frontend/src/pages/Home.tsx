import React from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const emergencyFeed = [
    { id: 1, type: "Blood Request", color: "bg-red-500" },
    { id: 2, type: "Nearby Emergency Cases", color: "bg-orange-500" },
    { id: 3, type: "Nearby Emergency Cases", color: "bg-blue-500" },
  ];

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

      {/* Main content */}
      <main className="flex-1 p-8">
        {/* Top Buttons */}
        <div className="flex flex-wrap justify-end md:justify-start gap-4 mb-8">
          <button
            onClick={() => navigate("/report")}
            className="bg-pink-300 hover:bg-pink-400 text-black font-semibold py-2 px-4 rounded-xl"
          >
            Report Emergency
          </button>

          <button
            onClick={() => navigate("/request-blood")}
            className="bg-pink-300 hover:bg-pink-400 text-black font-semibold py-2 px-4 rounded-xl"
          >
            Request Blood
          </button>

          <button
            onClick={() => navigate("/volunteer")}
            className="bg-pink-300 hover:bg-pink-400 text-black font-semibold py-2 px-4 rounded-xl"
          >
            Join as Volunteer
          </button>

          <button
            onClick={() => navigate("/profile")}
            className="bg-pink-300 hover:bg-pink-400 ml-100 p-2 rounded-full"
            title="Profile"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>
        </div>

        {/* Live Feed */}
        <h2 className="text-2xl font-bold mb-4">Live Emergency Feed</h2>
        <div className="space-y-4">
          {emergencyFeed.map((item) => (
            <div
              key={item.id}
              className="bg-pink-300 rounded-2xl p-4 flex items-center space-x-4 shadow-md"
            >
              <div className={`w-6 h-6 rounded-full ${item.color}`}></div>
              <p className="text-lg font-semibold">{item.type}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
