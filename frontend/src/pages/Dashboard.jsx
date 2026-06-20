import { useEffect, useState } from "react";

import {
  getDevices,
  getFirewallRules,
  getCisResults,
} from "../services/api";

import DevicesTable from "../components/DevicesTable";
import FirewallRulesTable from "../components/FirewallRulesTable";
import CisResultsTable from "../components/CisResultsTable";

function Dashboard() {
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

  useEffect(() => {
    loadData();
  }, []);

  const loadData =
    async () => {
      try {
        const devicesRes =
          await getDevices();

        const firewallRes =
          await getFirewallRules();

        const cisRes =
          await getCisResults();

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
      }
    };

  return (
    <div
      style={{
        padding: "20px",
      }}
    >
      <h1>
        Network Posture Scanner
      </h1>

      <DevicesTable
        devices={devices}
      />

      <FirewallRulesTable
        firewallRules={
          firewallRules
        }
      />

      <CisResultsTable
        cisResults={
          cisResults
        }
      />
    </div>
  );
}

export default Dashboard;