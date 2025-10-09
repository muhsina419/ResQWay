import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/api";

import { Link } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
      navigate("/dashboard");
    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen text-center"
      style={{ backgroundColor: "#f8dddd" }}
    >
      <h1 className="text-3xl font-bold text-[#8b1d1d] mb-6">
        Login to ResQWay
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-8 w-full max-w-md"
      >
        {error && <p className="text-[#b22222] mb-4">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-3 border border-[#f2baba] rounded-md focus:outline-none focus:ring-2 focus:ring-[#b22222]"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 p-3 border border-[#f2baba] rounded-md focus:outline-none focus:ring-2 focus:ring-[#b22222]"
          required
        />

        <button
          type="submit"
          className="w-full bg-[#b22222] hover:bg-[#991a1a] text-white py-3 rounded-md transition-all font-semibold"
        >
          Login
        </button>

        <div className="text-sm text-[#8b1d1d] mt-3">
          <a href="#" className="hover:underline">
            Forgot Password?
          </a>
        </div>

        <div className="text-sm text-[#8b1d1d] mt-4">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-[#b22222] font-semibold hover:underline">
                Create one
            </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
