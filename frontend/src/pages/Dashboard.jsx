
import StatsCard from "../components/cards/StatsCard";

import DevicesTable from "../components/tables/DevicesTable";
import FirewallRulesTable from "../components/tables/FirewallRulesTable";
import CisResultsTable from "../components/tables/CisResultsTable";
import SecurityChart from "../components/charts/SecurityChart";

import useDashboardData from "../hooks/useDashboardData";
import "../styles/dashboard.css";

function Dashboard() {
    const {
        devices,
        firewallRules,
        cisResults,
        loading,
    } = useDashboardData();

    if (loading) {
        return (
            <div className="loading">
                Loading Dashboard...
            </div>
        );
    }

    const passCount =
        cisResults.filter(
            (item) => item.status === "PASS"
        ).length;

    const failCount =
        cisResults.filter(
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

    const riskLevel =
        riskScore >= 60
            ? "HIGH"
            : riskScore >= 30
                ? "MEDIUM"
                : "LOW";

    return (
        <div className="dashboard">
            <header className="header">
                <h1>
                    Network Posture Scanner
                </h1>

                <p>
                    Security Discovery &
                    Compliance Dashboard
                </p>
                <div className="scan-info">
                    Last Scan:
                    {new Date().toLocaleString()}
                </div>
            </header>

            <div className="stats-grid">
                <StatsCard
                    title="Devices"
                    value={devices.length}
                    icon="🖥️"
                    color="#3b82f6"
                />

                <StatsCard
                    title="Firewall Rules"
                    value={firewallRules.length}
                    icon="🛡️"
                    color="#8b5cf6"
                />

                <StatsCard
                    title="PASS Checks"
                    value={passCount}
                    icon="✅"
                    color="#22c55e"
                />

                <StatsCard
                    title="FAIL Checks"
                    value={failCount}
                    icon="❌"
                    color="#ef4444"
                />

                <StatsCard
                    title="Risk Score"
                    value={`${riskScore}%`}
                    color="#f59e0b"
                />
            </div>
            <div className="summary-card">
                <h2>Executive Summary</h2>

                <p>
                    Scan completed successfully.
                    {devices.length} device(s)
                    discovered,
                    {firewallRules.length} firewall
                    rules analyzed and
                    {cisResults.length} CIS benchmark
                    checks evaluated.
                </p>

                <p>
                    Current posture indicates
                    <strong> {riskLevel} RISK </strong>
                    with {failCount} failed controls.
                </p>
            </div>



            <div className="top-section">
                <div
                    style={{
                        background:
                            riskLevel === "HIGH"
                                ? "#7f1d1d"
                                : riskLevel === "MEDIUM"
                                    ? "#78350f"
                                    : "#14532d",
                        padding: "24px",
                        borderRadius: "16px",
                        fontSize: "20px",
                        fontWeight: "bold",
                    }}
                >
                    Security Status: {riskLevel} RISK

                    <div
                        style={{
                            marginTop: "10px",
                            fontSize: "14px",
                            opacity: 0.8,
                        }}
                    >
                        {devices.length} Devices •
                        {firewallRules.length} Firewall Rules •
                        {cisResults.length} CIS Checks
                    </div>
                </div>

                <SecurityChart
                    passCount={passCount}
                    failCount={failCount}
                />
            </div>

            <DevicesTable devices={devices} />

            <FirewallRulesTable
                firewallRules={firewallRules}
            />

            <CisResultsTable
                cisResults={cisResults}
            />
        </div>
    );
}

export default Dashboard;