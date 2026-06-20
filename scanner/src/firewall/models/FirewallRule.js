export class FirewallRule {
  constructor({
    action,
    protocol,
    source,
    destination,
    port,
  }) {
    this.action = action;
    this.protocol = protocol;
    this.source = source;
    this.destination = destination;
    this.port = port;
  }
}