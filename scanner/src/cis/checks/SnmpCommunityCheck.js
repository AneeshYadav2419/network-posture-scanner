import { CheckResult } from "../models/CheckResult.js";

export class SnmpCommunityCheck {
  execute(configContent) {
    const weak =
      configContent.includes(
        "community public"
      ) ||
      configContent.includes(
        "community private"
      );

    return new CheckResult({
      checkName:
        "Weak SNMP Community",
      status: weak
        ? "FAIL"
        : "PASS",
      evidence: weak
        ? "Weak SNMP community detected"
        : "No weak SNMP community found",
    });
  }
}