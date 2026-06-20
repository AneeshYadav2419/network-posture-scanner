import { CheckResult } from "../models/CheckResult.js";

export class SensitivePortsCheck {
  execute(rules) {
    const sensitivePorts = [
      "22",
      "3389",
      "445",
      "3306",
      "5432",
    ];

    const exposedRule = rules.find(
      (rule) =>
        rule.action === "permit" &&
        rule.source === "any" &&
        sensitivePorts.includes(rule.port)
    );

    if (exposedRule) {
      return new CheckResult({
        checkName:
          "Sensitive Ports Restricted",
        status: "FAIL",
        evidence: `Sensitive port ${exposedRule.port} exposed to any source`,
      });
    }

    return new CheckResult({
      checkName:
        "Sensitive Ports Restricted",
      status: "PASS",
      evidence:
        "No sensitive ports exposed publicly",
    });
  }
}