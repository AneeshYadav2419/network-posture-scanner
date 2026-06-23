import { CheckResult } from "../models/CheckResult.js";

export class LoggingCheck {
  execute(configContent) {
    const enabled = configContent.includes("logging host");

    return new CheckResult({
      id: "CIS-1.2",
      checkName: "Remote Logging Enabled",
      status: enabled ? "PASS" : "FAIL",
      severity: "MEDIUM",
      evidence: enabled
        ? "Remote syslog destination configured via `logging host`"
        : "No `logging host` directive found in configuration",
      remediation:
        "Configure a remote syslog server: `logging host <syslog-server-ip>`. Ensure log level is set to at least informational: `logging trap informational`.",
    });
  }
}