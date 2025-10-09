import React from "react";

const SignIn: React.FC = () => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen text-center"
      style={{ backgroundColor: "#f8dddd" }}
    >
      <h1 className="text-3xl font-bold text-[#8b1d1d] mb-6">
        Sign In to ResQWay
      </h1>

      <form className="bg-white rounded-lg shadow-md p-8 w-80">
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 border border-[#f2baba] rounded-md focus:outline-none focus:ring-2 focus:ring-[#b22222]"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-3 border border-[#f2baba] rounded-md focus:outline-none focus:ring-2 focus:ring-[#b22222]"
        />

        <button
          type="submit"
          className="w-full bg-[#b22222] text-white py-2 rounded-md hover:bg-[#991a1a] transition-all"
        >
          Sign In
        </button>

        <div className="text-sm text-[#8b1d1d] mt-3">
          <a href="#" className="hover:underline">
            Forgot Password?
          </a>
        </div>

        <div className="text-sm text-[#8b1d1d] mt-4">
          Don’t have an account?{" "}
          <a href="#" className="text-[#b22222] font-semibold hover:underline">
            Create one
          </a>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
