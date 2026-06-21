export class CheckResult {
  constructor({
    id,
    checkName,
    status,
    severity = "MEDIUM",
    evidence,
    remediation = "Review your network device configuration and apply the recommended fix.",
  }) {
    this.id = id || checkName?.replace(/\s+/g, "_").toUpperCase() || "UNKNOWN";
    this.checkName = checkName;
    this.status = status;
    this.severity = severity;
    this.evidence = evidence;
    this.remediation = remediation;
  }
}