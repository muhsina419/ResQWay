// // src/App.tsx
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./pages/Login";
// // import Dashboard from "./pages/Dashboard";
// import { getToken } from "./api/api";
// import Demo from "./pages/Demo"; // ✅ Add this import
// <<<<<<< HEAD
// =======
// import Home from "./pages/Home";
// import Report from "./pages/Report"; // ✅ Keep this import

// // Temporary placeholder pages (keep these if you haven't created them yet)
// const RequestBlood = () => <div className="p-8 text-2xl">🩸 Request Blood Page</div>;
// const Volunteer = () => <div className="p-8 text-2xl">🤝 Volunteer Signup Page</div>;
// const Profile = () => <div className="p-8 text-2xl">👤 Profile Page</div>;
// >>>>>>> 7a12c2be10d5e219b753cf3859ebfa1bb8dff0b8

// function App() {
//   const isLoggedIn = !!getToken(); // check if token exists

//   return (
//     <Router>
//       <Routes>
// <<<<<<< HEAD
//         {/* Public Route */}
//         <Route path="/login" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />} />

//         {/* Protected Route
// =======
//         {/* 🔹 Login & Signup (restricted when already logged in) */}
// >>>>>>> 7a12c2be10d5e219b753cf3859ebfa1bb8dff0b8
//         <Route
//           path="/dashboard"
//           element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
//         /> */}
//         {/* Protected Route */}
//         <Route
//           path="/dashboard"
//           element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
//         />
//   // Inside <Routes>

// <<<<<<< HEAD
//         {/* Catch-all redirect */}
//         <Route
//           path="*"
//           element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />}
//         />
// =======
//         {/* 🔹 Public routes */}
//         <Route path="/home" element={<Home />} />
//         <Route path="/report" element={<Report />} />
//         <Route path="/request-blood" element={<RequestBlood />} />
//         <Route path="/volunteer" element={<Volunteer />} />
//         <Route path="/profile" element={<Profile />} />

//         {/* 🔹 Status Tracker routes */}
//         <Route path="/status-tracker" element={<StatusTracker />} />
//         <Route path="/status-tracker/:vehicleId" element={<StatusTracker />} />

//         {/* 🔹 Default redirect */}
//         <Route path="/" element={<Navigate to="/home" />} />
//         <Route path="*" element={<Navigate to="/home" />} />
// >>>>>>> 7a12c2be10d5e219b753cf3859ebfa1bb8dff0b8
//       <Route path="/demo" element={<Demo />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./pages/Login";
// import Home from "./pages/Home";
// import Report from "./pages/Report";
// import Demo from "./pages/Demo"; // ✅ Demo route
// import { getToken } from "./api/api";

// // Temporary placeholder pages
// const RequestBlood = () => <div className="p-8 text-2xl">🩸 Request Blood Page</div>;
// const Volunteer = () => <div className="p-8 text-2xl">🤝 Volunteer Signup Page</div>;
// const Profile = () => <div className="p-8 text-2xl">👤 Profile Page</div>;
// const StatusTracker = () => <div className="p-8 text-2xl">📍 Status Tracker Page</div>;

// // Optional: Uncomment if Dashboard is ready
// // import Dashboard from "./pages/Dashboard";

// function App() {
//   const isLoggedIn = !!getToken(); // check if token exists

//   return (
//     <Router>
//       <Routes>
//         {/* 🔐 Auth Routes */}
//         <Route path="/login" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />} />
//         <Route path="/dashboard" element={isLoggedIn ? <div className="p-8">Dashboard Placeholder</div> : <Navigate to="/login" />} />

//         {/* 🌐 Public Routes */}
//         <Route path="/home" element={<Home />} />
//         <Route path="/report" element={<Report />} />
//         <Route path="/request-blood" element={<RequestBlood />} />
//         <Route path="/volunteer" element={<Volunteer />} />
//         <Route path="/profile" element={<Profile />} />

//         {/* 📍 Status Tracker */}
//         <Route path="/status-tracker" element={<StatusTracker />} />
//         <Route path="/status-tracker/:vehicleId" element={<StatusTracker />} />

//         {/* 🚨 Demo Route */}
//         <Route path="/demo" element={<Demo />} />

//         {/* 🔁 Default Redirects */}
//         <Route path="/" element={<Navigate to="/home" />} />
//         <Route path="*" element={<Navigate to={isLoggedIn ? "/dashboard" : "/home"} />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Report from "./pages/Report";
import Demo from "./pages/Demo";
import { getToken } from "./api/api";

// Temporary placeholder pages
const RequestBlood = () => <div className="p-8 text-2xl">🩸 Request Blood Page</div>;
const Volunteer = () => <div className="p-8 text-2xl">🤝 Volunteer Signup Page</div>;
const Profile = () => <div className="p-8 text-2xl">👤 Profile Page</div>;
const StatusTracker = () => <div className="p-8 text-2xl">📍 Status Tracker Page</div>;

function App() {
  const isLoggedIn = !!getToken();

  return (
    <Routes>
      <Route path="/login" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/dashboard" element={isLoggedIn ? <div className="p-8">Dashboard Placeholder</div> : <Navigate to="/login" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/report" element={<Report />} />
      <Route path="/request-blood" element={<RequestBlood />} />
      <Route path="/volunteer" element={<Volunteer />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/status-tracker" element={<StatusTracker />} />
      <Route path="/status-tracker/:vehicleId" element={<StatusTracker />} />
      <Route path="/demo" element={<Demo />} />
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="*" element={<Navigate to={isLoggedIn ? "/dashboard" : "/home"} />} />
    </Routes>
  );
}

export default App;

