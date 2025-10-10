import axios from "axios";

// ------------------------
// Types
// ------------------------
export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  emergencyContact?: string;
  bloodType?: string;
  userType: string;
}

export interface Incident {
  id?: number;
  location: string;
  description: string;
  status?: string;
  reporter?: number;
  created_at?: string;
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
export const login = async (email: string, password: string) => {
  try {
    const res = await api.post("/token/", { username: email, password });
    localStorage.setItem("token", res.data.access);
    return res.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.detail || "Login failed");
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const getToken = () => localStorage.getItem("token");

// ------------------------
// Registration
// ------------------------
export const registerUser = async (userData: {
  name: string;
  email: string;
  password: string;
  phone?: string;
  emergencyContact?: string;
  bloodType?: string;
  userType: string;
}) => {
  const res = await fetch(`${API_URL}/register/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData?.detail || "Registration failed");
  }

  return await res.json();
};

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
export const connectIncidentWebSocket = (onMessage: (incident: Incident) => void) => {
  const ws = new WebSocket("ws://127.0.0.1:8000/ws/incidents/");

  ws.onopen = () => console.log("WebSocket connected to incidents");
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onMessage(data);
  };
  ws.onclose = () => console.log("WebSocket disconnected");
  ws.onerror = (err) => console.error("WebSocket error:", err);

  return ws;
};
