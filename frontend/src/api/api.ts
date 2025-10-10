import axios from "axios";

// ------------------------
// Types
// ------------------------
export interface User {
  id: number;
  username: string;
}

export interface Incident {
  id?: number;
  location: [number, number];
  description: string;
  type: string;
  status?: string;
  ambulance?: number;
  hospital?: number;
}

// ------------------------
// Axios Instance
// ------------------------
const API_URL = "http://127.0.0.1:8000/api";

export const api = axios.create({
  baseURL: API_URL,
});

// ------------------------
// Auth Functions
// ------------------------
export const login = async (username: string, password: string) => {
  try {
    const res = await api.post("/token/", { username, password });
    localStorage.setItem("token", res.data.access);
    return res.data;
  } catch (err) {
    throw new Error("Login failed: " + (err as any).response?.data?.detail || err);
  }
};
// Your other API functions here

export async function registerUser(userData: {
  name: string;
  email: string;
  phone: string;
  emergencyContact: string;
  bloodType: string;
  userType: string;
}) {
  // Replace with actual API call logic
  // Example using fetch:
  const response = await fetch("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    throw new Error("Registration failed");
  }
  return response.json();
}
export const logout = () => {
  localStorage.removeItem("token");
};

export const getToken = () => localStorage.getItem("token");

// ------------------------
// Incident Functions
// ------------------------
export const getIncidents = async (): Promise<Incident[]> => {
  const token = getToken();
  if (!token) throw new Error("User not authenticated");

  const res = await api.get("/incidents/", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const reportIncident = async (incident: Incident): Promise<Incident> => {
  const token = getToken();
  if (!token) throw new Error("User not authenticated");

  const res = await api.post("/incidents/", incident, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// ------------------------
// WebSocket for Real-time Updates
// ------------------------
export const connectIncidentWebSocket = (
  onMessage: (incidentUpdate: Incident) => void
) => {
  const ws = new WebSocket("ws://127.0.0.1:8000/ws/incidents/");

  ws.onopen = () => console.log("WebSocket connected to incidents");
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onMessage(data); // callback with updated incident
  };
  ws.onclose = () => console.log("WebSocket disconnected");
  ws.onerror = (err) => console.error("WebSocket error:", err);

  return ws; // returns WebSocket instance so you can close later
};
