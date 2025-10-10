// App.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Report from "./pages/Report";
import Demo from "./pages/Demo";
import Hero from "./components/Hero";
import StatusTracker from "./pages/StatusTracker";
import Volunteer from "./pages/Volunteer";
import RequestBlood from "./pages/RequestBlood";
import Profile from "./pages/Profile";
import { getToken } from "./api/api";
import EditProfile from "./pages/EditProfile";

function App() {
  const isLoggedIn = !!getToken();

  return (
    <Routes>
      {/* <Route path="/login" element={isLoggedIn ? <Navigate to="/home" /> : <Login />} /> */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/" element={<Hero />} />
      <Route path="/home" element={<Home />} />
      <Route path="/report" element={<Report />} />
      <Route path="/request-blood" element={<RequestBlood />} />
      <Route path="/volunteer" element={<Volunteer />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/status-tracker" element={<StatusTracker />} />
      <Route path="/status-tracker/:vehicleId" element={<StatusTracker />} />
      <Route path="/demo" element={<Demo />} />
      <Route path="/edit-profile" element={<EditProfile />} />
      {/* <Route path="*" element={<Navigate to={isLoggedIn ? "/home" : "/login"} />} /> */}
    </Routes>
  );
}

export default App;
