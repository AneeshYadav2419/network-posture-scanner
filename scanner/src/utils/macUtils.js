import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

// Small OUI prefix → vendor name map (covers most common hardware vendors)
const OUI_MAP = {
  "00:50:56": "VMware",
  "00:0C:29": "VMware",
  "00:1A:11": "Google",
  "AC:DE:48": "Private",
  "B8:27:EB": "Raspberry Pi",
  "DC:A6:32": "Raspberry Pi",
  "E4:5F:01": "Raspberry Pi",
  "00:1B:21": "Intel",
  "8C:8D:28": "Intel",
  "00:23:14": "Intel",
  "00:1C:42": "Parallels",
  "00:03:FF": "Microsoft",
  "00:15:5D": "Microsoft (Hyper-V)",
  "08:00:27": "VirtualBox",
  "52:54:00": "QEMU/KVM",
  "00:16:3E": "Xen",
  "00:1D:AA": "Cisco",
  "00:0E:83": "Cisco",
  "00:1A:A1": "Cisco",
  "FC:FB:FB": "Cisco",
  "00:1B:2B": "Juniper",
  "00:10:DB": "Juniper",
  "00:19:E2": "HP",
  "00:25:B3": "HP",
  "00:26:55": "HP",
  "00:D0:09": "Dell",
  "00:14:22": "Dell",
  "14:18:77": "Dell",
};

/**
 * Try to get the MAC address for a LAN IP via ARP table.
 * Returns null for non-local / unreachable IPs.
 */
async function getMacAddress(ip) {
  try {
    const { stdout } = await execAsync(`arp -a ${ip}`, { timeout: 2000 });
    // Windows ARP output format: "  192.168.1.1   aa-bb-cc-dd-ee-ff   dynamic"
    const match = stdout.match(
      /([0-9a-fA-F]{2}[-:]){5}[0-9a-fA-F]{2}/
    );
    return match ? match[0].replace(/-/g, ":").toUpperCase() : null;
  } catch {
    return null;
  }
}

/**
 * Resolves both the MAC address and vendor name for a given IP.
 * Returns { mac: string|null, vendor: string }
 */
export async function getMacInfo(ip) {
  const mac = await getMacAddress(ip);
  if (!mac) return { mac: null, vendor: "Unknown" };

  const oui = mac.substring(0, 8).toUpperCase();
  const vendor = OUI_MAP[oui] || `Unknown (${oui})`;
  return { mac, vendor };
}
