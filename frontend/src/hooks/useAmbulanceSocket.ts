import { useEffect, useState } from "react";
export function useAmbulanceSocket(vehicleId: string) {
const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
useEffect(() => {
const socket = new WebSocket(`ws://127.0.0.1:8000/ws/ambulance/${vehicleId}/`);
socket.onmessage = (e) => {
const data = JSON.parse(e.data);
if (data.lat && data.lng) setLocation({ lat: data.lat, lng: data.lng });
};
return () => socket.close();
}, [vehicleId]);
return location;
}