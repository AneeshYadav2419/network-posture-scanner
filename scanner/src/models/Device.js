export class Device {
  constructor({
    ip,
    hostname,
    vendor = "Unknown",
    openPorts = [],
  }) {
    this.ip = ip;
    this.hostname = hostname;
    this.vendor = vendor;
    this.openPorts = openPorts;
  }
}