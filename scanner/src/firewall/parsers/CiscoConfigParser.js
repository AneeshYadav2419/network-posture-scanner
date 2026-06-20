import fs from "fs/promises";
import { FirewallRule } from "../models/FirewallRule.js";

export class CiscoConfigParser {
    async parse(filePath) {
        const content = await fs.readFile(
            filePath,
            "utf-8"
        );

        const lines = content.split("\n");

        const rules = [];

        for (const line of lines) {
            const trimmed = line.trim();

            if (
                trimmed.startsWith("permit") ||
                trimmed.startsWith("deny")
            ) {
                // const parts = trimmed.split(" ");
                const parts =
          trimmed.split(/\s+/);

                rules.push(
                    new FirewallRule({
                        action: parts[0],
                        protocol: parts[1],
                        source: parts[2],
                        destination: parts[3],
                        port: parts[4],
                    })
                );
            }
        }

        return {
            rules,
            configContent: content,
        };
    }
}