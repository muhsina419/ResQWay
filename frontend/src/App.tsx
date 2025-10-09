// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { getToken } from "./api/api";

function App() {
  const isLoggedIn = !!getToken(); // check if token exists

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/signup" /> : <Login />}
        />
        <Route
          path="/signup"
          element={isLoggedIn ? <Navigate to="/signup" /> : <SignUp />}
        />

        {/* Catch-all redirect */}
        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/signup" : "/login"} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
