/**
 * Converts a dotted-decimal IP string to a 32-bit integer.
 */
function ipToInt(ip) {
    return ip.split(".").reduce((acc, octet) => (acc << 8) | parseInt(octet, 10), 0) >>> 0;
}

/**
 * Converts a 32-bit integer back to a dotted-decimal IP string.
 */
function intToIp(n) {
    return [(n >>> 24) & 0xff, (n >>> 16) & 0xff, (n >>> 8) & 0xff, n & 0xff].join(".");
}

/**
 * Parses a target string into an array of individual IP addresses.
 * Supports:
 *   - Single IP:              "192.168.1.5"
 *   - CIDR any prefix length: "192.168.1.0/24", "10.0.0.0/8", "192.168.1.128/25"
 *   - Comma-separated list:   "192.168.1.1,192.168.1.2,10.0.0.5"
 *   - Mixed list with CIDR:   "192.168.1.1,10.0.0.0/24"
 */
export function parseTarget(target) {
    // Comma-separated list — each element may itself be a CIDR or single IP
    if (target.includes(",")) {
        return target
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
            .flatMap((t) => parseTarget(t));  // recurse so CIDRs in lists work too
    }

    // CIDR notation — supports any prefix from /8 to /32
    if (target.includes("/")) {
        const [base, prefix] = target.split("/");
        const prefixNum = parseInt(prefix, 10);

        if (prefixNum < 8 || prefixNum > 32) {
            console.warn(`[ipUtils] Unsupported prefix /${prefixNum}. Falling back to base IP.`);
            return [base];
        }

        if (prefixNum === 32) {
            // /32 = exact host
            return [base];
        }

        const mask     = prefixNum === 0 ? 0 : (~0 << (32 - prefixNum)) >>> 0;
        const network  = (ipToInt(base) & mask) >>> 0;
        const broadcast = (network | (~mask >>> 0)) >>> 0;

        // Guard against excessively large ranges (> 65534 hosts = bigger than /16)
        const hostCount = broadcast - network - 1;
        if (hostCount > 65534) {
            console.warn(`[ipUtils] CIDR /${prefixNum} would generate ${hostCount} IPs — clamped to /16 (65534 hosts).`);
            const clampedMask = (~0 << 16) >>> 0;
            const clampedNet  = (ipToInt(base) & clampedMask) >>> 0;
            const clampedBc   = (clampedNet | (~clampedMask >>> 0)) >>> 0;
            const ips = [];
            for (let i = clampedNet + 1; i < clampedBc; i++) {
                ips.push(intToIp(i));
            }
            return ips;
        }

        const ips = [];
        for (let i = network + 1; i < broadcast; i++) {
            ips.push(intToIp(i));
        }
        return ips;
    }

    // Single IP or hostname
    return [target];
}
