// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import StatusTracker from "./pages/StatusTracker";
import { getToken } from "./api/api";
import Home from "./pages/Home";
import Report from "./pages/Report";
import RequestBlood from "./pages/RequestBlood";
import Volunteer from "./pages/Volunteer";   // ✅ Added
import Profile from "./pages/Profile";       // ✅ Added

function App() {
  const isLoggedIn = !!getToken(); // check login

  return (
    <Router>
      <Routes>
        {/* Login & Signup restricted when logged in */}
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/home" /> : <Login />}
        />
        <Route
          path="/signup"
          element={isLoggedIn ? <Navigate to="/home" /> : <SignUp />}
        />

        {/* Public routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/report" element={<Report />} />
        <Route path="/request-blood" element={<RequestBlood />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/profile" element={<Profile />} />

        {/* Status tracker */}
        <Route path="/status-tracker" element={<StatusTracker />} />
        <Route path="/status-tracker/:vehicleId" element={<StatusTracker />} />

        {/* Redirect */}
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </Router>
  );
}

export default App;
