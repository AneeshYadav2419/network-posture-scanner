import axios from "axios";

const API = "http://localhost:5000/api";

// Read API key from environment (VITE_ prefix required for Vite to expose it to the browser)
const API_KEY =
  import.meta.env.VITE_API_KEY || "network-posture-key-2024";

const api = axios.create({
  baseURL: API,
  headers: {
    "x-api-key": API_KEY,
  },
});

export const getDevices = () => api.get("/devices");

export const getFirewallRules = () => api.get("/firewall-rules");

export const getCisResults = () => api.get("/cis-results");

export const triggerScan = (target, provider) =>
  api.post("/scan", { target, provider });