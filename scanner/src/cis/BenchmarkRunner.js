import { TelnetCheck } from "./checks/TelnetCheck.js";
import { LoggingCheck } from "./checks/LoggingCheck.js";
import { SnmpCommunityCheck } from "./checks/SnmpCommunityCheck.js";
import { SensitivePortsCheck } from "./checks/SensitivePortsCheck.js";
import { SshOnlyManagementCheck } from "./checks/SshOnlyManagementCheck.js";
import { DefaultDenyCheck } from "./checks/DefaultDenyCheck.js";

export class BenchmarkRunner {
    run({ rules, configContent }) {
        const checks = [
            new TelnetCheck(),
            new LoggingCheck(),
            new SnmpCommunityCheck(),
            new SensitivePortsCheck(),
            new SshOnlyManagementCheck(),
            new DefaultDenyCheck(),
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