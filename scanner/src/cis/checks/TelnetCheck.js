import { CheckResult } from "../models/CheckResult.js";

export class TelnetCheck {
  execute(rules) {
    const telnetRule = rules.find(
      (rule) =>
        rule.port === "23" &&
        rule.action === "permit"
    );

    if (telnetRule) {
      return new CheckResult({
        checkName:
          "No Telnet Exposure",
        status: "FAIL",
        evidence:
          "Telnet port 23 is permitted",
      });
    }

    return new CheckResult({
      checkName:
        "No Telnet Exposure",
      status: "PASS",
      evidence:
        "No Telnet exposure found",
    });
  }
}