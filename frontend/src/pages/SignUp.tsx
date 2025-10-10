import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/api"; // hypothetical API function

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [userType, setUserType] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser({ name, email, phone, password, bloodType, userType });
      navigate("/home"); // or wherever you want post-signup
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to create account. Please try again.");
      }
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen text-center px-4"
      style={{ backgroundColor: "#f8dddd" }}
    >
      <h1 className="text-3xl font-bold text-[#8b1d1d] mb-6">
        Create Your Account
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-8 w-full max-w-md"
      >
        {error && <p className="text-[#b22222] mb-4">{error}</p>}

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 p-3 border border-[#f2baba] rounded-md focus:outline-none focus:ring-2 focus:ring-[#b22222]"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-3 border border-[#f2baba] rounded-md focus:outline-none focus:ring-2 focus:ring-[#b22222]"
          required
        />

        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full mb-4 p-3 border border-[#f2baba] rounded-md focus:outline-none focus:ring-2 focus:ring-[#b22222]"
          required
        />

        <input
          type="tel"
          placeholder="Emergency Contact Number"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-3 border border-[#f2baba] rounded-md focus:outline-none focus:ring-2 focus:ring-[#b22222]"
          required
        />

        <select
          value={bloodType}
          onChange={(e) => setBloodType(e.target.value)}
          className="w-full mb-6 p-3 border border-[#f2baba] rounded-md focus:outline-none focus:ring-2 focus:ring-[#b22222]"
          required
        >
          <option value="">Select Blood Type</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
        </select>

        <select
          value={userType} // <-- corrected
          onChange={(e) => setUserType(e.target.value)}
          className="w-full mb-6 p-3 border border-[#f2baba] rounded-md focus:outline-none focus:ring-2 focus:ring-[#b22222]"
          required
        >
          <option value="">Select User Type</option>
          <option value="PublicUser">Public User</option>
          <option value="Ambulance">Ambulance User</option>
          <option value="Hospital">Hospital Staff</option>
        </select>

        <button
          type="submit"
          className="w-full bg-[#b22222] hover:bg-[#991a1a] text-white py-3 rounded-md transition-all font-semibold"
        >
          Create Account
        </button>

        <div className="text-sm text-[#8b1d1d] mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")} // <-- updated route
            className="text-[#b22222] font-semibold hover:underline cursor-pointer"
          >
            Sign In
          </span>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
