import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditProfile: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    contactNo: "",
    email: "",
    bloodType: "",
    allergies: "",
    medicine: "",
    doctor: "",
    scanReports: "",
    emergencyContact: "",
  });

  useEffect(() => {
    // ✅ Load existing data (replace with your real API)
    axios
      .get("http://127.0.0.1:8000/api/profile/")
      .then((res) => {
        setFormData({
          fullName: res.data.fullName || "",
          address: res.data.address || "",
          contactNo: res.data.contactNo || "",
          email: res.data.email || "",
          bloodType: res.data.bloodType || "",
          allergies: res.data.allergies || "",
          medicine: res.data.medicine || "",
          doctor: res.data.doctor || "",
          scanReports: res.data.scanReports || "",
          emergencyContact: res.data.emergencyContact || "",
        });
      })
      .catch(() => {
        // Demo fallback data
        setFormData({
          fullName: "Muhsina Mohammedkutty",
          address: "Green Valley, Edappally, Kochi",
          contactNo: "+91 9876543210",
          email: "muhsina@example.com",
          bloodType: "B+",
          allergies: "Peanuts",
          medicine: "Paracetamol",
          doctor: "Dr. Asha Menon",
          scanReports: "Blood Test (June 2024)",
          emergencyContact: "+91 9123456780",
        });
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .put("http://127.0.0.1:8000/api/profile/", formData)
      .then(() => {
        alert("Profile updated successfully!");
        navigate("/profile");
      })
      .catch(() => alert("Failed to update profile"));
  };

  const handleCancel = () => {
    navigate("/profile");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-100 text-black font-serif p-4">
      <div className="bg-pink-200 p-8 rounded-2xl shadow-lg w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-center mb-6 text-pink-700">
          ✏ Edit Profile
        </h2>

        <form onSubmit={handleSave} className="space-y-5">
          {Object.entries(formData).map(([key, value]) => (
            <div key={key} className="flex flex-col">
              <label className="font-semibold text-gray-800 mb-1 capitalize">
                {key.replace(/([A-Z])/g, " $1")}
              </label>
              {key === "address" || key === "scanReports" || key === "medicine" ? (
                <textarea
                  name={key}
                  value={value}
                  onChange={handleChange}
                  rows={2}
                  className="border border-pink-400 rounded-lg p-2 bg-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              ) : (
                <input
                  type="text"
                  name={key}
                  value={value}
                  onChange={handleChange}
                  className="border border-pink-400 rounded-lg p-2 bg-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              )}
            </div>
          ))}

          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300"
            >
              ❌ Cancel
            </button>
            <button
              type="submit"
              className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300"
            >
              💾 Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;