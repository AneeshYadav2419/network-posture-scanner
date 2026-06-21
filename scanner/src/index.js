import path from "path";
import { fileURLToPath } from "url";

import { TcpScanProvider } from "./discovery/TcpScanProvider.js";
import { NmapProvider } from "./discovery/NmapProvider.js";
import { DiscoveryService } from "./services/DiscoveryService.js";

import { CiscoConfigParser } from "./firewall/parsers/CiscoConfigParser.js";
import { FirewallService } from "./firewall/services/FirewallService.js";

import { CisService } from "./cis/services/CisService.js";
import { BackendClient } from "./aws/BackendClient.js";
import { parseTarget } from "./utils/ipUtils.js";
import { asyncPool } from "./utils/asyncPool.js";

// ---------------------------------------------------------------------------
// PATH SETUP
// ---------------------------------------------------------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const configPath = path.resolve(
    __dirname,
    "../../sample-configs/cisco-config.txt"
);

// ---------------------------------------------------------------------------
// MAIN
// ---------------------------------------------------------------------------
async function main() {
    try {
        // ------------------------------------------------------------------
        // INPUT — accept CLI args: node src/index.js <target> <provider>
        // ------------------------------------------------------------------
        const rawTarget = process.argv[2] || "127.0.0.1";
        const providerType = process.argv[3] || "tcp";

        console.log(`\n[Scanner] Target  : ${rawTarget}`);
        console.log(`[Scanner] Provider: ${providerType.toUpperCase()}\n`);

        // ------------------------------------------------------------------
        // PROVIDER
        // ------------------------------------------------------------------
        const provider =
            providerType.toLowerCase() === "nmap"
                ? new NmapProvider()
                : new TcpScanProvider();

        const discoveryService = new DiscoveryService(provider);

        // ------------------------------------------------------------------
        // TARGET PARSING  — handles single IP, CIDR, or comma-separated list
        // ------------------------------------------------------------------
        const targets = parseTarget(rawTarget);
        console.log(`[Scanner] Scanning ${targets.length} target(s)...`);

        // ------------------------------------------------------------------
        // SCAN ENGINE — concurrency-limited with asyncPool
        // ------------------------------------------------------------------
        let devices = [];
        let completed = 0;

        await asyncPool(10, targets, async (ip) => {
            try {
                const result = await discoveryService.discover(ip);
                completed++;

                process.stdout.write(
                    `\r[Scanner] Progress: ${completed}/${targets.length} — current: ${ip}   `
                );

                if (result?.length) {
                    devices.push(...result);
                    console.log(`\n[Scanner] Host found: ${ip}`);
                }
            } catch (_) {
                // Ignore unreachable hosts
            }
        });

        console.log(`\n[Scanner] Discovery complete. Found ${devices.length} host(s).`);

        // ------------------------------------------------------------------
        // FIREWALL MODULE
        // ------------------------------------------------------------------
        const firewallService = new FirewallService(new CiscoConfigParser());
        const firewallData = await firewallService.loadConfig(configPath);

        console.log(`[Scanner] Firewall rules loaded: ${firewallData.rules.length} rule(s).`);

        // ------------------------------------------------------------------
        // CIS BENCHMARK ENGINE
        // ------------------------------------------------------------------
        const cisService = new CisService();
        const results = cisService.evaluate({
            rules: firewallData.rules,
            configContent: firewallData.configContent,
        });

        const passed = results.filter((r) => r.status === "PASS").length;
        console.log(`[Scanner] CIS checks: ${passed}/${results.length} passed.`);

        // ------------------------------------------------------------------
        // BACKEND INGESTION
        // ------------------------------------------------------------------
        const backendClient = new BackendClient();
        console.log("[Scanner] Sending report to backend...");

        const response = await backendClient.send({
            target: rawTarget,
            devices,
            firewallRules: firewallData.rules,
            cisResults: results,
        });

        console.log("[Scanner] Report ingested successfully:", response);

    } catch (err) {
        console.error("[Scanner] Fatal error:", err);
        process.exit(1);
    }
}

main();