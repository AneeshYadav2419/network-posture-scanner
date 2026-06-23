import { CheckResult } from "../models/CheckResult.js";

export class SnmpCommunityCheck {
  execute(configContent) {
    const weak =
      configContent.includes("community public") ||
      configContent.includes("community private");

    return new CheckResult({
      id: "CIS-1.3",
      checkName: "Weak SNMP Community String",
      status: weak ? "FAIL" : "PASS",
      severity: "HIGH",
      evidence: weak
        ? "Default/weak SNMP community string ('public' or 'private') detected in configuration"
        : "No weak SNMP community strings found",
      remediation:
        "Remove default SNMP community strings: `no snmp-server community public` and `no snmp-server community private`. Use SNMPv3 with authentication and encryption, or configure a strong, non-guessable community string restricted to a specific ACL.",
    });
  }
}