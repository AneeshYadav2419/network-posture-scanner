import { CheckResult } from "../models/CheckResult.js";

export class DefaultDenyCheck {
  execute(rules) {
    const hasDenyRule = rules.some((rule) => rule.action === "deny");

    if (hasDenyRule) {
      return new CheckResult({
        id: "CIS-1.6",
        checkName: "Default Deny Policy",
        status: "PASS",
        severity: "CRITICAL",
        evidence: "At least one explicit deny rule is present, indicating a default-deny posture",
        remediation: "No action required.",
      });
    }

    return new CheckResult({
      id: "CIS-1.6",
      checkName: "Default Deny Policy",
      status: "FAIL",
      severity: "CRITICAL",
      evidence: "No deny rules found — firewall may be operating with an implicit permit-all posture",
      remediation:
        "Add an explicit deny-all rule at the end of every ACL: `deny ip any any`. A default-deny policy ensures that only explicitly permitted traffic is allowed through.",
    });
  }
}