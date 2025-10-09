// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import StatusTracker from "./pages/StatusTracker";
import { getToken } from "./api/api";
import Home from "./pages/Home";
import Report from "./pages/Report"

// Temporary placeholder pages (replace later with your real ones)
const Report = () => <div className="p-8 text-2xl">🆘 Report Emergency Page</div>;
const RequestBlood = () => <div className="p-8 text-2xl">🩸 Request Blood Page</div>;
const Volunteer = () => <div className="p-8 text-2xl">🤝 Volunteer Signup Page</div>;
const Profile = () => <div className="p-8 text-2xl">👤 Profile Page</div>;

function App() {
  const isLoggedIn = !!getToken(); // Check if user is logged in

  return (
    <Router>
      <Routes>
        {/* 🔹 Login & Signup use login check */}
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/home" /> : <Login />}
        />
        <Route
          path="/signup"
          element={isLoggedIn ? <Navigate to="/home" /> : <SignUp />}
        />

        {/* 🔹 Publicly accessible routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/report" element={<Report />} />
        <Route path="/request-blood" element={<RequestBlood />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/profile" element={<Profile />} />

        {/* 🔹 Status Tracker routes */}
        <Route path="/status-tracker" element={<StatusTracker />} />
        <Route path="/status-tracker/:vehicleId" element={<StatusTracker />} />

        {/* 🔹 Default redirect */}
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </Router>
  );
}

export default App;
