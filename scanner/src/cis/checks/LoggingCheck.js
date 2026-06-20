import { CheckResult } from "../models/CheckResult.js";

export class LoggingCheck {
  execute(configContent) {
    const enabled =
      configContent.includes(
        "logging host"
      );

    return new CheckResult({
      checkName:
        "Remote Logging Enabled",
      status: enabled
        ? "PASS"
        : "FAIL",
      evidence: enabled
        ? "Remote logging configured"
        : "No logging configuration found",
    });
  }
}