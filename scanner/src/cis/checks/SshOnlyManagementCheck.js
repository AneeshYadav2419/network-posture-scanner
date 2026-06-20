import { CheckResult } from "../models/CheckResult.js";

export class SshOnlyManagementCheck {
  execute(rules) {
    const insecurePorts = [
      "23", // Telnet
      "21", // FTP
      "80", // HTTP Management
    ];

    const found = rules.find(
      (rule) =>
        rule.action === "permit" &&
        insecurePorts.includes(rule.port)
    );

    if (found) {
      return new CheckResult({
        checkName:
          "SSH Only Management",
        status: "FAIL",
        evidence:
          `Insecure management port ${found.port} is allowed`,
      });
    }

    return new CheckResult({
      checkName:
        "SSH Only Management",
      status: "PASS",
      evidence:
        "Only secure management protocols detected",
    });
  }
}