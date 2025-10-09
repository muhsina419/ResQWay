import axios from "axios";
const API_URL = "http://127.0.0.1:8000/api";
export const api = axios.create({ baseURL: API_URL });
export const login = async (username: string, password: string) => {
const res = await api.post("/token/", { username, password });
localStorage.setItem("token", res.data.access);
return res.data;
};
export const getIncidents = async () => {
const token = localStorage.getItem("token");
const res = await api.get("/incidents/", {
headers: { Authorization: `Bearer ${token}` },
});
return res.data;
};
export const reportIncident = async (incident: any) => {
const token = localStorage.getItem("token");
const res = await api.post("/incidents/", incident, {
headers: { Authorization: `Bearer ${token}` },
});
return res.data;
};
