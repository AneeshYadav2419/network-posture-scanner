// import { NmapProvider } from "./discovery/NmapProvider.js";
// import { DiscoveryService } from "./services/DiscoveryService.js";

// import { CiscoConfigParser } from "./firewall/parsers/CiscoConfigParser.js";
// import { FirewallService } from "./firewall/services/FirewallService.js";

// import { CisService } from "./cis/services/CisService.js";
// import path from "path";
// import { fileURLToPath } from "url";

// const __filename =
//   fileURLToPath(import.meta.url);

// const __dirname =
//   path.dirname(__filename);

//   const configPath = path.resolve(
//   __dirname,
//   "../../sample-configs/cisco-config.txt"
// );

// async function main() {
//   try {

//     // Discovery Module
//     const discoveryService =
//       new DiscoveryService(
//         new NmapProvider()
//       );

//     console.log(
//       "Starting network discovery...\n"
//     );

//     const devices =
//       await discoveryService.discover(
//         "127.0.0.1"
//       );

//     console.log(
//       JSON.stringify(
//         devices,
//         null,
//         2
//       )
//     );

//     // Firewall Module
//     const firewallService =
//       new FirewallService(
//         new CiscoConfigParser()
//       );

//     const firewallData =
//       await firewallService.loadConfig(
//         configPath
//       );

//     console.log(
//       "\nFirewall Rules:"
//     );

//     console.log(
//       firewallData.rules
//     );

//     // CIS Module
//     const cisService =
//       new CisService();

//     const results =
//       cisService.evaluate({
//         rules:
//           firewallData.rules,
//         configContent:
//           firewallData.configContent,
//       });

//     console.log(
//       "\nCIS Results:"
//     );

//     console.log(results);

//   } catch (error) {
//     console.error(
//       "Application failed"
//     );

//     console.error(error);
//   }
// }

// main();

import path from "path";
import { fileURLToPath } from "url";

import { NmapProvider } from "./discovery/NmapProvider.js";
import { DiscoveryService } from "./services/DiscoveryService.js";

import { CiscoConfigParser } from "./firewall/parsers/CiscoConfigParser.js";
import { FirewallService } from "./firewall/services/FirewallService.js";

import { CisService } from "./cis/services/CisService.js";

const __filename =
  fileURLToPath(import.meta.url);

const __dirname =
  path.dirname(__filename);

const configPath =
  path.resolve(
    __dirname,
    "../../sample-configs/cisco-config.txt"
  );

async function main() {
  try {
    // Discovery
    const discoveryService =
      new DiscoveryService(
        new NmapProvider()
      );

    console.log(
      "Starting network discovery...\n"
    );

    const devices =
      await discoveryService.discover(
        "127.0.0.1"
      );

    console.log(
      JSON.stringify(
        devices,
        null,
        2
      )
    );

    // Firewall
    const firewallService =
      new FirewallService(
        new CiscoConfigParser()
      );

    const firewallData =
      await firewallService.loadConfig(
        configPath
      );

    console.log(
      "\nFirewall Rules:"
    );

    console.log(
      firewallData.rules
    );

    // CIS
    const cisService =
      new CisService();

    const results =
      cisService.evaluate({
        rules:
          firewallData.rules,
        configContent:
          firewallData.configContent,
      });

    console.log(
      "\nCIS Results:"
    );

    console.log(results);

  } catch (error) {
    console.error(
      "Application failed"
    );

    console.error(error);
  }
}

main();