import { CheckResult } from "../models/CheckResult.js";

export class TelnetCheck {
  execute(rules) {
    const telnetRule = rules.find(
      (rule) => rule.port === "23" && rule.action === "permit"
    );

    if (telnetRule) {
      return new CheckResult({
        id: "CIS-1.1",
        checkName: "No Telnet Exposure",
        status: "FAIL",
        severity: "HIGH",
        evidence: "Telnet port 23 is permitted in firewall rules",
        remediation:
          "Remove any ACL entries that permit TCP port 23. Replace Telnet with SSH (port 22) for all remote management. Apply: `no access-list <id> permit tcp any any eq 23`.",
      });
    }

    return new CheckResult({
      id: "CIS-1.1",
      checkName: "No Telnet Exposure",
      status: "PASS",
      severity: "HIGH",
      evidence: "No permit rule found for Telnet port 23",
      remediation: "No action required.",
    });
  }
}