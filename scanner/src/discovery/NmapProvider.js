import nmap from "node-nmap";
import { Device } from "../models/Device.js";

nmap.nmapLocation =
  "C:\\Program Files (x86)\\Nmap\\nmap.exe";

export class NmapProvider {
  async scan(target) {
    return new Promise((resolve, reject) => {
      const scan = new nmap.NmapScan(
        target,
        "-sV"
      );

      scan.on("complete", (hosts) => {
        const devices = hosts.map(
          (host) =>
            new Device({
              ip: host.ip || "Unknown",
              hostname:
                host.hostname || "Unknown",
              vendor:
                host.vendor || "Unknown",

              openPorts:
                host.openPorts?.map(
                  (port) => ({
                    port: port.port,
                    service:
                      port.service ||
                      "unknown",
                  })
                ) || [],
            })
        );

        resolve(devices);
      });

      scan.on("error", reject);

      scan.startScan();
    });
  }
}