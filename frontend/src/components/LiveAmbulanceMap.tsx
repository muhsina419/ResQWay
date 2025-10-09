// import { useEffect, useState } from 'react';
// import { MapContainer, TileLayer, Marker } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';

// interface Props {
//   vehicleId: string;
// }

// // Fix default marker icon for Leaflet
// delete (L.Icon.Default.prototype as any)._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl:
//     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
//   iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
//   shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
// });

// function LiveAmbulanceMap({ vehicleId }: Props) {
//   const [position, setPosition] = useState<[number, number]>([9.9312, 76.2673]); // Default to Kochi

//   useEffect(() => {
//     const socket = new WebSocket(
//       `ws://localhost:8000/ws/ambulance/${vehicleId}/`
//     );

//     socket.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       if (data.latitude && data.longitude) {
//         setPosition([data.latitude, data.longitude]);
//       }
//     };

//     socket.onerror = (err) => console.error('WebSocket error:', err);

//     return () => socket.close();
//   }, [vehicleId]);

//   return (
//     <MapContainer
//       center={position}
//       zoom={15}
//       style={{ height: '400px', width: '100%' }}
//     >
//       <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//       <Marker position={position} />
//     </MapContainer>
//   );
// }

// export default LiveAmbulanceMap;

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'

const ambulanceIcon = new L.Icon({
  iconUrl: '/ambulance.png', // Place this in your public folder
  iconSize: [32, 32],
});

const AmbulanceMap = ({ incident, hospital, ambulance }) => {
  const [position, setPosition] = useState([ambulance.latitude, ambulance.longitude]);
  const path = [
    [ambulance.latitude, ambulance.longitude],
    [incident.latitude, incident.longitude],
    [hospital.latitude, hospital.longitude],
  ];

  useEffect(() => {
    let step = 0;
    const interval = setInterval(() => {
      if (step < path.length) {
        setPosition(path[step]);
        step++;
      } else {
        clearInterval(interval);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <MapContainer center={position} zoom={13} style={{ height: '600px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={position} icon={ambulanceIcon}>
        <Popup>Ambulance en route</Popup>
      </Marker>
      <Marker position={[incident.latitude, incident.longitude]}>
        <Popup>Incident: {incident.location_name}</Popup>
      </Marker>
      <Marker position={[hospital.latitude, hospital.longitude]}>
        <Popup>Hospital: {hospital.name}</Popup>
      </Marker>
      <Polyline positions={path} color="blue" />
    </MapContainer>
  );
};

export default AmbulanceMap;