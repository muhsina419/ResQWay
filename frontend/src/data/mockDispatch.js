// export const mockDispatch = {
//   incident: {
//     latitude: 9.9312,
//     longitude: 76.2673,
//     location_name: "CUSAT Main Gate"
//   },
//   hospital: {
//     latitude: 9.9675,
//     longitude: 76.2782,
//     name: "General Hospital Kochi"
//   },
//   ambulance: {
//     latitude: 10.0270,
//     longitude: 76.3010,
//     vehicle_id: "AMB123"
//   },
//   route_info: {
//     distance_km: 4.7,
//     eta_min: 9.3
//   },
//   status_sequence: [
//     { step: 0, label: "🚑 Ambulance starts moving", status: "Assigned" },
//     { step: 1, label: "🧍 Reaches incident", status: "Patient Onboard" },
//     { step: 2, label: "🏥 Reaches hospital", status: "Delivered to Hospital" }
//   ]
// };
export const mockDispatch = {
  incident: {
    latitude: 10.0480,
    longitude: 76.3265,
    location_name: "CUSAT Main Gate"
  },
  hospital: {
    latitude: 10.0447,
    longitude: 76.3209,
    name: "Model Engineering College Health Centre"
  },
  ambulance: {
    latitude: 10.0465,
    longitude: 76.3318,
    vehicle_id: "AMB123"
  },
  route_info: {
    distance_km: 1.2,
    eta_min: 3.5
  },
  status_sequence: [
    { step: 0, label: "🚑 Ambulance starts moving", status: "Assigned" },
    { step: 1, label: "🧍 Reaches incident", status: "Patient Onboard" },
    { step: 2, label: "🏥 Reaches hospital", status: "Delivered to Hospital" }
  ]
};
