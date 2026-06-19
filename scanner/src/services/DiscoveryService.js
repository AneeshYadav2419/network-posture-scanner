export class DiscoveryService {
  constructor(provider) {
    this.provider = provider;
  }

  async discover(target) {
    return this.provider.scan(
      target
    );
  }
}