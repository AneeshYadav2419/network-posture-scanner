import { CheckResult } from "../models/CheckResult.js";

export class SshOnlyManagementCheck {
  execute(rules) {
    const insecurePorts = [
      { port: "23", label: "Telnet" },
      { port: "21", label: "FTP" },
      { port: "80", label: "HTTP" },
    ];

    const found = rules.find(
      (rule) =>
        rule.action === "permit" &&
        insecurePorts.some((p) => p.port === rule.port)
    );

    if (found) {
      const label =
        insecurePorts.find((p) => p.port === found.port)?.label || found.port;

      return new CheckResult({
        id: "CIS-1.5",
        checkName: "SSH Only Management",
        status: "FAIL",
        severity: "HIGH",
        evidence: `Insecure management protocol port ${found.port} (${label}) is permitted in firewall rules`,
        remediation: `Disable ${label} access for management. Remove the permit rule for port ${found.port} and ensure all remote management is performed exclusively over SSH (port 22). Apply: \`no access-list <id> permit tcp any any eq ${found.port}\`.`,
      });
    }

    return new CheckResult({
      id: "CIS-1.5",
      checkName: "SSH Only Management",
      status: "PASS",
      severity: "HIGH",
      evidence: "No insecure management protocol ports (Telnet/FTP/HTTP) are permitted",
      remediation: "No action required.",
    });
  }
}