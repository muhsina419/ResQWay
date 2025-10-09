import React from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/logo.png";
import logo from "../assets/name.png";

const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen text-center"
      style={{
        backgroundColor: "#f8dddd",
      }}
    >
      {/* Blurred background image */}
      <img
        src={backgroundImage}
        alt="Background"
        className="absolute inset-0 w-full h-full object-contain opacity-20 blur-1xl pointer-events-none select-none"
      />

      {/* Logo top-left */}
      <img
        src={logo}
        alt="ResQWay"
        className="absolute top-6 left-8 w-32 md:w-40"
      />

      {/* Main Content */}
      <div className="z-10 px-6 sm:px-10 md:max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#8b1d1d] mb-4 tracking-tight">
          Rescue<span className="font-medium"> - the right way</span>
        </h1>

        <p className="text-[#8b1d1d] text-lg md:text-xl font-medium leading-relaxed mb-8">
          Connecting ambulances, hospitals, and citizens through smart
          coordination — ensuring every rescue happens the right way.
        </p>

        <button
          onClick={() => navigate("/signin")}
          className="bg-[#b22222] hover:bg-[#991a1a] text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Hero;
