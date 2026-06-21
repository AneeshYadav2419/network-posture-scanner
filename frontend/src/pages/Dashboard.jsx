
import { useState } from "react";
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
        scanning,
        lastScanTime,
        runScan,
        refreshData
    } = useDashboardData();

    const [targetInput, setTargetInput] = useState("127.0.0.1");
    const [providerInput, setProviderInput] = useState("tcp");
    const [scanError, setScanError] = useState(null);
    const [scanSuccess, setScanSuccess] = useState(false);

    if (loading) {
        return (
            <div className="loading">
                <div className="spinner"></div>
                <span>Loading Dashboard Data...</span>
            </div>
        );
    }

    const passCount = cisResults.filter((item) => item.status === "PASS").length;
    const failCount = cisResults.filter((item) => item.status === "FAIL").length;
    const totalChecks = cisResults.length;
    const complianceRate = totalChecks > 0 ? Math.round((passCount / totalChecks) * 100) : 100;
    const riskScore = 100 - complianceRate;

    const riskLevel =
        riskScore >= 60
            ? "HIGH"
            : riskScore >= 30
                ? "MEDIUM"
                : "LOW";

    const handleScanSubmit = async (e) => {
        e.preventDefault();
        setScanError(null);
        setScanSuccess(false);

        if (!targetInput.trim()) {
            setScanError("Please enter a target IP address, subnet range, or host.");
            return;
        }

        const res = await runScan(targetInput.trim(), providerInput);
        if (res.success) {
            setScanSuccess(true);
            setTimeout(() => setScanSuccess(false), 5000);
        } else {
            setScanError(res.error || "Failed to complete the scan.");
        }
    };

    return (
        <div className="dashboard">
            <header className="header">
                <h1>Network Posture Scanner</h1>
                <p>Automated Device Discovery, Access Control Audit, and CIS Compliance Analyzer</p>
                {lastScanTime && (
                    <div className="scan-info">
                        Last DB Refresh: {new Date(lastScanTime).toLocaleString()}
                        <button className="btn-refresh" onClick={refreshData} title="Refresh Dashboard Data">
                            🔄
                        </button>
                    </div>
                )}
            </header>

            <div className="dashboard-grid">
                {/* Control Panel Card */}
                <div className="card control-card">
                    <h2>Scan Control Center</h2>
                    <p className="card-subtitle">Specify a subnet range or single IP to discover hosts and run CIS configuration audits.</p>
                    
                    <form onSubmit={handleScanSubmit} className="scan-form">
                        <div className="form-group">
                            <label htmlFor="target">Target Subnet / IP Range</label>
                            <input
                                id="target"
                                type="text"
                                value={targetInput}
                                onChange={(e) => setTargetInput(e.target.value)}
                                placeholder="e.g., 127.0.0.1, 192.168.1.0/24"
                                disabled={scanning}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="provider">Scan Method Provider</label>
                            <select
                                id="provider"
                                value={providerInput}
                                onChange={(e) => setProviderInput(e.target.value)}
                                disabled={scanning}
                            >
                                <option value="tcp">TCP Socket Scan (Built-in, Fast)</option>
                                <option value="nmap">Nmap Service Discovery (Requires Nmap)</option>
                            </select>
                        </div>

                        <button type="submit" className="btn-scan" disabled={scanning}>
                            {scanning ? "Executing Scan..." : "Launch Discovery Scan"}
                        </button>
                    </form>

                    {scanning && (
                        <div className="scanning-indicator">
                            <div className="radar">
                                <div className="pulse"></div>
                            </div>
                            <div className="scanning-text">
                                <span className="pulse-text">Scan Active</span>
                                <span className="sub-text">Probing hosts & parsing firewall rules...</span>
                            </div>
                        </div>
                    )}

                    {scanError && (
                        <div className="alert alert-error">
                            <strong>Scan Error:</strong> {scanError}
                        </div>
                    )}

                    {scanSuccess && (
                        <div className="alert alert-success">
                            <strong>Success:</strong> Scan finished. Dashboard metrics updated dynamically!
                        </div>
                    )}
                </div>

                {/* Executive Summary Card */}
                <div className="card summary-card">
                    <h2>Security Assessment Summary</h2>
                    <div className="risk-level-container">
                        <span className={`risk-badge risk-${riskLevel.toLowerCase()}`}>
                            {riskLevel} RISK LEVEL
                        </span>
                        <div className="compliance-percentage">
                            <strong>{complianceRate}%</strong> Compliance Rate
                        </div>
                    </div>
                    <p className="summary-text">
                        The recent network audit identified <strong>{devices.length} active device(s)</strong> and 
                        analyzed <strong>{firewallRules.length} firewall access rules</strong>. 
                        A total of <strong>{totalChecks} CIS Benchmark security controls</strong> were evaluated.
                    </p>
                    <div className="summary-bullets">
                        <div className="bullet-item">
                            <span className="bullet-icon pass-icon">✔</span>
                            <span>{passCount} passed audits against device config policies.</span>
                        </div>
                        <div className="bullet-item">
                            <span className="bullet-icon fail-icon">✘</span>
                            <span>{failCount} failed audits requiring active administrative remediation.</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="stats-grid">
                <StatsCard
                    title="Active Hosts"
                    value={devices.length}
                    icon="🖥️"
                    color="#3b82f6"
                />

                <StatsCard
                    title="Firewall Rules"
                    value={firewallRules.length}
                    icon="🛡️"
                    color="#a855f7"
                />

                <StatsCard
                    title="Passed Audits"
                    value={passCount}
                    icon="✅"
                    color="#10b981"
                />

                <StatsCard
                    title="Failed Audits"
                    value={failCount}
                    icon="❌"
                    color="#ef4444"
                />

                <StatsCard
                    title="Security Risk Score"
                    value={`${riskScore}%`}
                    icon="⚠️"
                    color="#f59e0b"
                />
            </div>

            <div className="dashboard-grid">
                {/* Security Compliance Chart */}
                <div className="card chart-card">
                    <SecurityChart passCount={passCount} failCount={failCount} />
                </div>
            </div>

            <div className="card table-card">
                <DevicesTable devices={devices} />
            </div>

            <div className="card table-card">
                <FirewallRulesTable firewallRules={firewallRules} />
            </div>

            <div className="card table-card">
                <CisResultsTable cisResults={cisResults} />
            </div>
            
            <footer className="footer">
                <p>Network Posture Scanner • Security Compliance Framework v1.0.0</p>
            </footer>
        </div>
    );
}

export default Dashboard;