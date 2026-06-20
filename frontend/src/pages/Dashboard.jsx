import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [devices, setDevices] = useState([]);
  const [firewallRules, setFirewallRules] = useState([]);
  const [cisResults, setCisResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [devicesRes, firewallRes, cisRes] =
        await Promise.all([
          axios.get(
            "http://localhost:5000/api/devices"
          ),
          axios.get(
            "http://localhost:5000/api/firewall-rules"
          ),
          axios.get(
            "http://localhost:5000/api/cis-results"
          ),
        ]);

      setDevices(devicesRes.data);
      setFirewallRules(firewallRes.data);
      setCisResults(cisRes.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const passCount = cisResults.filter(
    (item) => item.status === "PASS"
  ).length;

  const failCount = cisResults.filter(
    (item) => item.status === "FAIL"
  ).length;

  const riskScore =
    cisResults.length > 0
      ? Math.round(
          (failCount /
            cisResults.length) *
            100
        )
      : 0;

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent:
            "center",
          alignItems: "center",
          background: "#0f172a",
          color: "white",
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div
      style={{
        background:
          "linear-gradient(to right,#0f172a,#020617)",
        minHeight: "100vh",
        color: "white",
        padding: "30px",
        fontFamily:
          "'Segoe UI', sans-serif",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "40px",
        }}
      >
        Network Posture Scanner
      </h1>

      {/* Stats Cards */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginBottom: "40px",
        }}
      >
        <Card
          title="Devices"
          value={devices.length}
        />

        <Card
          title="Firewall Rules"
          value={firewallRules.length}
        />

        <Card
          title="CIS Checks"
          value={cisResults.length}
        />

        <Card
          title="PASS"
          value={passCount}
          border="#22c55e"
        />

        <Card
          title="FAIL"
          value={failCount}
          border="#ef4444"
        />

        <Card
          title="Risk Score"
          value={`${riskScore}%`}
          border="#f59e0b"
        />
      </div>

      {/* Devices */}

      <SectionTitle title="Devices" />

      <Table>
        <thead>
          <tr>
            <Th>IP Address</Th>
            <Th>Hostname</Th>
            <Th>Vendor</Th>
            <Th>Open Ports</Th>
          </tr>
        </thead>

        <tbody>
          {devices.map(
            (device, index) => (
              <tr key={index}>
                <Td>{device.ip}</Td>

                <Td>
                  {device.hostname}
                </Td>

                <Td>
                  {device.vendor}
                </Td>

                <Td>
                  {device.openPorts
                    ?.map(
                      (port) =>
                        `${port.port} (${port.service})`
                    )
                    .join(", ")}
                </Td>
              </tr>
            )
          )}
        </tbody>
      </Table>

      {/* Firewall */}

      <SectionTitle title="Firewall Rules" />

      <Table>
        <thead>
          <tr>
            <Th>Action</Th>
            <Th>Protocol</Th>
            <Th>Source</Th>
            <Th>Destination</Th>
            <Th>Port</Th>
          </tr>
        </thead>

        <tbody>
          {firewallRules.map(
            (rule, index) => (
              <tr key={index}>
                <Td>
                  {rule.action}
                </Td>

                <Td>
                  {rule.protocol}
                </Td>

                <Td>
                  {rule.source}
                </Td>

                <Td>
                  {rule.destination}
                </Td>

                <Td>
                  {rule.port}
                </Td>
              </tr>
            )
          )}
        </tbody>
      </Table>

      {/* CIS */}

      <SectionTitle title="CIS Benchmark Results" />

      <Table>
        <thead>
          <tr>
            <Th>Check</Th>
            <Th>Status</Th>
            <Th>Evidence</Th>
          </tr>
        </thead>

        <tbody>
          {cisResults.map(
            (item, index) => (
              <tr key={index}>
                <Td>
                  {item.checkName}
                </Td>

                <Td>
                  <span
                    style={{
                      background:
                        item.status ===
                        "PASS"
                          ? "#22c55e"
                          : "#ef4444",
                      padding:
                        "5px 12px",
                      borderRadius:
                        "20px",
                      fontWeight:
                        "bold",
                    }}
                  >
                    {item.status}
                  </span>
                </Td>

                <Td>
                  {item.evidence}
                </Td>
              </tr>
            )
          )}
        </tbody>
      </Table>
    </div>
  );
}

function Card({
  title,
  value,
  border = "#3b82f6",
}) {
  return (
    <div
      style={{
        background: "#1e293b",
        padding: "20px",
        borderRadius: "12px",
        borderLeft: `5px solid ${border}`,
      }}
    >
      <h2>{value}</h2>
      <p>{title}</p>
    </div>
  );
}

function SectionTitle({
  title,
}) {
  return (
    <h2
      style={{
        marginBottom: "15px",
        marginTop: "30px",
      }}
    >
      {title}
    </h2>
  );
}

function Table({
  children,
}) {
  return (
    <table
      style={{
        width: "100%",
        borderCollapse:
          "collapse",
        marginBottom: "40px",
        background:
          "#1e293b",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      {children}
    </table>
  );
}

function Th({
  children,
}) {
  return (
    <th
      style={{
        background: "#2563eb",
        padding: "14px",
        textAlign: "left",
      }}
    >
      {children}
    </th>
  );
}

function Td({
  children,
}) {
  return (
    <td
      style={{
        padding: "14px",
        borderBottom:
          "1px solid #334155",
      }}
    >
      {children}
    </td>
  );
}

export default Dashboard;