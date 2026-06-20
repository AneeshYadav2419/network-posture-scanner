import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});
export default api;

export const getDevices = () =>
  api.get("/devices");

export const getFirewallRules =
  () =>
    api.get(
      "/firewall-rules"
    );

export const getCisResults =
  () =>
    api.get(
      "/cis-results"
    );