import net from "net";
import dns from "dns";
import { promisify } from "util";
import { Device } from "../models/Device.js";
import { getMacVendor } from "../utils/macUtils.js";

const reverseLookup = promisify(dns.reverse);

// Common ports with service names — covers all CIS benchmark checks
const COMMON_PORTS = [
  { port: 21,   service: "FTP" },
  { port: 22,   service: "SSH" },
  { port: 23,   service: "Telnet" },
  { port: 25,   service: "SMTP" },
  { port: 53,   service: "DNS" },
  { port: 80,   service: "HTTP" },
  { port: 110,  service: "POP3" },
  { port: 143,  service: "IMAP" },
  { port: 161,  service: "SNMP" },
  { port: 443,  service: "HTTPS" },
  { port: 445,  service: "SMB" },
  { port: 3306, service: "MySQL" },
  { port: 3389, service: "RDP" },
  { port: 5432, service: "PostgreSQL" },
  { port: 8080, service: "HTTP-Alt" },
  { port: 8443, service: "HTTPS-Alt" },
];

const CONNECT_TIMEOUT_MS = 800;
const BANNER_TIMEOUT_MS  = 1200;

/**
 * Try TCP connect to a single port. Returns true if open, false otherwise.
 */
function tcpConnect(ip, port) {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    socket.setTimeout(CONNECT_TIMEOUT_MS);

    socket.on("connect", () => { socket.destroy(); resolve(true); });
    socket.on("timeout", () => { socket.destroy(); resolve(false); });
    socket.on("error",   () => { resolve(false); });

    socket.connect(port, ip);
  });
}

/**
 * Grab a service banner from an open port (first N bytes).
 */
function grabBanner(ip, port) {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    socket.setTimeout(BANNER_TIMEOUT_MS);

    let banner = "";

    socket.on("connect", () => {
      // Some services send a banner immediately; HTTP needs a nudge
      if (port === 80 || port === 8080) {
        socket.write("HEAD / HTTP/1.0\r\n\r\n");
      }
    });

    socket.on("data", (data) => {
      banner += data.toString("utf8", 0, 256);
      socket.destroy();
    });

    socket.on("close",   () => resolve(banner.trim().split("\n")[0] || ""));
    socket.on("timeout", () => { socket.destroy(); resolve(""); });
    socket.on("error",   () => resolve(""));

    socket.connect(port, ip);
  });
}

/**
 * Resolve hostname via reverse DNS. Falls back to the IP string.
 */
async function resolveHostname(ip) {
  try {
    const hostnames = await reverseLookup(ip);
    return hostnames[0] || ip;
  } catch {
    return ip;
  }
}

export class TcpScanProvider {
  /**
   * Scan a single IP address. Returns an array with one Device if reachable,
   * or an empty array if all ports are closed / host is unreachable.
   */
  async scan(ip) {
    // Run all port checks in parallel
    const portResults = await Promise.all(
      COMMON_PORTS.map(async ({ port, service }) => {
        const isOpen = await tcpConnect(ip, port);
        if (!isOpen) return null;

        const banner = await grabBanner(ip, port);
        return { port, service, banner: banner || service };
      })
    );

    const openPorts = portResults.filter(Boolean);

    // Host is considered alive only if at least one port is open
    if (openPorts.length === 0) return [];

    const [hostname, vendor] = await Promise.all([
      resolveHostname(ip),
      getMacVendor(ip),
    ]);

    return [
      new Device({
        ip,
        hostname,
        vendor,
        openPorts,
      }),
    ];
  }
}
