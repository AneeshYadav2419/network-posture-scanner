import { useEffect, useState } from "react";
import {
  getDevices,
  getFirewallRules,
  getCisResults,
  triggerScan,
} from "../services/api";

export default function useDashboardData() {
  const [devices, setDevices] = useState([]);
  const [firewallRules, setFirewallRules] = useState([]);
  const [cisResults, setCisResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scanning, setScanning] = useState(false);
  const [lastScanTime, setLastScanTime] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [devicesRes, firewallRes, cisRes] = await Promise.all([
        getDevices(),
        getFirewallRules(),
        getCisResults(),
      ]);

      setDevices(devicesRes.data || []);
      setFirewallRules(firewallRes.data || []);
      setCisResults(cisRes.data || []);
      setLastScanTime(new Date());
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const runScan = async (target, provider) => {
    setScanning(true);
    try {
      const response = await triggerScan(target, provider);
      await loadData();
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Error running posture scan:", error);
      const errMsg = error.response?.data?.message || error.response?.data?.error || error.message || "Unknown error";
      return { success: false, error: errMsg };
    } finally {
      setScanning(false);
    }
  };

  return {
    devices,
    firewallRules,
    cisResults,
    loading,
    scanning,
    lastScanTime,
    runScan,
    refreshData: loadData,
  };
}