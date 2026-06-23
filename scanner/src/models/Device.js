export class Device {
  constructor({
    ip,
    hostname,
    mac = null,
    vendor = "Unknown",
    openPorts = [],
  }) {
    this.ip = ip;
    this.hostname = hostname;
    this.mac = mac;
    this.vendor = vendor;
    this.openPorts = openPorts;
  }
}