import { useEffect, useState } from "react";

import {
  getDevices,
  getFirewallRules,
  getCisResults,
} from "../services/api";

export default function useDashboardData() {
  const [devices, setDevices] =
    useState([]);

  const [
    firewallRules,
    setFirewallRules,
  ] = useState([]);

  const [
    cisResults,
    setCisResults,
  ] = useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData =
    async () => {
      try {
        const [
          devicesRes,
          firewallRes,
          cisRes,
        ] = await Promise.all([
          getDevices(),
          getFirewallRules(),
          getCisResults(),
        ]);

        setDevices(
          devicesRes.data
        );

        setFirewallRules(
          firewallRes.data
        );

        setCisResults(
          cisRes.data
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  return {
    devices,
    firewallRules,
    cisResults,
    loading,
  };
}