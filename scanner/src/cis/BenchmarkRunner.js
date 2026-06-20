import { TelnetCheck } from "./checks/TelnetCheck.js";
import { LoggingCheck } from "./checks/LoggingCheck.js";
import { SnmpCommunityCheck } from "./checks/SnmpCommunityCheck.js";

export class BenchmarkRunner {
  run({ rules, configContent }) {
    const checks = [
      new TelnetCheck(),
      new LoggingCheck(),
      new SnmpCommunityCheck(),
    ];

    return checks.map((check) => {
      if (
        check instanceof LoggingCheck ||
        check instanceof SnmpCommunityCheck
      ) {
        return check.execute(configContent);
      }

      return check.execute(rules);
    });
  }
}