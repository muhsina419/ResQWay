// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
import { getToken } from "./api/api";

function App() {
  const isLoggedIn = !!getToken(); // check if token exists

  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />} />

        {/* Protected Route
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
        /> */}

        {/* Catch-all redirect */}
        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />}
        />
      </Routes>
    </Router>
  );
}

export default App;