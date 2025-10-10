// // src/pages/Profile.tsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Profile: React.FC = () => {
//   const [isVolunteer, setIsVolunteer] = useState(false);
//   const [location, setLocation] = useState("");

//   useEffect(() => {
//     // Fetch volunteer status (API endpoint example)
//     axios
//       .get("http://127.0.0.1:8000/api/profile/")
//       .then((res) => {
//         setIsVolunteer(res.data.is_volunteer);
//         setLocation(res.data.location || "");
//       })
//       .catch((err) => console.error("Error fetching profile:", err));
//   }, []);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-pink-100 text-black font-serif p-4">
//       <div className="bg-pink-200 p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
//         <div className="relative inline-block mb-4">
//           <div
//             className={`w-24 h-24 rounded-full border-4 ${
//               isVolunteer ? "border-green-500" : "border-gray-400"
//             } flex items-center justify-center text-4xl`}
//           >
//             👤
//           </div>
//           {isVolunteer && (
//             <span className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></span>
//           )}
//         </div>
//         <h2 className="text-2xl font-bold mb-2">Your Profile</h2>
//         {isVolunteer ? (
//           <>
//             <p className="text-green-600 font-semibold">
//               ✅ Registered Volunteer
//             </p>
//             <p className="mt-2">📍 Location: {location}</p>
//           </>
//         ) : (
//           <p className="text-gray-700">Not yet a volunteer</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Profile;
// src/pages/Profile.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";
import { useNavigate } from "react-router-dom";

const Profile: React.FC = () => {
  const [isVolunteer, setIsVolunteer] = useState(false);
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Example API call to fetch profile details
    axios
      .get("http://127.0.0.1:8000/api/profile/")
      .then((res) => {
        setIsVolunteer(res.data.is_volunteer);
        setLocation(res.data.location || "");
      })
      .catch(() => {
        // fallback demo data
        setIsVolunteer(true);
        setLocation("Kochi, Kerala");
      });
  }, []);

  // Demo data
  const profileData = {
    fullName: "Muhsina Mohammedkutty",
    address: "Green Valley, Edappally, Kochi, Kerala",
    contactNo: "+91 9876543210",
    email: "muhsina@example.com",
    bloodType: "B+",
    allergies: "Peanuts, Dust",
    medicine: "Paracetamol 500mg (as needed)",
    doctor: "Dr. Asha Menon, City Hospital, Kochi",
    scanReports: "CT Scan (June 2024), Blood Test (May 2024)",
    emergencyContact: "+91 9123456780",
  };

  const qrData = JSON.stringify({
    Name: profileData.fullName,
    Contact: profileData.contactNo,
    BloodType: profileData.bloodType,
    Allergies: profileData.allergies,
    Emergency: profileData.emergencyContact,
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-100 text-black font-serif p-4">
      <div className="bg-pink-200 p-8 rounded-2xl shadow-lg w-full max-w-2xl">
        {/* Profile Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative inline-block mb-4">
            <div
              className={`w-28 h-28 rounded-full border-4 ${
                isVolunteer ? "border-green-500" : "border-gray-400"
              } flex items-center justify-center text-5xl bg-white`}
            >
              👤
            </div>
            {isVolunteer && (
              <span className="absolute bottom-3 right-3 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></span>
            )}
          </div>
          <h2 className="text-3xl font-bold mb-1">{profileData.fullName}</h2>
          <p className="text-gray-700 italic">
            {isVolunteer ? "Registered Volunteer" : "User"}
          </p>
          {isVolunteer && (
            <p className="text-sm text-green-600">📍 {location}</p>
          )}
        </div>

        {/* Info Section */}
        <div className="bg-pink-100 p-6 rounded-2xl">
          <h3 className="text-2xl font-semibold text-red-700 mb-4">
            Personal & Medical Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8">
            <div>
              <p className="font-semibold">Full Name:</p>
              <p>{profileData.fullName}</p>
            </div>
            <div>
              <p className="font-semibold">Contact No:</p>
              <p>{profileData.contactNo}</p>
            </div>

            <div>
              <p className="font-semibold">Email:</p>
              <p>{profileData.email}</p>
            </div>
            <div>
              <p className="font-semibold">Address:</p>
              <p>{profileData.address}</p>
            </div>

            <div>
              <p className="font-semibold">Blood Type:</p>
              <p>{profileData.bloodType}</p>
            </div>
            <div>
              <p className="font-semibold">Allergies:</p>
              <p>{profileData.allergies}</p>
            </div>

            <div>
              <p className="font-semibold">Medicine:</p>
              <p>{profileData.medicine}</p>
            </div>
            <div>
              <p className="font-semibold">Attending Doctor:</p>
              <p>{profileData.doctor}</p>
            </div>

            <div>
              <p className="font-semibold">Scanning Reports:</p>
              <p>{profileData.scanReports}</p>
            </div>
            <div>
              <p className="font-semibold">Emergency Contact:</p>
              <p>{profileData.emergencyContact}</p>
            </div>
          </div>
        </div>

        {/* QR Code and Actions */}
        <div className="mt-8 flex flex-col items-center">
          <h4 className="text-lg font-semibold text-gray-700 mb-2">
            QR Code for Quick Access
          </h4>
          <QRCodeCanvas
            value={qrData}
            size={150}
            bgColor="#ffffff"
            fgColor="black"
            includeMargin={true}
            className="mb-4"
          />

          <button
            onClick={() => navigate("/edit-profile")}
            className="bg-red-500 hover:bg-red-800 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300"
          >
            ✏ Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
