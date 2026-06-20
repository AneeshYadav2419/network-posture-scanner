import { CheckResult } from "../models/CheckResult.js";

export class DefaultDenyCheck {
  execute(rules) {
    const hasDenyRule = rules.some(
      (rule) => rule.action === "deny"
    );

    if (hasDenyRule) {
      return new CheckResult({
        checkName:
          "Default Deny Policy",
        status: "PASS",
        evidence:
          "Deny rule detected",
      });
    }

    return new CheckResult({
      checkName:
        "Default Deny Policy",
      status: "FAIL",
      evidence:
        "No deny rule found",
    });
  }
}