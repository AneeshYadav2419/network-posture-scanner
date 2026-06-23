import { CheckResult } from "../models/CheckResult.js";

export class SensitivePortsCheck {
  execute(rules) {
    const sensitivePorts = [
      { port: "22",   label: "SSH" },
      { port: "3389", label: "RDP" },
      { port: "445",  label: "SMB" },
      { port: "3306", label: "MySQL" },
      { port: "5432", label: "PostgreSQL" },
    ];

    const exposedRule = rules.find(
      (rule) =>
        rule.action === "permit" &&
        rule.source === "any" &&
        sensitivePorts.some((sp) => sp.port === rule.port)
    );

    if (exposedRule) {
      const label =
        sensitivePorts.find((sp) => sp.port === exposedRule.port)?.label ||
        exposedRule.port;

      return new CheckResult({
        id: "CIS-1.4",
        checkName: "Sensitive Ports Restricted",
        status: "FAIL",
        severity: "CRITICAL",
        evidence: `Port ${exposedRule.port} (${label}) is permitted from any source address (0.0.0.0/0)`,
        remediation: `Restrict port ${exposedRule.port} to specific trusted management subnets only. Replace the any-source rule with an ACL entry scoped to your management network, e.g.: permit tcp <mgmt-subnet> <wildcard> any eq ${exposedRule.port}.`,
      });
    }

    return new CheckResult({
      id: "CIS-1.4",
      checkName: "Sensitive Ports Restricted",
      status: "PASS",
      severity: "CRITICAL",
      evidence: "No sensitive ports are exposed to unrestricted public source addresses",
      remediation: "No action required.",
    });
  }
}