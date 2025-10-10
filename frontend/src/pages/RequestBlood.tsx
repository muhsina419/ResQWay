// src/pages/RequestBlood.tsx
import React, { useState } from "react";
import axios from "axios";

const RequestBlood: React.FC = () => {
  const [formData, setFormData] = useState({
    patient_name: "",
    hospital: "",
    bystander_name: "",
    contact_number: "",
    blood_type: "",
    requirement_date: "",
  });

  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/request-blood/", formData);
      setStatus("success");
      alert(response.data.message);
      setFormData({
        patient_name: "",
        hospital: "",
        bystander_name: "",
        contact_number: "",
        blood_type: "",
        requirement_date: "",
      });
    } catch (error: any) {
      console.error(error);
      setStatus("error");
      alert("Failed to submit blood request. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8dddd] px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">🩸 Request Blood</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="patient_name"
            placeholder="Patient Name"
            value={formData.patient_name}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
            required
          />

          <input
            type="text"
            name="hospital"
            placeholder="Hospital Name"
            value={formData.hospital}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
            required
          />

          <input
            type="text"
            name="bystander_name"
            placeholder="Bystander Name"
            value={formData.bystander_name}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
            required
          />

          <input
            type="tel"
            name="contact_number"
            placeholder="Contact Number"
            value={formData.contact_number}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
            required
          />

          <select
            name="blood_type"
            value={formData.blood_type}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
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

          <input
            placeholder="Requirement date"
            type="date"
            name="requirement_date"
            value={formData.requirement_date}
            onChange={handleChange}
            className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
            required
          />

          <button
            type="submit"
            className="w-full bg-red-500 text-white py-3 rounded-xl hover:bg-red-600 transition duration-200"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Requesting..." : "Request Blood"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestBlood;