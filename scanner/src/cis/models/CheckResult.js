export class CheckResult {
  constructor({
    checkName,
    status,
    evidence,
  }) {
    this.checkName = checkName;
    this.status = status;
    this.evidence = evidence;
  }
}