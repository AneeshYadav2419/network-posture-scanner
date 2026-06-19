import { NmapProvider } from "./discovery/NmapProvider.js";
import { DiscoveryService } from "./services/DiscoveryService.js";

async function main() {
  try {
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
  } catch (error) {
    console.error(
      "Discovery failed"
    );
    console.error(error);
  }
}

main();