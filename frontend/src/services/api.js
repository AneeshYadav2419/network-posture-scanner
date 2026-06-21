
import axios from "axios";

const API =
  "http://localhost:5000/api";

export const getDevices =
  () => axios.get(`${API}/devices`);

export const getFirewallRules =
  () =>
    axios.get(
      `${API}/firewall-rules`
    );

export const getCisResults =
  () =>
    axios.get(
      `${API}/cis-results`
    );